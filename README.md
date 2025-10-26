# Soul Miners E-Commerce Platform

A modern, full-stack e-commerce platform built with Astro, Tailwind CSS, and Medusa.

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Docker and Docker Compose (recommended)
- PostgreSQL 15+ (if not using Docker)
- Redis 7+ (if not using Docker)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Soul-Miners-Eden
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Frontend
   cp frontend/.env.example frontend/.env

   # Backend
   cp backend/.env.example backend/.env
   ```

   Edit both `.env` files with your configuration.

4. **Start with Docker (Recommended)**
   ```bash
   docker-compose up -d
   ```

   This starts PostgreSQL, Redis, and the Medusa backend.

5. **Run database migrations**
   ```bash
   npm run migrate --workspace=backend
   ```

6. **Start development servers**
   ```bash
   npm run dev
   ```

   Access:
   - Frontend: http://localhost:4321
   - Backend API: http://localhost:9000
   - Admin Dashboard: http://localhost:9000/app

### Without Docker

If you prefer running services locally:

```bash
# Start PostgreSQL on port 5432
# Start Redis on port 6379

# Update .env files with connection strings
# DATABASE_URL=postgresql://user:pass@localhost:5432/soul_miners_medusa
# REDIS_URL=redis://localhost:6379

# Run migrations
npm run migrate --workspace=backend

# Start dev servers
npm run dev
```

## Project Structure

```
Soul-Miners-Eden/
├── frontend/          # Astro + Tailwind CSS
├── backend/           # Medusa backend
├── docker-compose.yml # Local development setup
└── package.json       # Monorepo configuration
```

## Tech Stack

### Frontend
- **Framework**: Astro 4.x
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Custom components with Tailwind
- **API Client**: Medusa JS SDK
- **Deployment**: Vercel

### Backend
- **Commerce Platform**: Medusa 1.x
- **Database**: PostgreSQL 15
- **Cache**: Redis 7
- **Payments**: Stripe
- **Fulfillment**: Custom local delivery + Manual
- **Deployment**: Railway

## Features

- Modern, responsive UI with Tailwind CSS
- Product catalog with collections
- Shopping cart functionality
- Stripe payment integration
- Custom local delivery options:
  - Standard (3-5 days) - $5.99
  - Express (1-2 days) - $12.99
  - Same Day - $19.99
- Admin dashboard for managing products and orders
- Docker support for easy local development
- Railway-ready backend deployment

## Development

### Frontend Development

```bash
# Run frontend only
npm run dev:frontend

# Build frontend
npm run build:frontend
```

The frontend uses Astro's file-based routing. Add new pages in `frontend/src/pages/`.

### Backend Development

```bash
# Run backend only
npm run dev:backend

# Build backend
npm run build:backend
```

Create custom endpoints in `backend/src/api/` and services in `backend/src/services/`.

### Medusa Admin

Access at http://localhost:9000/app

**First-time setup:**
1. Create admin account
2. Configure regions (e.g., United States, USD)
3. Add products and collections
4. Set up shipping options
5. Configure payment providers

## Deployment

### Frontend (Vercel)

1. Connect repository to Vercel
2. Configure build:
   - Build Command: `npm run build --workspace=frontend`
   - Output Directory: `frontend/dist`
3. Add environment variables:
   - `PUBLIC_MEDUSA_BACKEND_URL`
   - `PUBLIC_STRIPE_PUBLISHABLE_KEY`
4. Deploy

### Backend (Railway)

See detailed guide in [backend/RAILWAY_DEPLOYMENT.md](backend/RAILWAY_DEPLOYMENT.md)

Quick steps:
```bash
cd backend
railway init
railway up
```

Configure these Railway environment variables:
- `DATABASE_URL` (from Railway PostgreSQL)
- `REDIS_URL` (from Railway Redis)
- `JWT_SECRET`
- `COOKIE_SECRET`
- `STRIPE_API_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `MEDUSA_BACKEND_URL`

## Environment Variables

### Frontend

| Variable | Description | Example |
|----------|-------------|---------|
| `PUBLIC_MEDUSA_BACKEND_URL` | Medusa API URL | `http://localhost:9000` |
| `PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe public key | `pk_test_...` |
| `PUBLIC_SITE_NAME` | Site name | `Soul Miners` |

### Backend

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection | `postgresql://...` |
| `REDIS_URL` | Redis connection | `redis://localhost:6379` |
| `JWT_SECRET` | JWT secret (32+ chars) | `your-secret-key` |
| `COOKIE_SECRET` | Cookie secret (32+ chars) | `your-secret-key` |
| `STRIPE_API_KEY` | Stripe secret key | `sk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | `whsec_...` |
| `STORE_CORS` | Frontend URLs for CORS | `http://localhost:4321` |
| `ADMIN_CORS` | Admin URLs for CORS | `http://localhost:9000` |

## Docker Commands

```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# View logs
docker-compose logs -f

# Rebuild backend
docker-compose up -d --build backend

# Reset database (WARNING: deletes data)
docker-compose down -v
```

## API Documentation

The backend provides a full REST API. Key endpoints:

- `GET /store/products` - List products
- `POST /store/carts` - Create cart
- `POST /store/carts/:id/line-items` - Add to cart
- `POST /store/carts/:id/complete` - Checkout

Full API docs: https://docs.medusajs.com/api/store

## Customization

### Adding Products

1. Go to Admin Dashboard (http://localhost:9000/app)
2. Navigate to Products
3. Click "New Product"
4. Fill in details and upload images
5. Click "Publish"

### Modifying Styles

Edit `frontend/tailwind.config.js` for theme customization:

```javascript
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ },
    }
  }
}
```

### Custom API Endpoints

Create in `backend/src/api/`:

```typescript
// backend/src/api/custom/route.ts
export async function GET(req, res) {
  res.json({ message: "Hello" })
}
```

## Troubleshooting

### Port Already in Use

Change ports in `docker-compose.yml` or kill processes:

```bash
lsof -ti:9000 | xargs kill -9  # Kill process on port 9000
```

### Database Connection Failed

Ensure PostgreSQL is running:

```bash
docker-compose ps  # Check service status
docker-compose logs postgres  # View logs
```

### Frontend Build Errors

Clear cache and reinstall:

```bash
rm -rf frontend/node_modules frontend/.astro
npm install --workspace=frontend
```

## Documentation

- [Full Documentation](.claude-context.md)
- [Railway Deployment Guide](backend/RAILWAY_DEPLOYMENT.md)
- [Astro Docs](https://docs.astro.build)
- [Medusa Docs](https://docs.medusajs.com)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT

## Support

For issues or questions:
- Check [Documentation](.claude-context.md)
- Open an issue on GitHub
- Contact the development team

---

Built with ❤️ using Astro, Medusa, and Tailwind CSS
