import { z } from 'zod'

const extractedSchema = z.object({
  eventTitle: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  /** Organizer / host as shown on Luma */
  hostName: z.string().optional(),
  /** Prefer images.lumacdn.com cover art URL when visible */
  coverImageUrl: z.string().optional(),
  /** Event date as M/D/YYYY if you can infer it from the page */
  eventDateMDY: z.string().optional(),
})

export type ExtractedLuma = z.infer<typeof extractedSchema>

const EXTRACTION_SCHEMA = {
  type: 'object',
  properties: {
    eventTitle: { type: 'string', description: 'Full event title on Luma' },
    city: { type: 'string', description: 'City where the event takes place' },
    country: { type: 'string', description: 'Country (common English name)' },
    hostName: { type: 'string', description: 'Host or organizer name shown on Luma' },
    coverImageUrl: {
      type: 'string',
      description:
        'Main event cover image URL — prefer https://images.lumacdn.com/... if present on the page',
    },
    eventDateMDY: {
      type: 'string',
      description: 'Event date as M/D/YYYY when visible (not submission date)',
    },
  },
  required: ['eventTitle', 'city', 'country'],
}

const EXTRACTION_PROMPT = `This is a Luma event registration page for "Zero to Agent" or a related community event.
Extract the real-world city and country where the event happens (from venue or location text).
Extract the host/organizer name if shown (not the platform).
For coverImageUrl, use the hero/cover image URL — it must be on images.lumacdn.com when that image exists.
If the title starts with "Zero to Agent:", keep that format in eventTitle.`

type FirecrawlScrapeResponse = {
  success?: boolean
  data?: {
    json?: unknown
    metadata?: { title?: string; ogImage?: string }
  }
}

export async function scrapeLumaEventPage(lumaUrl: string): Promise<ExtractedLuma | null> {
  const key = process.env.FIRECRAWL_API_KEY
  if (!key) return null

  const res = await fetch('https://api.firecrawl.dev/v2/scrape', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url: lumaUrl,
      formats: [
        {
          type: 'json',
          schema: EXTRACTION_SCHEMA,
          prompt: EXTRACTION_PROMPT,
        },
      ],
      onlyMainContent: true,
      waitFor: 2000,
      timeout: 30000,
    }),
  })

  const body = (await res.json()) as FirecrawlScrapeResponse
  if (!res.ok || body.success === false) {
    return null
  }

  const raw = body.data?.json
  const parsed = extractedSchema.safeParse(raw)
  if (!parsed.success) return null
  return parsed.data
}

export function isLumacdnCover(url: string | undefined): url is string {
  if (!url || typeof url !== 'string') return false
  try {
    const u = new URL(url.trim())
    return u.hostname === 'images.lumacdn.com' && u.protocol === 'https:'
  } catch {
    return false
  }
}
