import { test, expect, type APIRequestContext } from '@playwright/test'

/**
 * Site audit item: "Add an automated internal-link test that fails the
 * build for any non-2xx internal destination." Crawls every internal <a
 * href> reachable from the homepage (following the same links a real
 * visitor/crawler would) and asserts each one ultimately resolves (after
 * redirects) to a 2xx status.
 *
 * Deliberately HTTP-only (Playwright's `request` fixture, no browser) so
 * the crawl stays fast even across ~80 routes, and deliberately excludes
 * `/api/*` — those are POST-only handlers, never real `<a href>` targets,
 * and a GET against them is expected to fail for reasons unrelated to
 * link integrity.
 */

const START_PATH = '/'
const NON_HTTP_HREF = /^(mailto:|tel:|javascript:|#)/i

function extractHrefs(html: string): string[] {
  const hrefs: string[] = []
  const re = /<a\b[^>]*?\shref=["']([^"']*)["']/gi
  let match: RegExpExecArray | null
  while ((match = re.exec(html)) !== null) {
    hrefs.push(match[1])
  }
  return hrefs
}

// Resolves an href against the page it was found on, keeps only same-origin
// page links, and normalizes away the trailing slash / hash so each
// destination is only queued and checked once.
function normalizeInternalHref(href: string, baseUrl: string): string | null {
  if (!href || NON_HTTP_HREF.test(href)) return null

  let url: URL
  try {
    url = new URL(href, baseUrl)
  } catch {
    return null
  }

  if (url.origin !== new URL(baseUrl).origin) return null
  if (url.pathname.startsWith('/api/')) return null

  let path = url.pathname
  if (path.length > 1 && path.endsWith('/')) path = path.slice(0, -1)
  return path + url.search || '/'
}

async function crawlInternalLinks(request: APIRequestContext, baseUrl: string) {
  const statusByPath = new Map<string, number>()
  const discovered = new Set<string>([START_PATH])
  const frontier: string[] = [START_PATH]

  while (frontier.length > 0) {
    const path = frontier.shift() as string
    const response = await request.get(path)
    statusByPath.set(path, response.status())

    if (!response.ok()) continue

    const contentType = response.headers()['content-type'] ?? ''
    if (!contentType.includes('text/html')) continue

    const html = await response.text()
    for (const rawHref of extractHrefs(html)) {
      const normalized = normalizeInternalHref(rawHref, baseUrl)
      if (normalized && !discovered.has(normalized)) {
        discovered.add(normalized)
        frontier.push(normalized)
      }
    }
  }

  return statusByPath
}

test.describe('Internal link integrity', () => {
  test('every internal link reachable from the homepage resolves to 2xx', async ({ request, baseURL }) => {
    const base = baseURL ?? 'http://localhost:3200'
    const statusByPath = await crawlInternalLinks(request, base)

    const failures = [...statusByPath.entries()]
      .filter(([, status]) => status < 200 || status >= 300)
      .sort(([a], [b]) => a.localeCompare(b))

    const report = failures.map(([path, status]) => `  ${status}  ${path}`).join('\n')

    expect(
      failures.length,
      `Found ${failures.length} internal link(s) resolving to a non-2xx status ` +
        `out of ${statusByPath.size} checked:\n${report}`
    ).toBe(0)
  })
})
