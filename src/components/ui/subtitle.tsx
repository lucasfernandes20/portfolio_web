import { cn } from '@src/lib/utils';

type SubtitleProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: React.ComponentProps<'h2'>['className'];
};

export function Subtitle({ children, icon, className }: SubtitleProps) {
  return (
    <h2
      className={cn(
        'text-lg tablet:text-xl font-bold text-muted-foreground flex items-center gap-2',
        className
      )}
    >
      {icon && icon}
      {children}
    </h2>
  );
}
