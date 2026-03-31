'use client'

import { useEffect, useReducer, useRef } from 'react'
import spinners, { type BrailleSpinnerName } from 'unicode-animations/braille'

interface BrailleSpinnerProps {
  name?: BrailleSpinnerName
  children?: React.ReactNode
  className?: string
  charClassName?: string
}

export function BrailleSpinner({
  name = 'braille',
  children,
  className = '',
  charClassName = '',
}: BrailleSpinnerProps) {
  const s = spinners[name]
  const [frame, tick] = useReducer((f: number) => (f + 1) % s.frames.length, 0)
  const reducedMotion = useRef(false)

  useEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion.current) return

    const id = setInterval(tick, s.interval)
    return () => clearInterval(id)
  }, [name, s.interval])

  return (
    <span className={`inline-flex items-center gap-1.5 font-[family-name:var(--font-geist-mono)] ${className}`}>
      <span className={`tabular-nums ${charClassName}`} aria-hidden="true">
        {s.frames[frame]}
      </span>
      {children && <span>{children}</span>}
    </span>
  )
}
