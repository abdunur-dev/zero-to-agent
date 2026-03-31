'use client'

import dynamic from 'next/dynamic'

const ASCIIAnimation = dynamic(() => import('@/components/ascii-animation'), { ssr: false })

export function HomeAsciiTunnel() {
  return (
    <section
      className="relative w-full overflow-hidden border-t border-[var(--border)]"
      style={{ height: 'clamp(280px, 45vh, 520px)' }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            'linear-gradient(to bottom, var(--bg) 0%, transparent 12%, transparent 88%, var(--bg) 100%)',
        }}
      />
      <ASCIIAnimation
        frameFolder="animations/geo-triangle-tunnel"
        quality="high"
        frameCount={500}
        fps={30}
        lazy={true}
        ariaLabel="Geometric triangle tunnel animation"
        color="var(--text-dim)"
        textSize="text-[7px]"
      />
    </section>
  )
}
