/** Public CSV export for the “Luma Links” tab (gid must match the sheet tab). */
export const SHEET_EXPORT_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1uQnpKIPRafO9ES0IK2puBvBFVOfOwDaPOuAKodBRYd0/export?format=csv&gid=1420661255'

export interface SheetLumaRow {
  link: string
  submittedBy: string
  submittedOnRaw: string
}

/** Explains why sheet row count ≠ unique events on the site (non-Luma rows, duplicate URLs). */
export type SheetIngestStats = {
  /** Body rows in the CSV (excluding header). */
  dataRowCount: number
  /** Rows where column A is not a `luma.com/...` event URL (e.g. placeholders). */
  skippedNonLuma: number
  /** Rows with a valid Luma URL before deduping. */
  validLumaRowCount: number
  /** Extra rows dropped because the same slug appeared again (last row wins). */
  duplicateSlugRowsMerged: number
  /** Unique slugs — matches how many sheet-driven events the sync will try to resolve. */
  uniqueSlugCount: number
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

/**
 * Reads the public sheet CSV: column A must be the Luma URL; C/D are optional metadata
 * (sort + placeholder when Firecrawl fails). Event title/city/country come from Firecrawl in sync.
 */
export async function fetchSheetLumaRowsWithStats(): Promise<{
  rows: SheetLumaRow[]
  stats: SheetIngestStats
}> {
  const res = await fetch(SHEET_EXPORT_CSV_URL, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible; ZeroToAgent/1.0)' },
  })
  if (!res.ok) {
    throw new Error(`Sheet CSV fetch failed: ${res.status}`)
  }
  const text = (await res.text()).replace(/^\uFEFF/, '')
  const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0)
  if (lines.length < 2) {
    return {
      rows: [],
      stats: {
        dataRowCount: 0,
        skippedNonLuma: 0,
        validLumaRowCount: 0,
        duplicateSlugRowsMerged: 0,
        uniqueSlugCount: 0,
      },
    }
  }

  const dataRowCount = lines.length - 1
  let skippedNonLuma = 0
  let duplicateSlugRowsMerged = 0
  const bySlugLast = new Map<string, SheetLumaRow>()

  for (let i = 1; i < lines.length; i++) {
    const cols = parseCsvLine(lines[i])
    const link = (cols[0] ?? '').trim()
    if (!isLumaEventLink(link)) {
      skippedNonLuma++
      continue
    }
    const submittedBy = (cols[2] ?? '').trim()
    const submittedOnRaw = (cols[3] ?? '').trim()
    const slug = link.replace(/^https:\/\/luma\.com\//i, '')
    if (bySlugLast.has(slug)) duplicateSlugRowsMerged++
    const row: SheetLumaRow = { link: `https://luma.com/${slug}`, submittedBy, submittedOnRaw }
    bySlugLast.set(slug, row)
  }

  const validLumaRowCount = bySlugLast.size + duplicateSlugRowsMerged
  const uniqueSlugCount = bySlugLast.size

  return {
    rows: Array.from(bySlugLast.values()),
    stats: {
      dataRowCount,
      skippedNonLuma,
      validLumaRowCount,
      duplicateSlugRowsMerged,
      uniqueSlugCount,
    },
  }
}

export async function fetchSheetLumaRows(): Promise<SheetLumaRow[]> {
  const { rows } = await fetchSheetLumaRowsWithStats()
  return rows
}
