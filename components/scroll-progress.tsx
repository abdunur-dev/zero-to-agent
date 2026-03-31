'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  // Spring smoothing — stiffness/damping tuned for snappy but not jittery feel
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--accent)] z-[99999] origin-left scroll-progress-bar"
      style={{
        scaleX,
        // GPU-composited transform — no layout/paint cost on scroll
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  )
}
