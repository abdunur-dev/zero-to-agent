'use client'

import { SectionReveal } from './section-reveal'
import { SectionHeading } from './ui/section-heading'

const pillars = [
  {
    title: 'Ship something real.',
    description: 'A working agent — not a pitch deck, not a demo that crashes. Something that solves a specific problem for real people. Functional beats polished.',
  },
  {
    title: 'Built for all levels.',
    description: "Deploying your first app or your fiftieth agent — Zero to Agent meets you where you are. Beginners leave with something shipped. Experts go deeper.",
  },
  {
    title: 'Community-powered.',
    description: "Events run in cities around the world, organized by Vercel in partnership with Google DeepMind. This site is community-built to support every builder who shows up.",
  },
  {
    title: 'Useful beats hyped.',
    description: "Judges, mentors, and the community all reward agents people actually want to use. The best submissions aren't the flashiest — they're the ones that stick.",
  },
]

export function WhatIs() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <SectionHeading
            label="What is this"
            title="Zero to Agent."
            description="A hackathon series organized by Vercel and Google DeepMind challenging developers to go from idea to working AI agent as fast as possible. Come with an idea. Leave with an agent."
          />
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px border border-[var(--border)] rounded-lg overflow-hidden mt-12">
          {pillars.map((pillar, i) => (
            <SectionReveal key={i}>
              <div className="bg-[var(--bg-surface)] p-8 md:p-10 h-full border-[var(--border)]">
                <h3
                  className="text-[18px] font-semibold text-[var(--text)] tracking-[-0.02em] mb-3 leading-[1.3]"
                  style={{ fontFamily: 'var(--font-geist-sans)' }}
                >
                  {pillar.title}
                </h3>
                <p className="text-[14px] leading-[1.7] text-[var(--text-secondary)] tracking-[-0.01em]">
                  {pillar.description}
                </p>
              </div>
            </SectionReveal>
          ))}
        </div>

        {/* Pull quote */}
        <SectionReveal>
          <div className="mt-12 md:mt-16 border-l-2 border-[var(--accent)] pl-6 py-2">
            <p className="text-[20px] md:text-[24px] font-medium text-[var(--text)] tracking-[-0.02em] leading-[1.4]"
               style={{ fontFamily: 'var(--font-geist-sans)' }}>
              &quot;Come with an idea. Leave with an agent.&quot;
            </p>
            <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] uppercase text-[var(--text-dim)] mt-3">
              — Zero to Agent, Vercel × Google DeepMind
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
