import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { GeistPixelSquare } from 'geist/font/pixel'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ScrollProgress } from '@/components/scroll-progress'
import { ScrollToTop } from '@/components/scroll-to-top'
import { Toaster } from 'sonner'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { getSiteOrigin } from '@/lib/site-url'

const siteOrigin = getSiteOrigin()

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
  interactiveWidget: 'resizes-content',
  // Prevents FOUC flash on theme switch — tells browser the likely bg color
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#111111' },
    { media: '(prefers-color-scheme: light)', color: '#e4e4e4' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
  title: 'Zero to Agent — Community Companion',
  description: 'A community companion for building, shipping, and exploring AI agent projects. Learn the tools, find events, discover builds, and start shipping.',
  openGraph: {
    title: 'Zero to Agent — Community Companion',
    description: 'A community companion for building, shipping, and exploring AI agent projects.',
    url: siteOrigin,
    siteName: 'Zero to Agent',
    type: 'website',
    locale: 'en_US',
    // Same path for OG + Twitter (matches static /og-image.png pattern in typical Next apps).
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Zero to Agent — Community Companion',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zero to Agent — Community Companion',
    description: 'A community companion for building, shipping, and exploring AI agent projects.',
    images: ['/opengraph-image'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Preconnect to image CDN so cover images load faster */}
        <link rel="preconnect" href="https://images.lumacdn.com" />
        <link rel="dns-prefetch" href="https://images.lumacdn.com" />
      </head>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${GeistPixelSquare.variable}`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <div className="dot-grid" aria-hidden="true" />
          <div className="noise-overlay" aria-hidden="true" />
          <ScrollProgress />
          <ScrollToTop />

          <div className="relative z-[1] flex flex-col min-h-screen">
            <Navigation />
            {children}
            <Footer />
          </div>

          <Toaster
            position="bottom-center"
            className="sm:!bottom-4 sm:!left-auto sm:!right-4 sm:!translate-x-0"
            offset={{
              bottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
              right: 'max(0.75rem, env(safe-area-inset-right, 0px))',
            }}
            mobileOffset={{
              bottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
            }}
            toastOptions={{
              style: {
                background: 'var(--bg-surface)',
                color: 'var(--text)',
                border: '1px solid var(--border-strong)',
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: '12px',
                letterSpacing: '0.03em',
                borderRadius: '4px',
              },
            }}
          />
          <SpeedInsights />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
