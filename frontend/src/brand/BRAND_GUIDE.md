# Soul Miner's Eden Brand Guide

> "Cultivate What the Land Was Meant to Be"

---

## Brand Essence

Soul Miner's Eden is a 65-acre North Georgia family farm focused on **restoration**, **faith-rooted purpose**, and **sustainable land care**. We're not a generic landscape yard—we're a calling-driven farm and landscape partner helping homeowners and professionals restore their own piece of Eden.

### Core Promise
We help people cultivate beauty and restore land through time-produced natural compost, premium landscape materials, and regenerative grazing services.

### Tagline Options
- "Cultivate What the Land Was Meant to Be"
- "Your Own Piece of Eden"
- "Grow Something Beautiful—Naturally"

---

## Brand Personality

### Voice Attributes

| Attribute | Description | Do | Don't |
|-----------|-------------|-----|-------|
| **Faith-Rooted** | References to calling, stewardship, and God's original design stay central but gentle | "Built on faith-driven stewardship" | Preachy or judgmental language |
| **Warm & Invitational** | Every touchpoint should feel like an invitation to the farm | "Come enjoy our slice of Eden" | Cold, transactional copy |
| **Family & Local** | Personal, human, neighborly—never corporate | "We're the Usrys, and this is our family farm" | Generic business-speak |
| **Regenerative** | Emphasize restoration over extraction | "Restoring soil health" | "Land clearing services" |
| **Hopeful** | Encouraging, calm, and optimistic | "Transform your landscape" | Fear-based urgency tactics |

### Tone Guidelines

**Use calm, encouraging language with:**
- Short paragraphs
- Active voice
- Concrete, sensory details
- Personal pronouns (we, you, our)

**Key Phrases to Thread Throughout:**
- "Cultivate beauty"
- "Restore land"
- "Your own piece of Eden"
- "The way God intended"
- "Work as calling"
- "Making the invisible God visible through stewardship"

---

## Visual Identity

### Color Palette

#### Primary Earth Tones
```css
/* Warm Neutrals - Foundation */
--warm-50: #fafaf9;
--warm-100: #f5f5f4;
--warm-200: #e7e5e4;
--warm-300: #d6d3d1;
--warm-400: #a8a29e;
--warm-500: #78716c;
--warm-600: #57534e;
--warm-700: #44403c;
--warm-800: #292524;
--warm-900: #1c1917;

/* Primary - Terracotta/Clay */
--primary-50: #f9f5f4;
--primary-100: #f3ebe9;
--primary-200: #e4d5d3;
--primary-300: #d4b5af;
--primary-400: #c5a49c;
--primary-500: #b59289;
--primary-600: #a17e75;
--primary-700: #826658;
--primary-800: #624d42;
--primary-900: #43352d;
```

#### Accent Colors
```css
/* Accent - Natural Green */
--accent-50: #f0fdf4;
--accent-100: #dcfce7;
--accent-200: #bbf7d0;
--accent-300: #86efac;
--accent-400: #4ade80;
--accent-500: #22c55e;
--accent-600: #16a34a;
--accent-700: #15803d;
--accent-800: #166534;
--accent-900: #14532d;

/* Floral Accents (use sparingly) */
--lavender: #c4b5d4;
--sunflower: #f5d680;
--blush: #f0d4d4;
```

### Typography

#### Font Stack
```css
/* Display - Soulful, Story-Driven */
--font-display: 'Poppins', system-ui, sans-serif;

/* Serif - Elegant, Invitational */
--font-serif: 'Playfair Display', Georgia, serif;

/* Body - Clean, Readable */
--font-sans: 'Inter', system-ui, sans-serif;
```

#### Usage
- **H1 Headlines**: Poppins Bold (display) or Playfair Display Italic (editorial feel)
- **H2-H3 Section Headers**: Poppins Semibold
- **Body Text**: Inter Regular
- **Pull Quotes & Testimonials**: Playfair Display Italic
- **CTAs & Labels**: Poppins Semibold, uppercase tracking

### Imagery Guidelines

#### Hero & Background Images
- Aerial and wide farm shots as key heroes
- Full-bleed video or images that place users on the land
- Drone footage of the 65-acre property
- Golden hour/sunrise lighting preferred

#### Product Photography
- Close-ups of soil, compost, mulch textures
- Natural lighting, outdoor settings
- Show scale with hands or tools when helpful
- Rich, earthy color grading

#### Lifestyle & Story Images
- People on the farm (picking flowers, walking fields)
- Interaction with animals and equipment
- Family moments that feel genuine, not posed
- Visitors experiencing the farm

#### Recipe & Food Images
- Table scenes with natural light
- Fresh produce from the farm
- Prepared dishes in rustic settings
- Seasonal, abundant styling

---

## Design Principles

### Layout Philosophy

> "Spacious, soft, and grounded—like the farm itself"

1. **Generous White Space**: Let content breathe
2. **Soft Shadows**: Subtle depth, not harsh contrasts
3. **Rounded Corners**: Nothing industrial or harsh
4. **Section-Driven Pages**: Clear visual separation between content areas
5. **Full-Bleed Heroes**: Immersive entry points to each page

### Component Styling

#### Buttons
```css
/* Primary - Solid earth tone */
.btn-primary {
  background: var(--accent-600);
  color: white;
  border-radius: 0.5rem;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: var(--accent-700);
  transform: scale(1.02);
}

/* Secondary - Outlined */
.btn-secondary {
  background: transparent;
  border: 2px solid var(--primary-500);
  color: var(--primary-600);
  border-radius: 0.5rem;
}

/* Ghost - For dark backgrounds */
.btn-ghost {
  background: transparent;
  border: 2px solid white/50;
  color: white;
}
```

