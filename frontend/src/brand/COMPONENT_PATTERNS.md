# Soul Miner's Eden Component Patterns

> Reusable UI patterns that embody the brand

---

## Hero Sections

### Full-Bleed Video Hero (Homepage)

```html
<section class="hero-section relative py-20 md:py-28 overflow-hidden">
  <!-- Background Video -->
  <div class="hero-video-wrapper">
    <video autoplay muted loop playsinline poster="..." class="hero-video">
    </video>
  </div>

  <!-- 50% Dark Overlay -->
  <div class="hero-overlay"></div>

  <div class="container-custom relative z-10">
    <div class="max-w-4xl mx-auto text-center">
      <!-- Trust Badge -->
      <div class="inline-flex items-center gap-2 bg-white/50 px-4 py-2 rounded-full shadow-md mb-6">
        <span class="text-sm font-semibold">All-Natural • Family-Owned • Athens, GA</span>
      </div>

      <!-- Headline - White, Large -->
      <h1 class="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 text-white leading-tight">
        Cultivate What the Land Was Meant to Be
      </h1>

      <!-- Subheadline -->
      <p class="text-xl md:text-2xl mb-4 text-white max-w-3xl mx-auto leading-relaxed">
        [Supporting copy here]
      </p>

      <!-- USP Line -->
      <p class="text-lg mb-10 text-white font-medium">
        All-Natural Compost. Locally Produced
      </p>

      <!-- Dual CTAs - Ghost/Outline Style -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <a href="/products" class="border-2 border-gray-400 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/70 text-lg px-10 py-4 rounded-lg font-semibold transition-colors">
          Shop Landscape Supply
        </a>
        <a href="/land-management" class="border-2 border-gray-400 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/70 text-lg px-10 py-4 rounded-lg font-semibold transition-colors">
          Explore Grazing Services
        </a>
      </div>

      <!-- Social Proof -->
      <p class="mt-8 text-sm text-white">
        65-acre family farm • Serving North Georgia
      </p>
    </div>
  </div>
</section>
```

**CSS for Video Background:**
```css
.hero-section {
  position: relative;
  isolation: isolate;
}

.hero-video-wrapper {
  position: absolute;
  inset: 0;
  z-index: -2;
  overflow: hidden;
}

.hero-video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  transform: translate(-50%, -50%);
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-color: rgba(0, 0, 0, 0.5);
}
```

---

### Category Hero (Products/Services)

```html
<section class="category-hero relative py-20 md:py-28 overflow-hidden">
  <!-- Background Video/Image -->
  <div class="category-video-wrapper">
    <video autoplay muted loop playsinline poster="..." class="category-video"></video>
  </div>

  <!-- Content (No Overlay Needed if video is darker) -->
  <div class="container-custom relative z-10">
    <div class="max-w-4xl mx-auto text-center text-white">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-8 leading-tight">
        [Category Title]
      </h1>
      <p class="text-lg md:text-xl mb-6 leading-relaxed text-white/90">
        [Category description paragraph 1]
      </p>
      <p class="text-lg md:text-xl leading-relaxed text-white/90">
        [Category description paragraph 2]
      </p>
    </div>
  </div>
</section>
```

---

## Buttons

### Primary Button (Green - Main CTAs)
```html
<a href="..." class="btn-primary text-lg px-10 py-4">
  View All Products
</a>
```

```css
.btn-primary {
  background-color: var(--color-accent-600);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.2s;
  display: inline-block;
}

.btn-primary:hover {
  background-color: var(--color-accent-700);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
```

### Secondary Button (Terracotta)
```html
<a href="..." class="btn-secondary text-lg px-8 py-4">
  Request a Quote
</a>
```

```css
.btn-secondary {
  background-color: var(--color-primary-500);
  color: white;
}

.btn-secondary:hover {
  background-color: var(--color-primary-600);
}
```

### Ghost Button (For Dark Backgrounds)
```html
<a href="..." class="border-2 border-gray-400 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/70 text-lg px-10 py-4 rounded-lg font-semibold transition-colors">
  Button Text
</a>
```

### Outline Button (For Light Backgrounds)
```html
<a href="..." class="btn-outline text-lg px-8 py-4">
  Learn More
</a>
```

