import data from '@/data/recipes.json';
import type { Recipe, Category } from './types';

export const RECIPES: Recipe[] = data.recipes as Recipe[];
export const CATEGORIES: Category[] = data.categories as Category[];

/**
 * Single source of truth for what counts as a "quick" recipe.
 * Used by the Rapides category, the homepage shortcut, the explorer
 * filter and the "⚡ Rapide" badge so they never disagree.
 */
export const RAPID_MAX_MINUTES = 30;

export function totalTime(recipe: Recipe): number {
  return recipe.prepTime + recipe.cookTime;
}

export function isRapid(recipe: Recipe): boolean {
  return totalTime(recipe) <= RAPID_MAX_MINUTES;
}

// Featured selection: first 5 recipes, kept deterministic across renders.
export const FEATURED_IDS = RECIPES.slice(0, 5).map(r => r.id);

export function getRecipeById(id: string): Recipe | undefined {
  return RECIPES.find((r) => r.id === id);
}

export function getRecipeOfDay(): Recipe {
  const dayIndex = Math.floor(Date.now() / 86400000);
  return RECIPES[dayIndex % RECIPES.length];
}

export function getRapidRecipes(): Recipe[] {
  return RECIPES.filter(isRapid);
}

export function getByCategory(slug: string): Recipe[] {
  if (slug === 'recettes-rapides') {
    return RECIPES.filter(isRapid);
  }
  return RECIPES.filter((r) => r.category === slug);
}

export function getFeaturedRecipes(): Recipe[] {
  return FEATURED_IDS.map((id) => getRecipeById(id)).filter(Boolean) as Recipe[];
}
