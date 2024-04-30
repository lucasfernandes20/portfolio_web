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

  const executeScroll = (sectionId: string) => {
    setOpenDrawer(false);

    if (pathname !== '/') {
      route.push('/', { scroll: true });
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    } else {
      const section = document.querySelector(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
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
          onClick={() => executeScroll('#hero')}
        >
          <p className="text-muted-foreground text-base font-normal">home</p>
        </Button>
      </li>
      <li>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-inherit hover:scale-105"
          onClick={() => executeScroll('#about')}
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
          onClick={() => executeScroll('#repositories')}
        >
          <p className="text-muted-foreground text-base font-normal">
            projects
          </p>
        </Button>
      </li>
      <li>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-inherit hover:scale-105"
          onClick={() => executeScroll('#career')}
        >
          <p className="text-muted-foreground text-base font-normal">career</p>
        </Button>
      </li>
    </ul>
  );
}
