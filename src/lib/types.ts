export interface Ingredient {
  id: string;
  text: string;
}

export interface Step {
  number: number;
  text: string;
  timerSeconds?: number;
}

export interface Recipe {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  tags: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
  difficulty: 'Tres Facile' | 'Facile' | 'Moderee' | 'Modérée' | 'Très Facile';
  ingredients: Ingredient[];
  steps: Step[];
  tip: string;
  page: number;
}

export interface Category {
  slug: string;
  label: string;
  emoji: string;
  color?: string;
}
