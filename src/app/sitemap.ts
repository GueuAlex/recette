import type { MetadataRoute } from 'next';
import { RECIPES } from '@/lib/recipes';

// Override at build/deploy time with NEXT_PUBLIC_SITE_URL.
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://la-grande-table.example';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['', '/explorer', '/favoris', '/preferences'].map((path) => ({
    url: `${BASE_URL}${path}`,
    changeFrequency: 'weekly' as const,
    priority: path === '' ? 1 : 0.6,
  }));

  const recipeRoutes = RECIPES.map((recipe) => ({
    url: `${BASE_URL}/recette/${recipe.id}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...recipeRoutes];
}
