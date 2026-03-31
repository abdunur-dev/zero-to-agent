/**
 * Fetch og:image from each Luma URL and extract event cover img= param.
 * Run: node scripts/fetch-luma-covers.mjs
 */
const links = [
  'https://luma.com/puy3xxat',
  'https://luma.com/2697ybtr',
  'https://luma.com/yn7nc6id',
  'https://luma.com/omegg4hy',
  'https://luma.com/8jdsobyd',
  'https://luma.com/bho2efmh',
  'https://luma.com/rej4yp45',
  'https://luma.com/ekhgf8nk',
  'https://luma.com/88xqghy6',
  'https://luma.com/qaykrove',
  'https://luma.com/w92suark',
  'https://luma.com/v0goypxi',
  'https://luma.com/putzx3go',
  'https://luma.com/ibeybn15',
  'https://luma.com/17jrf20j',
  'https://luma.com/yjvfhm8f',
  'https://luma.com/tcysg606',
  'https://luma.com/630m04qs',
  'https://luma.com/2vzv52ct',
  'https://luma.com/dbltbg80',
  'https://luma.com/hveetdob',
  'https://luma.com/aic-be-4-26',
  'https://luma.com/3j9pgscq',
  'https://luma.com/iuwxbu9b',
  'https://luma.com/glwp8fbf',
  'https://luma.com/uw11nabw',
  'https://luma.com/02ASP',
  'https://luma.com/rk2b2ngo',
  'https://luma.com/3irhr14i',
  'https://luma.com/5bxrkuow',
  'https://luma.com/kk8k7wq2',
  'https://luma.com/ohmlf35n',
  'https://luma.com/qm8deqll',
  'https://luma.com/mvx00ds1',
  'https://luma.com/g20gr7yx',
  'https://luma.com/rilr1vke',
  'https://luma.com/nv25p0vh',
  'https://luma.com/hwfvt791',
  'https://luma.com/ixytz2l9',
  'https://luma.com/pdp3zpdz',
  'https://luma.com/ulw67cso',
  'https://luma.com/4l27o5ha',
  'https://luma.com/p7pnjcu8',
  'https://luma.com/02AFLORIPA',
  'https://luma.com/ud9h4pcx',
  'https://luma.com/gucvog65',
]

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

async function main() {
  const map = {}
  for (const link of links) {
    try {
      const res = await fetch(link, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          Accept: 'text/html',
        },
      })
      const html = await res.text()
      let og =
        html.match(/property="og:image"\s+content="([^"]+)"/)?.[1] ??
        html.match(/content="([^"]+)"\s+property="og:image"/)?.[1] ??
        html.match(/name="twitter:image"\s+content="([^"]+)"/)?.[1] ??
        null
      let cover = og ? extractCoverFromOg(og) : null
      if (!cover) {
        const direct = html.match(
          /https:\/\/images\.lumacdn\.com\/event-covers\/[a-z0-9]+\/[a-f0-9-]+\.(?:png|jpg|jpeg|webp)/i
        )
        cover = direct ? direct[0] : null
      }
      const slug = link.replace('https://luma.com/', '')
      map[slug] = cover
      await new Promise((r) => setTimeout(r, 350))
    } catch (e) {
      map[link.replace('https://luma.com/', '')] = null
    }
  }
  console.log(JSON.stringify(map, null, 2))
}

main()
