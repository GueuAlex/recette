# La Grande Table d'Afrique de l'Ouest

Application web (PWA) de **304 recettes ivoiriennes interactives**, tirées du livre
_Secrets de Cuisine_ (Black Amani Studios). Pensée mobile-first : explorer,
filtrer, mettre en favoris, ajuster les portions et cuisiner en mode pas-à-pas
avec minuteurs.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** pour le style
- **Zustand** (avec persistance `localStorage`) pour l'état applicatif
- **Framer Motion** pour les animations / overlays
- PWA installable (manifest + icônes)

> ⚠️ Ce projet utilise Next.js 16, dont certaines API diffèrent des versions
> antérieures. Avant de modifier le code lié au framework, consultez les guides
> dans `node_modules/next/dist/docs/` (voir `AGENTS.md`).

## Démarrage

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts

| Commande        | Description                              |
| --------------- | ---------------------------------------- |
| `npm run dev`   | Serveur de développement                 |
| `npm run build` | Build de production                      |
| `npm run start` | Sert le build de production              |
| `npm run lint`  | ESLint (échoue au moindre warning)       |

## Structure

```
src/
  app/                 # Routes (App Router)
    page.tsx           # Accueil
    explorer/          # Catalogue + filtres
    favoris/           # Recettes sauvegardées
    preferences/       # Réglages utilisateur
    recette/[id]/      # Page statique par recette (SEO / partage)
    manifest.ts        # Manifest PWA
    sitemap.ts         # Sitemap
  components/          # UI (recipe, search, filters, layout, ui)
  data/recipes.json    # Données des recettes
  lib/                 # Données dérivées, types, utilitaires
  stores/app-store.ts  # Store Zustand persisté
```

## Configuration

- `NEXT_PUBLIC_SITE_URL` : URL absolue du site, utilisée pour le sitemap et les
  métadonnées Open Graph (défaut : `https://la-grande-table.example`).
