'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'
import { ThemeToggle } from './theme-toggle'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/events', label: 'Events' },
  { href: '/resources', label: 'Resources', hasResourcesMenu: true as const },
  { href: '/faq', label: 'FAQ' },
] as const

/** In-page sections on `/resources` — same targets as former “Jump to” bar. */
export const resourcesSectionLinks = [
  { href: '/resources#resource-hub', label: 'Resource Hub' },
  { href: '/resources#vercel-toolbox', label: 'Vercel Toolbox' },
  { href: '/resources#explainer', label: 'Explainer' },
] as const

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    let rafId: number
    const handleScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20)
      })
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  useEffect(() => {
    queueMicrotask(() => setMobileOpen(false))
  }, [pathname])

  const isResourcesActive = pathname.startsWith('/resources')

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className={`fixed top-0 left-0 right-0 z-[9998] pt-[env(safe-area-inset-top,0px)] transition-all duration-300 print-hide ${
          scrolled
            ? 'bg-[var(--bg-alpha)] backdrop-blur-xl border-b border-[var(--border-strong)] shadow-[0_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.45)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 min-h-14 flex items-center justify-between">
          <Link href="/" className="flex min-w-0 items-center gap-2 sm:gap-2.5 group">
            <Image
              src="/logo.png"
              alt="Zero to Agent"
              width={20}
              height={20}
              className="rounded-lg shrink-0"
              priority
            />
            <span className="font-[family-name:var(--font-geist-mono)] text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.2em] uppercase text-[var(--text)] group-hover:text-[var(--accent)] transition-colors truncate max-w-[11rem] sm:max-w-none">
              ZERO TO AGENT
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              if ('hasResourcesMenu' in link && link.hasResourcesMenu) {
                return (
                  <div key={link.href} className="relative group">
                    <Link
                      href={link.href}
                      className={`relative flex items-center gap-1 px-3 py-1.5 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] uppercase transition-colors ${
                        isResourcesActive
                          ? 'text-[var(--accent)]'
                          : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
                      }`}
                      aria-haspopup="menu"
                    >
                      {link.label}
                      <ChevronDown
                        size={12}
                        className="opacity-60 transition-transform duration-200 group-hover:-rotate-180"
                        aria-hidden
                      />
                      {isResourcesActive && (
                        <motion.span
                          layoutId="nav-indicator"
                          className="absolute bottom-0 left-3 right-3 h-px bg-[var(--accent)]"
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        />
                      )}
                    </Link>
                    {/* Hover bridge + dropdown */}
                    <div
                      className="absolute left-0 top-full z-[10000] pt-2 opacity-0 invisible transition-[opacity,visibility] duration-150 group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible"
                      role="menu"
                      aria-label="Resources sections"
                    >
                      <div className="min-w-[220px] rounded-lg border border-[var(--border-strong)] bg-[var(--bg-surface)] py-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
                        {resourcesSectionLinks.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            className="block px-4 py-2.5 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.12em] uppercase text-[var(--text-secondary)] transition-colors hover:bg-[var(--accent-dim)] hover:text-[var(--accent)]"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                )
              }

              const isActive =
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3 py-1.5 font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] uppercase transition-colors ${
                    isActive
                      ? 'text-[var(--accent)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-3 right-3 h-px bg-[var(--accent)]"
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    />
                  )}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />

            <a
              href="https://github.com/abdunur-dev/zero-to-agent.git"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex w-8 h-8 items-center justify-center rounded-lg transition-colors hover:bg-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text)]"
              aria-label="GitHub"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--border)]"
              aria-label="Toggle menu"
            >
              <div className="flex flex-col gap-[5px]">
                <motion.span
                  animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="block w-4 h-[1px] bg-[var(--text-secondary)]"
                />
                <motion.span
                  animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.2 }}
                  className="block w-4 h-[1px] bg-[var(--text-secondary)]"
                />
                <motion.span
                  animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="block w-4 h-[1px] bg-[var(--text-secondary)]"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9997] bg-[var(--bg-alpha)] backdrop-blur-xl md:hidden print-hide pt-[env(safe-area-inset-top,0px)] pb-[env(safe-area-inset-bottom,0px)]"
            onClick={() => setMobileOpen(false)}
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex h-full min-h-0 flex-col items-center justify-center gap-6 px-6 sm:px-8 overflow-y-auto overscroll-contain py-12 safe-area-bottom"
              onClick={(e) => e.stopPropagation()}
            >
              {navLinks.map((link, i) => {
                if ('hasResourcesMenu' in link && link.hasResourcesMenu) {
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className="flex w-full max-w-sm flex-col items-center gap-4"
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`font-[family-name:var(--font-geist-mono)] text-[14px] tracking-[0.25em] uppercase transition-colors ${
                          isResourcesActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
                        }`}
                      >
                        {link.label}
                      </Link>
                      <div
                        className="flex w-full flex-col gap-3 border-l border-[var(--border)] pl-4"
                        role="group"
                        aria-label="Resources sections"
                      >
                        {resourcesSectionLinks.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-left font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.18em] uppercase text-[var(--text-dim)] transition-colors hover:text-[var(--accent)]"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )
                }

                const isActive =
                  link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)

                return (
                  <motion.div
                    key={link.href}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      className={`font-[family-name:var(--font-geist-mono)] text-[14px] tracking-[0.25em] uppercase transition-colors ${
                        isActive ? 'text-[var(--accent)]' : 'text-[var(--text-secondary)] hover:text-[var(--text)]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: navLinks.length * 0.06 }}
              >
                <a
                  href="https://github.com/abdunur-dev/zero-to-agent.git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-[family-name:var(--font-geist-mono)] text-[14px] tracking-[0.25em] uppercase text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
                >
                  GitHub
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
