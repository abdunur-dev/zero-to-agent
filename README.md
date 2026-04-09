<div align="center">

# Zero to Agent — Community Companion

**A polished hub for builders joining the [Zero to Agent](https://community.vercel.com/host/zero-to-agent-2026) program** — the Vercel × Google DeepMind series from idea to shipped AI agent.

*Community-built. Not an official Vercel product.*

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)

**Live:** [zero-to-agent.community](https://zero-to-agent.community)

</div>

---

## Table of contents

- [What’s on the site](#whats-on-the-site)
- [Tech stack](#tech-stack)
- [Routes & APIs](#routes--apis)
- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Daily cron (events sync)](#daily-cron-events-sync)
- [Editing content](#editing-content)
- [Open Graph & SEO](#open-graph--seo)
- [Deploying](#deploying)
- [Trademark](#trademark)
- [Contributing](#contributing)

---

## What’s on the site

| Area | What you get |
|------|----------------|
| **Home** | Hero, lazy ASCII tunnel animation, “What is Zero to Agent”, step-by-step **Get Started**, Discord / social discovery |
| **Events** | Meetup-style listings (Luma), covers from `images.lumacdn.com`, loading states |
| **Resources** | Curated links (filterable), Vercel toolbox callouts, production-agent summary, **AI idea generator** |
| **Explainer** | Long-form “production-grade AI agent” guide |
| **FAQ** | Q&A from `data/faq.ts` |
| **Global UX** | Dark / light theme, dot grid + noise, scroll progress, scroll-to-top, toasts, reduced-motion respect |
| **Insights** | Vercel Analytics & Speed Insights |

The **idea generator** on `/resources` streams suggestions via the Vercel AI SDK + AI Gateway (`google/gemini-2.5-flash-lite`), with per-IP rate limits.

---

## Tech stack

| Layer | Choices |
|-------|---------|
| **Framework** | [Next.js 16](https://nextjs.org) (App Router, Server Components), Turbopack in dev |
| **UI** | React 19, [Tailwind CSS](https://tailwindcss.com) 3, [Geist](https://vercel.com/font) (Sans, Mono, Pixel) |
| **Motion** | [Framer Motion](https://www.framer.com/motion/), [Lucide](https://lucide.dev) icons |
| **Theming** | [next-themes](https://github.com/pacocoursey/next-themes), Sonner toasts |
| **AI** | [Vercel AI SDK](https://sdk.vercel.ai/docs) (`ai`, `@ai-sdk/react`, Gateway + OpenAI packages), [Zod](https://zod.dev) |
| **Platform** | [@vercel/analytics](https://vercel.com/analytics), [@vercel/speed-insights](https://vercel.com/speed-insights), [@vercel/blob](https://vercel.com/docs/storage/vercel-blob) |
| **Tooling** | TypeScript 5, ESLint 9 + `eslint-config-next`, [portless](https://www.npmjs.com/package/portless) for local dev (avoids port clashes) |
| **Extras** | `unicode-animations` (Braille loaders), dynamic OG image (`next/og` + Geist Pixel TTF) |

`next.config.ts` enables security headers, image remote patterns for Luma CDN, asset caching, and `experimental.inlineCss` + `optimizePackageImports` for lucide / framer-motion / geist.

---

## Routes & APIs

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/events` | Event explorer |
| `/resources` | Resource hub + AI idea generator |
| `/explainer` | Production agent guide |
| `/faq` | FAQ |
| `/opengraph-image` | Generated 1200×630 OG/Twitter image |
| `POST /api/generate-idea` | Streams one hackathon idea; needs AI Gateway auth |
| `GET /api/cron/sync-luma-sheet` | Cron-only: Firecrawl → merge → Blob → revalidate events (`Authorization: Bearer CRON_SECRET`) |

**Redirect:** `/ideas` → `/resources` (permanent).

---

## Getting started

```bash
git clone https://github.com/abdunur-dev/zero-to-agent.git
cd zero-to-agent
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
|--------|---------|
| `npm run dev` | `portless run --force next dev` (recommended) |
| `npm run dev:direct` | Plain `next dev` |
| `npm run dev:clean` | Clear `.next` (and cache) then dev |
| `npm run build` / `start` | Production build & server |
| `npm run lint` | ESLint |

---

## Environment variables

Values go in `.env.local` locally or in the Vercel project dashboard.

| Variable | When it’s needed |
|----------|------------------|
| `AI_GATEWAY_API_KEY` | Idea generator (`/api/generate-idea`). On Vercel, `VERCEL_OIDC_TOKEN` can be used instead when OIDC is wired for AI Gateway. |
| `CRON_SECRET` | Bearer secret for `/api/cron/sync-luma-sheet` (must match Vercel Cron auth). |
| `FIRECRAWL_API_KEY` | Full automated Luma sheet scrape in cron (see `lib/luma-sync`). |
| `BLOB_READ_WRITE_TOKEN` | Persist merged event JSON to Vercel Blob during cron. |
| `NEXT_PUBLIC_DISCORD_INVITE` | Override default Discord invite (`data/community.ts`). |
| `NEXT_PUBLIC_SITE_URL` | Non-production canonical URL override (preview / local). Production OG uses `https://zero-to-agent.community` from `lib/site-url.ts`. |

Never commit real secrets. `.env.local` should stay gitignored.

---

## Daily cron (events sync)

`vercel.json` schedules **`/api/cron/sync-luma-sheet`** at **08:00 UTC** daily. The handler:

1. Authenticates with `Authorization: Bearer <CRON_SECRET>`.
2. Runs `runLumaSheetSync()` (Firecrawl + static seed + optional Blob merge).
3. Calls `revalidateTag('luma-sheet', 'max')` so `/events` picks up fresh data.

`maxDuration` is **300s** for long Firecrawl runs on Fluid / Pro.

---

## Editing content

| What to change | File(s) |
|----------------|---------|
| Resource links & categories | `data/resources.ts` |
| FAQ copy | `data/faq.ts` |
| Event seed / slug → cover map | `data/events.ts` + sync pipeline in `lib/` |
| Discord URL / label | `data/community.ts` or `NEXT_PUBLIC_DISCORD_INVITE` |
| Vercel social links (footer) | `data/vercel-social.ts` |
| Site title, description, OG/Twitter text | `app/layout.tsx` |
| OG **visual** (layout, fonts, colors) | `app/opengraph-image.tsx` + `assets/fonts/GeistPixel-Square.ttf` |
| Nav & section anchors | `components/navigation.tsx` |
| Design tokens (light/dark) | `app/globals.css` (`:root`, `.dark`) |

**Maintainer scripts** (optional): `scripts/fetch-luma-covers.mjs`, `scripts/fix-one.mjs`, `scripts/debug-one.mjs` — helpers for Luma cover / HTML debugging (see file headers).

---

## Open Graph & SEO

- **`metadataBase`** and Open Graph URLs resolve to **`https://zero-to-agent.community`** in production (`lib/site-url.ts`).
- **`opengraph-image.tsx`** renders a 1200×630 PNG via `ImageResponse` (Geist Pixel + Geist Mono; pixel font uses TTF because Satori does not support WOFF2).
- Layout sets explicit `openGraph.images` and `twitter.images` to **`/opengraph-image`** so social crawlers see one stable image URL.

---

## Deploying

1. Push to GitHub and import the repo on [Vercel](https://vercel.com), or use `vercel` CLI.
2. Set the [environment variables](#environment-variables) your features need (at minimum AI Gateway for ideas; Blob + Firecrawl + `CRON_SECRET` for full cron).
3. Attach the custom domain **`zero-to-agent.community`** in the Vercel project and point DNS.

---

## Trademark

Vercel, the Vercel design, Next.js, v0, and related marks, designs, and logos are trademarks or registered trademarks of Vercel, Inc. or its affiliates in the US and other countries. This site is **not** affiliated with or endorsed by Vercel, Inc.

---

## Contributing

Issues and PRs are welcome. This is a community project: [github.com/abdunur-dev/zero-to-agent](https://github.com/abdunur-dev/zero-to-agent.git).

The repo may include **`.agents/`** skills and tooling for Cursor/Codex-style workflows; they are optional and not required to run the app.
