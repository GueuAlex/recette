import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TimerState {
  remaining: number;
  total: number;
  label: string;
}

interface AppState {
  // Persisted
  favorites: string[];
  cooked: string[];
  searchHistory: string[];
  defaultServings: number;

  // UI State
  activeOverlay: 'detail' | 'cooking' | 'search' | null;
  currentRecipeId: string | null;

  // Cooking
  cookingStep: number;
  checkedIngredients: Record<string, string[]>;
  doneSteps: Record<string, number[]>;
  servingsOverride: Record<string, number>;

  // Timer
  timer: TimerState | null;

  // Fun
  showConfetti: boolean;
  milestone: number | null;
  showSurprise: boolean;

  // Actions
  toggleFavorite: (id: string) => void;
  markCooked: (id: string) => void;
  addToHistory: (term: string) => void;
  setDefaultServings: (n: number) => void;
  openRecipe: (id: string) => void;
  closeOverlay: () => void;
  openSearch: () => void;
  startCooking: (id: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  toggleIngredient: (recipeId: string, ingId: string) => void;
  toggleStep: (recipeId: string, stepNo: number) => void;
  setServings: (recipeId: string, servings: number) => void;
  startTimer: (seconds: number, label: string) => void;
  tickTimer: () => void;
  clearTimer: () => void;
  triggerConfetti: () => void;
  triggerSurprise: () => void;
  hideSurprise: () => void;
  clearMilestone: () => void;
  resetAll: () => void;
}

const MILESTONE_COUNTS = [5, 10, 25, 50, 100];

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      favorites: [],
      cooked: [],
      searchHistory: [],
      defaultServings: 4,
      activeOverlay: null,
      currentRecipeId: null,
      cookingStep: 0,
      checkedIngredients: {},
      doneSteps: {},
      servingsOverride: {},
      timer: null,
      showConfetti: false,
      milestone: null,
      showSurprise: false,

      // Actions
      toggleFavorite: (id) => set((state) => ({
        favorites: state.favorites.includes(id)
          ? state.favorites.filter((f) => f !== id)
          : [...state.favorites, id],
      })),

      markCooked: (id) => set((state) => {
        if (state.cooked.includes(id)) return state;
        const newCooked = [...state.cooked, id];
        const count = newCooked.length;
        const milestone = MILESTONE_COUNTS.includes(count) ? count : null;
        return { cooked: newCooked, milestone, showConfetti: true };
      }),

      addToHistory: (term) => set((state) => {
        const filtered = state.searchHistory.filter((t) => t !== term);
        return { searchHistory: [term, ...filtered].slice(0, 6) };
      }),

      setDefaultServings: (n) => set({ defaultServings: n }),

      openRecipe: (id) => set({ activeOverlay: 'detail', currentRecipeId: id }),

      closeOverlay: () => set({ activeOverlay: null, currentRecipeId: null, cookingStep: 0 }),

      openSearch: () => set({ activeOverlay: 'search' }),

      startCooking: (id) => set({ activeOverlay: 'cooking', currentRecipeId: id, cookingStep: 0 }),

      nextStep: () => set((state) => ({ cookingStep: state.cookingStep + 1 })),

      prevStep: () => set((state) => ({ cookingStep: Math.max(0, state.cookingStep - 1) })),

      toggleIngredient: (recipeId, ingId) => set((state) => {
        const current = state.checkedIngredients[recipeId] || [];
        const updated = current.includes(ingId)
          ? current.filter((i) => i !== ingId)
          : [...current, ingId];
        return { checkedIngredients: { ...state.checkedIngredients, [recipeId]: updated } };
      }),

      toggleStep: (recipeId, stepNo) => set((state) => {
        const current = state.doneSteps[recipeId] || [];
        const updated = current.includes(stepNo)
          ? current.filter((s) => s !== stepNo)
          : [...current, stepNo];
        return { doneSteps: { ...state.doneSteps, [recipeId]: updated } };
      }),

      setServings: (recipeId, servings) => set((state) => ({
        servingsOverride: { ...state.servingsOverride, [recipeId]: servings },
      })),

      startTimer: (seconds, label) => set({ timer: { remaining: seconds, total: seconds, label } }),

      tickTimer: () => set((state) => {
        if (!state.timer || state.timer.remaining <= 0) return state;
        return { timer: { ...state.timer, remaining: state.timer.remaining - 1 } };
      }),

      clearTimer: () => set({ timer: null }),

      triggerConfetti: () => set({ showConfetti: true }),

      triggerSurprise: () => set({ showSurprise: true }),

      hideSurprise: () => set({ showSurprise: false }),

      clearMilestone: () => set({ milestone: null, showConfetti: false }),

      resetAll: () => set({
        favorites: [],
        cooked: [],
        searchHistory: [],
        checkedIngredients: {},
        doneSteps: {},
        servingsOverride: {},
      }),
    }),
    {
      name: 'grande-table-storage',
      partialize: (state) => ({
        favorites: state.favorites,
        cooked: state.cooked,
        searchHistory: state.searchHistory,
        defaultServings: state.defaultServings,
      }),
    }
  )
);
