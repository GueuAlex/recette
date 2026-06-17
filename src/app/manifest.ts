import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "La Grande Table d'Afrique de l'Ouest",
    short_name: 'Grande Table',
    description: '304 recettes ivoiriennes interactives',
    start_url: '/',
    display: 'standalone',
    background_color: '#FBF7F0',
    theme_color: '#1C4D22',
    icons: [
      {
        src: '/icons/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icons/icon-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
