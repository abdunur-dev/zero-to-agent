'use client'

import { memo, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion } from 'framer-motion'
import { ExternalLink, Calendar, User } from 'lucide-react'
import { lumaSlugFromLink } from '@/lib/luma'
import { REGION_LABELS, type LumaEvent } from '@/data/events'

export interface LumaEventCardProps {
  event: LumaEvent
  className?: string
  /** First grid row(s): avoid lazy-loading the LCP cover (see Next.js Image LCP guidance). */
  coverPriority?: boolean
}

function LumaEventCardComponent({ event, className = '', coverPriority = false }: LumaEventCardProps) {
  const reduced = useReducedMotion()
  const [imgLoaded, setImgLoaded] = useState(false)

  const itemVariants = useMemo(
    () => ({
      hidden: {
        opacity: reduced ? 1 : 0,
        y: reduced ? 0 : 18,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: reduced ? 0 : 0.42,
          ease: [0.16, 1, 0.3, 1] as const,
        },
      },
    }),
    [reduced],
  )

  const slug = lumaSlugFromLink(event.link)
  const coverAlt = `${event.title} — ${event.city}, ${event.country}`
  const linkLabel = `Open ${event.title} on Luma (new tab)`

  return (
    <motion.a
      href={event.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={linkLabel}
      variants={itemVariants}
      className={`group flex flex-col overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] shadow-sm transition-all duration-300 hover:border-[var(--border-accent)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:hover:shadow-[0_8px_40px_rgba(255,255,255,0.04)] ${className}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[var(--bg)]">
        {/* Skeleton shimmer shown until image decodes */}
        {!imgLoaded && (
          <div className="skeleton absolute inset-0" aria-hidden="true" />
        )}
        <Image
          src={event.coverImage}
          alt={coverAlt}
          fill
          {...(coverPriority ? { priority: true } : { loading: 'lazy' as const })}
          decoding="async"
          onLoad={() => setImgLoaded(true)}
          className={`object-cover transition-[transform,opacity] duration-500 group-hover:scale-[1.02] ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          // Matches the actual grid: 1col → 2col (sm) → 3col (lg) → 4col (xl)
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1279px) 33vw, 25vw"
          unoptimized={event.coverImage.includes('gallery-images')}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80"
          aria-hidden
        />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
          <p className="font-[family-name:var(--font-geist-mono)] text-[9px] uppercase tracking-[0.2em] text-white/90">
            {REGION_LABELS[event.region]}
          </p>
          <ExternalLink
            size={14}
            className="flex-shrink-0 text-white/80 transition-colors group-hover:text-white"
            aria-hidden
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 p-4">
        <div>
          <h3 className="text-[15px] font-semibold leading-snug tracking-[-0.02em] text-[var(--text)] transition-colors group-hover:text-[var(--accent)]">
            {event.city}
          </h3>
          <p className="mt-0.5 text-[12px] text-[var(--text-secondary)]">{event.country}</p>
        </div>

        <div className="flex flex-col gap-1.5 border-t border-[var(--border)] pt-3">
          <div className="flex items-center gap-2 text-[12px] text-[var(--text-secondary)]">
            <User size={12} className="flex-shrink-0 text-[var(--text-dim)]" aria-hidden />
            <span className="truncate">{event.submittedBy}</span>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-[var(--text-secondary)]">
            <Calendar size={12} className="flex-shrink-0 text-[var(--text-dim)]" aria-hidden />
            <span>{event.date}</span>
          </div>
        </div>

        <p className="truncate font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.04em] text-[var(--text-dim)]">
          luma.com/{slug}
        </p>
      </div>
    </motion.a>
  )
}

LumaEventCardComponent.displayName = 'LumaEventCard'

export const LumaEventCard = memo(LumaEventCardComponent)
