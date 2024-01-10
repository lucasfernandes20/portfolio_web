import { Button } from '@/components/ui/button';
import { AlignRight } from 'lucide-react';

export function Header() {
  return (
    <header className="w-full bg-muted absolute">
      <div className="w-full flex items-center justify-between container px-6">
        <h1 className="text-7xl blod font-extrabold text-muted-foreground">
          Portfolio
        </h1>
        <ul className="flex gap-4 text-muted-foreground">
          <li>home</li>
          <li>stacks</li>
          <li>about me</li>
          <li>projects</li>
        </ul>
        <Button variant="ghost" size="icon">
          <AlignRight className="text-muted-foreground" />
        </Button>
      </div>
    </header>
  );
}
