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
      className={
        'w-screen h-svh container overflow-x-hidden snap-start flex items-center justify-center relative' +
        className
      }
    >
      {children}
    </section>
  );
}
