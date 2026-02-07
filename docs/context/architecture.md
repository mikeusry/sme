# Architecture

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Astro + Tailwind CSS v4 |
| Backend | Medusa v2 (remote on Railway) |
| Images | Cloudinary (southland-organics) |
| Video | MUX (HLS streaming) |
| Deployment | Vercel (frontend SSR) |

## Project Structure

```
Soul-Miners-Eden/
├── frontend/                 # Astro frontend
│   ├── src/
│   │   ├── brand/           # Brand identity system
│   │   │   ├── BRAND_GUIDE.md
│   │   │   ├── VOICE_GUIDE.md
│   │   │   ├── COMPONENT_PATTERNS.md
│   │   │   └── design-tokens.css
│   │   ├── components/      # Astro components
│   │   │   ├── cart/        # Cart components
│   │   │   ├── products/    # Product components
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   └── ExperienceFarm.astro
│   │   ├── layouts/         # Page layouts
│   │   │   ├── MainLayout.astro
│   │   │   ├── BaseLayout.astro
│   │   │   └── AdminLayout.astro
│   │   ├── lib/             # TypeScript utilities
│   │   │   ├── medusa.ts    # Medusa v1 client
│   │   │   ├── medusa-v2.ts # Medusa v2 client
│   │   │   ├── cart-store.ts # Cart state
│   │   │   ├── products.ts  # Product data
│   │   │   ├── cloudinary.ts
│   │   │   ├── blog.ts
│   │   │   └── recipes.ts
│   │   ├── pages/
│   │   │   ├── admin/       # Admin tools
│   │   │   ├── api/         # API endpoints
│   │   │   ├── products/    # Product pages
│   │   │   ├── land-management/
│   │   │   ├── blog/
│   │   │   └── recipes/
│   │   └── styles/
│   │       └── global.css   # Tailwind v4 + utilities
│   ├── astro.config.mjs
│   └── package.json
│
├── content/                  # JSON content data
│   ├── pages/               # Page content
│   ├── products/            # Product data
│   └── blog/                # Blog posts
│
├── scripts/                  # Utility scripts
│   ├── parse-products.js    # Product structure
│   └── import-products.js   # Medusa import
│
├── data/                     # Generated data
│   └── products.json
│
└── docs/context/             # Documentation
```

## Why Astro?
- Zero JavaScript by default (faster load times)
- Partial hydration for interactive components
- File-based routing
- Excellent SEO
- SSR on Vercel for dynamic pages

## Why Medusa (Remote)?
- Open-source headless commerce
- Full cart/checkout/order management
- Hosted on Railway (no local setup needed)
- API-first architecture

## Key Integrations

### Cloudinary (Images)
- Cloud: `southland-organics`
- Folder: `Soul Miner's/`
- Components: `CloudinaryImage`, `ProductImage`, `HeroImage`, `Avatar`

### MUX (Video)
- HLS streaming for background videos
- Playback IDs stored per-page
- HLS.js for cross-browser support

### Medusa v2 (E-commerce)
- Remote backend: `https://backend-production-2bafd.up.railway.app`
- Cart stored in localStorage
- Full checkout flow implemented

## Commands

```bash
# Frontend development
cd frontend && npm run dev

# Build for production
cd frontend && npm run build

# Import products to Medusa
MEDUSA_ADMIN_EMAIL=x MEDUSA_ADMIN_PASSWORD=y node scripts/import-products.js
```

## Deployment

### Hosting Setup (Updated Feb 2026)

- **Frontend**: Vercel (`pointdog/frontend`)
  - Project ID: `prj_ZWR5JuBcsPgWn7Aw1ACdUMEYWmGo`
  - Production domain: `https://soulminerseden.com`
  - Auto-deploy from main branch
- **Backend**: Railway (`sme-backend` production)
  - Medusa v2 backend
  - URL: `https://backend-production-2bafd.up.railway.app`

### Environment Variables

All critical env vars configured via CLI (Feb 2026):

**Vercel (Frontend) - 12 variables:**

- Stripe: `PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY` (SME account)
- Medusa: `PUBLIC_MEDUSA_BACKEND_URL`, `MEDUSA_BACKEND_URL`
- Cloudinary: `PUBLIC_CLOUDINARY_CLOUD_NAME`, `PUBLIC_CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`, `PUBLIC_CLOUDINARY_FOLDER`
- Supabase: `PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_KEY` (point.dog instance)
- Site: `PUBLIC_SITE_NAME`, `PUBLIC_SITE_URL`

**Railway (Backend) - 2 variables:**

- Stripe: `STRIPE_API_KEY`, `STRIPE_PUBLISHABLE_KEY` (SME account)

**Note:** Previous deployments failed due to zero env vars. All config now in place.
