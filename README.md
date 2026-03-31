# Zero to Agent — Community Companion

A community-built companion site for builders participating in or exploring [Zero to Agent](https://community.vercel.com/host/zero-to-agent-2026) — the hackathon series organized by Vercel and Google DeepMind.

**Not an official Vercel product.** Community-built and maintained.

## What this site includes

- **Hero** — What Zero to Agent is and who it's for
- **What Is Zero to Agent** — Explainer with the four pillars
- **How to Get Started** — Step-by-step visual onboarding
- **Resource Hub** — Curated links to docs, tools, and community (filterable by category)
- **Event Explorer** — Event cards pulled from a Google Sheet
- **Build Ideas** — 12 project ideas to lower activation energy
- **Community Projects** — SQLite-backed showcase with submission form
- **FAQ** — 10 common questions answered
- **Footer** — Links, credits, trademark attribution

---

## Getting started

```bash
git clone https://github.com/New-Retr0/zero-to-agent.git
cd zero-to-agent
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Configuration

### Google Sheet for Events

The Event Explorer section pulls from a Google Sheet you configure.

**Steps:**
1. Create a Google Sheet with columns for event data (link, title, host, date, city are auto-detected)
2. Go to **File → Share → Publish to web → CSV**
3. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
4. Add it to your environment:

```bash
# .env.local
GOOGLE_SHEET_ID=your_sheet_id_here
```

The parser is defensive — if columns are missing, it gracefully falls back. The only hard requirement is that at least one column contains a valid URL.

### Community Project Submissions

Projects are stored in a local SQLite database (`data/projects.db`, gitignored).

**Submissions:**
- Users submit via the form in the Community Projects section
- All submissions are created with `approved = 0`
- Only `approved = 1` projects appear publicly

**Approving projects (currently manual SQL):**
```sql
-- Open the database
sqlite3 data/projects.db

-- List pending submissions
SELECT id, title, url, created_at FROM projects WHERE approved = 0;

-- Approve a project
UPDATE projects SET approved = 1 WHERE id = 1;
```

For production with higher volume, migrate to [Turso](https://turso.tech) (SQLite-compatible) or [Neon Postgres](https://neon.tech).

---

## Where to edit content

| What | File |
|---|---|
| Resource Hub links | `data/resources.ts` |
| FAQ questions & answers | `data/faq.ts` |
| Build ideas | `data/build-ideas.ts` |
| Sample/mock projects | `data/sample-projects.ts` |
| Event data source | `GOOGLE_SHEET_ID` env var + `lib/sheets.ts` |
| Site metadata / SEO | `app/layout.tsx` |
| Color tokens | `app/globals.css` (`:root` and `.dark`) |
| Nav links | `components/navigation.tsx` |

---

## How to swap mock data for real data

**Community Projects:**  
The project list defaults to `data/sample-projects.ts` when no approved database entries exist. Once you have approved submissions in the SQLite database, they will automatically replace the sample data — no code changes needed.

**Events:**  
Set `GOOGLE_SHEET_ID` in your environment. The mock/empty state disappears automatically.

---

## Tech stack

- [Next.js 15](https://nextjs.org) — App Router, Server Components
- [React 19](https://react.dev)
- [TypeScript](https://typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://framer.motion.com) — Animations
- [Geist](https://vercel.com/font) — Vercel's font (Sans + Mono)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3) — Project submissions database
- [Zod](https://zod.dev) — Schema validation
- [Sonner](https://sonner.emilkowal.ski) — Toast notifications
- [next-themes](https://github.com/pacocoursey/next-themes) — Dark/light mode
- [lucide-react](https://lucide.dev) — Icons

---

## Deploying

```bash
# Deploy to Vercel
npx vercel

# Set environment variables in Vercel dashboard or CLI
npx vercel env add GOOGLE_SHEET_ID
```

Note: `better-sqlite3` requires a native build. Vercel's Node.js runtime supports this. If you encounter issues, ensure your project is using the **Node.js** runtime (not Edge) for API routes.

---

## Trademark notice

Vercel, the Vercel design, Next.js, v0, and related marks, designs and logos are trademarks or registered trademarks of Vercel, Inc. or its affiliates in the US and other countries. This site is not affiliated with or endorsed by Vercel, Inc.

---

## Contributing

PRs welcome. This is a community project — open an issue or submit a PR on [GitHub](https://github.com/New-Retr0/zero-to-agent).
