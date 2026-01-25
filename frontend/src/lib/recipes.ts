/**
 * Recipe Data Utilities
 *
 * Functions for working with Soul Miner's Eden recipes
 */

import recipesData from '../../../content/recipes/crawled-recipes.json';

export interface Recipe {
  slug: string;
  title: string;
  description: string;
  category: string;
  time: string;
  servings?: string;
  ingredients: string[] | Record<string, string[]>;
  instructions: string[];
  equipment: string[];
  garnish?: string[];
}

// Type-safe recipes data
const recipes = recipesData as Recipe[];

/**
 * Get all recipes
 */
export function getAllRecipes(): Recipe[] {
  return recipes;
}

/**
 * Get recipe by slug
 */
export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find(r => r.slug === slug);
}

/**
 * Get recipes by category
 */
export function getRecipesByCategory(category: string): Recipe[] {
  return recipes.filter(r => r.category.toLowerCase() === category.toLowerCase());
}

/**
 * Get unique categories
 */
export function getCategories(): string[] {
  const categories = new Set(recipes.map(r => r.category));
  return Array.from(categories).sort();
}

/**
 * Get category counts
 */
export function getCategoryCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  recipes.forEach(r => {
    counts[r.category] = (counts[r.category] || 0) + 1;
  });
  return counts;
}

/**
 * Flatten ingredients (handles both array and object formats)
 */
export function flattenIngredients(ingredients: string[] | Record<string, string[]>): string[] {
  if (Array.isArray(ingredients)) {
    return ingredients;
  }
  // It's an object with sections
  return Object.values(ingredients).flat();
}

/**
 * Get ingredients sections (for recipes with grouped ingredients)
 */
export function getIngredientSections(ingredients: string[] | Record<string, string[]>): { title: string; items: string[] }[] {
  if (Array.isArray(ingredients)) {
    return [{ title: 'Ingredients', items: ingredients }];
  }
  return Object.entries(ingredients).map(([title, items]) => ({
    title: title.charAt(0).toUpperCase() + title.slice(1),
    items
  }));
}

/**
 * Search recipes
 */
export function searchRecipes(query: string): Recipe[] {
  const lowerQuery = query.toLowerCase();
  return recipes.filter(r =>
    r.title.toLowerCase().includes(lowerQuery) ||
    r.description.toLowerCase().includes(lowerQuery) ||
    r.category.toLowerCase().includes(lowerQuery)
  );
}
