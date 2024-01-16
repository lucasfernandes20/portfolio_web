import { Button } from '@/components/ui/button';
import { AlignRight } from 'lucide-react';
import { HeaderNavigator } from '../molecules/headerNavigator';

export function Header() {
  return (
    <header className="w-full fixed m-auto left-0 top-0 z-40">
      <div className="w-full flex items-center justify-between container py-2">
        <h1 className="text-3xl tablet:text-6xl blod font-extrabold text-primary">
          Portfolio
        </h1>
        <HeaderNavigator />
        <Button
          variant="ghost"
          size="lg"
          className="block hover:bg-muted-foreground/10 p-2 tablet:hidden"
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
