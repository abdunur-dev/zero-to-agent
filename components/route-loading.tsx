import { BrailleSpinner } from './braille-spinner'

/**
 * Skeleton for App Router `loading.tsx` and Suspense fallbacks.
 * Use inside a page-owned `<main>` — do not wrap with another `<main>` in fallbacks.
 */
export function RouteLoadingSkeleton({
  variant = 'default',
}: {
  variant?: 'default' | 'events' | 'home'
}) {
  return (
    <div
      className={
        variant === 'home'
          ? 'flex min-h-[70vh] flex-col justify-center px-4 sm:px-6 py-16'
          : ''
      }
      aria-busy="true"
      aria-label="Loading"
    >
      <section className={variant === 'home' ? '' : 'relative px-4 sm:px-6 py-24 md:py-32'}>
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-6">
              <BrailleSpinner name="helix" className="text-[11px] text-[var(--text-dim)]" />
              <span className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] uppercase text-[var(--text-dim)]">
                Loading
              </span>
            </div>
            <div className="h-3 w-24 animate-pulse rounded bg-[var(--border-strong)]" />
            <div className="h-10 max-w-md animate-pulse rounded bg-[var(--border-strong)]" />
            <div className="h-4 max-w-2xl animate-pulse rounded bg-[var(--border)]" />
            <div className="h-4 max-w-xl animate-pulse rounded bg-[var(--border)]" />
          </div>

          {variant === 'events' && (
            <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="h-4 w-40 animate-pulse rounded bg-[var(--border)]" />
              <div className="h-9 w-full max-w-md animate-pulse rounded bg-[var(--border-strong)]" />
            </div>
          )}

          <div
            className={
              variant === 'events'
                ? 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
                : 'space-y-4'
            }
          >
            {(variant === 'events' ? [1, 2, 3, 4, 5, 6] : [1, 2, 3]).map((i) => (
              <div
                key={i}
                className={
                  variant === 'events'
                    ? 'h-48 animate-pulse rounded border border-[var(--border)] bg-[var(--bg-surface)]'
                    : 'h-24 animate-pulse rounded border border-[var(--border)] bg-[var(--bg-surface)]'
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

/** Full segment loading UI (includes `<main>`) for `loading.tsx` files. */
export function RouteLoading({
  variant = 'default',
}: {
  variant?: 'default' | 'events' | 'home'
}) {
  const mainClass =
    variant === 'home' ? 'flex-1' : 'flex-1 pt-nav'
  return (
    <main className={mainClass}>
      <RouteLoadingSkeleton variant={variant} />
    </main>
  )
}
