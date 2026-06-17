'use client';

import { Check, Timer } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Step } from '@/lib/types';
import { useAppStore } from '@/stores/app-store';

interface StepListProps {
  recipeId: string;
  steps: Step[];
}

export function StepList({ recipeId, steps }: StepListProps) {
  const { doneSteps, toggleStep, startTimer } = useAppStore();
  const done = doneSteps[recipeId] || [];

  const formatSeconds = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return m > 0 ? `${m} min${s > 0 ? ` ${s}s` : ''}` : `${s}s`;
  };

  return (
    <ol className="space-y-4">
      {steps.map((step) => {
        const isDone = done.includes(step.number);

        return (
          <motion.li
            key={step.number}
            className="flex gap-4"
            whileTap={{ scale: 0.99 }}
          >
            <button
              onClick={() => toggleStep(recipeId, step.number)}
              className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-[14px] transition-colors ${
                isDone
                  ? 'bg-forest text-white'
                  : 'bg-orange/15 text-orange'
              }`}
            >
              {isDone ? <Check size={16} strokeWidth={3} /> : step.number}
            </button>
            <div className="flex-1 pt-1">
              <p
                className={`text-[14px] leading-relaxed transition-colors ${
                  isDone ? 'text-muted' : 'text-ink'
                }`}
              >
                {step.text}
              </p>
              {step.timerSeconds && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startTimer(step.timerSeconds!, `Étape ${step.number}`);
                  }}
                  className="mt-2 flex items-center gap-2 bg-amber/15 text-amber px-3 py-1.5 rounded-full text-[12px] font-semibold"
                >
                  <Timer size={14} />
                  {formatSeconds(step.timerSeconds)}
                </button>
              )}
            </div>
          </motion.li>
        );
      })}
    </ol>
  );
}
