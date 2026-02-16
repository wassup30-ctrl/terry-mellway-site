# Terry Mellway Fine Art Website

## Project Overview
Portfolio site for fine artist Terry Mellway. Built with Next.js (App Router) + Tailwind CSS v4.
Includes a local admin panel for managing gallery artworks and blog posts.

## Architecture
- **Framework**: Next.js 16 with App Router
- **Styling**: Tailwind CSS v4 (CSS-based config, not tailwind.config.js)
- **Data**: JSON files (`src/data/gallery.json`, `src/data/blog.json`) as source of truth
- **Admin**: Local-only admin panel at `/admin` (excluded from static export)
- **Deployment**: Static files in `/out/` — deploy to Vercel, Netlify, or any static host

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
- `npm run build:static` — Build static export for deployment (admin excluded)
- `node scripts/download-images.js` — Re-download images from Wix CDN

## Content
- **Gallery**: 26 coloured pencil, 4 watercolour, 8 acrylic & oil works
- **Blog**: 19 blog posts
- **Contact**: Form via Formspree

## Data Architecture
- `src/data/gallery.json` — Source of truth for all artwork data
- `src/data/blog.json` — Source of truth for all blog posts
- `src/data/gallery.js` — Thin wrapper that imports JSON and re-exports named arrays
- `src/data/blog.js` — Thin wrapper that imports JSON and re-exports blogPosts
- API routes read/write JSON files directly for admin CRUD operations