#### Cards
- Image on top, text below
- Subtle border (1px) with warm neutral
- Soft shadow on hover
- 0.75rem border-radius
- Smooth scale transition on hover

#### Pull Quotes
- Background wash (primary-50 or accent-50)
- Left border accent (4px primary-500)
- Playfair Display Italic
- Used for Garden City quotes and mission statements

### Animation Guidelines

**Keep it subtle:**
- Fade-in on scroll (0.3s ease)
- Slow parallax on hero imagery (0.05 rate)
- Gentle hover states (scale 1.02, 0.2s)
- No flashy animations that distract from content

---

## Page Templates

### 1. Homepage / Landing

**Sections in Order:**
1. **Hero**: Full-bleed video, centered headline, dual CTAs
2. **Three-Pillar Intro**: Flowers, Landscape Supply, Land & Care
3. **Story Teaser**: 2-3 lines + "Read Our Story" button
4. **UPICK & Farm Visits**: Photo + short copy + "Visit Our Farm"
5. **Featured Products**: 3 product cards
6. **Recipes Teaser**: 3-4 recipe cards
7. **Email Signup Band**: Single-line description + form
8. **Experience the Farm**: Final CTA section

### 2. About / Story Page

**Layout:**
- Two-column lead: text + farm transformation imagery
- Timeline/chapters format for history
- "Story Behind the Name" highlighted card
- Three value cards: Sustainable, Family, Community
- Meet the Team portraits

### 3. Landscape Supply (Category)

**Structure:**
- Intro block about local, natural materials
- Product grid with cards
- Material calculator integration
- Contractor/volume pricing callout

### 4. Product Detail Page

**Elements:**
- Hero image of material
- Benefits list (3-5 bullet points)
- Application ideas
- Coverage estimator widget
- Clear inquiry/order form

### 5. Land Management / Grazing

**Layout:**
- Pastoral hero with grazing imagery
- Problem/solution grid
- Process strip (3 steps)
- Testimonials (when available)
- Assessment request form

### 6. Recipes

**Index Page:**
- Card grid with filters
- Image, title, time, category tag
- Category filtering

**Detail Page:**
- Hero image
- Story intro paragraph
- Two-column: ingredients + instructions
- Sharing buttons

### 7. Visit Us / Farm Experience

**Sections:**
- Hero: "Experience the Farm Life"
- Farm Tours info
- UPICK Flowers info
- Seasonal Events
- Practical info: address, map, hours, what to bring

---

## Navigation Structure

### Primary Nav
```
Logo | Landscape Supply (dropdown) | Land Management (dropdown) | Our Story (dropdown) | Visit Us | [Phone Icon] (706) 613-4415
```

### Landscape Supply Dropdown
- All Products
- Compost
- Topsoil
- Mulch varieties
- Specialty soils

### Land Management Dropdown
- Eden Grazing Services
- How It Works
- Service Packages
- Request Assessment

### Our Story Dropdown
- About Us
- Blog
- Recipes
- Sustainable Farming

### Behavior
- Sticky on scroll
- Slight shrink effect for lighter feel
- Mobile: hamburger menu with accordion dropdowns

---

## Content Guidelines

### Headline Formulas

**Invitational:**
- "Cultivate [Benefit]"
- "Restore Your [Space]"
- "Experience [Something Beautiful]"

**Benefit-Focused:**
- "[Adjective] [Product] for [Outcome]"
- "Transform Your [Space] with [Product]"

**Story-Driven:**
- "The Story Behind [Topic]"
- "How We [Action]"

### CTA Button Text

**Primary Actions:**
- "Shop Landscape Supply"
- "Explore Grazing Services"
- "Visit Our Farm"
- "Request a Quote"

**Secondary Actions:**
- "Learn More"
- "Read Our Story"
- "View All Products"
- "See Recipes"

### Body Copy Guidelines

1. **Keep paragraphs short** (2-3 sentences max)
2. **Lead with benefits**, not features
3. **Use sensory language** when describing products
4. **Connect practical offerings back to purpose**
5. **Include specific details** (65 acres, Athens GA, family-owned)

### Words to Use
- Cultivate, Restore, Transform
- Natural, Organic, Living
- Stewardship, Care, Calling
- Family, Local, Community
- Eden, Beauty, Purpose

### Words to Avoid
- Industrial, Commercial, Corporate
- Cheap, Discount, Deal
- Quick, Fast, Easy (when misleading)
- Generic landscape yard language

---

## Brand Applications

### Email Signatures
```
[Name]
Soul Miner's Eden
(706) 613-4415
soulminerseden.com

"Cultivate What the Land Was Meant to Be"
```

### Social Media Bio
```
65-acre family farm in Athens, GA
Natural compost | Premium mulch | Regenerative grazing
Come visit our slice of Eden
```

### Delivery Truck/Signage
- Logo prominently displayed
- Phone number
- "All-Natural Compost | Family-Owned | Athens, GA"

---

## Quick Reference

### Contact Information
- **Phone**: (706) 613-4415
- **Location**: Bogart, GA (Athens area)
- **Farm Size**: 65 acres
- **Delivery**: $40 base + $1.25/mile after 20 miles

### Key Differentiators
1. Georgia's ONLY organic compost
2. 65-acre working family farm
3. Faith-driven stewardship
4. Dual revenue: products + grazing services
5. Not just a supplier—a landscape partner

### Parent Company
Southland Organics (referenced subtly as "A Southland Organics Company")

---

*Last Updated: January 2026*
