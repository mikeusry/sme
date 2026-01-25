# Soul Miner's Eden - Next Session TODOs

## Priority 1: Copy Updates
- [ ] Remove ALL instances of "Certified Organic" across the site
- [ ] Remove ALL instances of "Certified Naturally Grown"
- [ ] Replace with "All-Natural" or "Organic" (without "Certified")

**Reason:** Certification claims require documentation. Use "All-Natural" and "Organic" language without certification claims.

---

## Priority 2: Admin Pages

### Voice & Brand Checker
- [ ] Build admin page to validate copy against brand voice guidelines
- [ ] Reference `/frontend/src/brand/VOICE_GUIDE.md` for rules
- [ ] Check for:
  - Forbidden words/phrases
  - Tone consistency
  - CTA language
  - Faith-rooted but not preachy balance

### SEO Admin Dashboard
- [ ] Build admin page for SEO analysis
- [ ] Show meta titles, descriptions, headings per page
- [ ] Flag missing or too-long meta content
- [ ] Keyword density checks

### Design Checks Page
- [ ] Build admin page to verify design consistency
- [ ] Check component usage against brand patterns
- [ ] Color usage validation
- [ ] Typography consistency

---

## Priority 3: DataForSEO Integration

### Research Needed
- [ ] Understand DataForSEO API from point.dog dashboard
- [ ] Identify which endpoints are useful:
  - Keyword research?
  - SERP tracking?
  - Competitor analysis?
  - On-page SEO audit?

### Implementation
- [ ] Create API integration layer
- [ ] Build admin UI for SEO insights
- [ ] Connect to existing SEO admin page

---

## Files to Update (Certified language removal)

Likely locations to check:
- `frontend/src/pages/index.astro`
- `frontend/src/pages/products/compost.astro`
- `frontend/src/pages/products/*.astro`
- `frontend/src/lib/products.ts` (product data)
- `content/` directory

---

*Created: January 25, 2026*
