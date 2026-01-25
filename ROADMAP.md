# Soul Miner's Eden: World-Class Roadmap

> **Vision:** Become THE organic landscape supply and land management partner for North Georgia—a vertically integrated, data-driven operation that closes the loop on organic waste, builds soil, sequesters carbon, and dominates local search.

---

## The Big Picture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SOUL MINER'S EDEN ECOSYSTEM                          │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│   INPUTS                    FARM                      OUTPUTS               │
│   ───────                   ────                      ───────               │
│                                                                             │
│   Restaurants ──┐                              ┌──→ Homeowners              │
│   Grocery ──────┤                              │                            │
│   Institutions ─┼──→ Organic Scraps ──→ ┌─────┼──→ Landscapers             │
│   Breweries ────┤                       │     │                            │
│   Coffee Shops ─┘                       │     ├──→ Contractors              │
│                                         │     │                            │
│                                    65-Acre    ├──→ Farms                    │
│   Carbon Credit ←──────────────    Farm &    │                            │
│   Marketplace                      Composting ├──→ Municipalities           │
│                                    Operation  │                            │
│   ESG Reporting ←──────────────         │     └──→ Commercial Properties   │
│                                         │                                   │
│                                         │                                   │
│   Grazing ←────────────────────────────┴──→ Land Management Clients        │
│   Services                                                                  │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Phase 1: Foundation ✅ (Current)

### Completed
- [x] Astro frontend with Tailwind v4
- [x] Product catalog with Cloudinary images
- [x] MUX video heroes
- [x] Brand identity system
- [x] Medusa e-commerce integration
- [x] Checkout flow
- [x] Basic pages (home, products, about, contact)

### In Progress
- [ ] Remove "Certified" language (legal compliance)
- [ ] Recipe/blog content system

---

## Phase 2: Data Infrastructure

### 2.1 Customer Data Platform (BigQuery)

**Goal:** Single source of truth for all customer interactions, enabling personalization, attribution, and predictive analytics.

```
┌─────────────────────────────────────────────────────────────────┐
│                    CDP ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  SOURCES                 BIGQUERY               ACTIVATION      │
│  ───────                 ────────               ──────────      │
│                                                                 │
│  Website ──────┐     ┌───────────────┐                         │
│  (PD Pixel)    │     │               │     ┌──→ Email (Klaviyo)│
│                │     │  Unified      │     │                   │
│  Medusa ───────┼────→│  Customer     │─────┼──→ SMS            │
│  Orders        │     │  Profiles     │     │                   │
│                │     │               │     ├──→ Ads (Meta/Google)
│  Forms ────────┤     │  Events       │     │                   │
│                │     │               │     ├──→ Site Personalization
│  Phone/CRM ────┤     │  Segments     │     │                   │
│                │     │               │     └──→ Sales Alerts   │
│  Delivery ─────┘     └───────────────┘                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Implementation:**
1. **PD Pixel Integration**
   - Deploy from Mothership
   - Track: page views, product views, add to cart, checkout, form submissions
   - Custom events: calculator usage, video engagement, scroll depth

2. **BigQuery Schema**
   ```sql
   -- Core tables
   customers (id, email, phone, address, type, created_at)
   events (id, customer_id, event_type, properties, timestamp)
   orders (id, customer_id, items, total, status, delivery_date)
   quotes (id, customer_id, products, quantity, status, follow_up_date)

   -- Segments
   customer_segments (customer_id, segment, score, updated_at)
   -- Segments: homeowner, contractor, commercial, institution, scrap_partner
   ```

3. **Key Segments**
   - **High-Value Contractors**: 3+ orders, >$1k lifetime
   - **Seasonal Homeowners**: Spring/fall purchasers
   - **Quote Abandoners**: Requested quote, no order in 14 days
   - **Scrap Partners**: Businesses providing organic waste
   - **Land Management Leads**: Viewed grazing pages, has acreage

### 2.2 PD Pixel Events

```javascript
// Core e-commerce events
pd.track('product_viewed', { product_id, product_name, category, price });
pd.track('add_to_cart', { product_id, quantity, value });
pd.track('checkout_started', { cart_value, item_count });
pd.track('order_completed', { order_id, total, items });

// Lead generation events
pd.track('quote_requested', { products, quantity, delivery_address });
pd.track('calculator_used', { area_sqft, product, quantity_needed });
pd.track('contact_form_submitted', { inquiry_type });

