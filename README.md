# Soul Miner's Eden

Storefront for a 65-acre regenerative farm in Bogart, Georgia.

**Agents: read [AGENTS.md](AGENTS.md).** This README is for humans.

## Live

- Site: https://www.soulminerseden.com
- Frontend: Astro 5 on Vercel
- Commerce: Medusa v2 on Railway
- Checkout: pay at pickup. Stripe is not on the site.

## Local

```bash
cd frontend
cp .env.example .env.local   # if you don't have one
npm install
npm run dev                  # http://localhost:4321
```

Or from the repo root: `npm run dev`.

There is no local Medusa. Do not run `docker-compose` — it points at a deleted `backend/` folder.

## Cart

The browser talks to `/api/medusa`. That route proxies to Railway. Calling Railway from the browser breaks Add to Cart (CORS).

Compost sells at `/products/compost/` — $45 / yard, SKU `humus-compost`.

## Brand

`frontend/src/brand/` — guide, voice, tokens, design log.
