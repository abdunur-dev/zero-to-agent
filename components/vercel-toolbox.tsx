'use client'

import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'
import { SectionReveal } from './section-reveal'
import { SectionHeading } from './ui/section-heading'

interface ToolItem {
  name: string
  mark: string
  description: string
  url: string
}

const tools: ToolItem[] = [
  {
    name: 'AI SDK',
    mark: '▲',
    description: 'The core TypeScript library for building AI apps. streamText, useChat, tool calling, agent loops, structured output — everything you need to wire up an LLM.',
    url: 'https://sdk.vercel.ai',
  },
  {
    name: 'v0',
    mark: 'v0',
    description: 'Generate full UI scaffolds and components from a text prompt. The fastest path from idea to working prototype.',
    url: 'https://v0.dev',
  },
  {
    name: 'AI Gateway',
    mark: '▲',
    description: 'One API for every model provider. Route calls through Vercel with automatic failover, cost tracking, and zero API key management.',
    url: 'https://ai-sdk.dev/docs/ai-sdk-core/ai-gateway',
  },
  {
    name: 'AI Elements',
    mark: '▲',
    description: '40+ pre-built React components for AI interfaces. Chat UIs, streaming markdown, tool call displays, reasoning panels, voice input — all drop-in ready.',
    url: 'https://ai-sdk.dev/elements',
  },
  {
    name: 'JSON Render',
    mark: '▲',
    description: 'Render AI responses the right way. UIMessage parts, tool call results as structured cards, streaming states — not raw JSON blobs.',
    url: 'https://ai-sdk.dev/docs/ai-sdk-ui',
  },
  {
    name: 'Structured Output',
    mark: '▲',
    description: 'Get typed JSON back from any model. Define a Zod schema, get validated data. No more parsing strings or hoping for the right format.',
    url: 'https://ai-sdk.dev/docs/ai-sdk-core/generating-structured-data',
  },
  {
    name: 'MCP Integration',
    mark: '▲',
    description: 'Connect your agent to any Model Context Protocol server. Use external tools, data sources, and services without building custom integrations.',
    url: 'https://ai-sdk.dev/docs/ai-sdk-core/mcp',
  },
  {
    name: 'AI SDK DevTools',
    mark: '▲',
    description: 'Local debugging and observability for AI calls. Inspect prompts, responses, tool calls, and latency in real-time during development.',
    url: 'https://ai-sdk.dev/docs/ai-sdk-core/devtools',
  },
  {
    name: 'Agent Browser',
    mark: '▲',
    description: 'CLI-first browser automation built for AI agents. Snapshots, clicks, and form fills with zero DOM token overhead — 5.7x more efficient than MCP-based tools.',
    url: 'https://github.com/vercel-labs/agent-browser',
  },
]

function ToolCard({ tool, index }: { tool: ToolItem; index: number }) {
  return (
    <motion.a
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
      className="group flex flex-col bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-6 hover:border-[var(--border-accent)] transition-colors duration-300"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--text-dim)]" aria-hidden="true">
            {tool.mark}
          </span>
          <span className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.2em] uppercase text-[var(--text-dim)] border border-[var(--border)] px-1.5 py-0.5 rounded-lg">
            Tool
          </span>
        </div>
        <ExternalLink
          size={13}
          className="flex-shrink-0 text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors mt-0.5"
        />
      </div>

      <h3 className="text-[15px] font-semibold text-[var(--text)] tracking-[-0.02em] mb-2 group-hover:text-[var(--accent)] transition-colors leading-[1.3]">
        {tool.name}
      </h3>

      <p className="text-[13px] leading-[1.65] text-[var(--text-secondary)] tracking-[-0.01em] flex-1">
        {tool.description}
      </p>

      <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.05em] text-[var(--text-dim)] mt-4 truncate">
        {tool.url.replace('https://', '')}
      </p>
    </motion.a>
  )
}

export function VercelToolbox() {
  return (
    <section
      id="vercel-toolbox"
      className="scroll-mt-nav relative py-24 md:py-32 px-4 sm:px-6 border-t border-[var(--border)]"
    >
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <SectionHeading
            label="Vercel Toolbox"
            title="Tools for building agents."
            description="The Vercel stack for AI. Everything you need to go from idea to deployed agent — streaming, tool calling, structured output, and production-ready UI."
          />
        </SectionReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tools.map((tool, i) => (
            <ToolCard key={tool.name} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
