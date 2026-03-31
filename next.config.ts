import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Turbopack for faster local dev (Next 16 default for `next dev`)
  turbopack: {},

  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.lumacdn.com',
        pathname: '/**',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/ideas',
        destination: '/resources',
        permanent: true,
      },
    ]
  },

  async headers() {
    const rules: Awaited<ReturnType<NonNullable<NextConfig['headers']>>> = [
      // Security headers on all routes
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // Cache public assets aggressively (logo, OG image, etc.)
      {
        source: '/:file((?!api/).*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|avif|woff2|woff))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ]

    return rules
  },

  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'geist'],
    // Inline critical CSS for above-the-fold content
    inlineCss: true,
  },
}

export default nextConfig
