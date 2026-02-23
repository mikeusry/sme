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
│   │   │   ├── ExperienceFarm.astro
│   │   │   ├── InstagramFeed.astro  # Curated IG embed grid
│   │   │   └── SocialShare.astro    # Share buttons (Web Share API + fallbacks)
│   │   ├── layouts/         # Page layouts
│   │   │   ├── MainLayout.astro
│   │   │   ├── BaseLayout.astro
│   │   │   └── AdminLayout.astro
│   │   ├── lib/             # TypeScript utilities
│   │   │   ├── medusa.ts    # Medusa v1 client
│   │   │   ├── medusa-v2.ts # Medusa v2 client
│   │   │   ├── medusa-admin.ts # Admin API (JWT auth)
│   │   │   ├── cart-store.ts # Cart state
│   │   │   ├── products.ts  # Product data
│   │   │   ├── social.ts    # Social platforms, share URLs, icons
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
│   ├── products.json
│   └── instagram-feed.json  # Curated IG posts (shortcode + pillar)
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

## Pre-Order & Pickup Scheduling System

Built Feb 2026 to support Soul Miner's Eden honor stand business model.

### Business Model

**Honor Stand**: 24/7 self-serve farm store at 189 Luke Road, Bogart, GA 30622
- Customers browse online, order in advance
- Pick up products from the honor stand at scheduled time
- Optional delivery service available ($40 base + $1.25/mile after 20 miles)

### Technical Architecture

**Core Library**: `src/lib/pickup-scheduling.ts`
- Type definitions for fulfillment methods and time slots
- Helper functions for date range generation, schedule persistence
- Medusa cart metadata integration

**Components**:
- `FulfillmentChoice.astro` - Radio selection between pickup (FREE) and delivery
- `PickupTimeSlot.astro` - Date dropdown + 4 time slot options + optional notes

**Pages**:
- `/checkout-new` - 4-step integrated checkout flow (contact → fulfillment → address* → payment)
- `/cart` - Displays selected fulfillment schedule in order summary
- `/admin/orders` - Order fulfillment dashboard with pickup date grouping
- `/demo/pickup-scheduling` - Component showcase and testing page

### Data Storage

Pickup schedule stored in **Medusa cart metadata** as `fulfillment` object:

```json
{
  "method": "pickup",
  "pickupDate": "2026-02-15",
  "timeSlot": "morning",
  "notes": "Looking for fresh eggs"
}
```

### Fulfillment Options

| Method | Cost | Description |
|--------|------|-------------|
| **Pickup** | FREE | 24/7 access to honor stand, choose preferred time window |
| **Delivery** | $40 base + $1.25/mile | Delivery from Bogart, GA (calculated based on distance) |

### Time Windows

| Slot | Hours | Best For |
|------|-------|----------|
| **Anytime** | 24/7 | Flexible schedule, honor stand always accessible |
| **Morning** | 8 AM - 12 PM | Fresh eggs & dairy |
| **Afternoon** | 12 PM - 5 PM | Less crowded |
| **Evening** | 5 PM - 7 PM | After-work pickup |

### Booking Window

- **Advance booking**: 14 days starting tomorrow (24hr prep time)
- **Date selection**: Dynamically populated dropdown with human-readable dates
- **Conditional flow**: Pickup orders skip address step in checkout

### Order Status Workflow

```
confirmed → awaiting_pickup → ready → collected
                           ↘ out_for_delivery → delivered
```

### Admin Dashboard

**Location**: `/admin/orders`

**Features**:
- Stats cards: Today's pickups, this week, pending delivery, revenue
- Filter pills: All/Today/Pickup/Delivery/Ready/Collected
- Orders grouped by pickup date
- Quick actions: Mark Ready, Mark Collected, View Details, Contact Customer
- Real-time data from Medusa API (live integration ✓)
- Server-side admin authentication with JWT token caching
- Email notification system (placeholder ready for SendGrid/Resend)

**API Endpoints**:
- `GET /api/admin/orders` - Fetch all orders with pickup metadata
- `POST /api/admin/orders/[id]/mark-ready` - Mark order ready + send notification
- `POST /api/admin/orders/[id]/mark-collected` - Mark order collected

**Admin Authentication**:
- Uses `src/lib/medusa-admin.ts` for authenticated admin API calls
- JWT token cached for 23 hours, auto-refreshes on expiry
- Requires `MEDUSA_ADMIN_EMAIL` and `MEDUSA_ADMIN_PASSWORD` env vars

### Email Notifications

**System**: `src/lib/notifications.ts`

**Notification Types**:
- Order confirmation (on checkout completion)
- Ready for pickup (when admin marks order ready)
- Pickup reminder (day before scheduled pickup)

**Status**: Placeholder implementation (logs to console)

**Next Step**: Wire to SendGrid, Resend, or similar service

### Completed Features (Feb 2026)

- ✅ Pickup scheduling system with date + time slot selection
- ✅ Integrated checkout flow (4 steps: contact → fulfillment → address → payment)
- ✅ Admin order management dashboard
- ✅ Real-time Medusa API integration
- ✅ Server-side admin authentication
- ✅ Email notification infrastructure
- ✅ Component demo page for development

### Future Enhancements

- Wire email notifications to SendGrid/Resend (templates ready)
- SMS notifications for pickup reminders (Twilio integration)
- Inventory availability checking (Medusa inventory API)
- Calendar view for pickup scheduling
- Admin fulfillment checklist workflow
- Customer order history page (`/account/orders`)

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

**Admin Authentication (Frontend) - 2 variables:**

- Medusa Admin: `MEDUSA_ADMIN_EMAIL`, `MEDUSA_ADMIN_PASSWORD` (for server-side admin API calls)

**Optional - Email Notifications:**

- SendGrid: `SENDGRID_API_KEY`, `SENDGRID_FROM_EMAIL`
- OR Resend: `RESEND_API_KEY`, `RESEND_FROM_EMAIL`
- OR SMTP: `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`

**Note:** Previous deployments failed due to zero env vars. All critical config now in place (Feb 2026).