```css
.btn-outline {
  border: 2px solid var(--color-primary-500);
  color: var(--color-primary-600);
  background-color: transparent;
}

.btn-outline:hover {
  background-color: var(--color-primary-50);
  border-color: var(--color-primary-600);
}
```

---

## Cards

### Product Card
```html
<div class="product-card group">
  <!-- Image Container -->
  <div class="relative aspect-[4/3] overflow-hidden rounded-lg mb-4">
    <img
      src="..."
      alt="..."
      class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
    />

    <!-- Optional Badge -->
    <div class="absolute top-3 right-3">
      <span class="badge badge-success">Organic</span>
    </div>
  </div>

  <!-- Product Info -->
  <div class="space-y-3">
    <!-- Category -->
    <div class="text-xs uppercase tracking-wider text-secondary-600 font-semibold">
      Compost
    </div>

    <!-- Name -->
    <h3 class="font-bold text-xl text-warm-900">
      Premium Humus Compost
    </h3>

    <!-- Description -->
    <p class="text-warm-600 text-sm line-clamp-2">
      Rich, dark compost teeming with beneficial microorganisms...
    </p>

    <!-- Price -->
    <div class="flex items-baseline gap-2">
      <span class="text-2xl font-bold text-warm-900">$45</span>
      <span class="text-warm-500">/cubic yard</span>
    </div>

    <!-- CTA -->
    <a href="..." class="btn-primary w-full text-center mt-4">
      Learn More
    </a>
  </div>
</div>
```

```css
.product-card {
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: all 0.2s;
  border: 1px solid var(--color-secondary-200);
}

.product-card:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
```

### Feature Box
```html
<div class="feature-box">
  <h3 class="text-xl font-bold mb-2 text-warm-900">
    All Natural Compost
  </h3>
  <p class="text-warm-600">
    Zero biosolids. No fillers. Just clean, biologically active compost made on-site under strict quality control.
  </p>
</div>
```

```css
.feature-box {
  text-align: center;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background-color: white;
  border: 1px solid var(--color-secondary-200);
  transition: border-color 0.2s;
}

.feature-box:hover {
  border-color: var(--color-primary-300);
}
```

### Application Card (With Icon)
```html
<div class="bg-primary-50 rounded-xl p-6 border border-primary-200">
  <h3 class="font-bold text-xl mb-3 text-warm-900">
    🥕 Vegetable Gardens
  </h3>
  <p class="text-warm-700 mb-4">
    100% organic for edible crops. Adds nutrients naturally without synthetic chemicals.
  </p>
  <p class="text-sm text-primary-700 font-semibold">
    Recommended depth: 3-4 inches mixed into soil
  </p>
</div>
```

---

## Trust Elements

### Trust Badge (Pill Style)
```html
<span class="trust-badge">Organic</span>
<span class="trust-badge">Family-Owned</span>
<span class="trust-badge">Athens Local</span>
```

```css
.trust-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: var(--color-primary-50);
  border: 1px solid var(--color-primary-200);
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-primary-700);
}
```

### Stats Grid
```html
<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
  <div class="text-center">
    <div class="text-4xl font-bold text-primary-600 mb-2">500+</div>
    <div class="text-sm text-warm-600">Cubic Yards Monthly</div>
  </div>
  <div class="text-center">
    <div class="text-4xl font-bold text-primary-600 mb-2">65</div>
    <div class="text-sm text-warm-600">Acre Working Farm</div>
  </div>
  <!-- More stats... -->
</div>
```

---

## Section Patterns

### Section Header (Centered)
```html
<div class="text-center mb-12">
  <h2 class="text-3xl md:text-4xl font-display font-bold text-warm-900 mb-4">
    Why Landscapers & Homeowners Choose Us
  </h2>
  <p class="text-lg text-warm-600 max-w-2xl mx-auto">
    From our 65-acre Athens farm to your property—thoughtfully produced materials, delivered with care.
  </p>
</div>
```

