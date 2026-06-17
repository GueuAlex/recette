'use client';

import { Minus, Plus } from 'lucide-react';
import { useAppStore } from '@/stores/app-store';

export default function PreferencesPage() {
  const { favorites, cooked, defaultServings, setDefaultServings, resetAll } = useAppStore();

  return (
    <div className="px-5 pt-2 pb-6">
      <div className="py-3">
        <h1 className="font-playfair font-extrabold text-[26px] text-forest">
          Mes préférences
        </h1>
      </div>

      {/* Stats */}
      <div className="flex gap-3 mt-2">
        <div className="flex-1 bg-gradient-to-br from-green-mid to-forest rounded-[18px] p-4 text-white shadow-button">
          <p className="font-playfair font-extrabold text-[30px] leading-none">
            {cooked.length}
          </p>
          <p className="text-[12px] opacity-90 mt-1 font-medium">
            👨‍🍳 recettes cuisinées
          </p>
        </div>
        <div className="flex-1 bg-gradient-to-br from-amber to-orange rounded-[18px] p-4 text-white shadow-button">
          <p className="font-playfair font-extrabold text-[30px] leading-none">
            {favorites.length}
          </p>
          <p className="text-[12px] opacity-95 mt-1 font-medium">
            ❤️ recettes favorites
          </p>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-[18px] shadow-card mt-6 divide-y divide-hairline">
        {/* Default servings */}
        <div className="flex items-center justify-between p-4">
          <div>
            <p className="text-[14px] font-semibold text-ink">Portions par défaut</p>
            <p className="text-[12px] text-muted mt-0.5">Pour le calcul des ingrédients</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDefaultServings(Math.max(1, defaultServings - 1))}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={defaultServings <= 1}
              aria-label="Réduire les portions"
            >
              <Minus size={16} className="text-ink" />
            </button>
            <span className="text-[18px] font-bold text-amber w-6 text-center">
              {defaultServings}
            </span>
            <button
              onClick={() => setDefaultServings(Math.min(10, defaultServings + 1))}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              disabled={defaultServings >= 10}
              aria-label="Augmenter les portions"
            >
              <Plus size={16} className="text-ink" />
            </button>
          </div>
        </div>

        {/* Theme */}
        <div className="flex items-center justify-between p-4">
          <div>
            <p className="text-[14px] font-semibold text-ink">Thème</p>
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1.5 rounded-full bg-forest text-white text-[12px] font-semibold">
              Clair
            </span>
            <span className="px-3 py-1.5 rounded-full bg-hairline text-muted text-[12px] font-semibold">
              Sombre · bientôt
            </span>
          </div>
        </div>

        {/* Notifications */}
        <div className="flex items-center justify-between p-4">
          <div>
            <p className="text-[14px] font-semibold text-ink">Recette du jour</p>
            <p className="text-[12px] text-muted mt-0.5">Notification quotidienne</p>
          </div>
          <div className="w-12 h-7 bg-forest rounded-full relative shadow-sm">
            <div className="absolute right-1 top-1 w-5 h-5 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-[18px] shadow-card mt-4 p-4">
        <p className="text-[13px] text-muted leading-relaxed">
          <strong className="text-ink">La Grande Table d'Afrique de l'Ouest</strong> — 304 recettes
          authentiques du livre "Secrets de Cuisine" par Black Amani Studios.
        </p>
        <p className="text-[11px] text-faint mt-3">
          Version 1.0 · Black Amani Studios
        </p>
      </div>

      {/* Reset */}
      <button
        onClick={() => {
          if (confirm('Réinitialiser tous les favoris et la progression ?')) {
            resetAll();
          }
        }}
        className="w-full mt-6 py-3 rounded-[18px] border-2 border-danger text-danger text-[14px] font-semibold hover:bg-danger/5 transition-colors"
      >
        Réinitialiser favoris et progression
      </button>
    </div>
  );
}
