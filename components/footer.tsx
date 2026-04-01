import Link from 'next/link'
import Image from 'next/image'
import { FooterSocialLogos } from '@/components/footer-social-logos'
import { DISCORD_INVITE_URL, DISCORD_LINK_LABEL } from '@/data/community'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative z-[1] border-t border-[var(--border)] bg-[var(--bg)] print-hide">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-[max(3rem,env(safe-area-inset-bottom,0px))]">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-3">
              <Image
                src="/logo.png"
                alt="Zero to Agent"
                width={20}
                height={20}
                className="rounded-lg"
              />
              <span className="font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.2em] uppercase text-[var(--text)]">
                ZERO TO AGENT
              </span>
            </div>
            <p className="text-[12px] leading-[1.65] text-[var(--text-secondary)] max-w-[220px]">
              A community companion for AI agent builders worldwide.
            </p>
            <FooterSocialLogos />
          </div>

          <div>
            <p className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.2em] uppercase text-[var(--text-dim)] mb-4">
              Resources
            </p>
            <ul className="space-y-2.5">
              {[
                { label: 'Vercel Platform', href: 'https://vercel.com' },
                { label: 'v0 by Vercel', href: 'https://v0.dev' },
                { label: 'AI SDK Docs', href: 'https://sdk.vercel.ai/docs' },
                { label: 'Next.js Docs', href: 'https://nextjs.org/docs' },
                { label: 'Gemini API', href: 'https://ai.google.dev' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.2em] uppercase text-[var(--text-dim)] mb-4">
              Community
            </p>
            <ul className="space-y-2.5">
              {[
                { label: 'Zero to Agent Hub', href: 'https://community.vercel.com/host/zero-to-agent-2026' },
                { label: 'Vercel Community', href: 'https://community.vercel.com' },
                { label: DISCORD_LINK_LABEL, href: DISCORD_INVITE_URL },
                { label: 'GitHub', href: 'https://github.com/abdunur-dev' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.2em] uppercase text-[var(--text-dim)] mb-4">
              Site
            </p>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'Events', href: '/events' },
                { label: 'Resources', href: '/resources' },
                { label: 'Explainer', href: '/explainer' },
                { label: 'FAQ', href: '/faq' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--border)] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.15em] text-[var(--text-dim)] uppercase">
            Next.js · React · Geist · Framer Motion · AI SDK
          </p>

          <p className="text-[11px] text-[var(--text-dim)] max-w-sm text-left sm:text-right leading-[1.5]">
            &copy; {currentYear} Zero to Agent Community.{' '}
            <span>Community-built companion. Not an official Vercel product.</span>
          </p>
        </div>

        <p className="mt-4 text-[10px] text-[var(--text-dim)] leading-[1.6]">
          Vercel, the Vercel design, Next.js, v0, and related marks, designs and logos are trademarks or registered trademarks of Vercel, Inc. or its affiliates in the US and other countries. This site is not affiliated with or endorsed by Vercel, Inc.
        </p>
      </div>
    </footer>
  )
}