### Experience the Farm (Serif Italic Title)
```html
<section class="experience-farm pt-16 md:pt-24 bg-white">
  <div class="container-custom">
    <!-- Text Content -->
    <div class="max-w-3xl mx-auto text-center mb-10 md:mb-14">
      <!-- Title - Serif Italic -->
      <h2 class="font-serif italic text-4xl md:text-5xl lg:text-6xl mb-8 text-primary-500 leading-tight">
        Experience the farm life
      </h2>

      <!-- Headline -->
      <p class="text-warm-700 text-xl md:text-2xl mb-4 leading-relaxed">
        When you slow down, you can hear the land breathing.
      </p>

      <!-- Subheadline -->
      <p class="text-warm-600 text-lg md:text-xl mb-8 leading-relaxed">
        Come enjoy our little slice of Eden.
      </p>

      <!-- CTA -->
      <a href="/contact" class="inline-block bg-primary-400 hover:bg-primary-500 text-white font-semibold tracking-wider text-sm md:text-base px-10 py-4 rounded transition-colors duration-200 uppercase">
        Visit Our Farm
      </a>
    </div>

    <!-- Farm Image (Full Width) -->
    <div class="text-center">
      <img src="..." alt="Soul Miner's Eden Farm" class="mx-auto" loading="lazy" />
    </div>
  </div>
</section>
```

### Gradient CTA Section
```html
<section class="section bg-gradient-to-br from-primary-500 to-primary-600 text-white">
  <div class="container-custom">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <!-- Content -->
      <div>
        <div class="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
          <span class="text-sm font-semibold">New Service Offering</span>
        </div>

        <h2 class="text-3xl md:text-5xl font-display font-bold mb-6 leading-tight">
          Eden Grazing Services
        </h2>

        <p class="text-xl mb-6 text-primary-50 leading-relaxed">
          Sustainable land management through rotational grazing...
        </p>

        <!-- Tags -->
        <div class="flex flex-wrap gap-3 mb-6">
          <span class="bg-white/20 px-4 py-2 rounded-full">Retention ponds</span>
          <span class="bg-white/20 px-4 py-2 rounded-full">Solar farms</span>
        </div>
      </div>

      <!-- Image/Placeholder -->
      <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
        <img src="..." alt="..." class="rounded-xl" />
      </div>
    </div>
  </div>
</section>
```

---

## Form Patterns

### Contact Form
```html
<form class="space-y-6 max-w-xl mx-auto">
  <div>
    <label class="block text-sm font-medium text-warm-700 mb-2">Name</label>
    <input type="text" class="input" placeholder="Your name" />
  </div>

  <div>
    <label class="block text-sm font-medium text-warm-700 mb-2">Email</label>
    <input type="email" class="input" placeholder="you@example.com" />
  </div>

  <div>
    <label class="block text-sm font-medium text-warm-700 mb-2">Message</label>
    <textarea class="textarea" rows="4" placeholder="How can we help?"></textarea>
  </div>

  <button type="submit" class="btn-primary w-full">
    Send Message
  </button>

  <p class="text-center text-sm text-warm-500">
    Prefer to call? Reach us at <a href="tel:+17066134415" class="text-primary-600 font-semibold">(706) 613-4415</a>
  </p>
</form>
```

---

## Navigation

### Desktop Nav Item with Dropdown
```html
<div class="relative group">
  <button class="flex items-center gap-1 text-warm-700 hover:text-primary-600 font-medium py-2 transition-colors">
    Landscape Supply
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </button>

  <div class="absolute top-full left-0 mt-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
    <div class="bg-white shadow-lg rounded-lg border border-warm-200 py-2 min-w-[220px]">
      <a href="/products" class="block px-4 py-2 text-warm-700 hover:bg-primary-50 hover:text-primary-600 font-semibold border-b border-warm-100 mb-1">
        All Products
      </a>
      <a href="/products/compost" class="block px-4 py-2 text-warm-700 hover:bg-primary-50 hover:text-primary-600">
        Compost
      </a>
      <!-- More items... -->
    </div>
  </div>
</div>
```

---

## Responsive Patterns

### Container
```css
.container-custom {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container-custom {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container-custom {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
```

### Section Spacing
```css
.section {
  padding-top: 3rem;
  padding-bottom: 3rem;
}

@media (min-width: 768px) {
  .section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
}

@media (min-width: 1024px) {
  .section {
    padding-top: 5rem;
    padding-bottom: 5rem;
  }
}
```

---

## Animation Classes

### Fade In on Scroll
```css
.fade-in {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

### Hover Scale
```css
.hover-scale {
  transition: transform 0.2s ease;
}

.hover-scale:hover {
  transform: scale(1.02);
}
```

---

*Reference these patterns when building new components. Consistency across the site reinforces the brand.*
