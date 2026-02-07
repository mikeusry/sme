# Library Modules

TypeScript utilities and API clients for Soul Miner's Eden.

## Modules

### medusa-v2.ts

Medusa v2 API client for store operations.

**Key Functions:**

| Function | Description |
|----------|-------------|
| `getProducts()` | Get all products from store |
| `getProductByHandle(handle)` | Get product by URL slug |
| `createCart()` | Create new shopping cart |
| `addToCart(cartId, variantId, qty)` | Add item to cart |
| `updateCartItem()` | Update item quantity |
| `removeFromCart()` | Remove item from cart |
| `getShippingOptions(cartId)` | Get available shipping |
| `completeCart(cartId)` | Complete checkout |
| `formatPrice(amount, currency)` | Format price for display |

**Usage:**
```typescript
import { getProductByHandle, formatPrice } from '../lib/medusa-v2';

const product = await getProductByHandle('humus-compost');
const price = formatPrice(product.variants[0].prices[0].amount);
```

---

### cart-store.ts

Client-side cart state management with localStorage persistence.

**Key Functions:**

| Function | Description |
|----------|-------------|
| `initializeCart()` | Init or retrieve existing cart |
| `addItemToCart(variantId, qty)` | Add product to cart |
| `updateItemQuantity(lineItemId, qty)` | Update quantity |
| `removeItemFromCart(lineItemId)` | Remove item |
| `subscribeToCart(callback)` | Subscribe to cart updates |
| `getCartItemCount()` | Get total item count |

**Usage:**
```typescript
import { addItemToCart, subscribeToCart } from '../lib/cart-store';

// Subscribe to cart changes
subscribeToCart((cart, isLoading) => {
  console.log('Cart updated:', cart?.items.length);
});

// Add item
await addItemToCart('variant_123', 1);
```

---

### products.ts

Local product data utilities (reads from `data/products.json`).

**Key Functions:**

| Function | Description |
|----------|-------------|
| `getAllProducts()` | Get all products |
| `getProductBySlug(slug)` | Get by URL slug |
| `getProductsByCategory(cat)` | Filter by category |
| `getFeaturedProducts()` | Get featured products |
| `searchProducts(query)` | Search name/description |
| `calculateCubicYards(input)` | Material calculator |
| `recommendProducts(projectType)` | Get recommendations |

**Categories:** `compost`, `mulch`, `soil`, `specialty`

---

### cloudinary.ts

Cloudinary image transformation utilities.

**Key Functions:**

| Function | Description |
|----------|-------------|
| `buildCloudinaryUrl(publicId, options)` | Build URL with transforms |
| `getCloudinaryResponsiveSet(publicId)` | Generate srcset |
| `getOptimizedImage(publicId, preset)` | Use preset transforms |
| `getPlaceholder(w, h, text)` | Fallback placeholder |

**Presets:**
- `productHero` - 800x800
- `productThumbnail` - 300x300
- `productGallery` - 600x600
- `heroImage` - 1920x800
- `categoryCard` - 600x400
- `blogFeatured` - 1200x630
- `teamMember` - 400x400 (face detection)

**Usage:**
```typescript
import { getOptimizedImage } from '../lib/cloudinary';

const url = getOptimizedImage('products/compost.jpg', 'productHero');
```

---

### blog.ts

Blog content utilities (reads from `content/blog/`).

**Key Functions:**
- `getAllPosts()` - Get all blog posts
- `getPostBySlug(slug)` - Get single post
- `getRecentPosts(limit)` - Get recent posts

---

### recipes.ts

Recipe content utilities (reads from `content/recipes/`).

**Key Functions:**
- `getAllRecipes()` - Get all recipes
- `getRecipeBySlug(slug)` - Get single recipe
- `getRecipesByCategory(cat)` - Filter by category

---

### medusa.ts (Legacy)

Original Medusa v1 client. **Deprecated** - use `medusa-v2.ts` instead.

---

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `PUBLIC_MEDUSA_BACKEND_URL` | Medusa API URL | Railway URL |
| `PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Store API key | (set) |
| `PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud | `southland-organics` |
| `PUBLIC_CLOUDINARY_FOLDER` | Image folder | `Soul Miner's` |
