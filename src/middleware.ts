import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Site audit — "No canonical links": standardise HTTPS, preferred hostname
 * and lowercase paths, redirecting non-preferred variants to the canonical
 * version (https://air2transport.com, lowercase paths). Trailing-slash
 * standardisation is already handled by `trailingSlash: true` in
 * next.config.js and is left to that mechanism rather than duplicated here.
 *
 * Deliberately conservative: only acts on the canonical host itself or a
 * short, explicit list of known legacy/alias hostnames for this business
 * (the old jet2transport.com brand domain, and the www variant). Any other
 * host — an internal hosting hostname, a raw IP, a health-check probe,
 * localhost during development or testing — is left untouched, so this
 * can never turn into an unexpected redirect loop or break infrastructure
 * that reaches the app by a hostname other than the public domain.
 *
 * HTTPS is only forced when the proxy positively reports the original
 * request was HTTP via `x-forwarded-proto`; if that header is absent, we
 * do nothing rather than guess, since a wrong guess risks a redirect loop.
 *
 * Lowercasing applies to page URLs only, never to static assets. A file in
 * public/ is served under its exact on-disk name, so rewriting the case of
 * `/images/J2T_website_impovements.pdf-image-005.jpg` produces a path that
 * does not exist and the image 404s. Page paths carry no file extension,
 * so any request whose last segment has one is exempted from the case rule
 * (it still gets the HTTPS and hostname canonicalisation, which are
 * case-preserving and safe for assets).
 */

const CANONICAL_HOST = 'air2transport.com'

const ALTERNATE_HOSTS = new Set(['www.air2transport.com', 'jet2transport.com', 'www.jet2transport.com'])

/**
 * A request for a concrete file (an extension on the final path segment)
 * rather than a page. `trailingSlash: true` means real page URLs end in a
 * slash, so this only ever matches asset-shaped paths.
 */
const STATIC_ASSET_PATH = /\.[a-z0-9]+$/i

export function middleware(request: NextRequest) {
  const hostHeader = (request.headers.get('host') ?? '').toLowerCase().replace(/:\d+$/, '')
  const isCanonicalHost = hostHeader === CANONICAL_HOST
  const isAlternateHost = ALTERNATE_HOSTS.has(hostHeader)

  if (!isCanonicalHost && !isAlternateHost) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  const needsHttps = request.headers.get('x-forwarded-proto') === 'http'
  const needsHostFix = isAlternateHost
  const isStaticAsset = STATIC_ASSET_PATH.test(url.pathname)
  const needsLowercase = !isStaticAsset && url.pathname !== url.pathname.toLowerCase()

  if (needsHttps || needsHostFix || needsLowercase) {
    url.protocol = 'https:'
    url.hostname = CANONICAL_HOST
    url.port = ''
    if (needsLowercase) {
      url.pathname = url.pathname.toLowerCase()
    }
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