// Engagement events
pd.track('video_played', { video_id, duration_watched });
pd.track('page_scrolled', { page, depth_percent });

// Scrap partner events
pd.track('scrap_inquiry', { business_type, estimated_volume });
```

---

## Phase 3: Customer Experience Excellence

### 3.1 Homeowner Journey

```
AWARENESS                    CONSIDERATION                 PURCHASE                    LOYALTY
─────────                    ─────────────                 ────────                    ───────

Google "compost              View product pages            Use calculator              Reorder reminder
Athens GA"                   Watch video content           Request quote               emails (seasonal)
     │                            │                             │                           │
     ▼                            ▼                             ▼                           ▼
┌─────────┐                 ┌─────────┐                  ┌─────────┐                ┌─────────┐
│  SEO    │ ──────────────→ │ Product │ ───────────────→ │ Quote   │ ─────────────→│ Loyalty │
│  Local  │                 │  Pages  │                  │  Flow   │                │ Program │
│  Ads    │                 │ Videos  │                  │ Checkout│                │ Referral│
└─────────┘                 └─────────┘                  └─────────┘                └─────────┘
                                 │                             │
                                 ▼                             ▼
                            Farm Visit                    Delivery
                            Option                        Scheduling
```

**Key Features:**
- **Instant Quote Calculator**: Area → Product → Quantity → Price → Schedule
- **Delivery Scheduling**: Real-time availability, route optimization
- **SMS Updates**: Order confirmation, day-before reminder, driver ETA
- **Easy Reorder**: "Order again" from account or email

### 3.2 Contractor/Landscaper Journey

```
ONBOARDING                  ORDERING                      FULFILLMENT                 GROWTH
──────────                  ────────                      ───────────                 ──────

Apply for                   Access wholesale              Schedule                    Volume
contractor account          pricing                       deliveries                  bonuses
     │                           │                             │                          │
     ▼                           ▼                             ▼                          ▼
┌─────────┐                ┌─────────┐                  ┌─────────┐               ┌─────────┐
│ Account │ ─────────────→ │  Portal │ ───────────────→ │ Delivery│ ────────────→│ Rewards │
│ Approval│                │  w/Saved│                  │ Tracking│               │ Tiers   │
│         │                │  Jobs   │                  │         │               │         │
└─────────┘                └─────────┘                  └─────────┘               └─────────┘
                                │                             │
                                ▼                             ▼
                           Net-30 Terms                 Route
                           Available                    Optimization
```

**Contractor Portal Features:**
- **Wholesale Pricing**: Tiered based on volume
- **Job Management**: Save delivery addresses per client
- **Bulk Ordering**: Quick reorder of common products
- **Net-30 Terms**: For qualified accounts
- **Volume Reporting**: Track annual purchases, earn rebates

### 3.3 Institution/Commercial Journey

```
LEAD                        ASSESSMENT                    PROPOSAL                    ONGOING
────                        ──────────                    ────────                    ───────

Inbound inquiry             Site visit                    Custom                      Scheduled
or outreach                 & consultation                pricing                     deliveries
     │                           │                             │                          │
     ▼                           ▼                             ▼                          ▼
┌─────────┐                ┌─────────┐                  ┌─────────┐               ┌─────────┐
│ Contact │ ─────────────→ │ Consult │ ───────────────→ │ Contract│ ────────────→│ Account │
│  Form   │                │  Call   │                  │ Signing │               │  Mgmt   │
│         │                │         │                  │         │               │         │
└─────────┘                └─────────┘                  └─────────┘               └─────────┘
                                                              │
                                                              ▼
                                                         Scrap Partner
                                                         Program Pitch
```

---

## Phase 4: Scrap Partner Program (CLOSED LOOP)

### 4.1 The Value Proposition

**For Restaurants/Institutions:**
- Free or low-cost organic waste pickup
- Divert from landfill → sustainability credentials
- Carbon offset certificates for ESG reporting
- Marketing co-branding ("Powered by Soul Miner's Eden")

**For Soul Miner's Eden:**
- Free/cheap feedstock for composting
- Recurring relationships with local businesses
- Carbon credit revenue stream
- Community goodwill and PR

### 4.2 Scrap Partner Page Structure

```
/partnerships/scrap-program

HERO
────
"Turn Your Scraps Into Soil"
We'll pick up your organic waste and turn it into premium compost—
while you earn carbon credits and sustainability cred.

