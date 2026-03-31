const r = await fetch('https://luma.com/puy3xxat', {
  headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0' },
})
const t = await r.text()
console.log('status', r.status, 'len', t.length)
console.log('has og:image', /og:image/.test(t))
const m1 = t.match(/property="og:image" content="([^"]+)"/)
const m2 = t.match(/content="([^"]+)"\s+property="og:image"/)
console.log('m1', m1?.[1]?.slice(0, 120))
console.log('m2', m2?.[1]?.slice(0, 120))
const direct = t.match(/images\.lumacdn\.com\/event-covers\/[^"'\\s]+/i)
console.log('direct', direct?.[0])
