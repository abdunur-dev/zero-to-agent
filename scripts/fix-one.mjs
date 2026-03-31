function extractCoverFromOg(ogUrl) {
  const normalized = ogUrl.replace(/&amp;/g, '&')
  const m = normalized.match(/[&?]img=([^&]+)/)
  if (!m) return null
  try {
    return decodeURIComponent(m[1])
  } catch {
    return null
  }
}
const r = await fetch('https://luma.com/qaykrove')
const html = await r.text()
const og = html.match(/property="og:image"\s+content="([^"]+)"/)?.[1]
console.log('og slice', og?.slice(0, 200))
console.log('cover', extractCoverFromOg(og))
