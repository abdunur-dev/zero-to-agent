import type { Metadata } from 'next'
import { Suspense } from 'react'
import { RouteLoadingSkeleton } from '@/components/route-loading'
import { EventsContent } from './events-content'

export const metadata: Metadata = {
  title: 'Events — Zero to Agent',
  description:
    'Global build week April 24–May 3, 2026. Find Zero to Agent meetups worldwide; RSVP on Luma. Submissions and prizes on the Vercel Community hub.',
}

export default function EventsPage() {
  return (
    <main className="flex-1 pt-nav">
      <Suspense fallback={<RouteLoadingSkeleton variant="events" />}>
        <EventsContent />
      </Suspense>
    </main>
  )
}
