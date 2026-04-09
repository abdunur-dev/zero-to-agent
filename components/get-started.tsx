'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { SectionReveal } from './section-reveal'
import { SectionHeading } from './ui/section-heading'

const steps = [
  {
    number: '01',
    title: 'Create your accounts',
    description: 'Sign up for Vercel and v0 — both free. You get a production-grade deployment platform and an AI code generation tool. This is your stack.',
    action: 'vercel.com / v0.dev',
    actionHref: 'https://vercel.com',
    external: true,
  },
  {
    number: '02',
    title: 'Explore the docs',
    description: 'Skim the AI SDK docs and the Vercel agent stack overview. You don\'t need to read everything — just enough to know what\'s possible.',
    action: 'sdk.vercel.ai',
    actionHref: 'https://sdk.vercel.ai',
    external: true,
  },
  {
    number: '03',
    title: 'Pick one real problem',
    description: 'Not a demo. Not a showcase. A tool that solves something specific for real people. The narrower the scope, the faster you ship.',
    action: 'Browse resources',
    actionHref: '/resources',
    external: false,
  },
  {
    number: '04',
    title: 'Scaffold with v0',
    description: 'Describe what you want in plain language. v0 generates your UI and starter code. Iterate fast — this is where ideas become interfaces.',
    action: 'v0.dev',
    actionHref: 'https://v0.dev',
    external: true,
  },
  {
    number: '05',
    title: 'Wire up agent logic',
    description: 'Connect your model. Define your tools. Add streaming, memory, or multi-step reasoning using the Vercel AI SDK primitives.',
    action: 'sdk.vercel.ai/docs',
    actionHref: 'https://sdk.vercel.ai/docs',
    external: true,
  },
  {
    number: '06',
    title: 'Deploy to production',
    description: 'Push to Vercel. You get a live URL in under a minute — no infra to configure, no DevOps required. Share it with anyone.',
    action: 'vercel.com/docs',
    actionHref: 'https://vercel.com/docs',
    external: true,
  },
  {
    number: '07',
    title: 'Show your work',
    description: 'Demo at the event. Post what you built. The best agents spread because they\'re actually useful — not because they\'re hyped.',
    action: 'Find an event',
    actionHref: '/events',
    external: false,
  },
]

function StepAction({ step }: { step: typeof steps[0] }) {
  const className =
    'font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.12em] uppercase text-[var(--accent)] hover:opacity-60 transition-opacity mt-4 inline-block'

  if (step.external) {
    return (
      <a href={step.actionHref} target="_blank" rel="noopener noreferrer" className={className}>
        {step.action} ↗
      </a>
    )
  }
  return (
    <Link href={step.actionHref} className={className}>
      {step.action} →
    </Link>
  )
}

export function GetStarted() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 border-t border-[var(--border)]">
      <div className="max-w-5xl mx-auto">
        <SectionReveal>
          <SectionHeading
            label="How to get started"
            title="Seven steps to your first agent."
            description="You don't need to be an expert. You need to start. Here's the path from zero to shipped."
          />
        </SectionReveal>

        <div className="relative mt-16 md:mt-20">
          {/* Center spine — desktop only */}
          <div
            className="hidden md:block absolute left-1/2 -translate-x-px top-0 bottom-0 w-px bg-[var(--border)]"
            aria-hidden="true"
          />

          <div className="space-y-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-8% 0px' }}
                  transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                  className="relative flex items-start md:items-center py-10 md:py-14 border-b border-[var(--border)]"
                >
                  {/* Mobile layout: number badge + content side by side */}
                  <div className="flex gap-5 md:hidden w-full">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-9 h-9 rounded-md border border-[var(--border-accent)] bg-[var(--accent-dim)] flex items-center justify-center">
                        <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.1em] text-[var(--accent)]">
                          {step.number}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-semibold text-[var(--text)] tracking-[-0.02em] leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-[13px] leading-[1.7] text-[var(--text-secondary)] tracking-[-0.01em] mt-2">
                        {step.description}
                      </p>
                      <StepAction step={step} />
                    </div>
                  </div>

                  {/* Desktop zigzag layout */}
                  <div className="hidden md:grid md:grid-cols-[1fr_64px_1fr] w-full items-center">
                    {/* Left slot */}
                    <div className={isLeft ? 'pr-10 text-right' : ''}>
                      {isLeft && (
                        <>
                          <h3 className="text-[17px] font-semibold text-[var(--text)] tracking-[-0.025em] leading-snug">
                            {step.title}
                          </h3>
                          <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)] tracking-[-0.01em] mt-3 max-w-xs ml-auto">
                            {step.description}
                          </p>
                          <div className="flex justify-end">
                            <StepAction step={step} />
                          </div>
                        </>
                      )}
                    </div>

                    {/* Center badge */}
                    <div className="flex items-center justify-center">
                      <div className="w-10 h-10 rounded-lg border border-[var(--border-accent)] bg-[var(--accent-dim)] flex items-center justify-center z-10 relative">
                        <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.1em] text-[var(--accent)]">
                          {step.number}
                        </span>
                      </div>
                    </div>

                    {/* Right slot */}
                    <div className={!isLeft ? 'pl-10' : ''}>
                      {!isLeft && (
                        <>
                          <h3 className="text-[17px] font-semibold text-[var(--text)] tracking-[-0.025em] leading-snug">
                            {step.title}
                          </h3>
                          <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)] tracking-[-0.01em] mt-3 max-w-xs">
                            {step.description}
                          </p>
                          <StepAction step={step} />
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
