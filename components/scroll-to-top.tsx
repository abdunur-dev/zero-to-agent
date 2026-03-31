'use client'

import { useLayoutEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Ensures every in-app navigation lands at the top of the page.
 * Next.js App Router can otherwise preserve or partially restore scroll position.
 * useLayoutEffect runs before paint so users don't briefly see the old scroll offset.
 */
export function ScrollToTop() {
  const pathname = usePathname()

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
  }, [pathname])

  return null
}
