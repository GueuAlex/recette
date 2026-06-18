'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useAppStore } from '@/stores/app-store';

export function Timer() {
  const { timer, clearTimer } = useAppStore();
  const [now, setNow] = useState(() => Date.now());

  // Re-render once per second; remaining time is always derived from the
  // wall clock, so the countdown can't drift even if a tick is missed.
  // A rAF re-syncs `now` immediately when a new timer starts (without a
  // synchronous setState in the effect body).
  useEffect(() => {
    if (!timer) return;
    const tick = () => setNow(Date.now());
    const raf = requestAnimationFrame(tick);
    const interval = setInterval(tick, 1000);
    return () => {
      cancelAnimationFrame(raf);
      clearInterval(interval);
    };
  }, [timer]);

  const remaining = timer ? Math.max(0, Math.round((timer.endsAt - now) / 1000)) : 0;
  const isFinished = !!timer && remaining === 0;

  useEffect(() => {
    if (isFinished && navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  }, [isFinished]);

  if (!timer) return null;

  const progress = timer.total > 0 ? remaining / timer.total : 0;
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-[90px] left-5 right-5 bg-ink rounded-[20px] p-4 shadow-hero z-40"
    >
      <div className="flex items-center gap-4">
        {/* Progress ring */}
        <div className="relative w-14 h-14">
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="4"
            />
            <motion.circle
              cx="28"
              cy="28"
              r="24"
              fill="none"
              stroke={isFinished ? '#A23A2E' : '#F5A944'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={150.8}
              strokeDashoffset={150.8 * (1 - progress)}
              animate={isFinished ? { rotate: [0, 5, -5, 5, -5, 0] } : {}}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[11px] font-bold text-white">
              {isFinished ? '!' : `${minutes}:${seconds.toString().padStart(2, '0')}`}
            </span>
          </div>
        </div>

        {/* Label */}
        <div className="flex-1">
          <p className="text-[13px] font-semibold text-white">{timer.label}</p>
          <p className="text-[11px] text-white/60">
            {isFinished ? 'Temps ecoule !' : 'En cours...'}
          </p>
        </div>

        {/* Close */}
        <button
          onClick={clearTimer}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center"
        >
          <X size={20} className="text-white" />
        </button>
      </div>
    </motion.div>
  );
}
