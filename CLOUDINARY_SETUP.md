# Cloudinary Image Management - Soul Miner's Eden

Complete guide for using Cloudinary for image optimization and delivery.

## Overview

We use Cloudinary instead of Astro's built-in Image component because:

1. **Server-side transformations** - Cloudinary handles all image processing on their CDN, avoiding build-time overhead
2. **Dynamic URLs** - Works better with runtime image selection from the Medusa backend
3. **Advanced optimizations** - Automatic format selection (WebP, AVIF), quality optimization, and responsive delivery
4. **Global CDN** - Fast image delivery worldwide with automatic caching
5. **On-demand transformations** - No need to rebuild the site for new image variants

## Configuration

### Environment Variables

```bash
# .env file
PUBLIC_CLOUDINARY_CLOUD_NAME=southland-organics
PUBLIC_CLOUDINARY_API_KEY=246196521633339
CLOUDINARY_API_SECRET=vQLdl6oOHdhvLgQqC8CnfqAxjAY
PUBLIC_CLOUDINARY_FOLDER=Soul Miner's
```

### Cloudinary Account Details

- **Cloud Name:** southland-organics
- **Base Folder:** Soul Miner's
- **Console URL:** [View Media Library](https://console.cloudinary.com/app/c-a0276fd53d03a5dd1b597bfb77def6/assets/media_library/folders/00df434792288f5ebc6767f5f7c9450a4c)

## Components

### 1. CloudinaryImage (Base Component)

The foundation component with full control over transformations.

```astro
<CloudinaryImage
  publicId="products/compost-pile.jpg"
  alt="Organic Compost"
  width={800}
  height={600}
  crop="fill"
  gravity="auto"
  quality="auto"
  format="auto"
  responsive={true}
  loading="lazy"
/>
```

**Props:**
- `publicId` - Image path within "Soul Miner's" folder (e.g., "products/compost-pile.jpg")
- `alt` - Alt text for accessibility (required)
- `width` - Image width in pixels
- `height` - Image height in pixels
- `crop` - Crop mode: 'fill', 'fit', 'scale', 'pad', 'crop', 'thumb'
- `gravity` - Focus point: 'auto', 'center', 'face', 'faces'
- `quality` - Quality: 'auto' or 1-100
- `format` - Format: 'auto', 'webp', 'avif', 'jpg', 'png'
- `responsive` - Generate srcset for different screen sizes
- `loading` - 'lazy' (default) or 'eager'
- `effect` - Apply effects: 'blur', 'sepia', 'grayscale', etc.
- `blur`, `brightness`, `contrast`, `saturation` - Adjustment values

### 2. ProductImage (E-commerce Optimized)

Preset configurations for product display.

```astro
<ProductImage
  publicId="products/compost/certified-organic.jpg"
  alt="Certified Organic Compost"
  variant="hero"
/>
```

**Variants:**
- `hero` - 800x800px - Main product image
- `gallery` - 600x600px - Product gallery
- `card` - 400x400px - Product cards (default)
- `thumbnail` - 300x300px - Small previews

### 3. HeroImage (Banner Images)

Large banner images with overlay support.

```astro
<HeroImage
  publicId="farm/landscape.jpg"
  alt="Soul Miner's Eden Farm"
  height={600}
  overlay={true}
/>
```

**Features:**
- 1920px width for full-screen display
- Optional gradient overlay for text readability
- Eager loading for above-the-fold images
- High priority fetch

### 4. Avatar (Profile Images)

Profile images with face detection and circular cropping.

```astro
<Avatar
  publicId="team/mike-usry.jpg"
  alt="Mike Usry"
  size="lg"
  border={true}
/>
```

**Sizes:**
- `sm` - 80px
- `md` - 120px (default)
- `lg` - 200px
- `xl` - 300px

## Folder Structure in Cloudinary

Organize images in the following structure within "Soul Miner's" folder:

```
Soul Miner's/
├── products/
│   ├── compost/
│   │   ├── certified-organic-compost.jpg
│   │   └── compost-pile.jpg
│   ├── mulch/
│   │   ├── hardwood-mulch.jpg
│   │   └── pine-bark-mulch.jpg
│   ├── soil/
│   │   └── garden-soil.jpg
│   └── specialty/
│       └── topsoil.jpg
├── services/
│   ├── grazing-goats.jpg
│   └── land-management.jpg
├── farm/
│   ├── hero-landscape.jpg
│   └── wide-landscape.jpg
├── team/
│   ├── mike-usry.jpg
│   └── team-member.jpg
└── banners/
    └── homepage-hero.jpg
```

## Image Migration

### Running the Migration Script

```bash
# From project root
npm run migrate:images
```

The script will:
1. Download images from the current website
2. Upload them to Cloudinary with organized folder structure
3. Generate a mapping file (`image-url-mapping.json`) with old → new URL mappings
4. Output success/failure summary

### Manual Upload

To manually upload images to Cloudinary:

1. Go to [Cloudinary Media Library](https://console.cloudinary.com/app/c-a0276fd53d03a5dd1b597bfb77def6/assets/media_library/folders/00df434792288f5ebc6767f5f7c9450a4c)
2. Navigate to "Soul Miner's" folder
3. Create subfolders as needed (products, services, etc.)
4. Upload images
5. Copy the public ID (e.g., "Soul Miner's/products/compost/organic.jpg")
6. Use in components: `publicId="products/compost/organic.jpg"`

## Usage Examples

### Product Page

```astro
---
import ProductImage from '../components/ProductImage.astro';
---

<div class="product-gallery">
  <!-- Main product image -->
  <ProductImage
    publicId="products/compost/certified-organic.jpg"
    alt="Certified Organic Compost - 1 Cubic Yard"
    variant="hero"
    loading="eager"
    fetchpriority="high"
  />

  <!-- Additional images -->
  <div class="thumbnails">
    <ProductImage
      publicId="products/compost/compost-pile.jpg"
      alt="Compost Pile View"
      variant="thumbnail"
    />
    <ProductImage
      publicId="products/compost/close-up.jpg"
      alt="Compost Close-up"
      variant="thumbnail"
    />
  </div>
</div>
```

### Homepage Hero

```astro
---
import HeroImage from '../components/HeroImage.astro';
---

<section class="hero relative">
  <HeroImage
    publicId="farm/hero-landscape.jpg"
    alt="Soul Miner's Eden - 65 Acre Family Farm"
    height={800}
    overlay={true}
  />

  <div class="hero-content absolute inset-0 flex items-center justify-center text-white">
    <h1>Welcome to Soul Miner's Eden</h1>
  </div>
</section>
```

### Team Section

```astro
---
import Avatar from '../components/Avatar.astro';
---

<div class="team-grid">
  <div class="team-member">
    <Avatar
      publicId="team/mike-usry.jpg"
      alt="Mike Usry, Owner"
      size="lg"
      border={true}
    />
    <h3>Mike Usry</h3>
    <p>Owner & Founder</p>
  </div>
</div>
```

### Service Images

```astro
---
import CloudinaryImage from '../components/CloudinaryImage.astro';
---

<div class="service-card">
  <CloudinaryImage
    publicId="services/grazing-goats.jpg"
    alt="Eden Grazing Services"
    width={800}
    height={600}
    crop="fit"
    class="rounded-lg"
  />
  <h3>Eden Grazing Services</h3>
  <p>Natural land management with livestock</p>
</div>
```

## Advanced Features

### Responsive Images

Automatically generates multiple sizes:

```astro
<CloudinaryImage
  publicId="products/compost-pile.jpg"
  alt="Compost"
  width={1200}
  responsive={true}
/>

<!-- Generates:
  srcset:
    400w - for mobile
    800w - for tablet
    1200w - for desktop
    1600w - for large displays
    2400w - for retina displays

  sizes: (max-width: 640px) 100vw, (max-width: 1024px) 50vw, 1200px
-->
```

### Image Effects

```astro
<!-- Blur effect for privacy -->
<CloudinaryImage
  publicId="services/grazing.jpg"
  blur={300}
/>

<!-- Enhance colors -->
<CloudinaryImage
  publicId="products/compost.jpg"
  saturation={30}
  contrast={10}
/>

<!-- Black and white -->
<CloudinaryImage
  publicId="farm/vintage-photo.jpg"
  effect="grayscale"
/>
```

### Custom Transformations

```astro
<CloudinaryImage
  publicId="products/custom-item.jpg"
  alt="Custom Product"
  width={500}
  height={500}
  crop="thumb"
  gravity="center"
  quality={85}
  format="webp"
/>
```

## Performance Optimizations

### Lazy Loading

By default, all images use lazy loading:

```astro
<!-- Lazy load (default) -->
<ProductImage loading="lazy" />

<!-- Eager load for above-the-fold images -->
<HeroImage loading="eager" fetchpriority="high" />
```

### Automatic Format Selection

Cloudinary automatically serves the best format:
- WebP for modern browsers (80-90% size reduction)
- AVIF for cutting-edge browsers (even better compression)
- JPEG/PNG fallback for older browsers

```astro
<!-- Automatically serves WebP/AVIF when supported -->
<CloudinaryImage format="auto" quality="auto" />
```

### Device Pixel Ratio

Automatically adjusts for retina displays:

```astro
<CloudinaryImage dpr="auto" />
<!-- Serves 2x images for retina, 1x for standard -->
```

## Testing

Visit the test page to see all components in action:

```
http://localhost:4321/test-cloudinary
```

The test page includes:
- All component variants
- Different transformation examples
- Responsive image demonstrations
- Effect showcases
- Format comparisons

## Troubleshooting

### Images Not Loading

1. **Check environment variables** - Ensure `.env` file has correct credentials
2. **Verify public ID** - Must match the folder structure in Cloudinary
3. **Check browser console** - Look for 404 errors or incorrect URLs
4. **Cloudinary folder** - Images should be inside "Soul Miner's" folder

### Incorrect Cropping

1. **Try different crop modes** - 'fill', 'fit', 'scale', 'pad'
2. **Adjust gravity** - 'auto', 'center', 'face' for better focus
3. **Check aspect ratio** - Ensure width/height match intended display

### Performance Issues

1. **Enable responsive images** - Set `responsive={true}`
2. **Use lazy loading** - Keep `loading="lazy"` for below-fold images
3. **Optimize quality** - Use `quality="auto"` for automatic optimization
4. **Use appropriate formats** - Set `format="auto"` for WebP/AVIF

## Migration Checklist

- [x] Cloudinary account configured
- [x] Environment variables set
- [x] Components created (CloudinaryImage, ProductImage, HeroImage, Avatar)
- [x] Utility functions implemented
- [x] Migration script created
- [ ] Run image migration from current site
- [ ] Update product data with Cloudinary public IDs
- [ ] Replace placeholder images in components
- [ ] Test all image variants
- [ ] Verify responsive images work correctly
- [ ] Check performance with Lighthouse

## Resources

- [Cloudinary Console](https://console.cloudinary.com/app/c-a0276fd53d03a5dd1b597bfb77def6/assets/media_library/folders/00df434792288f5ebc6767f5f7c9450a4c)
- [Cloudinary Transformation Reference](https://cloudinary.com/documentation/image_transformations)
- [Cloudinary URL API](https://cloudinary.com/documentation/image_transformation_reference)
- Test Page: `/test-cloudinary`

---

**Implementation Status:** Phase 2 Complete ✅

Next: Migrate content from current site and integrate real images into product pages.
