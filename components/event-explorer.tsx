'use client'

import { useMemo, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ExternalLink, MapPin, Search } from 'lucide-react'
import { SectionReveal } from './section-reveal'
import { SectionHeading } from './ui/section-heading'
import { LumaEventCard } from './luma-event-card'
import { REGION_LABELS, type EventRegion, type LumaEvent } from '@/data/events'

const ALL_REGIONS: EventRegion[] = [
  'americas',
  'europe',
  'africa',
  'asia',
  'oceania',
  'middleEast',
]

interface EventExplorerProps {
  events: LumaEvent[]
}

// Max total stagger time ~300 ms regardless of list size
const MAX_STAGGER_ITEMS = 12

export function EventExplorer({ events }: EventExplorerProps) {
  const reduced = useReducedMotion()
  const [region, setRegion] = useState<EventRegion | 'all'>('all')
  const [query, setQuery] = useState('')

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: events.length }
    for (const e of events) {
      c[e.region] = (c[e.region] ?? 0) + 1
    }
    return c
  }, [events])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return events.filter((e) => {
      if (region !== 'all' && e.region !== region) return false
      if (!q) return true
      return (
        e.city.toLowerCase().includes(q) ||
        e.country.toLowerCase().includes(q) ||
        e.title.toLowerCase().includes(q) ||
        e.submittedBy.toLowerCase().includes(q)
      )
    })
  }, [events, region, query])

  return (
    <section className="relative px-4 sm:px-6 py-20 md:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <SectionHeading
            label="Event Explorer"
            title="Find an event near you."
            description="Global build week runs April 24–May 3, 2026. Local meetups are listed below — open a card for the host’s Luma page (time, venue, RSVP). This site is a community companion; submissions, prizes, and competition rules live on the official hub."
          />
        </SectionReveal>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-[13px] text-[var(--text-secondary)]">
            Showing{' '}
            <span className="font-medium text-[var(--text)]">{filtered.length}</span> of{' '}
            {events.length} events
          </p>
          <div className="relative max-w-md flex-1 sm:min-w-[240px]">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[var(--text-dim)]"
              aria-hidden
            />
            <input
              type="search"
              placeholder="Search city, country, host…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] py-2.5 pl-9 pr-3 text-[13px] text-[var(--text)] placeholder:text-[var(--text-dim)] outline-none transition-colors focus:border-[var(--border-accent)]"
            />
          </div>
        </div>

        <div className="mb-6 -mx-1 flex gap-2 overflow-x-auto overflow-y-visible pb-1 pl-1 pr-3 scrollbar-hide sm:mx-0 sm:flex-wrap sm:overflow-visible sm:pb-0 sm:pl-0 sm:pr-0">
          <button
            type="button"
            onClick={() => setRegion('all')}
            className={`shrink-0 rounded-full border px-3 py-1.5 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.12em] transition-colors ${
              region === 'all'
                ? 'border-[var(--accent)] bg-[var(--accent-dim)] text-[var(--accent)]'
                : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
            }`}
          >
            All ({counts.all ?? 0})
          </button>
          {ALL_REGIONS.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRegion(r)}
              className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.12em] transition-colors ${
                region === r
                  ? 'border-[var(--accent)] bg-[var(--accent-dim)] text-[var(--accent)]'
                  : 'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'
              }`}
            >
              <MapPin className="h-3 w-3 opacity-70" aria-hidden />
              {REGION_LABELS[r]} ({counts[r] ?? 0})
            </button>
          ))}
        </div>

        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${region}-${query}`}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: reduced ? 1 : 0 },
              visible: {
                opacity: 1,
                transition: {
                  // Cap stagger so 100 cards don't animate for 3.5 seconds
                  staggerChildren: reduced ? 0 : Math.min(0.035, 300 / (filtered.length || 1) / 1000),
                  delayChildren: reduced ? 0 : 0.04,
                },
              },
              exit: { opacity: 0, transition: { duration: 0.15 } },
            }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {filtered.map((event, i) => (
              // Cards beyond the cap animate instantly — no stagger overhead
              <LumaEventCard
                key={event.id}
                event={event}
                className={i >= MAX_STAGGER_ITEMS && !reduced ? '[--motion-duration:0s]' : ''}
                coverPriority={i < 4}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-[14px] text-[var(--text-secondary)]">
            No events match your filters. Try another region or search term.
          </p>
        )}

        <SectionReveal>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border)] pt-8">
            <p className="max-w-xl text-[13px] text-[var(--text-dim)]">
              Events organized by Vercel × Google DeepMind. RSVP on each host’s Luma listing. Submit
              your build and enter the global competition on the hub — final deadline May 3, 2026
              (see hub for details).
            </p>
            <a
              href="https://community.vercel.com/host/zero-to-agent-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.12em] text-[var(--accent)] hover:underline"
            >
              Official Hub
              <ExternalLink size={11} />
            </a>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
