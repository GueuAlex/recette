'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, Sparkles } from 'lucide-react';
import { useAppStore } from '@/stores/app-store';
import { RECIPES } from '@/lib/recipes';
import { normalizeSearch, getAccentColor, foodEmoji, formatTime } from '@/lib/utils';
import { fade, slideUp } from '@/lib/animations';

export function SearchOverlay() {
  const {
    activeOverlay,
    closeOverlay,
    searchHistory,
    addToHistory,
    openRecipe,
    triggerSurprise,
    hideSurprise,
    showSurprise,
  } = useAppStore();

  const [query, setQuery] = useState('');
  const [fridgeMode, setFridgeMode] = useState(false);
  const [fridgeIngredients, setFridgeIngredients] = useState<string[]>([]);

  const searchResults = useMemo(() => {
    if (fridgeMode && fridgeIngredients.length > 0) {
      // Fridge mode: find recipes that contain ALL selected ingredients
      return RECIPES.filter((recipe) => {
        const ingredientText = recipe.ingredients.map((i) => normalizeSearch(i.text)).join(' ');
        return fridgeIngredients.every((ing) => ingredientText.includes(normalizeSearch(ing)));
      }).slice(0, 20);
    }

    if (!query.trim()) return [];

    const normalizedQuery = normalizeSearch(query);
    return RECIPES.filter((recipe) => {
      const searchable = normalizeSearch(
        `${recipe.title} ${recipe.subtitle} ${recipe.tags.join(' ')} ${recipe.category}`
      );
      return searchable.includes(normalizedQuery);
    }).slice(0, 20);
  }, [query, fridgeMode, fridgeIngredients]);

  const handleSearch = (term: string) => {
    setQuery(term);
    if (term.trim()) {
      addToHistory(term.trim());
    }
  };

  const handleResultClick = (recipeId: string) => {
    if (query.trim()) {
      addToHistory(query.trim());
    }
    closeOverlay();
    openRecipe(recipeId);
  };

  const handleSurprise = () => {
    triggerSurprise();
    setTimeout(() => {
      hideSurprise();
      const randomRecipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
      closeOverlay();
      openRecipe(randomRecipe.id);
    }, 850);
  };

  const commonIngredients = [
    'Poulet', 'Poisson', 'Boeuf', 'Riz', 'Attiéké', 'Plantain',
    'Tomate', 'Oignon', 'Piment', 'Huile de palme', 'Arachide', 'Graine',
  ];

  const toggleFridgeIngredient = (ing: string) => {
    setFridgeIngredients((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]
    );
  };

  if (activeOverlay !== 'search') return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-cream z-50 flex flex-col"
        variants={fade}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        {/* Header */}
        <div className="p-4 border-b border-hairline bg-white">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-3 bg-gray-100 rounded-full px-4 py-3">
              <Search size={20} className="text-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une recette..."
                className="flex-1 bg-transparent text-[15px] text-ink placeholder:text-faint outline-none"
                autoFocus
              />
              {query && (
                <button onClick={() => setQuery('')}>
                  <X size={18} className="text-muted" />
                </button>
              )}
            </div>
            <button
              onClick={closeOverlay}
              className="text-[14px] font-semibold text-forest"
            >
              Fermer
            </button>
          </div>

          {/* Mode toggle */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setFridgeMode(false)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                !fridgeMode ? 'bg-forest text-white' : 'bg-gray-100 text-ink'
              }`}
            >
              🔍 Recherche
            </button>
            <button
              onClick={() => setFridgeMode(true)}
              className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                fridgeMode ? 'bg-forest text-white' : 'bg-gray-100 text-ink'
              }`}
            >
              🧊 Je vide mon frigo
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Fridge mode */}
          {fridgeMode && (
            <motion.div variants={slideUp} initial="hidden" animate="visible">
              <p className="text-[13px] text-muted mb-3">
                Sélectionne les ingrédients que tu as :
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {commonIngredients.map((ing) => (
                  <button
                    key={ing}
                    onClick={() => toggleFridgeIngredient(ing)}
                    className={`px-3 py-1.5 rounded-full text-[13px] font-semibold transition-colors ${
                      fridgeIngredients.includes(ing)
                        ? 'bg-orange text-white'
                        : 'bg-gray-100 text-ink'
                    }`}
                  >
                    {ing}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Search history */}
          {!fridgeMode && !query && searchHistory.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock size={16} className="text-muted" />
                <span className="text-[12px] font-bold text-muted uppercase tracking-wider">
                  Recherches récentes
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {searchHistory.map((term) => (
                  <button
                    key={term}
                    onClick={() => handleSearch(term)}
                    className="px-4 py-2 bg-white border border-hairline rounded-full text-[13px] text-ink font-medium"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Surprise button */}
          {!fridgeMode && !query && (
            <button
              onClick={handleSurprise}
              className="w-full flex items-center justify-center gap-2 py-4 bg-warm-field border border-dashed border-orange rounded-[18px] text-orange-deep text-[14px] font-bold mb-6"
            >
              <Sparkles size={18} />
              Surprends-moi !
            </button>
          )}

          {/* Results */}
          {searchResults.length > 0 && (
            <div>
              <p className="text-[12px] font-bold text-muted uppercase tracking-wider mb-3">
                {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''}
              </p>
              <div className="space-y-3">
                {searchResults.map((recipe) => {
                  const accent = getAccentColor(recipe.id);
                  return (
                    <motion.button
                      key={recipe.id}
                      onClick={() => handleResultClick(recipe.id)}
                      className="w-full flex items-center gap-3 bg-white border border-hairline rounded-[16px] p-3 text-left"
                      whileTap={{ scale: 0.98 }}
                    >
                      <div
                        className="w-14 h-14 rounded-[12px] flex items-center justify-center flex-shrink-0"
                        style={{ background: `linear-gradient(145deg, ${accent}40, ${accent})` }}
                      >
                        <span className="text-[28px]">{foodEmoji(recipe)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-playfair font-bold text-[15px] text-ink truncate">
                          {recipe.title}
                        </p>
                        <p className="text-[12px] text-muted mt-0.5">
                          ⏱ {formatTime(recipe.prepTime + recipe.cookTime)} · {recipe.difficulty}
                        </p>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          )}

          {/* No results */}
          {((query && searchResults.length === 0) ||
            (fridgeMode && fridgeIngredients.length > 0 && searchResults.length === 0)) && (
            <div className="text-center py-12">
              <div className="text-[46px] mb-3">🍳</div>
              <p className="font-playfair text-[18px] text-ink">
                Aucune recette trouvée
              </p>
              <p className="text-[13px] text-muted mt-2">
                Essaie d&apos;autres mots-clés ou ingrédients.
              </p>
            </div>
          )}
        </div>

        {/* Surprise animation overlay */}
        <AnimatePresence>
          {showSurprise && (
            <motion.div
              className="fixed inset-0 bg-ink/90 z-60 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1, 1.2, 1],
                  rotate: [0, -5, 5, -5, 0],
                }}
                transition={{ duration: 0.8 }}
                className="text-[120px]"
              >
                🍲
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
