# Component Library - Soul Miner's Eden

Design system following Tremor.so aesthetic: clean layouts, generous whitespace, subtle borders over heavy shadows, muted palette with purposeful accents, typography prioritizing readability.

---

## Quick Reference

| Component | Location | Purpose |
|-----------|----------|---------|
| `MainLayout` | `layouts/MainLayout.astro` | Full page wrapper with Header/Footer |
| `BaseLayout` | `layouts/BaseLayout.astro` | HTML skeleton (head, meta, fonts) |
| `AdminLayout` | `layouts/AdminLayout.astro` | Admin page wrapper with sidebar |
| `Header` | `components/Header.astro` | Site navigation, mobile menu, cart |
| `Footer` | `components/Footer.astro` | Site footer, links, trust signals |
| `ExperienceFarm` | `components/ExperienceFarm.astro` | Farm visit CTA section |
| `CloudinaryImage` | `components/CloudinaryImage.astro` | Base image component with Cloudinary |
| `ProductImage` | `components/ProductImage.astro` | Product-specific image variants |
| `HeroImage` | `components/HeroImage.astro` | Full-width banner images |
| `Avatar` | `components/Avatar.astro` | Circular profile images |
| `ProductCard` | `components/products/ProductCard.astro` | Product grid card |
| `MaterialCalculator` | `components/products/MaterialCalculator.astro` | Volume calculator widget |
| `AddToCartButton` | `components/cart/AddToCartButton.astro` | Interactive add-to-cart button |
| `CartIcon` | `components/cart/CartIcon.astro` | Cart icon with badge count |

---

## Layouts

### MainLayout
**Location:** `frontend/src/layouts/MainLayout.astro`

Full page wrapper including Header and Footer.

```astro
---
import MainLayout from '../layouts/MainLayout.astro';
---
<MainLayout title="Page Title" description="SEO description">
  <!-- Page content -->
</MainLayout>
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | Yes | Page title for SEO |
| `description` | string | No | Meta description |

### BaseLayout
**Location:** `frontend/src/layouts/BaseLayout.astro`

HTML skeleton without Header/Footer. Use for custom layouts.

### AdminLayout
**Location:** `frontend/src/layouts/AdminLayout.astro`

Admin page wrapper with sidebar navigation.

```astro
---
import AdminLayout from '../../layouts/AdminLayout.astro';
---
<AdminLayout title="Dashboard" description="Admin overview">
  <!-- Admin content -->
</AdminLayout>
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | string | Yes | Page title |
| `description` | string | No | Meta description |

**Features:**
- Sidebar with admin navigation links
- No public Header/Footer
- Dashboard, Brand Guide, AI Detection links

---

## Core Components

### Header
**Location:** `frontend/src/components/Header.astro`

Site navigation with:
- Top bar (Southland Organics mention)
- Logo + main navigation
- Dropdown menu for Shop categories
- Mobile hamburger menu
- Cart icon with count

**No props** - Self-contained component.

### Footer
**Location:** `frontend/src/components/Footer.astro`

Site footer with:
- Southland Organics banner
- 5-column grid (company info, products, services, company links)
- Social links
- Legal links
- Trust signals

**No props** - Self-contained component.

### ExperienceFarm
**Location:** `frontend/src/components/ExperienceFarm.astro`

Reusable "Experience the farm life" CTA section with Cloudinary image.

```astro
<ExperienceFarm />

<!-- Or with custom content -->
<ExperienceFarm
  title="Visit Our Farm"
  headline="When you slow down..."
  ctaText="BOOK A TOUR"
  ctaLink="/contact"
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "Experience the farm life" | Section title (serif italic) |
| `headline` | string | (long default) | Main paragraph |
| `subheadline` | string | "Come enjoy our little slice..." | Secondary text |
| `ctaText` | string | "VISIT OUR FARM" | Button text |
| `ctaLink` | string | "/contact" | Button link |
| `imagePublicId` | string | "Southland_Office_hqmtez" | Cloudinary image ID |
| `imageAlt` | string | "Soul Miner's Eden Farm Building" | Image alt text |
| `class` | string | "" | Additional CSS classes |

---

## Cart Components

### AddToCartButton
**Location:** `frontend/src/components/cart/AddToCartButton.astro`

Interactive button that adds products to cart via Medusa API.

```astro
<AddToCartButton
  productSlug="humus-compost"
  productName="Humus Compost"
