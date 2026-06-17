'use client';

import { useEffect, useState } from 'react';
import { RecipeDetail } from '@/components/recipe/RecipeDetail';
import { CookingMode } from '@/components/recipe/CookingMode';
import { SearchOverlay } from '@/components/search/SearchOverlay';
import { SurpriseAnimation } from '@/components/ui/SurpriseAnimation';

export function Overlays() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render overlays until client is mounted to avoid hydration issues
  if (!mounted) return null;

  return (
    <>
      <RecipeDetail />
      <CookingMode />
      <SearchOverlay />
      <SurpriseAnimation />
    </>
  );
}
