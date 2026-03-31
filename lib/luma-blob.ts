import { head, put } from '@vercel/blob'
import type { LumaEvent } from '@/data/events'

export const LUMA_EVENTS_BLOB_PATH = 'zero-to-agent/luma-events.json'

type StoredPayload = {
  version: 1
  updatedAt: string
  events: LumaEvent[]
}

export async function readLumaEventsFromBlob(): Promise<LumaEvent[] | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null
  try {
    const meta = await head(LUMA_EVENTS_BLOB_PATH)
    const res = await fetch(meta.url, { cache: 'no-store' })
    if (!res.ok) return null
    const data = (await res.json()) as StoredPayload
    if (!Array.isArray(data.events) || data.events.length === 0) return null
    return data.events
  } catch {
    return null
  }
}

export async function writeLumaEventsToBlob(events: LumaEvent[]): Promise<{ url: string } | null> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) return null
  const payload: StoredPayload = {
    version: 1,
    updatedAt: new Date().toISOString(),
    events,
  }
  const body = JSON.stringify(payload)
  const result = await put(LUMA_EVENTS_BLOB_PATH, body, {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
  })
  return { url: result.url }
}
