import { createSocialImage } from '@/lib/socialImage'
import { SOCIAL_IMAGE_SIZE } from '@/lib/siteConfig'

export const size = SOCIAL_IMAGE_SIZE
export const contentType = 'image/png'

export default function OpengraphImage() {
  return createSocialImage()
}
