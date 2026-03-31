import { DISCORD_INVITE_URL } from '@/data/community'

export interface Resource {
  title: string
  description: string
  url: string
  category: 'getting-started' | 'building' | 'deployment' | 'docs' | 'community' | 'help'
  categoryLabel: string
  /** Facet tags for secondary filter (e.g. "v0", "AI SDK"). */
  tags: string[]
  brandMark?: string
}

export const resources: Resource[] = [
  {
    title: 'Zero to Agent Hub',
    description: 'The official Vercel community hub for Zero to Agent events, updates, and resources.',
    url: 'https://community.vercel.com/host/zero-to-agent-2026',
    category: 'getting-started',
    categoryLabel: 'Getting Started',
    tags: ['Event', 'Community'],
    brandMark: '▲',
  },
  {
    title: 'v0 by Vercel',
    description: 'Generate UI and full-stack scaffolds from text prompts. Your fastest path from idea to working prototype.',
    url: 'https://v0.dev',
    category: 'getting-started',
    categoryLabel: 'Getting Started',
    tags: ['v0', 'UI'],
    brandMark: 'v0',
  },
  {
    title: 'Vercel Platform',
    description: 'Deploy your agent in seconds. Free tier, instant global CDN, no config required.',
    url: 'https://vercel.com',
    category: 'getting-started',
    categoryLabel: 'Getting Started',
    tags: ['Deploy', 'Vercel'],
    brandMark: '▲',
  },
  {
    title: 'Vercel Agent Browser',
    description:
      'CLI-first browser automation built for AI agents. 5.7x more test cycles under the same context budget vs MCP tools. Snapshot, click, fill — zero DOM token overhead.',
    url: 'https://github.com/vercel-labs/agent-browser',
    category: 'building',
    categoryLabel: 'Building',
    tags: ['Automation', 'Testing'],
    brandMark: '▲',
  },
  {
    title: 'Vercel AI SDK',
    description:
      'The TypeScript library for building AI-powered applications. Supports streaming, tools, agents, and all major models.',
    url: 'https://sdk.vercel.ai',
    category: 'building',
    categoryLabel: 'Building',
    tags: ['AI SDK', 'TypeScript'],
    brandMark: '▲',
  },
  {
    title: 'AI SDK Docs',
    description:
      'Full documentation for the Vercel AI SDK — agents, tool calling, streaming, structured output, and more.',
    url: 'https://sdk.vercel.ai/docs',
    category: 'building',
    categoryLabel: 'Building',
    tags: ['AI SDK', 'Docs'],
  },
  {
    title: 'Next.js Docs',
    description: 'The full-stack React framework powering most Vercel apps. App Router, Server Actions, API routes.',
    url: 'https://nextjs.org/docs',
    category: 'building',
    categoryLabel: 'Building',
    tags: ['Next.js'],
  },
  {
    title: 'Google Gemini API',
    description:
      "Google DeepMind's multimodal models powering the Zero to Agent hackathon series. Vision, reasoning, and long context.",
    url: 'https://ai.google.dev',
    category: 'building',
    categoryLabel: 'Building',
    tags: ['Gemini', 'Models'],
  },
  {
    title: 'Vercel Deployment Docs',
    description: 'How to deploy any Next.js or framework app to Vercel. Environment variables, domains, preview URLs.',
    url: 'https://vercel.com/docs/deployments/overview',
    category: 'deployment',
    categoryLabel: 'Deployment',
    tags: ['Deploy', 'Docs'],
    brandMark: '▲',
  },
  {
    title: 'Vercel Fluid Compute',
    description: 'Run long-running agent workflows without hitting serverless timeouts. Ideal for multi-step agent pipelines.',
    url: 'https://vercel.com/docs/functions/fluid-compute',
    category: 'deployment',
    categoryLabel: 'Deployment',
    tags: ['Fluid', 'Deploy'],
    brandMark: '▲',
  },
  {
    title: 'Vercel Community Forum',
    description: 'Ask questions, share builds, and get help from the broader Vercel developer community.',
    url: 'https://community.vercel.com',
    category: 'community',
    categoryLabel: 'Community',
    tags: ['Community', 'Forum'],
    brandMark: '▲',
  },
  {
    title: 'Zero to Agent Discord',
    description:
      'Our community server for agent builders — quick questions, collaboration, and chat alongside events.',
    url: DISCORD_INVITE_URL,
    category: 'community',
    categoryLabel: 'Community',
    tags: ['Community', 'Chat'],
  },
  {
    title: 'AI SDK Examples',
    description: 'Official example repos for chatbots, agents, generative UI, and more. Clone and build from.',
    url: 'https://github.com/vercel/ai/tree/main/examples',
    category: 'docs',
    categoryLabel: 'Docs & Examples',
    tags: ['Examples', 'AI SDK'],
  },
  {
    title: 'v0 Docs & Templates',
    description: 'Prompting guides and templates for getting the most out of v0 code generation.',
    url: 'https://v0.dev/docs',
    category: 'docs',
    categoryLabel: 'Docs & Examples',
    tags: ['v0', 'Docs'],
    brandMark: 'v0',
  },
  {
    title: 'Vercel Support',
    description: 'Official Vercel support channels. For platform issues, deployment errors, and billing questions.',
    url: 'https://vercel.com/help',
    category: 'help',
    categoryLabel: 'Help',
    tags: ['Help', 'Vercel'],
    brandMark: '▲',
  },
  {
    title: 'Next.js GitHub Discussions',
    description: 'Community Q&A, bug reports, and feature discussions for the Next.js framework.',
    url: 'https://github.com/vercel/next.js/discussions',
    category: 'help',
    categoryLabel: 'Help',
    tags: ['Next.js', 'Help'],
  },
]
