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
 */

const CANONICAL_HOST = 'air2transport.com'

const ALTERNATE_HOSTS = new Set(['www.air2transport.com', 'jet2transport.com', 'www.jet2transport.com'])

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
  const needsLowercase = url.pathname !== url.pathname.toLowerCase()

  if (needsHttps || needsHostFix || needsLowercase) {
    url.protocol = 'https:'
    url.hostname = CANONICAL_HOST
    url.port = ''
    url.pathname = url.pathname.toLowerCase()
    return NextResponse.redirect(url, 308)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/).*)'],
}
