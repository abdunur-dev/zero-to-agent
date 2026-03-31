import { VERCEL_SOCIAL_PROFILES } from '@/data/vercel-social'

/** Icon-only row for footer — no card or copy. */
export function FooterSocialLogos() {
  return (
    <nav className="mt-5" aria-label="Social and community links">
      <ul className="flex flex-wrap gap-2">
        {VERCEL_SOCIAL_PROFILES.map(({ href, label, Icon }) => (
          <li key={href}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              aria-label={label}
              className="inline-flex items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--bg-surface)] p-2 text-neutral-950 transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)] dark:text-white dark:hover:text-[var(--accent)]"
            >
              <Icon className="h-[18px] w-[18px]" aria-hidden />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
