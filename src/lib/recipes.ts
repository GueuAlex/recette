import data from '@/data/recipes.json';
import type { Recipe, Category } from './types';

export const RECIPES: Recipe[] = data.recipes as Recipe[];
export const CATEGORIES: Category[] = data.categories as Category[];

// Get first 5 recipe IDs for featured section (will use actual IDs from data)
export const FEATURED_IDS = RECIPES.slice(0, 5).map(r => r.id);

export function getRecipeById(id: string): Recipe | undefined {
  return RECIPES.find((r) => r.id === id);
}

export function getRecipeOfDay(): Recipe {
  const dayIndex = Math.floor(Date.now() / 86400000);
  return RECIPES[dayIndex % RECIPES.length];
}

export function getRapidRecipes(): Recipe[] {
  return RECIPES.filter((r) => r.prepTime + r.cookTime <= 20);
}

export function getByCategory(slug: string): Recipe[] {
  if (slug === 'recettes-rapides') {
    return RECIPES.filter((r) => r.prepTime + r.cookTime <= 30);
  }
  return RECIPES.filter((r) => r.category === slug);
}

export function getFeaturedRecipes(): Recipe[] {
  return FEATURED_IDS.map((id) => getRecipeById(id)).filter(Boolean) as Recipe[];
}
