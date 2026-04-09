import { streamText } from 'ai'
import { gateway } from 'ai'

const SYSTEM_PROMPT = `You are a creative product advisor for Zero to Agent — a Vercel + Google DeepMind hackathon where builders ship from idea to deployed AI agent in one day on the Vercel platform.

Generate ONE specific, concrete AI agent or agent-adjacent product idea. Requirements:
- Solves a real problem for real users (not a toy demo or vague "chatbot")
- Feels fresh and specific — avoid generic labels like "AI assistant" without a sharp angle
- Realistically shippable in ~24 hours by a motivated beginner-to-intermediate developer
- Ground the build in the Vercel ecosystem: pick a believable combo from the pool below (use 2–5 named items per idea; vary them across generations — do not repeat the same stack every time)

Ecosystem pool (mix and match where it fits — you do not need all of these):
- **App & deploy:** Next.js (App Router), React Server Components, deploy to Vercel, Preview Deployments, Edge Middleware, Fluid / Fluid Compute when latency or long-running work matters
- **AI runtime:** Vercel AI SDK (streaming UI, tools, structured output, agents), optional AI Gateway for models and routing
- **UI & speed:** v0 by Vercel for screens and components; AI Elements for chat/agent UI patterns when relevant
- **Data & state:** Vercel Blob for uploads; Vercel KV or Edge Config for flags and fast reads; Marketplace Postgres (e.g. Neon) or Redis (e.g. Upstash) when persistence or queues help
- **Ops & quality:** Speed Insights, Web Analytics, Observability / logs for debugging agents in production
- **Orchestration (advanced):** Workflow DevKit or Queues only when the idea truly needs durable steps — otherwise keep the architecture simple for a day build

Format your response exactly like this — no preamble, no markdown outside this pattern:

**[Idea Name]**
[One punchy sentence: what it does, for whom, and the hook]

**Why build it:** [One sentence on real-world value]
**Vercel stack:** [Comma-separated list of 2–5 concrete pieces from the ecosystem pool, e.g. "Next.js App Router, AI SDK + tools, v0, deploy on Vercel, Blob"]
**Tech angle:** [One sentence: main user flow + how streaming/tools/data fit together]
**Difficulty:** [Beginner / Intermediate / Advanced]
**Tags:** [3–4 lowercase comma-separated tags, include one stack-related tag when natural, e.g. "ai-sdk", "v0", "nextjs"]`

const DAILY_LIMIT = 5

const rateLimitStore = new Map<string, { count: number; resetAt: number }>()

function getRateLimitInfo(ip: string): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now()
  const entry = rateLimitStore.get(ip)

  if (!entry || now >= entry.resetAt) {
    const resetAt = now + 24 * 60 * 60 * 1000
    rateLimitStore.set(ip, { count: 1, resetAt })
    return { allowed: true, remaining: DAILY_LIMIT - 1, resetAt }
  }

  if (entry.count >= DAILY_LIMIT) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt }
  }

  entry.count++
  return { allowed: true, remaining: DAILY_LIMIT - entry.count, resetAt: entry.resetAt }
}

// Periodically clean expired entries to prevent memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateLimitStore) {
    if (now >= entry.resetAt) rateLimitStore.delete(ip)
  }
}, 60 * 60 * 1000)

export async function POST(request: Request) {
  if (!process.env.AI_GATEWAY_API_KEY && !process.env.VERCEL_OIDC_TOKEN) {
    return new Response(
      JSON.stringify({ error: 'AI Gateway not configured. Set AI_GATEWAY_API_KEY in your environment.' }),
      { status: 503, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded?.split(',')[0]?.trim() || 'unknown'
  const { allowed, remaining, resetAt } = getRateLimitInfo(ip)

  if (!allowed) {
    const retryAfter = Math.ceil((resetAt - Date.now()) / 1000)
    return new Response(
      JSON.stringify({ error: 'Rate limit exceeded. Try again tomorrow.', remaining: 0 }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(retryAfter),
          'X-RateLimit-Limit': String(DAILY_LIMIT),
          'X-RateLimit-Remaining': '0',
        },
      }
    )
  }

  try {
    const result = streamText({
      model: gateway('google/gemini-2.5-flash-lite'),
      system: SYSTEM_PROMPT,
      prompt:
        'Generate one fresh AI agent idea for a Zero to Agent attendee. Make the Vercel stack line specific and varied — different products than a generic "Next.js + AI SDK" every time when another combo fits better.',
      maxOutputTokens: 400,
      temperature: 1.0,
    })

    const response = result.toUIMessageStreamResponse({
      getErrorMessage: async (error) => {
        const errorMessage = error instanceof Error ? error.message : String(error)
        
        // Handle AI Gateway authentication errors
        if (errorMessage.includes('customer_verification_required') || errorMessage.includes('credit card') || errorMessage.includes('verification')) {
          return 'AI service requires account verification. Please add a payment method to your Vercel account.'
        }

        // Handle other AI Gateway errors
        if (errorMessage.includes('AI Gateway')) {
          return 'AI service temporarily unavailable. Try again in a moment.'
        }

        // Generic error fallback
        return 'Failed to generate idea. Try again shortly.'
      }
    })

    response.headers.set('X-RateLimit-Limit', String(DAILY_LIMIT))
    response.headers.set('X-RateLimit-Remaining', String(remaining))

    return response
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error)
    
    // Handle AI Gateway authentication errors
    if (errorMessage.includes('customer_verification_required') || errorMessage.includes('credit card') || errorMessage.includes('verification')) {
      return new Response(
        JSON.stringify({ error: 'AI service requires account verification. Please add a payment method to your Vercel account.' }),
        { status: 402, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Handle other AI Gateway errors
    if (errorMessage.includes('AI Gateway')) {
      return new Response(
        JSON.stringify({ error: 'AI service temporarily unavailable. Try again in a moment.' }),
        { status: 503, headers: { 'Content-Type': 'application/json' } }
      )
    }

    // Generic error fallback
    console.error('[generate-idea] Unexpected error:', error)
    return new Response(
      JSON.stringify({ error: 'Failed to generate idea. Try again shortly.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
