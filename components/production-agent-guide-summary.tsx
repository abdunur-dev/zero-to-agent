'use client'

import Link from 'next/link'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { SectionReveal } from './section-reveal'
import { SectionHeading } from './ui/section-heading'

export function ProductionAgentGuideSummary() {
  return (
    <section
      id="explainer"
      className="scroll-mt-nav relative border-t border-[var(--border)] py-16 md:py-24 px-4 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <SectionHeading
            label="Explainer"
            title="Ship agents with judgment"
            description="In-depth guidance from this community, plus essential framing from Vercel on leveraging AI while owning production risk."
          />
        </SectionReveal>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
          <SectionReveal>
            <div className="flex h-full flex-col rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] p-4 sm:p-6 md:p-8">
              <p className="mb-3 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.25em] uppercase text-[var(--text-dim)]">
                Community guide
              </p>
              <h3
                className="mb-3 text-[18px] font-semibold tracking-[-0.02em] text-[var(--text)] md:text-[20px]"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              >
                How to build a production-grade AI agent
              </h3>
              <p className="mb-6 flex-1 max-w-2xl text-[14px] leading-[1.65] text-[var(--text-secondary)]">
                Over 40% of agentic AI projects fail — not because of the models, but due to risk, architecture, and unclear value. Seven principles on threat models, tool contracts, auth, context, RAG, orchestration, and memory — written for the Vercel stack.
              </p>
              <Link
                href="/explainer"
                className="inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.12em] uppercase text-[var(--text)] transition-opacity hover:opacity-80"
              >
                Read the full guide
                <ArrowRight size={14} aria-hidden />
              </Link>
            </div>
          </SectionReveal>

          <SectionReveal>
            <a
              href="https://vercel.com/blog/agent-responsibly"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] p-4 transition-colors duration-300 hover:border-[var(--border-accent)] sm:p-6 md:p-8"
            >
              <p className="mb-3 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.25em] uppercase text-[var(--text-dim)]">
                Vercel
              </p>
              <h3
                className="mb-3 text-[18px] font-semibold tracking-[-0.02em] text-[var(--text)] transition-colors group-hover:text-[var(--accent)] md:text-[20px]"
                style={{ fontFamily: 'var(--font-geist-sans)' }}
              >
                Agent responsibly
              </h3>
              <p className="mb-6 flex-1 text-[14px] leading-[1.65] text-[var(--text-secondary)]">
                Leverage AI without relying on it blindly: why passing CI is not proof of safety, how to own production risk, and building guardrails — incremental rollouts, continuous validation, and executable defaults.
              </p>
              <span className="inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.12em] uppercase text-[var(--text)] transition-opacity group-hover:opacity-80">
                Read on Vercel
                <ExternalLink size={14} aria-hidden />
              </span>
            </a>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
