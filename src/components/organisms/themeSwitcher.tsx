'use client';

import { useTheme } from 'next-themes';
import { ThemeToggle } from '../molecules/themeToggle';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ThemeSwitcher() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <AnimatePresence>
      {mounted && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="bg-card dark:bg-muted rounded-full px-3 py-1 tablet:px-4 tablet:py-2 border border-muted-foreground/10 mb-6 hover:scale-105 focus:scale-105 transition-all cursor-default flex items-center gap-4 z-30"
        >
          <p className="text-sm tablet:text-base text-muted-foreground select-none">{`Using ${theme} theme`}</p>
          <ThemeToggle />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
