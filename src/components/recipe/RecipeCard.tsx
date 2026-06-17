'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { Recipe } from '@/lib/types';
import { getAccentColor, formatTime, foodEmoji, getDifficultyColor } from '@/lib/utils';
import { useAppStore } from '@/stores/app-store';
import { CATEGORIES, isRapid, totalTime } from '@/lib/recipes';

interface RecipeCardProps {
  recipe: Recipe;
  variant?: 'normal' | 'feature';
}

export function RecipeCard({ recipe, variant = 'normal' }: RecipeCardProps) {
  const { favorites, toggleFavorite, openRecipe } = useAppStore();
  const isFavorite = favorites.includes(recipe.id);
  const accent = getAccentColor(recipe.id);
  const emoji = foodEmoji(recipe);
  const category = CATEGORIES.find((c) => c.slug === recipe.category);
  const rapid = isRapid(recipe);

  const isFeature = variant === 'feature';
  const imgHeight = isFeature ? 'h-[162px]' : 'h-[118px]';
  const emojiSize = isFeature ? 'text-[104px]' : 'text-[58px]';
  const titleSize = isFeature ? 'text-[18px]' : 'text-[14.5px]';

  // The favorite control is a sibling of the card button (not nested inside it)
  // to keep the markup valid and both controls keyboard-accessible.
  return (
    <div className={`relative ${isFeature ? 'col-span-2' : ''}`}>
      <motion.button
        onClick={() => openRecipe(recipe.id)}
        className="w-full text-left bg-white rounded-[18px] shadow-card overflow-hidden block"
        whileTap={{ scale: 0.98 }}
      >
        <div
          className={`relative ${imgHeight} overflow-hidden`}
          style={{
            background: `linear-gradient(145deg, ${accent}40, ${accent})`,
          }}
        >
          {/* Gloss overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 28% 18%, rgba(255,255,255,0.20), transparent 58%)',
            }}
          />

          {/* Emoji */}
          <div
            className={`absolute bottom-[-10px] right-[-8px] ${emojiSize} opacity-60 select-none`}
            style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.2))' }}
          >
            {emoji}
          </div>

          {/* Category pill */}
          {category && (
            <div className="absolute top-[9px] left-[9px] flex items-center gap-[5px] bg-white/90 text-ink text-[10.5px] font-bold px-[9px] py-[5px] rounded-full">
              <span className="text-[12px]">{category.emoji}</span>
              {category.label.split(' ')[0]}
            </div>
          )}

          {/* Rapid badge */}
          {rapid && (
            <div className="absolute bottom-[9px] left-[9px] bg-amber text-ink text-[10px] font-bold px-[8px] py-[4px] rounded-full">
              ⚡ Rapide
            </div>
          )}
        </div>

        <div className="p-3">
          <h3
            className={`font-playfair font-bold ${titleSize} text-ink line-clamp-2 leading-tight`}
          >
            {recipe.title}
          </h3>
          <div className="flex items-center gap-[9px] mt-2">
            <span className="text-[11px] text-muted font-semibold">
              ⏱ {formatTime(totalTime(recipe))}
            </span>
            <span className="w-[3px] h-[3px] rounded-full bg-hairline" />
            <span
              className="text-[11px] font-semibold"
              style={{ color: getDifficultyColor(recipe.difficulty) }}
            >
              {recipe.difficulty}
            </span>
          </div>
        </div>
      </motion.button>

      {/* Favorite button (sibling, overlaid on the card) */}
      <motion.button
        type="button"
        onClick={() => toggleFavorite(recipe.id)}
        aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        aria-pressed={isFavorite}
        className="absolute top-[7px] right-[7px] w-[31px] h-[31px] rounded-full bg-white/95 flex items-center justify-center shadow-sm"
        whileTap={{ scale: [1, 1.45, 0.9, 1] }}
      >
        <Heart
          size={16}
          className={isFavorite ? 'text-orange fill-orange' : 'text-faint'}
        />
      </motion.button>
    </div>
  );
}
