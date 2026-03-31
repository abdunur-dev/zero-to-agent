'use client'

import { motion } from 'framer-motion'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  delay?: number
}

export function Card({ children, className = '', hover = true, delay = 0 }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      className={`bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-6 ${
        hover ? 'hover:border-[var(--border-accent)] transition-colors duration-300' : ''
      } ${className}`}
    >
      {children}
    </motion.div>
  )
}
