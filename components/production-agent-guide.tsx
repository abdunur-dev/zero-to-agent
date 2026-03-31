'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { SectionReveal } from './section-reveal'
import { SectionHeading } from './ui/section-heading'

interface Principle {
  number: string
  title: string
  summary: string
  detail: React.ReactNode
}

const principles: Principle[] = [
  {
    number: '01',
    title: 'Define the Agent Boundary and Threat Model',
    summary:
      'An agent is an orchestrated workflow where an LLM interprets instructions and executes actions through tools. That architecture introduces material risk you must map before writing a single line of production code.',
    detail: (
      <div className="space-y-4">
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          Unlike a chatbot that passively generates text, an agent actively executes actions — calling APIs, writing to databases, sending emails. This means it holds elevated permissions that end users typically don&apos;t have. The core vulnerability is the <strong className="text-[var(--text)] font-semibold">confused deputy problem</strong>: if an attacker manipulates the agent&apos;s context through natural language, they can leverage its privileges for unauthorized operations.
        </p>
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          Before deployment, teams must meticulously map every API connection, tool invocation, and data access point the agent touches. Document exactly which systems it can read from, write to, or modify. Identify sensitive data flows and potential attack vectors. Use this explicit threat model as the foundation for your security controls — not an afterthought.
        </p>
        <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--bg)]">
          <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] uppercase text-[var(--text-dim)] mb-2">Key risk: Prompt Injection</p>
          <p className="text-[12px] leading-[1.7] text-[var(--text-secondary)]">
            Prompt injection appears in over 73% of production deployments (OWASP). Just five carefully crafted documents can manipulate AI responses 90% of the time through RAG poisoning. System prompts are non-deterministic and easily bypassed — real security must exist entirely outside the LLM reasoning loop. Use input filtering, sanitization, semantic analysis, and strict allow/deny lists.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: '02',
    title: 'Contracts Everywhere: Inputs, Outputs, and Tool Schemas',
    summary:
      'Strictly typed schemas for every tool signature, validated server-side, prevent malformed calls and parameter fabrication. Tools are rigid contracts, not loose conveniences.',
    detail: (
      <div className="space-y-4">
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          Every tool in your agent stack needs explicitly typed inputs using validation libraries — <code className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--text)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded border border-[var(--border)]">zod</code> for TypeScript/Vercel AI SDK projects. Server-side validation enforces these contracts before any code executes. Never trust the LLM to format data correctly — it doesn&apos;t understand your API, it pattern-matches.
        </p>
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-4 font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--text-secondary)] overflow-x-auto">
          <pre className="whitespace-pre leading-[1.6]">{`import { tool } from 'ai'
import { z } from 'zod'

const sendEmail = tool({
  description: 'Send an email to a recipient',
  parameters: z.object({
    recipient: z.string().email('Must be valid email'),
    subject: z.string().min(1).max(200),
    body: z.string().min(1).max(10000),
  }),
  execute: async ({ recipient, subject, body }) => {
    // validated — safe to execute
    return await emailProvider.send({ recipient, subject, body })
  },
})`}</pre>
        </div>
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          When validation fails, return structured error responses — not crashes. This lets the agent read the error, correct its formatting, and retry. For tools with side effects, implement idempotency keys so a network retry doesn&apos;t charge a credit card three times. Version your schemas to allow safe API evolution without breaking existing workflows.
        </p>
      </div>
    ),
  },
  {
    number: '03',
    title: 'Secure Tool Execution: Authentication, RBAC, and Sandboxing',
    summary:
      'Every tool must operate behind a robust authorization layer enforcing role-based access control before both registration and execution. Apply least privilege everywhere.',
    detail: (
      <div className="space-y-4">
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          Agent authentication differs significantly from human authentication. Use automated, cryptographically secure methods: short-lived certificates from trusted PKIs, hardware security modules for key storage, or workload identity federation. Token policies must enforce strict rules — a two-hour maximum lifetime, one-hour rotation, explicit narrow scopes, IP allow lists, and mutual TLS for all internal communication.
        </p>
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          A zero-trust architecture assumes no agent is trusted by default, regardless of network position. For high-impact operations — database deletes, production config changes, sending external emails — implement <strong className="text-[var(--text)] font-semibold">human-in-the-loop approvals</strong>. Maintain a registry defining exactly which operations require approval, who the authorized approvers are, and keep immutable audit trails of what was approved and when.
        </p>
        <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--bg)]">
          <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] uppercase text-[var(--text-dim)] mb-2">On Vercel</p>
          <p className="text-[12px] leading-[1.7] text-[var(--text-secondary)]">
            Use Vercel&apos;s Fluid Compute for long-running agent workflows that need persistent authorization contexts. Environment variables with scoped access per deployment environment ensure credentials never leak between preview and production. Use <code className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--text)]">vercel env pull</code> to sync secrets locally without committing them.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: '04',
    title: 'Context Engineering: Layered and Compact',
    summary:
      'Never dump raw conversation histories into the prompt window. Data retrieval overhead and massive context windows consume 40–50% of total execution time. Engineer context to be intentional, compact, and auditable.',
    detail: (
      <div className="space-y-4">
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          Use intent detectors to dynamically decide when to retrieve memory, then summarize retrieved snippets into compact, highly relevant context. Separate <strong className="text-[var(--text)] font-semibold">working memory</strong> (current task state via sliding windows) from <strong className="text-[var(--text)] font-semibold">long-term knowledge retrieval</strong>. When an intent routing model signals that historical context is needed, retrieve only the most relevant snippets, summarize them with a faster model, and inject only the compact summaries.
        </p>
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          Target 10:1 compression ratios for historical context while preserving decision-relevant details. The Vercel AI SDK&apos;s <code className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--text)] bg-[var(--bg-surface)] px-1.5 py-0.5 rounded border border-[var(--border)]">CoreMessage</code> format and streaming architecture make it straightforward to build sliding context windows without accumulating stale data.
        </p>
        <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--bg)]">
          <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] uppercase text-[var(--text-dim)] mb-2">Auditability requirement</p>
          <p className="text-[12px] leading-[1.7] text-[var(--text-secondary)]">
            Track exactly what context was retrieved, why it was selected, how it was transformed, and what influenced the agent&apos;s final decisions. In regulated industries, context provenance reconstruction is a legal mandate — not a nice-to-have.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: '05',
    title: 'Knowledge Grounding as a Governed Tool',
    summary:
      'Treat retrieval as a heavily governed software component with strictly scoped sources and rigorous tenant namespacing. True agents don\'t just retrieve and answer — they retrieve, decide, and act.',
    detail: (
      <div className="space-y-4">
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          Implement hard tenant isolation at the data layer with security trimming at retrieval time. Verify end-user permissions before returning any documents to the agent context window. Source governance defines your queryable knowledge bases — approved internal documents, verified external sources, and strictly blocked domains to prevent data contamination.
        </p>
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          Maintain rigorous lineage tracking from source documents through chunking algorithms, embedding models, retrieval, and into final responses. Implement robust document validation before ingestion into vector stores, and continuously monitor retrieval quality metrics.
        </p>
        <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--bg)]">
          <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] uppercase text-[var(--text-dim)] mb-2">Critical separation</p>
          <p className="text-[12px] leading-[1.7] text-[var(--text-secondary)]">
            Reading a knowledge base must never implicitly grant write access or external API query permissions. Retrieval capabilities and execution capabilities require completely separate, explicit authorization checks. Conflating them is one of the most common architectural mistakes in early-stage agent systems.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: '06',
    title: 'Planning and Orchestration as Control Flow',
    summary:
      'Use explicit orchestration patterns — plan-then-execute loops, ReAct methodologies, state machines — to avoid brittle chains and infinite computational loops. Make orchestration deterministic while keeping LLM judgment strictly bounded.',
    detail: (
      <div className="space-y-4">
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          The three roles in a production agent architecture are distinct: <strong className="text-[var(--text)] font-semibold">orchestrators</strong> coordinate the workflow, <strong className="text-[var(--text)] font-semibold">agents</strong> decide the next steps, and <strong className="text-[var(--text)] font-semibold">tools</strong> execute the actual code. Conflating these roles leads to brittle, unpredictable systems.
        </p>
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          State machine orchestration suits business-critical flows with compliance requirements — the orchestrator strictly controls workflow state while the agent determines actions within pre-approved options. ReAct patterns interleave thought, action, and observation for dynamic tasks but require explicit stop conditions and hard iteration limits. For complex problems, use manager agents that build task ledgers delegated to narrow, specialized sub-agents.
        </p>
        <div className="bg-[var(--bg-surface)] border border-[var(--border)] rounded-lg p-4 font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--text-secondary)] overflow-x-auto">
          <pre className="whitespace-pre leading-[1.6]">{`// Always enforce explicit stop conditions
const result = await runAgent({
  maxIterations: 10,        // hard cap — never infinite
  maxTokens: 50_000,        // budget guard
  onIteration: (step) => {
    if (step.confidence > 0.95) return 'complete'
    if (step.iteration >= 8) return 'escalate'  // human review
  },
})`}</pre>
        </div>
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          Implement software circuit breakers to forcefully terminate runaway agent loops. Uncontrolled agent loops are one of the fastest ways to generate a catastrophic cloud bill. On Vercel, Fluid Compute&apos;s configurable execution limits provide a hard infrastructure-level backstop.
        </p>
      </div>
    ),
  },
  {
    number: '07',
    title: 'Memory and State as Architecture',
    summary:
      'Architecturally separate working memory from persistent memory. Apply strict encryption and retention policies, and re-verify tenant and role constraints on every read and write operation.',
    detail: (
      <div className="space-y-4">
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          <strong className="text-[var(--text)] font-semibold">Short-term memory</strong> relies on fast in-memory structures and sliding windows for active conversations. It holds current task state, recent tool calls, and working variables — and must completely reset between sessions. Use sub-millisecond data stores like Redis (available via Vercel&apos;s Upstash integration) for this layer.
        </p>
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          <strong className="text-[var(--text)] font-semibold">Long-term memory</strong> persists across sessions using vector databases for semantic memory, relational databases for structured knowledge, and time series stores for event sequences. Implement aggressive data retention policies based on sensitivity classifications. Apply encryption at rest and in transit everywhere — field-level encryption for highly sensitive user data.
        </p>
        <div className="border border-[var(--border)] rounded-lg p-4 bg-[var(--bg)]">
          <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.15em] uppercase text-[var(--text-dim)] mb-2">Data classification matrix</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2">
            {[
              { label: 'Public', desc: 'No restrictions' },
              { label: 'Internal', desc: 'Auth required' },
              { label: 'Confidential', desc: 'Role-gated + encrypted' },
              { label: 'Restricted', desc: 'Field encryption + audit' },
            ].map((item) => (
              <div key={item.label} className="border border-[var(--border)] rounded p-2">
                <p className="font-[family-name:var(--font-geist-mono)] text-[9px] tracking-[0.1em] uppercase text-[var(--text)] mb-1">{item.label}</p>
                <p className="text-[11px] text-[var(--text-dim)]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-[13px] leading-[1.75] text-[var(--text-secondary)]">
          Before any memory operation, re-verify all tenant and role constraints. Never assume cached permissions remain valid across interactions. Provide users with complete memory transparency and explicit control — a legal requirement wherever GDPR or similar privacy regulations apply. The right to be forgotten must be architecturally enforceable, not a manual process.
        </p>
      </div>
    ),
  },
]

function PrincipleCard({ principle, index }: { principle: Principle; index: number }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.04 }}
      className="border border-[var(--border)] rounded-lg overflow-hidden"
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex min-h-[3.25rem] items-start gap-4 sm:gap-5 p-4 sm:p-6 text-left hover:bg-[var(--bg-surface)] transition-colors duration-200 group"
        aria-expanded={open}
      >
        <span className="flex-shrink-0 font-[family-name:var(--font-geist-mono)] text-[11px] tracking-[0.1em] text-[var(--text-dim)] mt-0.5 w-6">
          {principle.number}
        </span>
        <div className="flex-1 min-w-0">
          <h3 className="text-[15px] font-semibold text-[var(--text)] tracking-[-0.02em] leading-[1.3] mb-2 group-hover:text-[var(--accent)] transition-colors">
            {principle.title}
          </h3>
          <p className="text-[13px] leading-[1.65] text-[var(--text-secondary)] tracking-[-0.01em]">
            {principle.summary}
          </p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex-shrink-0 mt-1"
        >
          <ChevronDown size={14} className="text-[var(--text-dim)]" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 sm:px-6 sm:pb-6 pt-0 border-t border-[var(--border)] bg-[var(--bg-surface)]">
              <div className="pt-5 pl-9 sm:pl-11">
                {principle.detail}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function ProductionAgentGuide() {
  return (
    <section className="relative py-20 md:py-32 px-4 sm:px-6 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <SectionReveal>
          <SectionHeading
            label="Explainer"
            title="How to build a production-grade AI agent."
            description="Over 40% of agentic AI projects fail — not because of the models, but due to inadequate risk controls, poor architecture, and unclear business value. Seven engineering principles that separate production systems from fragile demos."
          />
        </SectionReveal>

        {/* Pull stat */}
        <SectionReveal>
          <div className="mb-12 grid grid-cols-1 sm:grid-cols-3 gap-px border border-[var(--border)] rounded-lg overflow-hidden">
            {[
              { value: '40%+', label: 'of agent projects fail in production' },
              { value: '73%', label: 'of deployments vulnerable to prompt injection' },
              { value: '50%', label: 'of execution time lost to context overhead' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[var(--bg-surface)] px-6 py-5">
                <div className="text-[28px] font-bold text-[var(--text)] leading-none tracking-[-0.04em] mb-1">
                  {stat.value}
                </div>
                <div className="text-[12px] text-[var(--text-secondary)] leading-[1.5]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>

        <div className="space-y-3">
          {principles.map((principle, i) => (
            <SectionReveal key={principle.number}>
              <PrincipleCard principle={principle} index={i} />
            </SectionReveal>
          ))}
        </div>

        {/* Footer note */}
        <SectionReveal>
          <div className="mt-12 border-l-2 border-[var(--border-strong)] pl-6 py-1">
            <p className="text-[13px] leading-[1.7] text-[var(--text-secondary)]">
              Building a demo in a local notebook takes an afternoon. Deploying a resilient agent to production takes rigorous engineering. These principles are the delta between the two.
            </p>
            <p className="font-[family-name:var(--font-geist-mono)] text-[10px] tracking-[0.2em] uppercase text-[var(--text-dim)] mt-3">
              — Zero to Agent Engineering Guide
            </p>
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
