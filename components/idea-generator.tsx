'use client'

import { useState, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, AlertCircle } from 'lucide-react'
import { BrailleSpinner } from './braille-spinner'
import { useCompletion } from '@ai-sdk/react'
import { SectionReveal } from './section-reveal'
import { SectionHeading } from './ui/section-heading'

const DAILY_LIMIT = 5
const STORAGE_KEY = 'zta-idea-gen'

function getClientUsage(): { count: number; day: string } {
  if (typeof window === 'undefined') return { count: 0, day: '' }
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { count: 0, day: '' }
    const parsed = JSON.parse(raw)
    const today = new Date().toISOString().slice(0, 10)
    if (parsed.day !== today) return { count: 0, day: today }
    return parsed
  } catch {
    return { count: 0, day: '' }
  }
}

function setClientUsage(count: number) {
  const today = new Date().toISOString().slice(0, 10)
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ count, day: today }))
}

function GeneratedIdeaCard({ text, isStreaming }: { text: string; isStreaming: boolean }) {
  const lines = text.split('\n').filter((l) => l.trim())

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="relative bg-[var(--bg-surface)] border border-[var(--border-accent)] rounded-lg p-6 md:p-8"
    >
      <div
        className="absolute inset-0 rounded-lg pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      <div className="flex items-center gap-2 mb-5">
        <Sparkles size={13} className="text-[var(--accent)]" />
        <span className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.25em] uppercase text-[var(--accent)]">
          AI-Generated Idea
        </span>
        {isStreaming && (
          <span className="inline-block w-1.5 h-3.5 bg-[var(--accent)] rounded-lg cursor-blink ml-1" aria-hidden="true" />
        )}
      </div>

      <div className="space-y-3 relative">
        {lines.map((line, i) => {
          const boldMatch = line.match(/^\*\*(.+?)\*\*$/)
          if (boldMatch) {
            return (
              <h3 key={i} className="text-[20px] md:text-[24px] font-bold text-[var(--text)] tracking-[-0.03em] leading-[1.2]">
                {boldMatch[1]}
              </h3>
            )
          }

          const labelMatch = line.match(/^\*\*(.+?):\*\*\s*(.*)$/)
          if (labelMatch) {
            return (
              <div key={i} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                <span className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.2em] uppercase text-[var(--accent)] flex-shrink-0">
                  {labelMatch[1]}
                </span>
                <span className="text-[13px] leading-[1.6] text-[var(--text-secondary)] tracking-[-0.01em]">
                  {labelMatch[2]}
                </span>
              </div>
            )
          }

          return (
            <p key={i} className="text-[15px] leading-[1.65] text-[var(--text-secondary)] tracking-[-0.01em]">
              {line}
            </p>
          )
        })}
      </div>
    </motion.div>
  )
}

