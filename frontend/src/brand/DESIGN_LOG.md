# Soul Miner's Eden Design Log

> All design decisions, rationale, and rejected alternatives. Updated by the Design Agent.

**Last Updated:** 2026-03-04

---

## Status

- **Logo:** Primary mark selected (pavilion icon + EB Garamond wordmark). See Decision #2 below. Files: `logo-primary.svg`, `logo-reversed.svg`
- **Secondary mark:** Wheelbarrow selected (charcoal structure + sage botanical). See Decision #3 below. Files: `mark-wheelbarrow.svg`, `mark-wheelbarrow-reversed.svg`, `mark-wheelbarrow-mono.svg`
- **Color palette:** LOCKED. 5-color estate palette derived from property photos. See Decision #1 below.
- **Typography:** EB Garamond confirmed as logo/display serif. Site stack (Poppins/Playfair/Inter) pending alignment — see Decision #2 notes.
- **Photos:** Available in `frontend/src/brand/photos/` — pavilion (multiple angles + interior), cattle on pasture, pond, compost yard, landscape wide shots, Parker in garden, Southland office.

---

## Decisions

### Decision #1 — Color Palette (2026-02-22)

**Status:** Locked (pending clay tone review)

5 core colors + 4 supporting tints. Every color points at something real on the 65 acres.

| Token | Hex | Source on Property | Role |
|-------|-----|--------------------|------|
| `eden-cream` | `#FAF8F5` | Concrete pad, sandy soil, warm light | Page backgrounds |
| `eden-charcoal` | `#2D2926` | Dark compost, deep shadow | All text, headings |
| `eden-steel` | `#6E6E68` | Pavilion galvanized metal | Secondary text, borders, nav |
| `eden-clay` | `#A8643F` | Georgia red clay, exposed earth | Warm accent, links, highlights |
| `eden-sage` | `#4D6B42` | Pasture grass, woodland understory | Primary CTA buttons |

Supporting tints:
| Token | Hex | Role |
|-------|-----|------|
| `eden-cream-dark` | `#F0EDE8` | Card backgrounds, alternating sections |
| `eden-steel-light` | `#B0B0AA` | Borders, dividers, disabled states |
| `eden-clay-light` | `#DBBFA8` | Warm badges, highlighted blocks |
| `eden-sage-light` | `#E8EDDE` | Success messages, subtle green tint |

