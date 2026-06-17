'use client';

import { Check } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Ingredient } from '@/lib/types';
import { useAppStore } from '@/stores/app-store';
import { scaleIngredient } from '@/lib/utils';

interface IngredientListProps {
  recipeId: string;
  ingredients: Ingredient[];
  scaleFactor: number;
}

export function IngredientList({ recipeId, ingredients, scaleFactor }: IngredientListProps) {
  const { checkedIngredients, toggleIngredient } = useAppStore();
  const checked = checkedIngredients[recipeId] || [];

  return (
    <ul className="space-y-3">
      {ingredients.map((ing) => {
        const isChecked = checked.includes(ing.id);
        const scaledText = scaleIngredient(ing.text, scaleFactor);

        return (
          <motion.li
            key={ing.id}
            className="flex items-start gap-3 cursor-pointer"
            onClick={() => toggleIngredient(recipeId, ing.id)}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
                isChecked
                  ? 'bg-forest text-white'
                  : 'bg-gray-100 text-transparent'
              }`}
            >
              <Check size={14} strokeWidth={3} />
            </div>
            <span
              className={`text-[14px] leading-relaxed transition-colors ${
                isChecked ? 'text-muted line-through' : 'text-ink'
              }`}
            >
              {scaledText}
            </span>
          </motion.li>
        );
      })}
    </ul>
  );
}
