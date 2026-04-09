export interface FaqItem {
  question: string
  answer: string
}

export const faqItems: FaqItem[] = [
  {
    question: 'Do I need to know how to code?',
    answer: "Not necessarily. Tools like v0 by Vercel let you build real apps and agents using natural language prompts. You'll need to understand what you're building well enough to guide the AI — but you don't need years of programming experience to ship something real.",
  },
  {
    question: 'What counts as a real agent?',
    answer: "A real agent uses AI to reason, plan, and act — not just respond. Examples: a tool that searches the web and synthesizes results, a system that reads documents and extracts structured data, or a chatbot connected to your own knowledge base. If it takes in a request, does multiple things autonomously, and produces a useful result, it qualifies.",
  },
  {
    question: 'Do I need to deploy my project?',
    answer: "For Zero to Agent events, yes — judges and mentors expect a working deployed URL. Vercel makes this free and fast. A deployed project is also much easier to share, get feedback on, and continue improving after the event.",
  },
  {
    question: 'Can beginners participate?',
    answer: "Absolutely. Zero to Agent is explicitly designed to meet builders where they are. Beginners have shipped real, useful projects. The key is narrowing scope — build something small that works completely, rather than something ambitious that doesn't load.",
  },
  {
    question: 'Where do I get help during an event?',
    answer:
      "Every Zero to Agent event has mentors on-site. The Zero to Agent Telegram and Vercel community forum are also active. For technical questions about the AI SDK, v0, or Next.js, the official docs have most answers. And this site's Resource Hub links to the most useful places.",
  },
  {
    question: 'Can I work on my project after the event?',
    answer: "Yes, and you should. The event is a forcing function to get a v1 done. What you build after — iterating, improving, adding features — is where real products come from. Submit your post-event project here when it's ready.",
  },
  {
    question: 'Is this site official?',
    answer: "No. This is a community-built companion, not an official Vercel product. Zero to Agent events are organized by Vercel and Google DeepMind. This site exists to support the community of builders participating in or interested in the program. Vercel and related marks are trademarks of Vercel, Inc.",
  },
  {
    question: 'What is the Vercel AI SDK?',
    answer: "It's a TypeScript library that makes it easy to build AI-powered applications. It handles streaming, tool calling, structured output, agent orchestration, and works with all major model providers (OpenAI, Anthropic, Google Gemini, and more). It's the recommended way to build agents for Zero to Agent.",
  },
  {
    question: 'Can I use Google Gemini?',
    answer: "Yes, and it's especially relevant for Zero to Agent events since Google DeepMind is a partner. Gemini's multimodal capabilities (vision, reasoning, long context) make it well-suited for agents that need to see, read, and reason across complex inputs.",
  },
]
