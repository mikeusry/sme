# Soul Miner's Eden

65-acre regenerative farm in Bogart, Georgia. This repo is the storefront.

**Cursor reads this file.** Do not treat `README.md`, `ROADMAP.md`, `TODO-NEXT-SESSION.md`, `SESSION_SUMMARY.md`, `HANDOFF.md`, `docker-compose.yml`, or `docs/archive/` as current.

## Live stack (2026-08-31)

| Layer | What is actually running |
|---|---|
| Site | https://www.soulminerseden.com (Vercel / Astro 5) |
| Local | `cd frontend && npm run dev` → http://localhost:4321 |
| Commerce | Medusa **v2** on Railway: `https://backend-production-2bafd.up.railway.app` |
| Browser cart | Same-origin `/api/medusa` → Railway. Never call Railway from the browser. |
| Checkout | Pay at pickup (`pp_system_default`). **No Stripe on the site.** |
| Images | Cloudinary `southland-organics` / `Soul Miner's/` |
| Video | MUX |

There is **no `backend/` folder**. `docker-compose.yml` points at a deleted local Medusa. Do not run it. Do not invent localhost:9000.

## Sell path

- Compost is the product. URL: `/products/compost/`. SKU handle: `humus-compost`. **$45 / yard.**
- A yard is the unit. Do not write explainer pages for free traffic (`/products/compost/` used to be “What is Composting?” — that killed add-to-cart).
- Homepage must sell compost (mobile: Buy Compost + Call).
- Next commerce hook is **Stripe**, not another platform.

## Do not

- Launch Chrome / Cursor browser / browser-use against Mike's accounts. He uses **Safari**. Give him the URL.
- Restore solar-grazing pages. Those routes 301 to `/land-management`.
- Use the Supabase MCP. Wrong project. Use `npx supabase` if you need it.
- Stage or commit unless Mike names the files. He commits from the Source Control sidebar.

## Brand

Sibling of Southland Organics, not a sub-brand. Positioning: *A regenerative farm in Bogart, Georgia.*

Read before visual or voice work:

- `frontend/src/brand/BRAND_GUIDE.md`
- `frontend/src/brand/VOICE_GUIDE.md`
- `frontend/src/brand/design-tokens.css`
- `frontend/src/brand/DESIGN_LOG.md`

Skill: `/design` (logo / color / review / check).

## Commands

```bash
cd frontend && npm run dev      # storefront
cd frontend && npm run build    # Vercel output
```

Cart client: `frontend/src/lib/medusa-v2.ts`
Proxy: `frontend/src/pages/api/medusa/[...path].ts`

## Docs that are still useful

- Farm economics → [Mothership](https://github.com/mikeusry/mothership/tree/main/docs/sme/farm) (moved 2026-09-26)
- `docs/context/architecture.md` — structure (stack table can be stale; this file wins)
- `frontend/src/brand/` — identity
