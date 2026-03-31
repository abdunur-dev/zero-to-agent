import Link from 'next/link'

interface ButtonProps {
  children: React.ReactNode
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  external?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
}

const variants = {
  primary:
    'bg-[var(--text)] text-[var(--bg)] border border-[var(--border-strong)] shadow-sm hover:opacity-90 active:opacity-80 transition-opacity',
  secondary: 'bg-transparent text-[var(--text)] border border-[var(--border-strong)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
  ghost: 'bg-transparent text-[var(--text-secondary)] hover:text-[var(--text)] border border-transparent hover:border-[var(--border)]',
}

const sizes = {
  sm: 'px-3 py-1.5 text-[11px] tracking-[0.1em]',
  md: 'px-5 py-2.5 text-[12px] tracking-[0.08em]',
  lg: 'px-7 py-3.5 text-[13px] tracking-[0.06em]',
}

export function Button({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  external = false,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const classes = `inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] uppercase rounded-lg transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      )
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
