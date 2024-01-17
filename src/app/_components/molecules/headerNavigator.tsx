'use client';

import { Button } from '@/components/ui/button';
import { usePathname, useRouter } from 'next/navigation';

export function HeaderNavigator() {
  const route = useRouter();
  const pathname = usePathname();

  const scrollToSection = (sectionId: string) => {
    if (pathname === '/') {
      route.push('/');
      const targetSection = document.querySelector('#' + sectionId);
      targetSection?.scrollIntoView({ behavior: 'smooth' });
    } else {
      route.push(`/#${sectionId}`);
      const targetSection = document.querySelector('#' + sectionId);
      targetSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ul className="hidden tablet:flex gap-2 text-muted-foreground">
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
      <li>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-inherit hover:scale-105"
          onClick={() => scrollToSection('forth_section')}
        >
          <p className="text-muted-foreground text-base font-normal">stacks</p>
        </Button>
      </li>
    </ul>
  );
}
