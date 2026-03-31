import { EventExplorer } from '@/components/event-explorer'
import { getMergedLumaEvents } from '@/lib/merged-luma-events'

/** Async RSC: suspends inside `<Suspense>` on `/events` so the shell can stream first. */
export async function EventsContent() {
  const events = await getMergedLumaEvents()
  return <EventExplorer events={events} />
}
