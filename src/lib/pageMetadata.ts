import type { Metadata } from 'next'
import { SOCIAL_IMAGE_SIZE } from '@/lib/siteConfig'

/**
 * Site audit — "Incorrect social-sharing URL": og:url was hardcoded to
 * https://jet2transport.com on every page via the root layout's shared
 * metadata. Next.js doesn't deep-merge the `openGraph` object between a
 * layout and its pages — a child that sets `openGraph.url` alone would
 * replace the whole object, silently dropping the inherited image/siteName.
 * This helper rebuilds the full block per page instead, so every page gets
 * its own correct, self-referencing og:url alongside its own title and
 * description, without repeating the shared siteName/locale in every file.
 *
 * The image explicitly points at the generated /opengraph-image route
 * (see src/lib/socialImage.tsx) rather than relying on Next.js's
 * opengraph-image.tsx file-convention auto-merge — that auto-merge only
 * applies to plain `export const metadata` objects, not to metadata
 * returned from `generateMetadata` (used by the dynamic city/airport
 * routes), so pages using either pattern would otherwise silently end up
 * with no social image at all.
 */

const SOCIAL_IMAGE = {
  url: '/opengraph-image',
  width: SOCIAL_IMAGE_SIZE.width,
  height: SOCIAL_IMAGE_SIZE.height,
  alt: 'Air2Transport',
}

export function buildPageMetadata({
  path,
  title,
  description,
}: {
  path: string
  title: string
  description: string
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: 'Air2Transport',
      images: [SOCIAL_IMAGE],
      locale: 'en_GB',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  }
}