/>
```

**Props:**
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `productSlug` | string | Yes | Medusa product handle |
| `productName` | string | Yes | Display name for messages |
| `class` | string | No | Additional CSS classes |

**Features:**
- Loading state with spinner
- Success message with "View Cart" link
- Error handling with message display
- Looks up product in Medusa by handle
- Adds first variant to cart

### CartIcon
**Location:** `frontend/src/components/cart/CartIcon.astro`

Cart icon with reactive item count badge.

```astro
<CartIcon />
```

**No props** - Self-contained component.

**Features:**
- Displays cart icon (SVG)
- Badge shows item count (hidden when 0)
- Updates reactively via cart-store subscription
- Initializes cart on page load

---

## Image Components

### CloudinaryImage
**Location:** `frontend/src/components/CloudinaryImage.astro`

Base image component for Cloudinary integration. All other image components extend this.

```astro
<CloudinaryImage
  publicId="Soul Miner's/products/compost/TOPO_compost.jpg.jpg"
  alt="Organic compost"
  width={800}
  height={600}
  class="rounded-lg"
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `publicId` | string | Required | Cloudinary path |
| `alt` | string | Required | Alt text (accessibility) |
| `width` | number | 800 | Image width |
| `height` | number | - | Image height |
| `crop` | string | 'fill' | Crop mode |
| `gravity` | string | 'auto' | Focal point |
| `quality` | string | 'auto' | Image quality |
| `format` | string | 'auto' | Image format |
| `responsive` | boolean | true | Generate srcset |
| `loading` | 'lazy' \| 'eager' | 'lazy' | Loading strategy |
| `fetchpriority` | string | 'auto' | Fetch priority |
| `class` | string | '' | CSS classes |

### ProductImage
**Location:** `frontend/src/components/ProductImage.astro`

Product-specific image with preset variants.

```astro
<ProductImage
  publicId="Soul Miner's/products/mulch/brown-mulch.jpg.jpg"
  alt="Brown Mulch"
  variant="card"
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `publicId` | string | Required | Cloudinary path |
| `alt` | string | Required | Alt text |
| `variant` | 'hero' \| 'gallery' \| 'thumbnail' \| 'card' | 'card' | Size preset |
| `loading` | 'lazy' \| 'eager' | 'lazy' | Loading strategy |
| `class` | string | '' | CSS classes |

**Variants:**
| Variant | Dimensions | Use Case |
|---------|------------|----------|
| `hero` | 800x800 | Product detail hero |
| `gallery` | 600x600 | Product gallery |
| `thumbnail` | 300x300 | Small previews |
| `card` | 400x400 | Grid cards |

### HeroImage
**Location:** `frontend/src/components/HeroImage.astro`

Full-width banner images with optional overlay.

```astro
<HeroImage
  publicId="Soul Miner's/banners/farm.jpg.jpg"
  alt="Soul Miner's Eden Farm"
  height={600}
  overlay={true}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `publicId` | string | Required | Cloudinary path |
| `alt` | string | Required | Alt text |
| `height` | number | 800 | Image height |
| `overlay` | boolean | false | Dark gradient overlay |
| `loading` | 'lazy' \| 'eager' | 'eager' | Loading (eager for LCP) |
| `class` | string | '' | CSS classes |

### Avatar
**Location:** `frontend/src/components/Avatar.astro`

Circular profile images with face detection.

```astro
<Avatar
  publicId="Soul Miner's/team/mike.jpg.jpg"
  alt="Mike Usry"
  size="lg"
  border={true}
/>
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `publicId` | string | Required | Cloudinary path |
| `alt` | string | Required | Alt text |
| `size` | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Size preset |
| `border` | boolean | false | Show border ring |

---

## Product Components

### ProductCard
**Location:** `frontend/src/components/products/ProductCard.astro`

Product display card for grids.

```astro
<ProductCard product={product} variant="featured" />
```

**Props:**
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `product` | Product | Required | Product data object |
| `variant` | 'default' \| 'compact' \| 'featured' | 'default' | Display variant |
| `class` | string | '' | CSS classes |

**Variants:**
- `default` - Standard card with description
- `compact` - Minimal card without description
- `featured` - Extended card with benefits list

### MaterialCalculator
**Location:** `frontend/src/components/products/MaterialCalculator.astro`

Interactive volume calculator widget.

```astro
<MaterialCalculator />
```

**No props** - Self-contained interactive component.

**Features:**
- Length/width/depth inputs
- Project type selector
- Cubic yards calculation
- Product recommendations with pricing
- Quick reference guide

---

## CSS Utility Classes

### Defined in `global.css`

#### Buttons
| Class | Description |
|-------|-------------|
| `.btn` | Base button styles |
| `.btn-primary` | Green accent button (CTA) |
| `.btn-secondary` | Primary color button |
| `.btn-outline` | Outlined button |
| `.btn-neutral` | Gray neutral button |

#### Cards & Containers
| Class | Description |
|-------|-------------|
| `.card` | White card with border and shadow |
| `.product-card` | Product card with hover effect |
| `.feature-box` | Centered feature highlight box |
| `.container-custom` | Max-width container with responsive padding |
| `.section` | Vertical section padding |

#### Form Elements
| Class | Description |
|-------|-------------|
| `.input` | Text input styling |
| `.select` | Select dropdown styling |
| `.textarea` | Textarea styling |

#### Badges
| Class | Description |
|-------|-------------|
| `.badge` | Base badge pill |
| `.badge-success` | Green success badge |
| `.badge-warning` | Yellow warning badge |
| `.badge-info` | Primary color info badge |
| `.trust-badge` | Pill badge with icon space |

#### Typography
| Class | Description |
|-------|-------------|
| `.price` | Large bold price text |
| `.font-display` | Poppins display font |

---

## Color Palette

### Theme Colors (CSS Variables)

```css
/* Warm Neutrals - Text & Backgrounds */
--color-warm-50 to --color-warm-900

