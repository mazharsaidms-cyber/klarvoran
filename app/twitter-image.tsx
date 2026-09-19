import { createSocialImage, socialImageSize } from "@/lib/social-image";

export const alt = "KlarVoran – Coaching für berufliche Handlungsfähigkeit";
export const size = socialImageSize;
export const contentType = "image/png";

export default function TwitterImage() {
  return createSocialImage();
}
