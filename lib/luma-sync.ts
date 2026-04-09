import {
  lumaEvents,
  coverUrlForLink,
  formatListingDate,
  type LumaEvent,
} from '@/data/events'
import { isLumacdnCover, scrapeLumaEventPage } from '@/lib/firecrawl-luma'
import { lumaSlugFromLink } from '@/lib/luma'
import { readLumaEventsFromBlob, writeLumaEventsToBlob } from '@/lib/luma-blob'
import { regionFromCountry } from '@/lib/luma-region'
import {
  fetchSheetLumaRowsWithStats,
  normalizeSubmittedOn,
  type SheetIngestStats,
  type SheetLumaRow,
} from '@/lib/sheet-luma'

const FALLBACK_COVER =
  'https://images.lumacdn.com/event-covers/cy/ba4a3e7f-d013-4093-b74a-b89615d6feab.png'

function parseMDYTime(mdy: string): number {
  const [mo, d, y] = mdy.split('/').map((x) => parseInt(x, 10))
  if (!mo || !d || !y) return 0
  return new Date(y, mo - 1, d).getTime()
}

function buildSynthetic(
  link: string,
  submittedBy: string,
  submittedOnRaw: string,
): LumaEvent {
  const normalized = normalizeSubmittedOn(submittedOnRaw)
  const slug = lumaSlugFromLink(link)
  return {
    id: `sheet-${slug}`,
    title: 'Zero to Agent',
    city: 'Zero to Agent',
    country: 'Check Luma for details',
    region: 'americas',
    date: formatListingDate(normalized),
    coverImage: coverUrlForLink(link) ?? FALLBACK_COVER,
    link: `https://luma.com/${slug}`,
    submittedBy: submittedBy || 'Community',
    submittedOn: normalized,
  }
}

function mapBySlug(events: LumaEvent[]): Map<string, LumaEvent> {
  const m = new Map<string, LumaEvent>()
  for (const e of events) {
    m.set(lumaSlugFromLink(e.link), e)
  }
  return m
}

function titleCityFromExtracted(title: string | undefined, city: string | undefined) {
  const t = (title ?? 'Zero to Agent').trim() || 'Zero to Agent'
  const c = (city ?? 'TBD').trim() || 'TBD'
  return { title: t, city: c }
}

function isPlaceholderEvent(e: LumaEvent): boolean {
  return e.city === 'Zero to Agent' || e.country === 'Check Luma for details'
}

function safeEventDateLabel(raw: string | undefined, fallbackMDY: string): string {
  if (!raw?.trim()) return formatListingDate(fallbackMDY)
  const n = normalizeSubmittedOn(raw.trim())
  if (parseMDYTime(n) === 0) return formatListingDate(fallbackMDY)
  return formatListingDate(n)
}

/**
 * Full sync: sheet is authoritative for which Luma links appear.
 * Uses static `lumaEvents` when a slug matches (no Firecrawl).
 * Otherwise prefers existing blob scrape, then Firecrawl, then placeholders.
 */
export async function runLumaSheetSync(): Promise<{
  events: LumaEvent[]
  scraped: number
  fromStatic: number
  fromBlob: number
  fallback: number
  blobUrl: string | null
  sheetStats: SheetIngestStats
}> {
  const { rows: sheetRows, stats: sheetStats } = await fetchSheetLumaRowsWithStats()
  const staticBySlug = mapBySlug(lumaEvents)
  const blobPrev = await readLumaEventsFromBlob()
  const blobBySlug = blobPrev ? mapBySlug(blobPrev) : new Map<string, LumaEvent>()

  const bySlugLast = new Map<string, SheetLumaRow>(
    sheetRows.map((row) => [lumaSlugFromLink(row.link), row]),
  )

  const out: LumaEvent[] = []
  let scraped = 0
  let fromStatic = 0
  let fromBlob = 0
  let fallback = 0

  const slugs = Array.from(bySlugLast.keys())

  async function resolveOne(slug: string, row: SheetLumaRow): Promise<LumaEvent> {
    const link = row.link
    const normalized = normalizeSubmittedOn(row.submittedOnRaw)

    const st = staticBySlug.get(slug)
    if (st) {
      fromStatic++
      return { ...st, submittedOn: normalized }
    }

    const prev = blobBySlug.get(slug)
    if (prev && !isPlaceholderEvent(prev)) {
      fromBlob++
      return {
        ...prev,
        submittedOn: normalized,
      }
    }

    const extracted = await scrapeLumaEventPage(link)
    if (extracted?.city && extracted?.country) {
      scraped++
      const { title, city } = titleCityFromExtracted(extracted.eventTitle, extracted.city)
      const country = extracted.country.trim()
      const cover =
        isLumacdnCover(extracted.coverImageUrl) ? extracted.coverImageUrl
        : coverUrlForLink(link) ?? FALLBACK_COVER
      const submittedBy =
        extracted.hostName?.trim() || row.submittedBy.trim() || 'Community'
      return {
        id: `evt-${slug}`,
        title,
        city,
        country,
        region: regionFromCountry(country),
        date: safeEventDateLabel(extracted.eventDateMDY, normalized),
        coverImage: cover,
        link: `https://luma.com/${slug}`,
        submittedBy,
        submittedOn: normalized,
      }
    }

    fallback++
    return buildSynthetic(link, row.submittedBy, row.submittedOnRaw)
  }

  const concurrency = 4
  for (let i = 0; i < slugs.length; i += concurrency) {
    const batch = slugs.slice(i, i + concurrency)
    const resolved = await Promise.all(
      batch.map((slug) => resolveOne(slug, bySlugLast.get(slug)!)),
    )
    out.push(...resolved)
  }

  out.sort((a, b) => parseMDYTime(b.submittedOn) - parseMDYTime(a.submittedOn))

  let blobUrl: string | null = null
  if (out.length > 0 && process.env.BLOB_READ_WRITE_TOKEN) {
    try {
      const w = await writeLumaEventsToBlob(out)
      blobUrl = w?.url ?? null
    } catch (e) {
      console.warn('[sync-luma-sheet] Blob write failed; /events will keep serving stale blob until the next successful write.', e)
      blobUrl = null
    }
  } else if (out.length > 0 && !process.env.BLOB_READ_WRITE_TOKEN) {
    console.warn('[sync-luma-sheet] BLOB_READ_WRITE_TOKEN missing; sync computed events but did not persist. /events may use cold path or old data.')
  }

  return {
    events: out,
    scraped,
    fromStatic,
    fromBlob,
    fallback,
    blobUrl,
    sheetStats,
  }
}