/* Primary - Earthy Rose/Taupe */
--color-primary-50 to --color-primary-900

/* Secondary - Warm Gray/Sage */
--color-secondary-50 to --color-secondary-900

/* Accent - Green (CTAs, Success) */
--color-accent-50 to --color-accent-900
```

### Usage Guidelines
- **Primary colors** - Headers, links, decorative elements
- **Accent (green)** - CTAs, success states, key actions
- **Warm neutrals** - Body text, backgrounds
- **Secondary** - Borders, subtle backgrounds, disabled states

---

## Patterns to Extract (TODO)

These repeated patterns should become components:

### 1. SectionHeader
```astro
<!-- Used on: index, products/index, category pages -->
<div class="text-center mb-12">
  <h2 class="text-3xl md:text-4xl font-display font-bold text-warm-900 mb-4">
    {title}
  </h2>
  <p class="text-lg text-warm-600 max-w-2xl mx-auto">
    {subtitle}
  </p>
</div>
```

### 2. FeatureCard
```astro
<!-- Used on: index (value props), category pages (benefits) -->
<div class="feature-box">
  <div class="w-16 h-16 bg-{color}-100 rounded-full flex items-center justify-center mx-auto mb-4">
    <Icon />
  </div>
  <h3 class="text-xl font-bold mb-2 text-warm-900">{title}</h3>
  <p class="text-warm-600">{description}</p>
</div>
```

### 3. CTASection
```astro
<!-- Used on: index, products/index, category pages -->
<section class="bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-2xl p-8 md:p-12">
  <div class="max-w-3xl mx-auto text-center">
    <h2>{title}</h2>
    <p>{subtitle}</p>
    <div class="flex gap-4 justify-center">
      <PrimaryButton />
      <SecondaryButton />
    </div>
  </div>
</section>
```

### 4. StatGrid
```astro
<!-- Used on: index (trust section) -->
<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
  {stats.map(stat => (
    <div class="text-center">
      <div class="text-4xl font-bold text-primary-600 mb-2">{stat.value}</div>
      <div class="text-sm text-warm-600">{stat.label}</div>
    </div>
  ))}
</div>
```

### 5. PageHeader
```astro
<!-- Used on: products/index, category pages -->
<div class="bg-gradient-to-br from-primary-500 to-primary-600 text-white py-16">
  <div class="container-custom">
    <h1>{title}</h1>
    <p>{description}</p>
    <TrustBadges />
  </div>
</div>
```

### 6. ApplicationCard
```astro
<!-- Used on: category pages (Perfect For section) -->
<div class="bg-primary-50 rounded-xl p-6 border border-primary-200">
  <h3 class="font-bold text-xl mb-3 text-warm-900">{icon} {title}</h3>
  <p class="text-warm-700 mb-4">{description}</p>
  <p class="text-sm text-primary-700 font-semibold">{recommendation}</p>
</div>
```

### 7. TrustBadgeList
```astro
<!-- Used on: index, products/index, category pages -->
<div class="flex flex-wrap gap-4">
  {badges.map(badge => (
    <span class="trust-badge">{badge}</span>
  ))}
</div>
```

---

## Checklist: Before Building a Page

1. [ ] Review this COMPONENTS.md
2. [ ] List components needed for the page
3. [ ] Check if patterns already exist
4. [ ] Use existing components - don't recreate
5. [ ] Match established visual language
6. [ ] After building: update this file with any new components

---

## Changelog

### 2026-01-25 - Component Update
- Added AdminLayout documentation
- Added ExperienceFarm component documentation
- Added Cart components (AddToCartButton, CartIcon)
- Updated Quick Reference table

### 2026-01-24 - Initial Audit
- Documented all existing components
- Identified 7 patterns to extract
- Created component library reference
