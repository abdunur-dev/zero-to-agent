import type { Metadata } from 'next'
import { ResourceHub } from '@/components/resource-hub'
import { ProductionAgentGuideSummary } from '@/components/production-agent-guide-summary'
import { VercelToolbox } from '@/components/vercel-toolbox'
import { IdeaGenerator } from '@/components/idea-generator'

export const metadata: Metadata = {
  title: 'Resources — Zero to Agent',
  description:
    'Resource Hub, Vercel Toolbox, production agent explainer, and an AI idea generator — everything you need to ship.',
}

export default function ResourcesPage() {
  return (
    <main className="flex-1 pt-nav">
      <ResourceHub />
      <VercelToolbox />
      <ProductionAgentGuideSummary />
      <IdeaGenerator />
    </main>
  )
}
