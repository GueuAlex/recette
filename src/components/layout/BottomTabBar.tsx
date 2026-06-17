'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Grid3X3, Heart, Settings } from 'lucide-react';

const tabs = [
  { href: '/', icon: Home, label: 'Accueil' },
  { href: '/explorer', icon: Grid3X3, label: 'Explorer' },
  { href: '/favoris', icon: Heart, label: 'Favoris' },
  { href: '/preferences', icon: Settings, label: 'Mes préfs' },
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 h-[78px] bg-white/80 backdrop-blur-lg border-t border-hairline z-40">
      <div className="flex h-full max-w-md mx-auto">
        {tabs.map(({ href, icon: Icon, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex-1 flex flex-col items-center justify-center gap-1"
            >
              <Icon
                size={24}
                className={isActive ? 'text-forest' : 'text-faint'}
                fill={isActive ? 'currentColor' : 'none'}
              />
              <span
                className={`text-[10px] font-semibold ${
                  isActive ? 'text-forest' : 'text-faint'
                }`}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
