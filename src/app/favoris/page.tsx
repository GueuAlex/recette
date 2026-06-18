'use client';

import Link from 'next/link';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { useAppStore } from '@/stores/app-store';
import { getRecipeById } from '@/lib/recipes';
import type { Recipe } from '@/lib/types';

export default function FavorisPage() {
  const { favorites } = useAppStore();
  const recipes = favorites
    .map(getRecipeById)
    .filter((r): r is Recipe => r !== undefined);

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="py-3">
        <h1 className="font-playfair font-extrabold text-[26px] text-forest">
          Mes favoris ❤️
        </h1>
        <p className="text-[12.5px] text-muted font-medium mt-1">
          {favorites.length} recettes sauvegardées
        </p>
      </div>

      {recipes.length > 0 ? (
        <div className="grid grid-cols-2 gap-[13px] mt-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 flex flex-col items-center gap-4">
          <div className="w-[92px] h-[92px] rounded-full bg-gray-100 flex items-center justify-center text-[42px]">
            🫙
          </div>
          <div>
            <p className="font-playfair text-[19px] text-ink leading-tight">
              Ton carnet est encore vide
            </p>
            <p className="text-[13.5px] text-muted leading-relaxed mt-2 max-w-[240px]">
              Explore les recettes et appuie sur ♡ pour les garder ici, prêtes à cuisiner.
            </p>
          </div>
          <Link
            href="/explorer"
            className="mt-2 bg-forest text-white px-6 py-3 rounded-full text-[14px] font-bold"
          >
            Explorer les recettes
          </Link>
        </div>
      )}
    </div>
  );
}
