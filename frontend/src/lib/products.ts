/**
 * Product Data Utilities
 *
 * Functions for working with Soul Miner's Eden product catalog
 */

import productsData from '../../../data/products.json';

export interface Product {
  name: string;
  slug: string;
  category: 'compost' | 'mulch' | 'soil' | 'specialty';
  description: string;
  longDescription: string;
  price: number;
  unit: string;
  sku: string;
  inStock: boolean;
  featured?: boolean;
  certifications?: string[];
  benefits: string[];
  applications: string[];
  images: {
    primary: string;
    gallery?: string[];
  };
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  weight?: string;
  dimensions?: string;
}

export interface ProductsData {
  metadata: {
    generatedAt: string;
    totalProducts: number;
    categories: {
      compost: number;
      mulch: number;
      soil: number;
      specialty: number;
    };
    source: string;
    version: string;
  };
  products: Product[];
}

// Type-safe products data
const typedProductsData = productsData as ProductsData;

/**
 * Get all products
 */
export function getAllProducts(): Product[] {
  return typedProductsData.products;
}

/**
 * Get product by slug
 */
export function getProductBySlug(slug: string): Product | undefined {
  return typedProductsData.products.find(p => p.slug === slug);
}

/**
 * Get products by category
 */
export function getProductsByCategory(category: Product['category']): Product[] {
  return typedProductsData.products.filter(p => p.category === category);
}

/**
 * Get featured products
 */
export function getFeaturedProducts(): Product[] {
  return typedProductsData.products.filter(p => p.featured === true);
}

/**
 * Search products by name or description
 */
export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return typedProductsData.products.filter(p =>
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.longDescription.toLowerCase().includes(lowerQuery)
  );
}

/**
 * Get products in stock
 */
export function getInStockProducts(): Product[] {
  return typedProductsData.products.filter(p => p.inStock === true);
}

/**
 * Filter products by price range
 */
export function filterByPriceRange(min: number, max: number): Product[] {
  return typedProductsData.products.filter(p => p.price >= min && p.price <= max);
}

/**
 * Get related products (same category, exclude current)
 */
export function getRelatedProducts(slug: string, limit: number = 4): Product[] {
  const product = getProductBySlug(slug);
  if (!product) return [];

  return typedProductsData.products
    .filter(p => p.category === product.category && p.slug !== slug)
    .slice(0, limit);
}

/**
 * Get price range for a category
 */
export function getCategoryPriceRange(category: Product['category']): { min: number; max: number } {
  const products = getProductsByCategory(category);
  if (products.length === 0) return { min: 0, max: 0 };

  const prices = products.map(p => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

/**
 * Format price with unit
 */
export function formatPrice(product: Product): string {
  return `$${product.price}/${product.unit}`;
}

/**
 * Get category display name
 */
export function getCategoryDisplayName(category: Product['category']): string {
  const names: Record<Product['category'], string> = {
    compost: 'Compost',
    mulch: 'Mulch & Wood Products',
    soil: 'Soil Products',
    specialty: 'Specialty Products',
  };
  return names[category];
}

/**
 * Get category description
 */
export function getCategoryDescription(category: Product['category']): string {
  const descriptions: Record<Product['category'], string> = {
    compost: 'Georgia\'s ONLY certified organic compost. Transform your soil with nutrient-rich, microbially-active compost.',
    mulch: 'Premium mulch products for beautiful, low-maintenance landscapes. Natural and dyed options available.',
    soil: 'High-quality topsoil and specialized soil blends for every landscaping need.',
    specialty: 'Unique products and custom blends for specific projects and applications.',
  };
  return descriptions[category];
}

/**
 * Calculate total price for bulk orders
 */
export function calculateBulkPrice(product: Product, quantity: number): number {
  return product.price * quantity;
}

/**
 * Get product metadata
 */
export function getProductMetadata() {
  return typedProductsData.metadata;
}

/**
 * Material Calculator - Calculate cubic yards needed
 */
export interface CalculationInput {
  length: number; // feet
  width: number; // feet
  depth: number; // inches
}

export interface CalculationResult {
  cubicYards: number;
  cubicFeet: number;
  estimatedCost: number;
  product?: Product;
}

/**
 * Calculate cubic yards needed for a project
 */
export function calculateCubicYards(input: CalculationInput): number {
  const { length, width, depth } = input;

  // Convert depth from inches to feet
  const depthFeet = depth / 12;

  // Calculate cubic feet
  const cubicFeet = length * width * depthFeet;

  // Convert to cubic yards (27 cubic feet = 1 cubic yard)
  const cubicYards = cubicFeet / 27;

  // Round up to nearest 0.5
  return Math.ceil(cubicYards * 2) / 2;
}

/**
 * Calculate material cost with recommended product
 */
export function calculateMaterialCost(
  input: CalculationInput,
  productSlug?: string
): CalculationResult {
  const cubicYards = calculateCubicYards(input);
  const cubicFeet = cubicYards * 27;

  let product: Product | undefined;
  let estimatedCost = 0;

  if (productSlug) {
    product = getProductBySlug(productSlug);
    if (product) {
      estimatedCost = product.price * cubicYards;
    }
  }

  return {
    cubicYards,
    cubicFeet,
    estimatedCost,
    product,
  };
}

/**
 * Recommend products based on project type
 */
export function recommendProducts(projectType: 'garden' | 'lawn' | 'landscape' | 'playground'): Product[] {
  const recommendations: Record<typeof projectType, string[]> = {
    garden: ['humus-compost', 'compost-blend', 'topsoil'],
    lawn: ['topsoil', 'sod-soil', 'humus-compost'],
    landscape: ['double-ground-hardwood-mulch', 'brown-mulch', 'topsoil'],
    playground: ['wood-chips', 'single-ground-mulch'],
  };

  const slugs = recommendations[projectType] || [];
  return slugs
    .map(slug => getProductBySlug(slug))
    .filter((p): p is Product => p !== undefined);
}
