'use client';

import { useTheme } from 'next-themes';
import { ThemeToggle } from '../molecules/themeToggle';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export function ThemeSwitcher() {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-card dark:bg-muted rounded-full px-4 py-2 border border-muted-foreground/10 mb-6 hover:scale-105 focus:scale-105 transition-all cursor-default flex gap-4 shadow-lg shadow-accent-foreground/15 z-30">
      {mounted ? (
        <p className="text-muted-foreground">{`Using ${theme} theme`}</p>
      ) : (
        <Skeleton className="w-[150px] h-6" />
      )}
      <ThemeToggle />
    </div>
  );
}
