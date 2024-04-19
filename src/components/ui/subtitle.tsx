type SubtitleProps = {
  children: React.ReactNode;
  icon?: React.ReactNode;
};

export function Subtitle({ children, icon }: SubtitleProps) {
  return (
    <h2 className="text-lg tablet:text-xl font-bold text-muted-foreground flex items-center gap-2">
      {icon && icon}
      {children}
    </h2>
  );
}
