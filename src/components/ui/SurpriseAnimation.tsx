'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/app-store';
import { RECIPES } from '@/lib/recipes';

export function SurpriseAnimation() {
  const { showSurprise, hideSurprise, openRecipe, closeOverlay } = useAppStore();

  useEffect(() => {
    if (showSurprise) {
      const timeout = setTimeout(() => {
        hideSurprise();
        const randomRecipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
        closeOverlay();
        openRecipe(randomRecipe.id);
      }, 850);
      return () => clearTimeout(timeout);
    }
  }, [showSurprise, hideSurprise, openRecipe, closeOverlay]);

  return (
    <AnimatePresence>
      {showSurprise && (
        <motion.div
          key="surprise-overlay"
          className="fixed inset-0 bg-ink/90 z-[60] flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1, 1.1, 1],
              rotate: [0, -3, 3, -3, 0],
            }}
            transition={{ duration: 0.8, repeat: Infinity }}
            className="text-[120px]"
          >
            🍲
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/80 text-[15px] font-medium mt-4"
          >
            Je touille la marmite...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
