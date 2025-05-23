'use client';

import { Button } from '@components/ui/button';
import { AlignRight, FileText } from 'lucide-react';
import { HeaderNavigator } from '@components/molecules/headerNavigator';
import { Drawer } from './drawer';
import { useGlobalContext } from '@app/context/store';
import { useRouter } from 'next/navigation';
import { cn } from '@src/lib/utils';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Header() {
  const { setOpenDrawer } = useGlobalContext();
  const route = useRouter();
  const { setOpenMailer } = useGlobalContext();

  const [scrolled, setScrolled] = useState(false);

  const openResume = () => {
    window.open('/resume.pdf', '_blank');
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 60;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          scale: scrolled ? 1.02 : 1,
          top: scrolled ? '16px' : '0px'
        }}
        transition={{ duration: 0.1 }}
        className={cn(
          'w-[96%] max-w-[1400px] fixed m-auto left-0 right-0 z-40 transition-all py-2 rounded-3xl duration-500 ease-in-out border-muted-foreground/10',
          scrolled ? 'backdrop-blur bg-background/70 border shadow-lg' : ''
        )}
      >
        <Drawer />
        <div className="w-full flex items-center justify-between container py-2">
          <h1
            className="text-3xl blod font-extrabold text-primary cursor-pointer select-none flex items-center"
            onClick={() => route.push('/#hero')}
          >
            Portfolio
          </h1>
          <HeaderNavigator className="hidden tablet:flex" />
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="default"
              className="hidden tablet:flex border-primary"
              onClick={openResume}
              title="Currículo"
            >
              <FileText className="h-4 w-4 text-primary mr-1" />
              Curriculum
            </Button>
            <Button
              variant="outline"
              size="default"
              className="hidden border-primary laptop:block p-2 py-0"
              onClick={() => setOpenMailer((prev) => !prev)}
            >
              <p className="text-base text-primary">Contact me</p>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="block hover:bg-muted-foreground/10 p-2 tablet:hidden"
              onClick={() => setOpenDrawer((prev) => !prev)}
            >
              <AlignRight className="text-muted-foreground h-8 w-8" />
            </Button>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  );
}