**Rationale:**
- Pavilion's galvanized steel is the estate's signature material — it must be in the palette
- Clay replaces the previous "terracotta" (#b59289) which was too pink/cosmetic
- Sage replaces Tailwind emerald (#16a34a) which was too saturated/digital
- Reduced from 50+ tokens to 9 — estate-level restraint
- Southland sibling relationship: Eden's clay-rust shares DNA with Southland office's maroon trim

**Accessibility:**
- eden-charcoal on eden-cream: ~14:1 contrast ratio (AAA)
- eden-steel on eden-cream: ~5:1 (AA for normal text)
- White on eden-sage: ~5:1 (AA for button text)
- eden-clay on eden-cream: ~4.5:1 (AA threshold — may need darker variant for small text)

### Decision #2 — Primary Logo Mark (2026-03-04)

**Status:** Selected — pending simplified variant for small applications

**Mark:** Pavilion icon (grain bin silhouette with radiating roof ribs) + "SOUL MINER'S EDEN" wordmark + "Bogart, Georgia" subline.

**Font:** EB Garamond Regular, 92px display / 36px subline, .2em letter-spacing.

**Files:**

- `frontend/src/brand/logo-primary.svg` — eden-sage structure (#4D6B42) + eden-cream detail (#FAF8F5) + eden-clay text (#A8643F) on transparent
- `frontend/src/brand/logo-reversed.svg` — white (#FFFFFF) on transparent
- Static copies in `frontend/public/brand/` for web serving

**Fixes applied from source SVG:**

- Apostrophe encoding: `â` → `'` (U+2019 right single quotation mark)
- Consolidated 3 near-identical white fills (#fff, #fbfbfb, #fdfdfd) → single fill
- Renamed CSS classes from `.cls-1`/`.cls-2` etc. to semantic names (`.logo-mark`, `.logo-detail`, `.logo-text-display`, `.logo-text-sub`)

**Color usage rules:**

| Context | Structure | Detail/Knockout | Text | Background |
|---------|-----------|-----------------|------|------------|
| Primary (light bg) | eden-sage #4D6B42 | eden-cream #FAF8F5 | eden-clay #A8643F | eden-cream or white |
| Reversed (dark bg) | #FFFFFF | #2D2926 | #FFFFFF | eden-charcoal or dark photo |
| Single-color (embroidery) | #2D2926 | fabric shows through | #2D2926 | n/a |

**Open items:**

- Simplified variant needed for <2 inch applications (roof ribs may merge at small sizes)
- EB Garamond vs. Playfair Display: recommend EB Garamond replace Playfair as the serif in the site type stack, keeping Poppins for UI headings and Inter for body. Decision deferred to typography review.

### Decision #3 — Secondary Mark: Wheelbarrow (2026-03-04)

**Status:** Selected

**Mark:** Wheelbarrow with botanical elements growing from it. Two-path SVG: wheelbarrow structure (handles, body, wheel, ground line) and vegetation (leaves/branches radiating upward from the barrow).

**Property justification:** Real wheelbarrow used daily on the farm for compost, soil, and planting. Represents the hands-on regenerative work — things growing from what you carry.

**Files:**

- `frontend/src/brand/mark-wheelbarrow.svg` — eden-charcoal structure (#2D2926) + eden-sage botanical (#4D6B42) on transparent
- `frontend/src/brand/mark-wheelbarrow-reversed.svg` — white on transparent (dark backgrounds)
- `frontend/src/brand/mark-wheelbarrow-mono.svg` — single-color eden-charcoal (embroidery, stamps)
- Static copies in `frontend/public/brand/` for web serving

**Use cases:**

- Social media avatar / favicon
- Hat & merch embroidery (mono variant)
- Packaging accent stamp
- Photo watermark
- Section divider on website

**Restrictions:**

- Never replaces the primary logo — always secondary
- Minimum size: 0.75 inch wide
- Never recolor outside the locked palette
- No drop shadows, outlines, or effects

**Simplification notes:**

- Removed fine interior sub-paths from wheelbarrow (axle shading, basket cross-hatching) that would not survive at small sizes
- Retained wheel hub detail and basket panels as they contribute to recognizability
- Botanical path is complex — at sizes below 1 inch, vegetation detail will merge into a silhouette, which is acceptable
- Raw source preserved as `wheelbarrow-raw.svg` for reference

---

## Rejected Alternatives

### Previous "Terracotta" primary (#b59289)
Too pink. Reads cosmetics/spa, not estate farm. Doesn't match the actual Georgia red clay visible in property photos. Replaced by eden-clay (#A8643F).

### Previous "Emerald" accent (#16a34a / #22c55e)
Standard Tailwind green — too saturated, too digital. Nothing on the property is that vivid. Replaced by eden-sage (#4D6B42).

### Floral accents (lavender #c4b5d4, sunflower #f5d680, blush #f0d4d4)
No property justification. Cannot point at anything real on the 65 acres. Removed entirely.

### 10-shade color ramps (primary-50 through primary-900, etc.)
Over-proliferation. An estate brand converges, not expands. Replaced with intentional named tokens with clear roles.

---

## Tools

### Screenshot Workflow (Playwright)

Full-page screenshots for design review and AI feedback. See `mothership/docs/context/screenshot-workflow.md` for the full playbook.

```bash
# Quick version:
npx astro dev --port 4321 &
cd /tmp && npm install playwright && node screenshots.mjs
```

Screenshots land in `frontend/screenshots/` (gitignored). Feed to `/design review`, ChatGPT, or Perplexity for cross-AI critique.

**First capture:** 2026-03-04 — 10 screenshots after eden palette implementation (homepage, products, compost, land management, solar grazing, about, contact, admin brand).

### Decision #4 — Homepage Design Iterations (2026-03-04)

**Status:** Shipped

Three rounds of AI-assisted design review (Claude, ChatGPT, Perplexity) applied to the homepage via Playwright screenshots.

**Key changes:**

- Hero: Clay pill badge, single subhead ("From our 65-acre regenerative farm in Bogart..."), sage primary CTA (larger) + clay outline secondary, mobile secondary CTA becomes inline text link
- Value props: 4-column grid with distinct farm icons (compost heap, sprout, truck, farmhouse), centered cards
- Product cards: Cream (`bg-warm-50`) card backgrounds, "Made on our Bogart farm with Southland biology" brand line
- Grazing band: Full-bleed clay gradient, Cloudinary photo in right column, extra top margin for chapter break
- Material calculator: Trust lines ("We'll help you round up at the stand if you're not sure")
- Experience section: 3-photo strip (pavilion, farm stand, grazing) above CTA
- Stats row: Clay numerals, steel top border, "Regenerative" badge, "A Southland Organics Company" chip
- Section spacing: Bumped `.section` padding from 3/4/5rem to 4/5/6rem for breathing room between bands
- Contact FAQ: Toned from fuchsia dev flag to clay/steel system treatment (content still draft)
- Header: Nav reordered, sub-label on XL, local logo SVG
- Footer: Consolidated to 4 link groups, wheelbarrow mark, steel headings, local logo SVG

---

## Non-Negotiable Rules

1. No design without property photos (logo work gated until photos arrive)
2. Every mark must survive at 1 inch / embroidery
3. Priority stack: Beautiful → Easy → Marketing → Break-Even
4. One palette, one type system — no proliferation
5. Estate, not startup — 50-year feel on day one
6. The property is the brand — every decision points at something real on the 65 acres
7. Sibling brand to Southland Organics under TUFCO Holdings — not a sub-brand
