import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { RECIPES, getRecipeById, CATEGORIES } from '@/lib/recipes';
import { getAccentColor, formatTime, foodEmoji, getDifficultyColor } from '@/lib/utils';
import { OpenInAppButton } from '@/components/recipe/OpenInAppButton';

type Params = Promise<{ id: string }>;

// Prerender a static, indexable page for every recipe at build time.
export function generateStaticParams() {
  return RECIPES.map((recipe) => ({ id: recipe.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const recipe = getRecipeById(id);

  if (!recipe) {
    return { title: 'Recette introuvable — La Grande Table' };
  }

  const description =
    recipe.description || recipe.subtitle || `Recette : ${recipe.title}`;

  return {
    title: `${recipe.title} — La Grande Table`,
    description,
    openGraph: {
      title: recipe.title,
      description,
      type: 'article',
    },
  };
}

export default async function RecipePage({ params }: { params: Params }) {
  const { id } = await params;
  const recipe = getRecipeById(id);

  if (!recipe) {
    notFound();
  }

  const accent = getAccentColor(recipe.id);
  const emoji = foodEmoji(recipe);
  const category = CATEGORIES.find((c) => c.slug === recipe.category);

  return (
    <article className="pb-6">
      {/* Hero */}
      <div
        className="relative h-[256px] flex-shrink-0"
        style={{ background: `linear-gradient(145deg, ${accent}40, ${accent})` }}
      >
        <Link
          href="/explorer"
          aria-label="Retour à l'exploration"
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/30 flex items-center justify-center z-10 text-white text-[20px]"
        >
          ‹
        </Link>
        <div className="absolute right-[-20px] bottom-[-30px] text-[180px] opacity-20">
          {emoji}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute left-5 right-5 bottom-5">
          {category && (
            <span className="inline-block bg-white/90 text-ink text-[11px] font-bold px-3 py-1.5 rounded-full mb-3">
              {category.emoji} {category.label}
            </span>
          )}
          <h1 className="font-playfair font-extrabold text-[27px] text-white leading-tight">
            {recipe.title}
          </h1>
          {recipe.subtitle && (
            <p className="font-playfair italic text-[15px] text-amber/90 mt-1">
              {recipe.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Meta grid */}
      <div className="grid grid-cols-4 gap-2 px-5 py-4 bg-white border-b border-hairline">
        <div className="text-center">
          <p className="text-[13px] font-semibold text-ink">{formatTime(recipe.prepTime)}</p>
          <p className="text-[10px] text-muted">Prépa</p>
        </div>
        <div className="text-center">
          <p className="text-[13px] font-semibold text-ink">{formatTime(recipe.cookTime)}</p>
          <p className="text-[10px] text-muted">Cuisson</p>
        </div>
        <div className="text-center">
          <p className="text-[13px] font-semibold text-ink">{recipe.servings}</p>
          <p className="text-[10px] text-muted">Portions</p>
        </div>
        <div className="text-center">
          <p className="text-[13px] font-semibold" style={{ color: getDifficultyColor(recipe.difficulty) }}>
            {recipe.difficulty}
          </p>
          <p className="text-[10px] text-muted">Niveau</p>
        </div>
      </div>

      <div className="px-5">
        {recipe.description && (
          <p className="text-[14px] text-ink leading-relaxed mt-5">{recipe.description}</p>
        )}

        {/* Ingredients */}
        <section className="mt-6">
          <h2 className="font-playfair font-bold text-[18px] text-ink mb-3">Ingrédients</h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((ing) => (
              <li key={ing.id} className="flex items-start gap-3 text-[14px] text-ink leading-relaxed">
                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-forest flex-shrink-0" />
                {ing.text}
              </li>
            ))}
          </ul>
        </section>

        {/* Steps */}
        <section className="mt-6">
          <h2 className="font-playfair font-bold text-[18px] text-ink mb-3">Préparation</h2>
          <ol className="space-y-4">
            {recipe.steps.map((step) => (
              <li key={step.number} className="flex gap-4">
                <span className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-[14px] bg-orange/15 text-orange">
                  {step.number}
                </span>
                <p className="flex-1 pt-1 text-[14px] text-ink leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Tip */}
        {recipe.tip && (
          <section className="mt-6 bg-amber/10 rounded-[16px] p-4">
            <p className="text-[11px] font-bold text-amber uppercase tracking-wider mb-2">
              Astuce du chef
            </p>
            <p className="text-[14px] text-ink leading-relaxed">{recipe.tip}</p>
          </section>
        )}

        {/* CTA */}
        <div className="mt-8">
          <OpenInAppButton recipeId={recipe.id} />
        </div>
      </div>
    </article>
  );
}
