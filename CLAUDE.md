# Terry Mellway Fine Art Website

## Project Overview
Static portfolio site for fine artist Terry Mellway. Built with Next.js (App Router) + Tailwind CSS v4.

## Architecture
- **Framework**: Next.js 16 with static export (`output: 'export'`)
- **Styling**: Tailwind CSS v4 (CSS-based config, not tailwind.config.js)
- **Deployment**: Static files in `/out/` — deploy to Vercel, Netlify, or any static host

## Key Directories
- `src/app/` — Pages (Next.js App Router)
- `src/components/` — Shared React components
- `src/data/` — Gallery and blog data
- `src/hooks/` — Custom React hooks
- `public/images/` — All images organized by category
- `scripts/` — Utility scripts (image download)

## Color Palette
- Cream background: #FAF8F5
- Dark charcoal text: #2C2C2C
- Brown accent: #8B7355
- Sage green: #7A8B6F
- Warm gray: #E8E4DF

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Build static site
- `node scripts/download-images.js` — Re-download images from Wix CDN

## Content
- **Gallery**: 26 coloured pencil, 4 watercolour, 8 acrylic & oil works
- **Blog**: 19 blog posts
- **Contact**: Form via Formspree
