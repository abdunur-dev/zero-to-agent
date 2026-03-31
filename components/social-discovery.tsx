import { VERCEL_SOCIAL_PROFILES } from '@/data/vercel-social'

const HASHTAG = 'ZerotoAgent'

const hashtagHref = `https://x.com/hashtag/${HASHTAG}`

interface SocialDiscoveryProps {
  /** `compact`: tighter padding; `inline`: centered strip after Get Started; `default`: general use. */
  variant?: 'compact' | 'default' | 'inline'
}

export function SocialDiscovery({ variant = 'default' }: SocialDiscoveryProps) {
  const pad =
    variant === 'compact'
      ? 'py-3 px-4'
      : variant === 'inline'
        ? 'py-5 px-5 md:px-6'
        : 'py-4 px-5'
  const iconWrap = variant === 'compact' ? 'p-2' : 'p-2.5'
  const iconSize = variant === 'compact' ? 'h-[18px] w-[18px]' : 'h-5 w-5'

  return (
    <div
      className={`rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] text-center ${pad}`}
      role="region"
      aria-label="Social sharing and community links"
    >
      <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] uppercase text-[var(--text-dim)] mb-3 text-center">
        Social
      </p>
      <p className="text-[13px] md:text-[14px] leading-[1.65] text-[var(--text-secondary)] text-center max-w-md mx-auto">
        Post your build publicly with{' '}
        <a
          href={hashtagHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[var(--accent)] hover:underline underline-offset-4"
        >
          #{HASHTAG}
        </a>{' '}
        on X and elsewhere so others can discover ships from build week.
      </p>
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {VERCEL_SOCIAL_PROFILES.map(({ href, label, Icon }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            title={label}
            aria-label={label}
            className={`inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg)] text-neutral-950 dark:text-white ${iconWrap} transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:hover:text-[var(--accent)]`}
          >
            <Icon className={iconSize} aria-hidden />
          </a>
        ))}
      </div>
    </div>
  )
}
