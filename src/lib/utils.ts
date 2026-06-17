import type { Recipe } from './types';

const ACCENT_COLORS = [
  '#C0552B', '#1F6E3D', '#B5851F', '#9C3527', '#2D6E6E',
  '#A8521C', '#5C7A22', '#7A4A86', '#B23A48', '#1F5E7A',
];

export function getAccentColor(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return ACCENT_COLORS[Math.abs(hash) % ACCENT_COLORS.length];
}

export function formatTime(minutes: number): string {
  if (minutes >= 60) {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m > 0 ? `${h}h ${m}` : `${h}h`;
  }
  return `${minutes} min`;
}

export function normalizeSearch(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

const EMOJI_MAP: Record<string, string> = {
  poulet: '🍗', viande: '🥩', boeuf: '🥩', poisson: '🐟',
  riz: '🍚', attieke: '🍚', attiéké: '🍚', plantain: '🍌',
  banane: '🍌', igname: '🍠', foufou: '🍠', foutou: '🍠',
  arachide: '🥜', pistache: '🥜', sauce: '🍲', soupe: '🍲',
  legume: '🥬', salade: '🥗', dessert: '🍮', gateau: '🍰',
  fruit: '🍊', mangue: '🥭', ananas: '🍍', coco: '🥥',
};

export function foodEmoji(recipe: Recipe): string {
  const searchText = `${recipe.title} ${recipe.tags.join(' ')}`.toLowerCase();
  for (const [keyword, emoji] of Object.entries(EMOJI_MAP)) {
    if (searchText.includes(keyword)) return emoji;
  }
  return '🍽️';
}

export function scaleIngredient(text: string, factor: number): string {
  if (factor === 1) return text;

  const fractionMap: Record<number, string> = {
    0.25: '¼', 0.5: '½', 0.75: '¾',
    1.25: '1¼', 1.5: '1½', 1.75: '1¾',
    2.25: '2¼', 2.5: '2½', 2.75: '2¾',
  };

  // Match numbers at start: "2 oignons" or "2 à 3 oignons"
  return text.replace(/^(\d+(?:[.,]\d+)?)\s*(à\s*(\d+(?:[.,]\d+)?))?\s*/i, (match, n1, _, n2) => {
    const num1 = parseFloat(n1.replace(',', '.')) * factor;
    const rounded1 = Math.round(num1 * 4) / 4;
    const display1 = fractionMap[rounded1] || (Number.isInteger(rounded1) ? rounded1.toString() : rounded1.toFixed(1));

    if (n2) {
      const num2 = parseFloat(n2.replace(',', '.')) * factor;
      const rounded2 = Math.round(num2 * 4) / 4;
      const display2 = fractionMap[rounded2] || (Number.isInteger(rounded2) ? rounded2.toString() : rounded2.toFixed(1));
      return `${display1} à ${display2} `;
    }
    return `${display1} `;
  });
}

export function getDifficultyColor(difficulty: string): string {
  switch (difficulty) {
    case 'Très Facile':
    case 'Facile':
    case 'Tres Facile':
      return 'var(--green-bright)';
    case 'Modérée':
    case 'Moderee':
      return 'var(--difficulty-moderate)';
    default:
      return 'var(--difficulty-hard)';
  }
}
