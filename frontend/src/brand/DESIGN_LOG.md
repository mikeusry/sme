# Soul Miner's Eden Design Log

> All design decisions, rationale, and rejected alternatives. Updated by the Design Agent.

**Last Updated:** 2026-02-22

---

## Status

- **Logo:** No final mark. Existing SVG wordmark in use (hosted on Webflow CDN). Pavilion-based icon concept approved in principle — property photos now available.
- **Color palette:** LOCKED. 5-color estate palette derived from property photos. See Decision #1 below.
- **Typography:** Current system is Poppins (display) + Playfair Display (serif) + Inter (body). Agent to evaluate.
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

## Non-Negotiable Rules

1. No design without property photos (logo work gated until photos arrive)
2. Every mark must survive at 1 inch / embroidery
3. Priority stack: Beautiful → Easy → Marketing → Break-Even
4. One palette, one type system — no proliferation
5. Estate, not startup — 50-year feel on day one
6. The property is the brand — every decision points at something real on the 65 acres
7. Sibling brand to Southland Organics under TUFCO Holdings — not a sub-brand
