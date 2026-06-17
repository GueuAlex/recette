'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { sheetUp, fade } from '@/lib/animations';
import { CATEGORIES } from '@/lib/recipes';

interface FilterSheetProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    category: string | null;
    difficulty: string | null;
    maxTime: number | null;
    sort: 'alpha' | 'rapid';
  };
  onFilterChange: (filters: FilterSheetProps['filters']) => void;
  resultCount: number;
}

const DIFFICULTIES = ['Toutes', 'Très Facile', 'Facile', 'Modérée'];
const TIME_OPTIONS = [
  { label: 'Tous', value: null },
  { label: '≤ 20 min', value: 20 },
  { label: '≤ 45 min', value: 45 },
  { label: '≤ 1h', value: 60 },
];
const SORT_OPTIONS = [
  { label: 'A → Z', value: 'alpha' as const },
  { label: 'Plus rapide', value: 'rapid' as const },
];

export function FilterSheet({ isOpen, onClose, filters, onFilterChange, resultCount }: FilterSheetProps) {
  const handleCategoryChange = (slug: string | null) => {
    onFilterChange({ ...filters, category: slug });
  };

  const handleDifficultyChange = (diff: string) => {
    onFilterChange({ ...filters, difficulty: diff === 'Toutes' ? null : diff });
  };

  const handleTimeChange = (time: number | null) => {
    onFilterChange({ ...filters, maxTime: time });
  };

  const handleSortChange = (sort: 'alpha' | 'rapid') => {
    onFilterChange({ ...filters, sort });
  };

  const handleReset = () => {
    onFilterChange({ category: null, difficulty: null, maxTime: null, sort: 'alpha' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/45 z-50"
            variants={fade}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />
          <motion.div
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[26px] max-h-[84vh] overflow-y-auto z-50"
            variants={sheetUp}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-5">
              {/* Handle */}
              <div className="w-10 h-1 bg-hairline rounded-full mx-auto mb-4" />

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-playfair font-bold text-[21px] text-ink">
                  Filtrer & trier
                </h2>
                <button onClick={handleReset} className="text-orange text-[13px] font-semibold">
                  Reinitialiser
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h3 className="text-[12px] font-bold text-muted uppercase tracking-wider mb-3">
                  Categorie
                </h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleCategoryChange(null)}
                    className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                      !filters.category
                        ? 'bg-forest text-white'
                        : 'bg-gray-100 text-ink'
                    }`}
                  >
                    Toutes
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.slug}
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                        filters.category === cat.slug
                          ? 'bg-forest text-white'
                          : 'bg-gray-100 text-ink'
                      }`}
                    >
                      {cat.emoji} {cat.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty */}
              <div className="mb-6">
                <h3 className="text-[12px] font-bold text-muted uppercase tracking-wider mb-3">
                  Difficulte
                </h3>
                <div className="flex flex-wrap gap-2">
                  {DIFFICULTIES.map((diff) => (
                    <button
                      key={diff}
                      onClick={() => handleDifficultyChange(diff)}
                      className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                        (diff === 'Toutes' && !filters.difficulty) || filters.difficulty === diff
                          ? 'bg-forest text-white'
                          : 'bg-gray-100 text-ink'
                      }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time */}
              <div className="mb-6">
                <h3 className="text-[12px] font-bold text-muted uppercase tracking-wider mb-3">
                  Temps total
                </h3>
                <div className="flex flex-wrap gap-2">
                  {TIME_OPTIONS.map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => handleTimeChange(opt.value)}
                      className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                        filters.maxTime === opt.value
                          ? 'bg-forest text-white'
                          : 'bg-gray-100 text-ink'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div className="mb-8">
                <h3 className="text-[12px] font-bold text-muted uppercase tracking-wider mb-3">
                  Trier par
                </h3>
                <div className="flex gap-2">
                  {SORT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleSortChange(opt.value)}
                      className={`px-4 py-2 rounded-full text-[13px] font-semibold transition-colors ${
                        filters.sort === opt.value
                          ? 'bg-forest text-white'
                          : 'bg-gray-100 text-ink'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={onClose}
                className="w-full bg-forest text-white py-4 rounded-full text-[15px] font-bold shadow-button"
              >
                Voir {resultCount} recettes
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
