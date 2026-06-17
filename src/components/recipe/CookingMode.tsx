'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Timer as TimerIcon, Check } from 'lucide-react';
import { useAppStore } from '@/stores/app-store';
import { getRecipeById } from '@/lib/recipes';
import { getAccentColor } from '@/lib/utils';
import { Timer } from '@/components/ui/Timer';
import confetti from 'canvas-confetti';

export function CookingMode() {
  const {
    activeOverlay,
    currentRecipeId,
    closeOverlay,
    cookingStep,
    nextStep,
    prevStep,
    markCooked,
    showConfetti,
    clearMilestone,
    milestone,
    startTimer,
  } = useAppStore();

  useEffect(() => {
    if (showConfetti) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F5A944', '#1C4D22', '#E07B2A', '#3D8B40'],
      });
      const timeout = setTimeout(clearMilestone, 3000);
      return () => clearTimeout(timeout);
    }
  }, [showConfetti, clearMilestone]);

  if (activeOverlay !== 'cooking' || !currentRecipeId) return null;

  const recipe = getRecipeById(currentRecipeId);
  if (!recipe) return null;

  const accent = getAccentColor(recipe.id);
  const totalSteps = recipe.steps.length;
  const isLastStep = cookingStep >= totalSteps - 1;
  const currentStepData = recipe.steps[cookingStep];
  const progress = ((cookingStep + 1) / totalSteps) * 100;

  const handleFinish = () => {
    markCooked(recipe.id);
    closeOverlay();
  };

  return (
    <AnimatePresence>
      <motion.div
        key="cooking-mode-overlay"
        className="fixed inset-0 bg-ink z-50 flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <button
            onClick={closeOverlay}
            className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
          >
            <X size={22} className="text-white" />
          </button>
          <div className="text-center">
            <p className="text-[12px] text-white/60 font-medium">
              Etape {cookingStep + 1} / {totalSteps}
            </p>
            <p className="text-[14px] text-white font-semibold truncate max-w-[180px]">
              {recipe.title}
            </p>
          </div>
          <div className="w-10" /> {/* Spacer */}
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-white/10">
          <motion.div
            className="h-full bg-amber"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Step content */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          {/* Step number */}
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center text-[32px] font-bold text-white mb-8"
            style={{ background: accent }}
          >
            {cookingStep + 1}
          </div>

          {/* Step text */}
          <motion.p
            key={cookingStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[18px] text-white text-center leading-relaxed max-w-md"
          >
            {currentStepData.text}
          </motion.p>

          {/* Timer button */}
          {currentStepData.timerSeconds && (
            <button
              onClick={() => startTimer(currentStepData.timerSeconds!, `Etape ${cookingStep + 1}`)}
              className="mt-6 flex items-center gap-2 bg-amber text-ink px-5 py-3 rounded-full text-[14px] font-bold"
            >
              <TimerIcon size={18} />
              Lancer le minuteur ({Math.floor(currentStepData.timerSeconds / 60)} min)
            </button>
          )}
        </div>

        {/* Navigation */}
        <div className="p-5 flex items-center gap-4">
          <button
            onClick={prevStep}
            disabled={cookingStep === 0}
            className={`w-14 h-14 rounded-full flex items-center justify-center ${
              cookingStep === 0 ? 'bg-white/5 text-white/30' : 'bg-white/10 text-white'
            }`}
          >
            <ChevronLeft size={28} />
          </button>

          {isLastStep ? (
            <button
              onClick={handleFinish}
              className="flex-1 bg-forest text-white py-4 rounded-full text-[15px] font-bold flex items-center justify-center gap-2"
            >
              <Check size={20} />
              Terminer la recette
            </button>
          ) : (
            <button
              onClick={nextStep}
              className="flex-1 bg-amber text-ink py-4 rounded-full text-[15px] font-bold flex items-center justify-center gap-2"
            >
              Etape suivante
              <ChevronRight size={20} />
            </button>
          )}

          {!isLastStep && (
            <button
              onClick={nextStep}
              className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-white"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>

        {/* Timer floating */}
        <Timer />

        {/* Milestone toast */}
        <AnimatePresence>
          {milestone && (
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="absolute top-20 left-1/2 -translate-x-1/2 bg-amber text-ink px-6 py-3 rounded-full text-[14px] font-bold shadow-hero"
            >
              {milestone} recettes cuisinees !
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
