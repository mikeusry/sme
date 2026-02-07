# Scripts

Utility scripts for Soul Miner's Eden development and data management.

## Available Scripts

### parse-products.js

Generates structured product data from hardcoded catalog.

**Purpose:** Creates `data/products.json` with full product information including:
- Product details (name, slug, description, price, SKU)
- Categories (compost, mulch, soil, specialty)
- Images (Cloudinary public IDs)
- SEO metadata
- Benefits and applications

**Usage:**
```bash
node scripts/parse-products.js
```

**Output:** `data/products.json`

**Note:** Contains certification language that may need updating. See TODO-NEXT-SESSION.md.

---

### import-products.js

Imports products to Medusa v2 backend on Railway.

**Purpose:** Creates products in Medusa with:
- Product title, handle, description
- Single variant with USD pricing
- Published status

**Required Environment Variables:**
- `MEDUSA_ADMIN_EMAIL` - Admin account email
- `MEDUSA_ADMIN_PASSWORD` - Admin account password
- `MEDUSA_BACKEND_URL` (optional) - Defaults to Railway production URL

**Usage:**
```bash
MEDUSA_ADMIN_EMAIL=your@email.com MEDUSA_ADMIN_PASSWORD=yourpass node scripts/import-products.js
```

**Output:** Products created in Medusa backend

---

## Deleted Scripts (Archived)

The following one-time migration scripts were removed after completion:

| Script | Purpose | Status |
|--------|---------|--------|
| `migrate-images.js` | Generic Cloudinary migration | Never used (placeholder) |
| `migrate-product-images.js` | Upload product images to Cloudinary | Completed |
| `extract-crawl.js` | Extract content from website crawl JSON | Completed |

---

## Adding New Scripts

When adding new scripts:

1. Add proper JSDoc header with purpose and usage
2. Document required environment variables
3. Add entry to this README
4. Use consistent error handling and logging
