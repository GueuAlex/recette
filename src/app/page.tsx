'use client';

import { Search, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '@/stores/app-store';
import {
  getRecipeOfDay,
  getRapidRecipes,
  getFeaturedRecipes,
  CATEGORIES,
  getByCategory,
} from '@/lib/recipes';
import { getAccentColor, formatTime, foodEmoji, getDifficultyColor } from '@/lib/utils';
import Link from 'next/link';

export default function HomePage() {
  const { openRecipe, openSearch, triggerSurprise } = useAppStore();
  const recipeOfDay = getRecipeOfDay();
  const rapidRecipes = getRapidRecipes().slice(0, 12);
  const featuredRecipes = getFeaturedRecipes();
  const accent = getAccentColor(recipeOfDay.id);

  return (
    <div className="px-5 pt-2 pb-6">
      {/* Header */}
      <header className="flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          <div className="w-[42px] h-[42px] rounded-[13px] bg-gradient-to-br from-green-mid to-forest flex items-center justify-center shadow-button">
            <span className="text-amber text-xl">🍲</span>
          </div>
          <div>
            <h1 className="font-playfair font-extrabold text-[18px] text-forest leading-none">
              La Grande Table
            </h1>
            <p className="text-[11px] text-muted font-medium mt-0.5">
              Bonjour, qu&apos;est-ce qu&apos;on cuisine ?
            </p>
          </div>
        </div>
        <button
          onClick={openSearch}
          className="w-[42px] h-[42px] rounded-[13px] bg-white border border-hairline flex items-center justify-center shadow-card"
        >
          <Search size={20} className="text-forest" />
        </button>
      </header>

      {/* Recipe of the day */}
      <section className="mt-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-[6px] h-[6px] rounded-full bg-orange" />
          <span className="text-[12px] font-bold tracking-wider uppercase text-orange">
            La recette du jour
          </span>
        </div>
        <motion.button
          onClick={() => openRecipe(recipeOfDay.id)}
          className="w-full text-left rounded-[24px] overflow-hidden shadow-hero"
          whileTap={{ scale: 0.98 }}
        >
          <div
            className="relative h-[232px]"
            style={{ background: `linear-gradient(145deg, ${accent}40, ${accent})` }}
          >
            <div className="absolute right-[-8px] bottom-[-14px] text-[130px] opacity-20">
              {foodEmoji(recipeOfDay)}
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/25" />
            <div className="absolute top-[14px] left-[14px] bg-orange/95 text-white px-[13px] py-[7px] rounded-full text-[11px] font-bold">
              🍲 {CATEGORIES.find(c => c.slug === recipeOfDay.category)?.label.split(' ')[0]}
            </div>
            <div className="absolute top-[14px] right-[14px] bg-white/90 text-forest px-[12px] py-[6px] rounded-full text-[11px] font-bold">
              Aujourd&apos;hui
            </div>
            <div className="absolute left-[18px] right-[18px] bottom-[16px]">
              <h2 className="font-playfair font-extrabold text-[27px] text-white leading-tight">
                {recipeOfDay.title}
              </h2>
              {recipeOfDay.subtitle && (
                <p className="font-playfair italic text-[14px] text-amber mt-1">
                  {recipeOfDay.subtitle}
                </p>
              )}
              <div className="flex gap-2 mt-3">
                <span className="bg-white/15 backdrop-blur-sm text-white px-[11px] py-[6px] rounded-full text-[11px] font-semibold">
                  ⏱ {formatTime(recipeOfDay.prepTime)}
                </span>
                <span className="bg-white/15 backdrop-blur-sm text-white px-[11px] py-[6px] rounded-full text-[11px] font-semibold">
                  🔥 {formatTime(recipeOfDay.cookTime)}
                </span>
                <span className="bg-white/15 backdrop-blur-sm text-white px-[11px] py-[6px] rounded-full text-[11px] font-semibold">
                  ⭐ {recipeOfDay.difficulty}
                </span>
              </div>
            </div>
          </div>
        </motion.button>
      </section>

      {/* Surprise button */}
      <section className="mt-4">
        <button
          onClick={triggerSurprise}
          className="w-full flex items-center justify-center gap-2 py-[15px] rounded-[18px] border-[1.5px] border-dashed border-orange bg-warm-field text-orange-deep text-[14.5px] font-bold"
        >
          <span className="text-[19px]">🍲</span> Surprends-moi !
        </button>
      </section>

      {/* Categories */}
      <section className="mt-7">
        <h2 className="font-playfair font-bold text-[21px] text-ink mb-4">
          Explorer par catégorie
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {CATEGORIES.filter(c => c.slug !== 'recettes-rapides').slice(0, 6).map((cat) => {
            const count = getByCategory(cat.slug).length;
            return (
              <Link
                key={cat.slug}
                href={`/explorer?category=${cat.slug}`}
                className="relative h-[108px] rounded-[18px] overflow-hidden shadow-card"
                style={{ background: `linear-gradient(145deg, ${cat.color || '#2E7D35'}40, ${cat.color || '#1C4D22'})` }}
              >
                <div className="absolute right-[-6px] bottom-[-10px] text-[70px] opacity-25">
                  {cat.emoji}
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/5" />
                <div className="absolute left-[13px] right-[13px] bottom-[12px]">
                  <p className="text-white font-bold text-[14px] leading-tight">
                    {cat.label}
                  </p>
                  <p className="text-white/80 text-[11px] font-medium mt-1">
                    {count} recettes
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Rapid recipes */}
      <section className="mt-7">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-playfair font-bold text-[21px] text-ink">
            Pressée ? ⚡
          </h2>
          <Link href="/explorer?category=recettes-rapides" className="text-orange text-[12.5px] font-bold">
            Tout voir
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-5 px-5 snap-x snap-mandatory">
          {rapidRecipes.map((recipe) => {
            const accentColor = getAccentColor(recipe.id);
            return (
              <motion.button
                key={recipe.id}
                onClick={() => openRecipe(recipe.id)}
                className="flex-shrink-0 w-[208px] h-[200px] rounded-[20px] overflow-hidden relative snap-start"
                style={{ background: `linear-gradient(145deg, ${accentColor}40, ${accentColor})` }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.22),transparent_55%)]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[70px] drop-shadow-lg">
                  {foodEmoji(recipe)}
                </div>
                <div className="absolute top-[11px] left-[11px] bg-white/95 text-ink text-[10.5px] font-extrabold px-[10px] py-[5px] rounded-full">
                  ⚡ {formatTime(recipe.prepTime + recipe.cookTime)}
                </div>
                <div className="absolute left-0 right-0 bottom-0 p-[13px] bg-gradient-to-t from-black/55 to-transparent">
                  <p className="font-playfair font-bold text-[14px] text-white leading-tight line-clamp-2">
                    {recipe.title}
                  </p>
                  <p className="text-white/80 text-[10.5px] font-semibold mt-1">
                    {CATEGORIES.find(c => c.slug === recipe.category)?.label.split(' ')[0]}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="mt-7">
        <div className="flex items-center gap-2 mb-4">
          <Star size={18} className="text-orange fill-orange" />
          <h2 className="font-playfair font-bold text-[21px] text-ink">
            Coup de cœur du chef
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          {featuredRecipes.map((recipe) => {
            const accentColor = getAccentColor(recipe.id);
            const cat = CATEGORIES.find(c => c.slug === recipe.category);
            return (
              <motion.button
                key={recipe.id}
                onClick={() => openRecipe(recipe.id)}
                className="flex gap-3 items-stretch bg-white border border-hairline rounded-[18px] p-[11px] shadow-card text-left"
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-1 rounded-full" style={{ background: accentColor }} />
                <div
                  className="w-[88px] h-[88px] rounded-[15px] relative flex-shrink-0"
                  style={{ background: `linear-gradient(145deg, ${accentColor}40, ${accentColor})` }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.22),transparent_58%)] rounded-[15px]" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[44px] drop-shadow-md">
                    {foodEmoji(recipe)}
                  </div>
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <p className="text-[10.5px] font-bold tracking-wider uppercase text-orange">
                    {cat?.label}
                  </p>
                  <p className="font-playfair font-bold text-[16.5px] text-ink leading-tight mt-0.5">
                    {recipe.title}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[11.5px] text-muted font-semibold">
                      ⏱ {formatTime(recipe.prepTime + recipe.cookTime)}
                    </span>
                    <span className="w-[3px] h-[3px] rounded-full bg-hairline" />
                    <span className="text-[11.5px] font-semibold" style={{ color: getDifficultyColor(recipe.difficulty) }}>
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
                <div className="self-center text-hairline">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
