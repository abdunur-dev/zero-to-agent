import type { Metadata } from 'next'
import { ResourceHub } from '@/components/resource-hub'
import { ProductionAgentGuideSummary } from '@/components/production-agent-guide-summary'
import { VercelToolbox } from '@/components/vercel-toolbox'

export const metadata: Metadata = {
  title: 'Resources — Zero to Agent',
  description:
    'Resource Hub, Vercel Toolbox, and production agent explainer — everything you need to ship.',
}

export default function ResourcesPage() {
  return (
    <main className="flex-1 pt-nav">
      <ResourceHub />
      <VercelToolbox />
      <ProductionAgentGuideSummary />
    </main>
  )
}
