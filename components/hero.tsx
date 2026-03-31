'use client'

import { useReducedMotion } from 'framer-motion'
import { GeistPixelSquare } from 'geist/font/pixel'
import { ArrowRight, Zap, Calendar, Lightbulb, ExternalLink } from 'lucide-react'
import Link from 'next/link'

const stats = [
  { value: '10+', label: 'Cities' },
  { value: '1000+', label: 'Builders' },
  { value: '0→1', label: 'Every Time' },
]

export function Hero() {
  const reduced = useReducedMotion()

  // CSS animation class — only applied when motion is OK
  const anim = reduced ? '' : 'hero-fade-up'
  const animSlow = reduced ? '' : 'hero-fade-in'

  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-[calc(7rem+env(safe-area-inset-top,0px))] pb-24 md:pt-[calc(9rem+env(safe-area-inset-top,0px))] overflow-hidden">
      <div className="hero-glow" aria-hidden="true" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <p
          className={`mb-10 text-center font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.28em] uppercase text-[var(--text-dim)] ${anim}`}
          style={{ animationDelay: '0ms' }}
        >
          02A / Global Build Week
        </p>

        {/* H1 — LCP element, minimal delay for best FCP/LCP score */}
        <h1
          className={`mb-8 flex flex-wrap items-end justify-center gap-x-4 gap-y-2 sm:gap-x-6 md:gap-x-8 text-center ${anim}`}
          style={{ animationDelay: '80ms' }}
        >
          <span className="text-[52px] sm:text-[68px] md:text-[88px] font-bold leading-[0.92] tracking-[-0.04em] text-[var(--text)]">
            Zero to
          </span>
          <span
            className={`${GeistPixelSquare.className} text-[46px] sm:text-[60px] md:text-[80px] font-medium leading-[0.88] tracking-[0.02em] text-white`}
          >
            Agent
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className={`text-[17px] md:text-[19px] text-[var(--text-secondary)] leading-[1.65] tracking-[-0.01em] mb-12 max-w-2xl mx-auto ${anim}`}
          style={{ animationDelay: '160ms' }}
        >
          A community companion for building, shipping, and exploring AI agent projects.
          Learn the tools, find events, discover what others are building, and start shipping.
        </p>

        <p
          className={`text-[14px] md:text-[15px] text-[var(--text-secondary)] leading-[1.6] mb-6 max-w-xl mx-auto ${anim}`}
          style={{ animationDelay: '200ms' }}
        >
          <span className="text-[var(--text-dim)]">Official program hub — </span>
          <a
            href="https://community.vercel.com/host/zero-to-agent-2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-[var(--accent)] font-medium hover:underline underline-offset-4"
          >
            submissions, prizes, and updates
            <ExternalLink size={14} className="opacity-80" aria-hidden />
          </a>
          <span className="text-[var(--text-dim)]"> on Vercel Community.</span>
        </p>

        {/* CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-3 mb-14 ${anim}`}
          style={{ animationDelay: '220ms' }}
        >
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--text)] text-[var(--bg)] font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.1em] uppercase rounded-lg border border-[var(--border-strong)] shadow-sm hover:opacity-90 active:opacity-80 transition-opacity duration-200 w-full sm:w-auto justify-center"
          >
            <Zap size={13} />
            Start Building
          </Link>

          <Link
            href="/events"
            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-[var(--text)] border border-[var(--border-strong)] font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.1em] uppercase rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200 w-full sm:w-auto justify-center"
          >
            <Calendar size={13} />
            Explore Events
          </Link>

          <Link
            href="/resources"
            className="inline-flex items-center gap-2 px-6 py-3 bg-transparent text-[var(--text-secondary)] border border-[var(--border)] font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.1em] uppercase rounded-lg hover:text-[var(--text)] hover:border-[var(--border-strong)] transition-colors duration-200 w-full sm:w-auto justify-center"
          >
            <Lightbulb size={13} />
            Resources & Tools
          </Link>
        </div>

        <p
          className={`font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] uppercase text-[var(--text-dim)] ${animSlow}`}
          style={{ animationDelay: '300ms' }}
        >
          BYOS: Bring Your Own Snacks. Build Your Own Software.
        </p>

        {/* Stats */}
        <div
          className={`mt-16 flex items-center justify-center gap-8 md:gap-16 flex-wrap ${anim}`}
          style={{ animationDelay: '340ms' }}
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-[28px] md:text-[36px] font-bold text-[var(--text)] leading-none tracking-[-0.04em] mb-1">
                {stat.value}
              </div>
              <div className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.25em] uppercase text-[var(--text-dim)]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator — purely decorative, longest delay */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${animSlow}`}
        style={{ animationDelay: '800ms' }}
      >
        <ArrowRight
          size={14}
          className="text-[var(--text-dim)] rotate-90"
          aria-hidden="true"
        />
      </div>
    </section>
  )
}