export function IdeaGenerator() {
  const [hasGenerated, setHasGenerated] = useState(false)
  const [usage, setUsage] = useState({ count: 0, day: '' })

  useEffect(() => {
    queueMicrotask(() => setUsage(getClientUsage()))
  }, [])

  const remaining = DAILY_LIMIT - usage.count
  const exhausted = remaining <= 0

  const { completion, complete, isLoading, error } = useCompletion({
    api: '/api/generate-idea',
    onFinish: () => {
      setHasGenerated(true)
      const newCount = usage.count + 1
      setClientUsage(newCount)
      setUsage({ count: newCount, day: new Date().toISOString().slice(0, 10) })
    },
  })

  const isStreaming = isLoading
  const isNotConfigured = error?.message?.includes('not configured')
  const isRateLimited = error?.message?.includes('Rate limit') || (error && String(error).includes('429'))
  const isPaymentRequired = error?.message?.includes('verification') || (error && String(error).includes('402'))

  const handleGenerate = useCallback(() => {
    if (exhausted) return
    setHasGenerated(false)
    complete('')
  }, [exhausted, complete])

  return (
    <section
      id="idea-generator"
      className="scroll-mt-nav relative border-t border-[var(--border)] px-4 sm:px-6 py-20 md:py-28"
      aria-labelledby="idea-generator-heading"
    >
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <SectionHeading
            label="AI idea generator"
            title="Need something to build?"
            description="Get a fresh agent idea grounded in the Vercel ecosystem — AI SDK, v0, Gateway, Next.js, data, and deploy paths you can actually ship in a day. Powered by AI; no static list."
            id="idea-generator-heading"
          />
        </SectionReveal>

        <div className="mt-10 md:mt-12 space-y-4">
          <SectionReveal>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 sm:p-6 border border-[var(--border)] rounded-lg bg-[var(--bg-surface)]">
              <div>
                <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] uppercase text-[var(--text-dim)] mb-1">
                  Still stuck?
                </p>
                <p className="text-[14px] text-[var(--text-secondary)] leading-[1.5]">
                  Ideas mix Next.js, AI SDK, v0, AI Gateway, Blob, KV, and more — tuned for a real Zero to Agent build.
                </p>
              </div>

              <div className="flex w-full min-w-0 flex-row flex-wrap items-center justify-end gap-3 sm:w-auto sm:flex-nowrap sm:flex-shrink-0 sm:justify-start">
                {!exhausted && (
                  <span className="mr-auto font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.15em] uppercase text-[var(--text-dim)] sm:mr-0">
                    {remaining}/{DAILY_LIMIT}
                  </span>
                )}
                <button
                  type="button"
                  onClick={handleGenerate}
                  disabled={isStreaming || exhausted}
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center gap-2 px-5 sm:min-h-0 sm:flex-initial sm:py-2.5 bg-[var(--text)] text-[var(--bg)] font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.12em] uppercase rounded-lg border border-[var(--border-strong)] shadow-sm hover:opacity-90 active:opacity-80 disabled:opacity-60 disabled:pointer-events-none transition-opacity whitespace-nowrap"
                >
                  {isStreaming ? (
                    <>
                      <BrailleSpinner name="braille" className="text-[13px]" />
                      Thinking...
                    </>
                  ) : exhausted ? (
                    'Limit reached'
                  ) : (
                    <>
                      <Sparkles size={13} />
                      {hasGenerated ? 'Generate Another' : 'Generate an Idea'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </SectionReveal>

          <AnimatePresence>
            {exhausted && !isStreaming && !completion && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3 p-4 border border-[var(--border)] rounded-lg text-[var(--text-secondary)]"
              >
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-[var(--text-dim)]" />
                <p className="text-[12px] leading-[1.6]">
                  You&apos;ve used all {DAILY_LIMIT} idea generations for today. Come back tomorrow for more.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isNotConfigured && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3 p-4 border border-[var(--border)] rounded-lg text-[var(--text-secondary)]"
              >
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-[var(--warning)]" />
                <div className="text-[12px] leading-[1.6]">
                  <span className="text-[var(--text)]">AI idea generation not configured.</span>{' '}
                  Set <code className="font-mono text-[var(--accent)] text-[11px]">AI_GATEWAY_API_KEY</code> in your environment, or run{' '}
                  <code className="font-mono text-[var(--accent)] text-[11px]">vercel env pull</code> to use OIDC auth.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isPaymentRequired && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3 p-4 border border-[var(--border)] rounded-lg text-[var(--text-secondary)]"
              >
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-[var(--warning)]" />
                <div className="text-[12px] leading-[1.6]">
                  <span className="text-[var(--text)]">AI service requires account verification.</span> Add a payment method to your Vercel account to enable this feature.
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {error && !isNotConfigured && !isRateLimited && !isPaymentRequired && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-3 p-4 border border-[rgba(238,0,0,0.2)] rounded-lg"
              >
                <AlertCircle size={14} className="flex-shrink-0 mt-0.5 text-[var(--error)]" />
                <p className="text-[12px] text-[var(--text-secondary)] leading-[1.6]">
                  Something went wrong. Try again in a moment.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {(isStreaming || completion) && !error && (
              <GeneratedIdeaCard text={completion} isStreaming={isStreaming} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
