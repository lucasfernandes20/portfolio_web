'use client';
import { useTheme } from 'next-themes';
import { ThemeToggle } from './_components/themeToggle';

export default function Home() {
  const { theme } = useTheme();
  return (
    <main className="h-svh w-screen">
      <section className="w-screen h-96 bg-background">
        <div className="h-full container flex flex-col items-center justify-center">
          <div className="bg-muted rounded-full px-4 py-2 border border-muted-foreground/10 mb-6 hover:scale-105 transition-all cursor-default flex gap-4 shadow-lg shadow-accent-foreground/20">
            <p className="text-muted-foreground">{`Using ${theme} theme`}</p>
            <ThemeToggle />
          </div>
          <h1 className="text-primary text-7xl bold font-bold">
            Lucas Fernandes
          </h1>
          <h6 className="text-secondary-foreground text-2xl">
            My web portfolio
          </h6>
        </div>
      </section>
    </main>
  );
}
