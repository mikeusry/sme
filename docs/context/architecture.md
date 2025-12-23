# Architecture

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Astro + Tailwind CSS |
| Backend | Medusa (Node.js e-commerce) |
| Database | PostgreSQL |
| Cache/Events | Redis |
| Payments | Stripe |
| Deployment | Vercel (frontend) + Railway (backend) |
| Containerization | Docker |

## Project Structure

```
Soul-Miners-Eden/
├── frontend/                 # Astro frontend
│   ├── src/
│   │   ├── components/      # Header, Footer, etc.
│   │   ├── layouts/         # BaseLayout, MainLayout
│   │   ├── pages/           # index, products/, cart, checkout
│   │   ├── lib/
│   │   │   └── medusa.ts    # Medusa API client
│   │   └── styles/
│   ├── tailwind.config.js
│   ├── astro.config.mjs
│   └── package.json
│
├── backend/                  # Medusa backend
│   ├── src/
│   │   ├── api/             # Custom API endpoints
│   │   ├── services/        # local-delivery-fulfillment.ts
│   │   ├── models/
│   │   ├── repositories/
│   │   └── subscribers/
│   ├── medusa-config.ts
│   ├── Dockerfile
│   ├── railway.json
│   └── package.json
│
├── docker-compose.yml        # Local dev environment
├── scripts/                  # Utility scripts
└── data/                     # Seed data
```

## Why Astro?
- Zero JavaScript by default (faster load times)
- Partial hydration for interactive components
- File-based routing
- Excellent SEO

## Why Medusa?
- Open-source headless commerce
- Built on Node.js
- Extensive API for products, carts, orders
- Plugin architecture
- Built-in admin dashboard

## Commands

```bash
# Root level
docker-compose up -d    # Start PostgreSQL + Redis

# Frontend
cd frontend && npm run dev

# Backend
cd backend && npm run dev
```

## Deployment

- **Frontend**: Vercel
- **Backend**: Railway
- See `RAILWAY_DEPLOYMENT.md` for backend setup
