'use client';

import { Button } from '@/components/ui/button';
import { AlignRight } from 'lucide-react';
import { HeaderNavigator } from '../molecules/headerNavigator';
import { Drawer } from './drawer';
import { useGlobalContext } from '@/app/context/store';
import { useRouter } from 'next/navigation';

export function Header() {
  const { setOpenDrawer } = useGlobalContext();
  const route = useRouter();

  return (
    <header className="w-full fixed m-auto left-0 top-0 z-40">
      <Drawer />
      <div className="w-full flex items-center justify-between container py-2">
        <h1
          className="text-3xl tablet:text-6xl blod font-extrabold text-primary cursor-pointer"
          onClick={() => route.push('/#first_section')}
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
        >
          <p className="text-base text-primary-foreground">Contact me</p>
        </Button>
      </div>
    </header>
  );
}
