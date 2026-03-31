import type { Metadata } from 'next'
import { ProductionAgentGuide } from '@/components/production-agent-guide'

export const metadata: Metadata = {
  title: 'Explainer — How to Build a Production-Grade AI Agent',
  description:
    'Seven engineering principles for secure, scalable AI agents: threat models, Zod contracts, RBAC, context engineering, governed retrieval, orchestration, and memory architecture.',
}

export default function ExplainerPage() {
  return (
    <main className="flex-1 pt-nav">
      <ProductionAgentGuide />
    </main>
  )
}
