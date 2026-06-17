'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Minus, Plus, Clock, Flame, Users, ChefHat } from 'lucide-react';
import { useAppStore } from '@/stores/app-store';
import { getRecipeById, CATEGORIES } from '@/lib/recipes';
import { getAccentColor, formatTime, foodEmoji, getDifficultyColor } from '@/lib/utils';
import { sheetUp, fade } from '@/lib/animations';
import { IngredientList } from './IngredientList';
import { StepList } from './StepList';

type Tab = 'ingredients' | 'steps' | 'tip';

export function RecipeDetail() {
  const {
    activeOverlay,
    currentRecipeId,
    closeOverlay,
    startCooking,
    favorites,
    toggleFavorite,
    defaultServings,
    servingsOverride,
    setServings,
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<Tab>('ingredients');

  if (activeOverlay !== 'detail' || !currentRecipeId) return null;

  const recipe = getRecipeById(currentRecipeId);
  if (!recipe) return null;

  const isFavorite = favorites.includes(recipe.id);
  const accent = getAccentColor(recipe.id);
  const emoji = foodEmoji(recipe);
  const category = CATEGORIES.find((c) => c.slug === recipe.category);
  const currentServings = servingsOverride[recipe.id] || defaultServings;
  const scaleFactor = currentServings / recipe.servings;

  const tabs: { key: Tab; label: string }[] = [
    { key: 'ingredients', label: 'Ingrédients' },
    { key: 'steps', label: 'Préparation' },
    { key: 'tip', label: 'Astuce' },
  ];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 z-50"
        variants={fade}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={closeOverlay}
      />
      <motion.div
        className="fixed inset-x-0 bottom-0 top-12 bg-cream rounded-t-[26px] z-50 overflow-hidden flex flex-col"
        variants={sheetUp}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero */}
        <div
          className="relative h-[256px] flex-shrink-0"
          style={{ background: `linear-gradient(145deg, ${accent}40, ${accent})` }}
        >
          {/* Close button */}
          <button
            onClick={closeOverlay}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center z-10"
          >
            <X size={22} className="text-white" />
          </button>

          {/* Favorite button */}
          <motion.button
            onClick={() => toggleFavorite(recipe.id)}
            className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 flex items-center justify-center z-10"
            whileTap={{ scale: [1, 1.4, 0.9, 1] }}
          >
            <Heart
              size={20}
              className={isFavorite ? 'text-orange fill-orange' : 'text-muted'}
            />
          </motion.button>

          {/* Emoji background */}
          <div className="absolute right-[-20px] bottom-[-30px] text-[180px] opacity-20">
            {emoji}
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute left-5 right-5 bottom-5">
            {category && (
              <span className="inline-block bg-white/90 text-ink text-[11px] font-bold px-3 py-1.5 rounded-full mb-3">
                {category.emoji} {category.label}
              </span>
            )}
            <h1 className="font-playfair font-extrabold text-[27px] text-white leading-tight">
              {recipe.title}
            </h1>
            {recipe.subtitle && (
              <p className="font-playfair italic text-[15px] text-amber/90 mt-1">
                {recipe.subtitle}
              </p>
            )}
          </div>
        </div>

        {/* Meta grid */}
        <div className="grid grid-cols-4 gap-2 px-5 py-4 bg-white border-b border-hairline">
          <div className="text-center">
            <Clock size={18} className="mx-auto text-muted mb-1" />
            <p className="text-[13px] font-semibold text-ink">{formatTime(recipe.prepTime)}</p>
            <p className="text-[10px] text-muted">Prépa</p>
          </div>
          <div className="text-center">
            <Flame size={18} className="mx-auto text-muted mb-1" />
            <p className="text-[13px] font-semibold text-ink">{formatTime(recipe.cookTime)}</p>
            <p className="text-[10px] text-muted">Cuisson</p>
          </div>
          <div className="text-center">
            <Users size={18} className="mx-auto text-muted mb-1" />
            <p className="text-[13px] font-semibold text-ink">{recipe.servings}</p>
            <p className="text-[10px] text-muted">Portions</p>
          </div>
          <div className="text-center">
            <ChefHat size={18} className="mx-auto text-muted mb-1" />
            <p className="text-[13px] font-semibold" style={{ color: getDifficultyColor(recipe.difficulty) }}>
              {recipe.difficulty}
            </p>
            <p className="text-[10px] text-muted">Niveau</p>
          </div>
        </div>

        {/* Servings stepper */}
        <div className="flex items-center justify-between px-5 py-3 bg-warm-field border-b border-hairline">
          <span className="text-[14px] font-semibold text-ink">Portions</span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setServings(recipe.id, Math.max(1, currentServings - 1))}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"
            >
              <Minus size={16} className="text-ink" />
            </button>
            <span className="text-[20px] font-bold text-orange w-8 text-center">
              {currentServings}
            </span>
            <button
              onClick={() => setServings(recipe.id, Math.min(20, currentServings + 1))}
              className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm"
            >
              <Plus size={16} className="text-ink" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-hairline bg-white">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-[13px] font-semibold transition-colors ${
                activeTab === tab.key
                  ? 'text-forest border-b-2 border-forest'
                  : 'text-muted'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-5">
          {activeTab === 'ingredients' && (
            <IngredientList
              recipeId={recipe.id}
              ingredients={recipe.ingredients}
              scaleFactor={scaleFactor}
            />
          )}
          {activeTab === 'steps' && (
            <StepList recipeId={recipe.id} steps={recipe.steps} />
          )}
          {activeTab === 'tip' && recipe.tip && (
            <div className="bg-amber/10 rounded-[16px] p-4">
              <p className="text-[11px] font-bold text-amber uppercase tracking-wider mb-2">
                Astuce du chef
              </p>
              <p className="text-[14px] text-ink leading-relaxed">{recipe.tip}</p>
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="p-5 bg-white border-t border-hairline">
          <button
            onClick={() => startCooking(recipe.id)}
            className="w-full bg-forest text-white py-4 rounded-full text-[15px] font-bold shadow-button"
          >
            Commencer la cuisine
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
