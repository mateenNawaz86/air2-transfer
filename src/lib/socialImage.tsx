import { ImageResponse } from 'next/og'
import { SOCIAL_IMAGE_SIZE } from '@/lib/siteConfig'

/**
 * Site audit — "Incorrect social-sharing URL": use a purpose-built
 * 1200x630 social image rather than the small logo. Generated server-side
 * via Next.js's built-in ImageResponse (no external asset or CDN upload
 * needed).
 *
 * Wired in two ways: the opengraph-image.tsx/twitter-image.tsx files below
 * use Next.js's file-convention auto-detection, which only works for
 * routes using a plain `export const metadata` object. Routes using
 * `generateMetadata` (the two dynamic [city]/[airport] routes) don't get
 * that auto-merge, so `buildPageMetadata` in pageMetadata.ts explicitly
 * references the generated image route instead, so both patterns behave
 * identically.
 */

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #1a1a1a 0%, #ff6b1c 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            color: '#ffffff',
            letterSpacing: -2,
          }}
        >
          Air2Transport
        </div>
        <div
          style={{
            fontSize: 34,
            marginTop: 28,
            color: '#f8f9fa',
          }}
        >
          Airport Transfers &amp; Chauffeur Services Across the UK
        </div>
      </div>
    ),
    { ...SOCIAL_IMAGE_SIZE }
  )
}
