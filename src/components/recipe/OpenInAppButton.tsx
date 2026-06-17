'use client';

import { useAppStore } from '@/stores/app-store';

/**
 * Bridges the static, shareable recipe page back into the interactive app:
 * opening the in-app cooking overlay (rendered by the root layout's <Overlays/>).
 */
export function OpenInAppButton({ recipeId }: { recipeId: string }) {
  const startCooking = useAppStore((s) => s.startCooking);

  return (
    <button
      onClick={() => startCooking(recipeId)}
      className="w-full bg-forest text-white py-4 rounded-full text-[15px] font-bold shadow-button"
    >
      Commencer la cuisine
    </button>
  );
}
