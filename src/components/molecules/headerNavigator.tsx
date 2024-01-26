'use client';

import { useGlobalContext } from '@/app/context/store';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
interface HeaderNavigatorProps {
  className?: React.ComponentProps<'div'>['className'];
}

export function HeaderNavigator({ className }: HeaderNavigatorProps) {
  const { setOpenDrawer } = useGlobalContext();
  const route = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    if (pathname === '/') {
      route.push('/');
    } else {
      route.push(`/#${sectionId}`);
    }
    setOpenDrawer(false);
    const targetSection = document.querySelector('#' + sectionId);
    targetSection?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  };

  return (
    <ul
      className={cn(
        'flex flex-col tablet:flex-row gap-2 text-muted-foreground',
        className
      )}
    >
      <li>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-inherit hover:scale-105"
          onClick={() => scrollToSection('first_section')}
        >
          <p className="text-muted-foreground text-base font-normal">home</p>
        </Button>
      </li>
      <li>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-inherit hover:scale-105"
          onClick={() => scrollToSection('second_section')}
        >
          <p className="text-muted-foreground text-base font-normal">
            about me
          </p>
        </Button>
      </li>
      <li>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-inherit hover:scale-105"
          onClick={() => scrollToSection('third_section')}
        >
          <p className="text-muted-foreground text-base font-normal">
            projects
          </p>
        </Button>
      </li>
    </ul>
  );
}
