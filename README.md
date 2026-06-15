# Viraj Gupta — Developer Portfolio

A production-ready developer portfolio built with **Next.js (App Router) +
TypeScript + Tailwind CSS v4**. Crimson-black tactical theme. Responsive project
grid, detailed case-study pages, GitHub/demo links, technical skills, measurable
results, and a contact CTA — all accessible, semantic, and mobile-first.

## Quick start

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (all case-study pages prerender)
npm start        # serve the production build
```

## Project structure

```
app/
  layout.tsx              # fonts, default metadata, skip-link, <Nav>, <Footer>
  page.tsx                # home: hero, results, featured grid, skills, contact
  projects/page.tsx       # full project grid
  projects/[slug]/page.tsx# case study (generateStaticParams + generateMetadata)
  about/page.tsx
  opengraph-image.tsx     # dynamic 1200×630 social card (next/og)
  sitemap.ts · robots.ts
components/                # Nav, Footer, Hero, ProjectCard/Grid, CaseStudy, …
content/projects.ts       # ⭐ single source of truth for all projects
lib/projects.ts           # data accessors
lib/site.ts               # identity, socials, skills, stats
public/images/            # generated SVG cover/hero art
scripts/generate-art.mjs  # regenerates the SVG art
```

## Implementation notes

### Reusable project cards
`components/ProjectCard.tsx` is driven entirely by a `Project` object from
`content/projects.ts`. The **whole card is a single `<Link>`** (no nested
interactive elements) so it's one clean keyboard stop and one large touch
target. `ProjectGrid` lays cards out mobile-first: 1 → 2 → 3 columns.

### Case-study routing
Case studies live at `/projects/[slug]`. Slugs come from the projects array via
`generateStaticParams`, so every page is **statically prerendered** at build
time. `getProjectBySlug` + `notFound()` handle unknown slugs. To add a project,
add one object to `content/projects.ts` — the card, grid, case-study page,
sitemap, and per-page OG metadata all update automatically.

### Image optimization
All art is served through `next/image` (`fill` + `sizes`) for responsive
`srcset`, lazy-loading, and AVIF/WebP conversion of raster sources. Covers/hero
are **locally generated SVG** (`scripts/generate-art.mjs`) — zero-cost,
razor-sharp at any size, and first-party (so `dangerouslyAllowSVG` is safe; the
CSP in `next.config.ts` sandboxes them). Replace any file in `public/images/`
with your own art using the same filename and nothing else changes.

> **Swapping in AI art later:** Higgsfield/Pollinations both now require paid
> credits. If you get credits, generate 16:9 covers + a wide hero with prompts
> like: *"dark crimson-black abstract neural/tactical HUD, cinematic, glowing
> orb, fine grid"* (Achilles), *"chest X-ray with neural-network overlay, red
> and black"* (lung-care), etc. Save them over the matching files in
> `public/images/` (any format — update the extension in `content/projects.ts`
> and `components/Hero.tsx` if not `.svg`).

### Metadata / SEO
- Root defaults + title template in `app/layout.tsx` (`metadataBase`,
  OpenGraph, Twitter).
- Per-case-study `generateMetadata` (title, description, project OG image).
- `sitemap.ts` and `robots.ts` are generated from the projects list.
- `app/opengraph-image.tsx` renders a branded social card with `next/og`.

### Accessibility
Semantic landmarks (`header`/`nav`/`main`/`footer`, `section[aria-labelledby]`),
skip-to-content link, visible `:focus-visible` rings, `aria-current` on the
active nav item, alt text on every image, AA contrast, and a
`prefers-reduced-motion` block that disables animation.

## Configure it for you

Edit **`lib/site.ts`** (name, role, email, socials, stats, skills) and
**`content/projects.ts`** (projects + case studies). Search the code for `TODO`
to find the handful of placeholders:
- Achilles demo video → drop a file at `public/videos/achilles-demo.mp4`, or set
  `links.video` to a YouTube/Loom URL in `content/projects.ts`.
- `site.url` → your real domain (used for absolute OG/canonical URLs).
- LinkedIn / Fiverr URLs in `lib/site.ts`.

## Deploy (Vercel)

1. Push this folder to a new GitHub repo.
2. Import it at [vercel.com/new](https://vercel.com/new) — framework auto-detects
   as Next.js; no env vars needed.
3. Set `site.url` in `lib/site.ts` to your production domain and redeploy so OG
   and sitemap URLs are absolute.

Static export to any host also works (`output: "export"` in `next.config.ts`) —
remove `app/opengraph-image.tsx` first if you do, since dynamic OG needs the
Node runtime.
