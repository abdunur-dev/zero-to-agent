'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SectionReveal } from './section-reveal'
import { SectionHeading } from './ui/section-heading'
import { Badge } from './ui/badge'
import { resources, type Resource } from '@/data/resources'

const categoryFilters = [
  { id: 'all', label: 'All' },
  { id: 'getting-started', label: 'Getting Started' },
  { id: 'building', label: 'Building' },
  { id: 'deployment', label: 'Deployment' },
  { id: 'docs', label: 'Docs' },
  { id: 'community', label: 'Community' },
  { id: 'help', label: 'Help' },
]

const chipActive =
  'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-dim)]'
const chipIdle =
  'border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-strong)] hover:text-[var(--text)]'

function ResourceCard({ resource, index }: { resource: Resource; index: number }) {
  return (
    <motion.a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
      className="group flex flex-col bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--border-accent)] transition-colors duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          {resource.brandMark && (
            <span
              className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--text-dim)]"
              aria-hidden="true"
            >
              {resource.brandMark}
            </span>
          )}
          <Badge variant="default">{resource.categoryLabel}</Badge>
        </div>
        <ExternalLink
          size={13}
          className="flex-shrink-0 text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors mt-0.5"
        />
      </div>

      <h3
        className="text-[15px] font-semibold text-[var(--text)] tracking-[-0.02em] mb-2 group-hover:text-[var(--accent)] transition-colors leading-[1.3]"
        style={{ fontFamily: 'var(--font-geist-sans)' }}
      >
        {resource.title}
      </h3>

      <p className="text-[13px] leading-[1.65] text-[var(--text-secondary)] tracking-[-0.01em] flex-1">
        {resource.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {resource.tags.map((tag) => (
          <span
            key={tag}
            className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.08em] uppercase px-2 py-0.5 rounded-md border border-[var(--border)] text-[var(--text-dim)]"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.05em] text-[var(--text-dim)] mt-4 truncate">
        {resource.url.replace('https://', '')}
      </p>
    </motion.a>
  )
}

export function ResourceHub() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = useMemo(() => {
    if (activeCategory === 'all') return resources
    return resources.filter((r) => r.category === activeCategory)
  }, [activeCategory])

  return (
    <section
      id="resource-hub"
      className="scroll-mt-nav relative py-24 md:py-32 px-4 sm:px-6"
    >
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <SectionHeading
            label="Resource Hub"
            title="Everything you need to build."
            description="Curated links to the tools, docs, and communities that matter. No fluff, no rabbit holes — just what you need to ship."
          />
        </SectionReveal>

        <SectionReveal>
          <div
            className="mb-10 -mx-1 flex gap-2 overflow-x-auto overflow-y-visible pb-1 pl-1 pr-3 scrollbar-hide sm:mx-0 sm:flex-wrap sm:overflow-visible sm:pb-0 sm:pl-0 sm:pr-0"
            role="group"
            aria-label="Filter by category"
          >
            {categoryFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveCategory(filter.id)}
                className={`shrink-0 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.12em] uppercase px-3 py-1.5 rounded-lg border transition-colors duration-200 ${
                  activeCategory === filter.id ? chipActive : chipIdle
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </SectionReveal>

        <p className="text-[13px] text-[var(--text-secondary)] mb-6">
          Showing{' '}
          <span className="font-medium text-[var(--text)]">{filtered.length}</span> of {resources.length}{' '}
          resources
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((resource, i) => (
            <ResourceCard key={resource.url} resource={resource} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="py-12 text-center text-[14px] text-[var(--text-secondary)]">
            No resources in this category.
          </p>
        )}
      </div>
    </section>
  )
}