IDEAL PARTNERS
──────────────
• Restaurants & Cafes (food prep waste, coffee grounds)
• Grocery Stores (produce trim, expired organics)
• Breweries & Distilleries (spent grain, hops)
• Coffee Roasters (chaff, grounds)
• Schools & Universities (cafeteria waste)
• Hospitals & Senior Living (food service waste)
• Event Venues (catering waste)

HOW IT WORKS
────────────
1. We assess your waste stream and volume
2. Provide bins and pickup schedule
3. Collect, weigh, and compost your organics
4. Issue carbon offset certificates quarterly
5. Feature you as a partner (optional)

CALCULATOR
──────────
Estimate your impact:
- Employees/customers served: [____]
- Estimated weekly food waste: [____] lbs
→ Annual CO2 diverted: X tons
→ Carbon credit value: $X

PARTNER SHOWCASE
────────────────
[Logos of current partners]
"We've diverted X tons from landfill with these local partners"

CTA
───
"Request a Waste Assessment" → Form
```

### 4.3 Carbon Credit Integration

**Tracking:**
- Weigh all incoming organic material
- Calculate CO2 equivalent diverted from landfill
- Log in BigQuery for reporting

**Monetization Options:**
1. **Sell to Partners**: Issue certificates they can use for ESG
2. **Voluntary Carbon Markets**: Bundle and sell through platforms
3. **Corporate Buyers**: Direct sales to companies needing offsets

**Annual Report for Partners:**
```
┌─────────────────────────────────────────────────────────────┐
│         CARBON OFFSET CERTIFICATE                           │
│         Soul Miner's Eden x [Partner Name]                  │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Period: January 1 - December 31, 2026                     │
│                                                             │
│  Organic Material Diverted: 12,450 lbs                     │
│  CO2 Equivalent Avoided: 4.2 metric tons                   │
│  Compost Produced: 2,800 lbs                               │
│                                                             │
│  This certifies that [Partner Name] has diverted           │
│  organic waste from landfill through participation         │
│  in the Soul Miner's Eden Scrap Partner Program.           │
│                                                             │
│  Certificate ID: SME-2026-0042                             │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Phase 5: Local Market Domination

### 5.1 SEO Strategy

**Target Keywords:**
- "compost Athens GA" (primary)
- "organic compost Georgia"
- "bulk mulch Athens"
- "landscape supply Athens GA"
- "grazing services Georgia"
- "regenerative land management"
- "carbon offset composting"

**Content Strategy:**
- Location pages for each service area
- Blog posts answering common questions
- Seasonal guides (spring planting, fall prep)
- Case studies from local customers
- Partner spotlights (scrap program)

**Technical SEO:**
- Schema markup for local business
- Google Business Profile optimization
- Review generation system
- Local citations (Chamber, directories)

### 5.2 Local Partnerships

**Strategic Alliances:**
| Partner Type | Relationship | Value Exchange |
|--------------|--------------|----------------|
| Garden Centers | Referral partner | Send customers for bulk, they handle bags |
| Nurseries | Supplier | Provide growing media, they recommend us |
| Hardware Stores | Display partner | Samples + brochures in store |
| Landscaping Cos | Wholesale customer | Volume pricing, priority delivery |
| HOAs | Service contracts | Recurring land management deals |
| Municipalities | Preferred vendor | Parks, public spaces |
| UGA Extension | Education partner | Workshops, credibility |
| Local Farms | Network | Cross-referrals, knowledge sharing |

### 5.3 Community Presence

**Events:**
- Spring Planting Workshop (annual)
- Farm Tours (seasonal)
- Composting 101 Classes
- Kids' Farm Day
- U-Pick Flower events

**Sponsorships:**
- Athens Farmers Market
- Local gardening clubs
- School garden programs
- Community garden plots

**Content:**
- Weekly "Soil Tip" email/SMS
- Seasonal planting guides
- Video series: "From Scraps to Soil"
- Partner spotlight features

---

## Phase 6: Technology Stack

### 6.1 Current Stack
```
Frontend:        Astro + Tailwind v4
E-commerce:      Medusa
Images:          Cloudinary
Video:           MUX
Hosting:         Vercel
```

### 6.2 To Add
```
CDP:             BigQuery + PD Pixel (Mothership)
Email/SMS:       Klaviyo or similar
CRM:             HubSpot (or Medusa extensions)
Delivery:        Route optimization tool (OptimoRoute?)
Scheduling:      Calendly or custom
Forms:           Native + BigQuery integration
Analytics:       DataForSEO + GA4 + Looker Studio
Carbon Tracking: Custom (BigQuery tables)
```

