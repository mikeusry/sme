# Admin Tools

Internal tools for managing Soul Miner's Eden website.

**Base URL:** `/admin/`

---

## Available Admin Pages

### Dashboard (`/admin/`)
**Purpose:** Overview of site health and content status.

**Features:**
- Stats grid (pages, products, blog posts, fake content sections)
- Content status table showing draft/published state
- Recent activity feed
- Quick action links

**Use When:** Starting a session to see what needs attention.

---

### Brand Guide (`/admin/brand`)
**Purpose:** Visual reference for brand colors, typography, and voice.

**Features:**
- Primary color palette (Terracotta)
- Accent color palette (Green)
- Warm neutrals palette
- Typography scale with live examples
- Brand voice guidelines (do's and don'ts)
- Logo display (light/dark backgrounds)

**Use When:** Creating new pages or checking brand consistency.

---

### AI Detection (`/admin/review`)
**Purpose:** Live AI content detection using Originality.ai API.

**Features:**
- Environment selector (Vercel production vs localhost)
- Scan individual pages or all pages
- AI/Human percentage scores
- Pass/Warning/Fail status thresholds:
  - Pass: <20% AI
  - Warning: 20-40% AI
  - Fail: >40% AI
- Word count per page
- Current Land Management copy reference

**Use When:** Validating content authenticity before publishing.

**Technical:**
- Calls `/api/scan` endpoint
- Uses Originality.ai API (requires `ORIGINALITY_API_KEY`)
- SSR page (not prerendered)

---

### Video Test (`/admin/video-test`)
**Purpose:** Debug MUX video playback.

**Features:**
- Test thumbnails for each video
- MUX Player component test
- HLS stream URLs
- Troubleshooting guide

**Use When:** Video backgrounds not playing correctly.

---

## Planned Admin Pages

### Voice Checker (TODO)
Validate copy against brand voice guidelines from `VOICE_GUIDE.md`.

### SEO Dashboard (TODO)
- Meta titles/descriptions per page
- Flag missing or too-long content
- Keyword density analysis

### Design Checks (TODO)
- Component usage audit
- Color consistency validation
- Typography checks

---

## Technical Notes

### Admin Layout
All admin pages use `AdminLayout.astro` which provides:
- Sidebar navigation
- Consistent styling
- No public header/footer

### API Endpoints

#### `/api/scan` (POST)
AI detection endpoint.

**Request:**
```json
{
  "url": "https://example.com/page"
}
```

**Response:**
```json
{
  "aiScore": 15,
  "humanScore": 85,
  "status": "pass",
  "wordCount": 450
}
```

---

## Access

Admin pages are not protected by authentication (internal tool only).
Do not expose in production sitemap or navigation.
