# Terry Mellway Fine Art Website

## Project Overview
Portfolio site for fine artist Terry Mellway. Built with Next.js (App Router) + Tailwind CSS v4.
Includes a local admin panel for managing gallery artworks and blog posts.

## Architecture
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 (CSS-based config, not tailwind.config.js)
- **Data**: JSON files (`src/data/gallery.json`, `src/data/blog.json`) as source of truth
- **Admin**: Admin panel at `/admin` with cookie-based auth (username: terry)
- **Data Layer**: `src/lib/data.js` — uses Cloudflare KV on Workers, filesystem locally
- **Auth**: `src/lib/auth.js` — HMAC token verification in each API route (no middleware)
- **Deployment**: Cloudflare Workers via GitHub Actions (auto-deploys on push to master)

## Key Directories
- `src/app/` — Pages (Next.js App Router)
- `src/app/admin/` — Admin panel pages (dashboard, gallery, blog management)
- `src/app/api/admin/` — API routes for CRUD operations (gallery, blog, upload)
- `src/components/` — Shared React components
- `src/components/admin/` — Admin-specific components
- `src/data/` — Gallery and blog data (JSON + JS wrappers)
- `src/hooks/` — Custom React hooks
- `public/images/` — All images organized by category
- `scripts/` — Utility scripts

## Color Palette
- Cream background: #FAF8F5
- Dark charcoal text: #2C2C2C
- Brown accent: #8B7355
- Sage green: #7A8B6F
- Warm gray: #E8E4DF

## Commands
- `npm run dev` — Start dev server (admin panel available at /admin)
- `npm run build` — Build with server (includes admin/API routes)
- `npm run build:cf` — Build for Cloudflare Workers via @opennextjs/cloudflare
- `npm run deploy` — Build + deploy to Cloudflare Workers
- `node scripts/build-static.js` — Build static export (admin excluded)

## Deployment
- **URL**: https://terry-mellway-art.terry-mellway.workers.dev
- **CI/CD**: `.github/workflows/deploy.yml` auto-deploys on push to master
- **KV Namespace**: `DATA` (ID: 79e46690f7db4e8789c27f32a80148d5)
- **Config**: `wrangler.jsonc` (Workers mode with `main` + `assets`)
- **Note**: `wrangler deploy` fails on Windows (WASM path bug); use GitHub Actions

## Content
- **Gallery**: 26 coloured pencil, 4 watercolour, 8 acrylic & oil works
- **Blog**: 19 blog posts
- **Contact**: Mailto link to 6artist6@gmail.com

## Data Architecture
- `src/data/gallery.json` — Source of truth for all artwork data
- `src/data/blog.json` — Source of truth for all blog posts
- `src/data/gallery.js` — Thin wrapper that imports JSON and re-exports named arrays
- `src/data/blog.js` — Thin wrapper that imports JSON and re-exports blogPosts
- `src/lib/data.js` — Unified data layer (Cloudflare KV on Workers, fs on local dev)
- API routes use `getGalleryData`/`setGalleryData`/`getBlogData`/`setBlogData` from `@/lib/data`
- Auth verification via `verifyAuth()` from `@/lib/auth` in each API route handler
