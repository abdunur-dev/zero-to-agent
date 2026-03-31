import { Hero } from '@/components/hero'
import { HomeAsciiTunnel } from '@/components/home-ascii-tunnel'
import { WhatIs } from '@/components/what-is'
import { GetStarted } from '@/components/get-started'
import { SocialDiscovery } from '@/components/social-discovery'

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />

      {/* Geo triangle tunnel — lazy loaded, pauses when off-screen */}
      <HomeAsciiTunnel />

      <WhatIs />
      <GetStarted />

      <section className="border-t border-[var(--border)] px-4 sm:px-6 py-16 md:py-28">
        <div className="mx-auto max-w-xl text-center">
          <SocialDiscovery variant="inline" />
        </div>
      </section>
    </main>
  )
}
