/** Production hostname (add this domain in the Vercel project, then point DNS). */
const CANONICAL_ORIGIN = 'https://zero-to-agent.community'

/**
 * Canonical site origin for metadata (OG, Twitter).
 * Production always uses the custom domain. Non-production: `NEXT_PUBLIC_SITE_URL`, else `VERCEL_URL`, else localhost.
 */
export function getSiteOrigin(): string {
  // Production must use the public custom domain so OG/Twitter image URLs resolve.
  // A stale NEXT_PUBLIC_SITE_URL (e.g. old *.vercel.app) would 404 for crawlers.
  if (process.env.VERCEL_ENV === 'production') {
    return CANONICAL_ORIGIN
  }
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) {
    return explicit.replace(/\/$/, '')
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  return 'http://localhost:3000'
}
