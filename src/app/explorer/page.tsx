'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import { RecipeCard } from '@/components/recipe/RecipeCard';
import { FilterSheet } from '@/components/filters/FilterSheet';
import { ExplorerSkeleton } from '@/components/ui/LoadingSkeleton';
import { RECIPES, CATEGORIES, isRapid, totalTime } from '@/lib/recipes';

interface Filters {
  category: string | null;
  difficulty: string | null;
  maxTime: number | null;
  sort: 'alpha' | 'rapid';
}

function ExplorerContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');

  const [filters, setFilters] = useState<Filters>({
    category: initialCategory,
    difficulty: null,
    maxTime: null,
    sort: 'alpha',
  });
  const [showSheet, setShowSheet] = useState(false);

  const filteredRecipes = useMemo(() => {
    let result = [...RECIPES];

    if (filters.category) {
      if (filters.category === 'recettes-rapides') {
        result = result.filter(isRapid);
      } else {
        result = result.filter((r) => r.category === filters.category);
      }
    }

    if (filters.difficulty) {
      result = result.filter((r) => r.difficulty === filters.difficulty);
    }

    if (filters.maxTime) {
      result = result.filter((r) => totalTime(r) <= filters.maxTime!);
    }

    if (filters.sort === 'alpha') {
      result.sort((a, b) => a.title.localeCompare(b.title, 'fr'));
    } else {
      result.sort((a, b) => totalTime(a) - totalTime(b));
    }

    return result;
  }, [filters]);

  const activeFiltersCount = [
    filters.category,
    filters.difficulty,
    filters.maxTime,
  ].filter(Boolean).length;

  const categoryLabel = filters.category
    ? CATEGORIES.find((c) => c.slug === filters.category)?.label || 'Rapides'
    : 'Toutes les categories';

  const removeFilter = (key: keyof Filters) => {
    setFilters((prev) => ({ ...prev, [key]: key === 'sort' ? 'alpha' : null }));
  };

  return (
    <div className="px-5 pt-2 pb-6">
      {/* Header */}
      <div className="py-3">
        <h1 className="font-playfair font-extrabold text-[26px] text-forest">
          Explorer
        </h1>
        <p className="text-[12.5px] text-muted font-medium mt-1">
          {filteredRecipes.length} recettes - {categoryLabel}
        </p>
      </div>

      {/* Filter toolbar */}
      <div className="sticky top-0 z-30 bg-cream py-3 border-b border-hairline flex items-center gap-3">
        <button
          onClick={() => setShowSheet(true)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
            activeFiltersCount > 0
              ? 'bg-forest text-white'
              : 'bg-white border border-hairline text-ink'
          }`}
        >
          <SlidersHorizontal size={15} />
          Filtrer
          {activeFiltersCount > 0 && (
            <span className="bg-amber text-ink min-w-[18px] h-[18px] rounded-full text-[11px] font-extrabold flex items-center justify-center">
              {activeFiltersCount}
            </span>
          )}
        </button>

        {/* Active filter chips */}
        <div className="flex-1 flex gap-2 overflow-x-auto">
          {filters.category && (
            <button
              onClick={() => removeFilter('category')}
              className="flex items-center gap-1 bg-green-100 text-forest px-3 py-1.5 rounded-full text-[12.5px] font-bold whitespace-nowrap"
            >
              {CATEGORIES.find((c) => c.slug === filters.category)?.label.split(' ')[0] || 'Rapides'} <X size={14} />
            </button>
          )}
          {filters.difficulty && (
            <button
              onClick={() => removeFilter('difficulty')}
              className="flex items-center gap-1 bg-green-100 text-forest px-3 py-1.5 rounded-full text-[12.5px] font-bold whitespace-nowrap"
            >
              {filters.difficulty} <X size={14} />
            </button>
          )}
          {filters.maxTime && (
            <button
              onClick={() => removeFilter('maxTime')}
              className="flex items-center gap-1 bg-green-100 text-forest px-3 py-1.5 rounded-full text-[12.5px] font-bold whitespace-nowrap"
            >
              ≤ {filters.maxTime} min <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Recipe grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-2 gap-[13px] mt-4" style={{ gridAutoFlow: 'row dense' }}>
          {filteredRecipes.map((recipe, idx) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              variant={idx % 7 === 0 ? 'feature' : 'normal'}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-[46px] mb-3">🍲</div>
          <p className="font-playfair text-[18px] text-ink">
            Aucune recette ne correspond
          </p>
          <p className="text-[13px] text-muted mt-2">
            Essaie d&apos;elargir tes filtres.
          </p>
        </div>
      )}

      <FilterSheet
        isOpen={showSheet}
        onClose={() => setShowSheet(false)}
        filters={filters}
        onFilterChange={setFilters}
        resultCount={filteredRecipes.length}
      />
    </div>
  );
}

export default function ExplorerPage() {
  return (
    <Suspense fallback={<ExplorerSkeleton />}>
      <ExplorerContent />
    </Suspense>
  );
}
