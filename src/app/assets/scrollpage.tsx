import { cn } from '@src/lib/utils';

interface ScrollPageSectionProps {
  children: React.ReactNode;
  className?: React.ComponentProps<'div'>['className'];
  id?: string;
}

export function ScrollPageSection({
  children,
  className = '',
  id
}: ScrollPageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'w-screen min-h-[80svh] container overflow-x-hidden flex flex-col items-center justify-center relative',
        className
      )}
    >
      {children}
    </section>
  );
}
