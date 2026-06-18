'use client';

import { RecipeDetail } from '@/components/recipe/RecipeDetail';
import { CookingMode } from '@/components/recipe/CookingMode';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { SurpriseAnimation } from '@/components/ui/SurpriseAnimation';

export function Overlays() {
  // Each overlay is keyed off `activeOverlay`, which is *not* persisted and
  // therefore starts as `null` on both the server and the first client render
  // — so there is no hydration mismatch and no need to gate on a mounted flag.
  return (
    <>
      <RecipeDetail />
      <CookingMode />
      <SearchOverlay />
      <SurpriseAnimation />
    </>
  );
}
