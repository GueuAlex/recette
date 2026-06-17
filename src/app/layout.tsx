import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { BottomTabBar } from '@/components/layout/BottomTabBar';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "La Grande Table d'Afrique de l'Ouest",
  description: '304 recettes ivoiriennes interactives',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#1C4D22',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-inter bg-cream min-h-screen pb-[78px]">
        {children}
        <BottomTabBar />
      </body>
    </html>
  );
}
