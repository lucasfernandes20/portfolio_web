'use client';

import { Button } from '@/components/ui/button';
import { AlignRight } from 'lucide-react';
import { HeaderNavigator } from '@/components/molecules/headerNavigator';
import { Drawer } from './drawer';
import { useGlobalContext } from '@/app/context/store';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function Header() {
  const { setOpenDrawer } = useGlobalContext();
  const route = useRouter();
  const { setOpenMailer } = useGlobalContext();

  const [scrolled, setScrolled] = useState(false);

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
    <header
      className={cn(
        'w-svw fixed m-auto left-0 top-0 z-40 transition-all duration-500 ease-in-out',
        scrolled ? 'backdrop-blur bg-background/50' : ''
      )}
    >
      <Drawer />
      <div className="w-full flex items-center justify-between container py-2">
        <h1
          className="text-3xl tablet:text-6xl blod font-extrabold text-primary cursor-pointer select-none"
          onClick={() => route.push('/#hero')}
        >
          Portfolio
        </h1>
        <HeaderNavigator className="hidden tablet:flex" />
        <Button
          variant="ghost"
          size="lg"
          className="block hover:bg-muted-foreground/10 p-2 tablet:hidden"
          onClick={() => setOpenDrawer((prev) => !prev)}
        >
          <AlignRight className="text-muted-foreground h-8 w-8" />
        </Button>
        <Button
          variant="default"
          size="default"
          className="hidden laptop:block p-2 py-0"
          onClick={() => setOpenMailer((prev) => !prev)}
        >
          <p className="text-base text-primary-foreground">Contact me</p>
        </Button>
      </div>
    </header>
  );
}
