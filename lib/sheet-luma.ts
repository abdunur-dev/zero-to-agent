/** Public CSV export for the “Luma Links” tab (gid must match the sheet tab). */
export const SHEET_EXPORT_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1uQnpKIPRafO9ES0IK2puBvBFVOfOwDaPOuAKodBRYd0/export?format=csv&gid=1420661255'

export interface SheetLumaRow {
  link: string
  submittedBy: string
  submittedOnRaw: string
}

/** Normalize common form variants to M/D/YYYY for `formatListingDate`. */
export function normalizeSubmittedOn(raw: string): string {
  const t = raw.trim()
  if (!t) return '1/1/2026'
  const slash = t.split('/')
  if (slash.length === 3) {
    const a = parseInt(slash[0], 10)
    const b = parseInt(slash[1], 10)
    const y = parseInt(slash[2], 10)
    if (a > 12) return `${b}/${a}/${y}`
    return `${a}/${b}/${y}`
  }
  const dot = t.split('.')
  if (dot.length === 3) {
    return `${dot[1]}/${dot[0]}/${dot[2]}`
  }
  return t
}

function parseCsvLine(line: string): string[] {
  const result: string[] = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') {
      inQuotes = !inQuotes
    } else if (c === ',' && !inQuotes) {
      result.push(cur.trim())
      cur = ''
    } else {
      cur += c
    }
  }
  result.push(cur.trim())
  return result
}

function isLumaEventLink(url: string): boolean {
  try {
    const u = new URL(url.trim())
    return u.hostname === 'luma.com' && u.pathname.replace(/^\//, '').length > 0
  } catch {
    return false
  }
}

export async function fetchSheetLumaRows(): Promise<SheetLumaRow[]> {
  const res = await fetch(SHEET_EXPORT_CSV_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ZeroToAgent/1.0)' },
  })
  if (!res.ok) {
    throw new Error(`Sheet CSV fetch failed: ${res.status}`)
  }
  const text = (await res.text()).replace(/^\uFEFF/, '')
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
  if (lines.length < 2) return []

  const bySlugLast = new Map<string, SheetLumaRow>()

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i])
    const link = (cols[0] ?? '').trim()
    if (!isLumaEventLink(link)) continue
    const submittedBy = (cols[2] ?? '').trim()
    const submittedOnRaw = (cols[3] ?? '').trim()
    const slug = link.replace(/^https:\/\/luma\.com\//i, '')
    const row: SheetLumaRow = { link: `https://luma.com/${slug}`, submittedBy, submittedOnRaw }
    bySlugLast.set(slug, row)
  }

  return Array.from(bySlugLast.values())
}
