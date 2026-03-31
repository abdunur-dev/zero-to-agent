/** Slug segment after `luma.com/` (e.g. `puy3xxat`). */
export function lumaSlugFromLink(link: string): string {
  return link.replace(/^https:\/\/luma\.com\//, '')
}