### 6.3 Admin Dashboard Vision

```
/admin
├── /dashboard        # Overview: orders, leads, revenue
├── /orders           # Medusa order management
├── /customers        # CDP customer profiles
├── /segments         # Customer segments from BigQuery
├── /quotes           # Quote requests, follow-ups
├── /delivery         # Route planning, scheduling
├── /scrap-partners   # Partner management, weigh-ins
├── /carbon           # Carbon credit tracking, certificates
├── /content          # Blog/recipe management
├── /seo              # DataForSEO integration
├── /voice-check      # Brand voice validator
└── /analytics        # Looker Studio embeds
```

---

## Phase 7: Revenue Streams

### Current
1. **Product Sales**: Compost, mulch, soil (B2C + B2B)
2. **Delivery Fees**: $40 base + $1.25/mile

### Expanding
3. **Grazing Services**: Land management contracts
4. **Contractor Accounts**: Volume pricing, net-30 terms
5. **Scrap Pickup**: Free or small fee for collection
6. **Carbon Credits**: Sell offsets to partners or markets

### Future
7. **Subscription Boxes**: Seasonal soil amendments delivered
8. **Equipment Rental**: Spreaders, tillers for DIY
9. **Consulting**: Soil testing, garden design
10. **Educational Workshops**: Paid classes

---

## Implementation Timeline

### Q1 2026: Data Foundation
- [ ] Deploy PD Pixel
- [ ] Set up BigQuery CDP schema
- [ ] Build customer segment definitions
- [ ] Create admin dashboard shell

### Q2 2026: Customer Experience
- [ ] Contractor portal MVP
- [ ] Quote flow optimization
- [ ] Delivery scheduling system
- [ ] SMS notification system

### Q3 2026: Scrap Partner Program
- [ ] Build /partnerships/scrap-program page
- [ ] Carbon tracking system
- [ ] Partner onboarding flow
- [ ] Certificate generation

### Q4 2026: Domination
- [ ] SEO content blitz
- [ ] Local partnership outreach
- [ ] Community event calendar
- [ ] Referral program launch

---

## Success Metrics

### North Stars
- **Market Share**: % of Athens-area bulk landscape supply
- **Customer Lifetime Value**: Avg revenue per customer over 3 years
- **Scrap Diverted**: Tons of organic waste composted annually
- **Carbon Offset**: CO2 equivalent avoided

### Leading Indicators
| Metric | Current | Q2 Target | Q4 Target |
|--------|---------|-----------|-----------|
| Monthly Orders | ? | +50% | +150% |
| Contractor Accounts | ? | 25 | 75 |
| Scrap Partners | 0 | 5 | 20 |
| Organic Traffic | ? | +100% | +300% |
| Quote-to-Order Rate | ? | 40% | 60% |

---

## The Soul Miner's Eden Flywheel

```
                    ┌─────────────────────────┐
                    │    More Scrap Partners  │
                    │    = More Feedstock     │
                    └───────────┬─────────────┘
                                │
                                ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Lower Costs    │────→│  Better Pricing │────→│  More Customers │
│  (Free inputs)  │     │  (Competitive)  │     │  (Volume grows) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        ▲                                               │
        │                                               │
        │           ┌─────────────────┐                 │
        │           │  Stronger Brand │                 │
        └───────────│  (Local leader) │◄────────────────┘
                    └─────────────────┘
                                │
                                ▼
                    ┌─────────────────────────┐
                    │  More Partners Want In  │
                    │  (Network effects)      │
                    └─────────────────────────┘
```

---

## What "Domination" Looks Like

**When someone in Athens needs landscape supplies:**
- Soul Miner's Eden is #1 on Google
- They've heard of us from a friend
- They've seen our truck around town
- Their landscaper already uses us

**When a restaurant thinks about food waste:**
- They know we'll pick it up
- They want the carbon credits
- They want the "local partner" story

**When a property manager needs land cleared:**
- Grazing services are top of mind
- We're the obvious sustainable choice
- They've seen our work on other properties

**When anyone asks "where do I get compost?":**
- There's only one answer: Soul Miner's Eden

---

*"Cultivate What the Land Was Meant to Be"*

*Last Updated: January 25, 2026*
