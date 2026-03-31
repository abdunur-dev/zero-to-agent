interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'success' | 'warning' | 'error' | 'purple'
}

const variants = {
  default: 'text-[var(--text-dim)] bg-[var(--bg-surface)] border-[var(--border)]',
  accent: 'text-[var(--accent)] bg-[var(--accent-dim)] border-[var(--border-accent)]',
  success: 'text-[#50C878] bg-[rgba(80,200,120,0.06)] border-[rgba(80,200,120,0.2)]',
  warning: 'text-[#F5A623] bg-[rgba(245,166,35,0.06)] border-[rgba(245,166,35,0.2)]',
  error: 'text-[#EE0000] bg-[rgba(238,0,0,0.06)] border-[rgba(238,0,0,0.2)]',
  purple: 'text-[var(--text-secondary)] bg-[var(--bg-surface)] border-[var(--border-strong)]',
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] uppercase border rounded-lg ${variants[variant]}`}>
      {children}
    </span>
  )
}
