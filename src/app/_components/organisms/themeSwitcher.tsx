'use client';

import { useTheme } from 'next-themes';
import { ThemeToggle } from '../molecules/themeToggle';

export function ThemeSwitcher() {
  const { theme } = useTheme();

  return (
    <div className="bg-muted rounded-full px-4 py-2 border border-muted-foreground/10 mb-6 hover:scale-105 focus:scale-105 transition-all cursor-default flex gap-4 shadow-lg shadow-accent-foreground/15">
      <p className="text-muted-foreground">
        {theme ? `Using ${theme} theme` : 'Using system theme'}
      </p>
      <ThemeToggle />
    </div>
  );
}
