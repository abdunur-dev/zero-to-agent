import { unstable_cache } from 'next/cache'
import {
  lumaEvents,
  coverUrlForLink,
  formatListingDate,
  type LumaEvent,
} from '@/data/events'
import { lumaSlugFromLink } from '@/lib/luma'
import { readLumaEventsFromBlob } from '@/lib/luma-blob'
import { fetchSheetLumaRows, normalizeSubmittedOn } from '@/lib/sheet-luma'

const FALLBACK_COVER =
  'https://images.lumacdn.com/event-covers/cy/ba4a3e7f-d013-4093-b74a-b89615d6feab.png'

function parseMDYTime(mdy: string): number {
  const [mo, d, y] = mdy.split('/').map((x) => parseInt(x, 10))
  if (!mo || !d || !y) return 0
  return new Date(y, mo - 1, d).getTime()
}

function buildSyntheticEvent(
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

/**
 * Prefer JSON written by the cron job (Firecrawl + sheet + static seed).
 * If the blob is missing, merge curated `lumaEvents` with sheet-only rows (placeholders).
 *
 * **Cold path:** Keep the Vercel Blob populated (see `vercel.json` cron → `/api/cron/sync-luma-sheet`)
 * so this resolver usually hits `unstable_cache` + blob and avoids sheet I/O on page requests.
 * The `/events` page streams its shell first via `<Suspense>` while this runs on cache miss.
 */
export const getMergedLumaEvents = unstable_cache(
  async () => {
    const fromBlob = await readLumaEventsFromBlob()
    if (fromBlob && fromBlob.length > 0) {
      return fromBlob
    }

    const staticBySlug = new Map<string, LumaEvent>()
    for (const e of lumaEvents) {
      staticBySlug.set(lumaSlugFromLink(e.link), e)
    }

    let sheetRows: Awaited<ReturnType<typeof fetchSheetLumaRows>> = []
    try {
      sheetRows = await fetchSheetLumaRows()
    } catch {
      return [...lumaEvents]
    }

    const extras: LumaEvent[] = []
    for (const row of sheetRows) {
      const slug = lumaSlugFromLink(row.link)
      if (staticBySlug.has(slug)) continue
      extras.push(buildSyntheticEvent(row.link, row.submittedBy, row.submittedOnRaw))
    }

    extras.sort((a, b) => parseMDYTime(b.submittedOn) - parseMDYTime(a.submittedOn))

    return [...lumaEvents, ...extras]
  },
  ['merged-luma-events'],
  { revalidate: 86400, tags: ['luma-sheet'] },
)
