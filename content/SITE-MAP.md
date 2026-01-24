# Site Structure Map - Soul Miner's Eden

## Content Inventory

### Extracted from Crawl
| Content Type | Count | Status |
|--------------|-------|--------|
| Homepage | 1 | Extracted |
| Product Pages | 12 | Extracted |
| Blog Posts | 8 | Extracted |
| About Page | 1 | Extracted |
| Contact Page | 1 | Extracted |
| Recipes | 34 | Skipped (legacy) |
| Business Info | 1 | Extracted (JSON-LD) |

---

## Business Information

```
Name: Soul Miner's Eden
Address: 189 Luke Road, Bogart, GA 30622
Phone: +1-706-613-4415
Email: info@soulminerseden.com
Hours: Mo-Sa 08:00-18:00
Rating: 4.9/5 (47 reviews)

Social:
- Instagram: @soulminerseden
- Facebook: /soulminerseden
- YouTube: Playlist
```

---

## Page Mapping: Old Site → New Site

### Core Pages

| Old URL | New Route | Status | Source |
|---------|-----------|--------|--------|
| `/` | `/` | Exists | Needs update |
| `/about-us` | `/about` | **Build** | `content/pages/about.json` |
| `/contact-us` | `/contact` | **Build** | `content/pages/contact.json` |
| `/landscapes` | `/products` | Exists | - |
| N/A | `/land-management` | **Build** | `sme-summary.md` |
| N/A | `/resources` | **Build** | `sme-summary.md` |

### Product Pages

| Old URL | New Route | Status | Source |
|---------|-----------|--------|--------|
| `/landscapes/compost` | `/products/compost` | Exists | Rich content in crawl |
| `/landscapes/topsoil` | `/products/topsoil` | **Build** | `crawled-products.json` |
| `/landscapes/double-ground-hardwood-mulch` | `/products/double-ground-hardwood-mulch` | **Build** | `crawled-products.json` |
| `/landscapes/brown-mulch` | `/products/brown-mulch` | **Build** | `crawled-products.json` |
| `/landscapes/pine-bark-mulch` | `/products/pine-bark-mulch` | **Build** | `crawled-products.json` |
| `/landscapes/black-mulch` | `/products/black-mulch` | **Build** | `crawled-products.json` |
| `/landscapes/red-mulch` | `/products/red-mulch` | **Build** | `crawled-products.json` |
| `/landscapes/wood-chips` | `/products/wood-chips` | **Build** | `crawled-products.json` |
| `/landscapes/bioretention-soil` | `/products/bioretention-soil` | **Build** | `crawled-products.json` |
| `/landscapes/single-ground-mulch` | `/products/single-ground-mulch` | **Build** | `crawled-products.json` |
| `/landscapes/used-turf` | `/products/used-artificial-turf` | Exists | `crawled-products.json` |
| `/landscapes/sod-soil` | `/products/sod-soil` | **Build** | `crawled-products.json` |

### Blog Posts (Phase 2)

| Old URL | New Route | Notes |
|---------|-----------|-------|
| `/blog/farm-box-story` | `/blog/farm-box-story` | Origin story |
| `/blog/plant-care-for-beginners` | `/blog/plant-care-for-beginners` | Educational |
| `/blog/how-to-use-bloom` | Archive | Southland product |
| `/blog/introducing-bloom-fertilizer` | Archive | Southland product |
| `/blog/our-chicken-coop-build` | `/blog/chicken-coop-build` | Farm life |
| `/blog/growing-lettuce-and-launching` | Archive | Legacy |
| `/blog/nourish-your-body` | Archive | Legacy |
| `/blog/home-schoolers-visit` | `/blog/farm-visits` | Agritourism |

---

## New Site Structure

```
Soul-Miners-Eden/
├── / (home)
│   └── Exists - needs content update with real copy
│
├── /products
│   ├── /products (index) - Exists
│   ├── /products/compost - Exists (update with crawled content)
│   ├── /products/mulch - Category page (exists)
│   ├── /products/soil - Category page (exists)
│   ├── /products/specialty - Category page (exists)
│   └── /products/[slug] - Dynamic (exists)
│
├── /land-management (NEW)
│   ├── /land-management (landing)
│   ├── /land-management/how-it-works
│   ├── /land-management/services
│   └── /land-management/request
│
├── /resources (NEW)
│   ├── /resources (hub)
│   ├── /resources/calculator
│   ├── /resources/delivery
│   └── /resources/contractor-program
│
├── /about (NEW)
│   ├── /about (main)
│   ├── /about/our-story
│   └── /about/the-farm
│
├── /contact (NEW)
│
└── /blog (Phase 2)
    └── /blog/[slug]
```

---

## Priority Build Order

### Phase 1: Essential Pages (Now)
1. `/about` - Content ready from crawl
2. `/contact` - Content ready + business info
3. Update homepage with real business info

### Phase 2: Land Management (High Revenue)
4. `/land-management` - Landing page
5. `/land-management/services` - Service packages
6. `/land-management/request` - Request form

### Phase 3: Resources
7. `/resources` - Hub page
8. `/resources/calculator` - Exists in components
9. `/resources/delivery` - Delivery info
10. `/resources/contractor-program` - B2B focus

### Phase 4: Product Content Enhancement
11. Update product pages with full crawled content
12. Add rich content sections (how-to-use, applications, etc.)

### Phase 5: Blog (Later)
13. Set up blog structure
14. Migrate relevant posts

---

## Content Assets Available

### From Crawl
- Full about page copy with origin story
- Contact page intro
- 12 detailed product descriptions with:
  - Benefits lists
  - Applications
  - How-to-use guides
  - SEO titles/descriptions

### From Project Brief (`sme-summary.md`)
- Business model details
- Target audience profiles
- Land management service specs
- Pricing information
- SEO keyword strategy
- Value propositions
- Trust signals copy

### From Business Info
- Address, phone, email, hours
- Social links
- Rating (4.9/5, 47 reviews)
- Logo URL
- Google Business Profile

---

## Ready to Build

All content is extracted and ready. Start with:
1. `/about` page using `content/pages/about.json`
2. `/contact` page using `content/pages/contact.json` + `business-info.json`
