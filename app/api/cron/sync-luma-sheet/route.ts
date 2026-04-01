import { revalidateTag } from 'next/cache'
import { NextResponse } from 'next/server'
import { runLumaSheetSync } from '@/lib/luma-sync'

/** Pro / Fluid: allow enough time for Firecrawl on many new slugs (incremental keeps this small). */
export const maxDuration = 300

/**
 * Vercel Cron (see vercel.json, daily 08:00 UTC): re-scrape new Luma links from the public sheet
 * via Firecrawl, merge with static seed data, and persist to Vercel Blob. Then invalidate the
 * events cache. Keeping Blob warm avoids the cold merge path on `/events` (sheet + placeholders).
 *
 * Env: `CRON_SECRET`, `FIRECRAWL_API_KEY`, `BLOB_READ_WRITE_TOKEN` (last two required for full automation).
 */
export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const result = await runLumaSheetSync()
    revalidateTag('luma-sheet', 'max')
    return NextResponse.json({
      ok: true,
      revalidated: 'luma-sheet',
      wroteBlob: Boolean(result.blobUrl),
      blobUrl: result.blobUrl,
      sheet: result.sheetStats,
      counts: {
        total: result.events.length,
        scraped: result.scraped,
        fromStatic: result.fromStatic,
        fromBlob: result.fromBlob,
        fallback: result.fallback,
      },
    })
  } catch (e) {
    console.error('[sync-luma-sheet]', e)
    return NextResponse.json(
      { ok: false, error: 'Sync failed', detail: String(e) },
      { status: 500 },
    )
  }
}
