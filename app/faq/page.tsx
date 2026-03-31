import type { Metadata } from 'next'
import { FAQ } from '@/components/faq'

export const metadata: Metadata = {
  title: 'FAQ — Zero to Agent',
  description: 'Common questions about Zero to Agent hackathon events, tools, and participation.',
}

export default function FAQPage() {
  return (
    <main className="flex-1 pt-nav">
      <FAQ />
    </main>
  )
}
