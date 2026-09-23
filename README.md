# Anime Breaker Reference

Independent player reference for the Roblox game **Anime Breaker** — working codes,
secret boss locations and drops, companions, pets, races, shadows and the Update 1.5
Class Tree. Every fact carries a source label; gaps are printed, not filled with
guesses.

## Stack

Next.js 16 (App Router, `output: export`) · Tailwind v4 · shadcn/ui · Geist ·
Phosphor icons · Cloudflare Workers (static assets via wrangler).

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000
pnpm build      # static export → ./out
```

## Data rules

`src/data/game.json` is the single source of truth. Two labels only:

- **verified** — two independent sources, or measured from the game's own UI
- **creator-reported** — seen in one creator's footage, not yet cross-checked

Anything with no source goes in `gaps` (surfaced on `/about`), never in a table.

## Deploy

Push to `main` → Cloudflare Git integration builds and deploys. Never rely on local
`wrangler deploy` — the next CI push rebuilds from git and silently overwrites it.

Set `NEXT_PUBLIC_SITE_URL` in the build environment; the fallback in
`src/lib/site.ts` is the real domain.
