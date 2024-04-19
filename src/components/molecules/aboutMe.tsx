import { Subtitle } from '@/components/ui/subtitle';
import { BookOpenText } from 'lucide-react';

export function AboutMe() {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <Subtitle icon={<BookOpenText />}>Professional Summary</Subtitle>
      <p className="p-2 indent-2 bg-transparent backdrop-blur-sm text-muted-foreground text-sx tablet:text-lg">
        I am a seasoned web developer with over 2 years of experience,
        specializing in JavaScript/TypeScript. My professional background
        includes working in two distinct B2B environments: first, at a
        food-service marketplace, and subsequently, at a platform utilizing
        generative artificial intelligence for legal applications. I am
        passionate about continuous learning and executing tasks with mastery.
        Furthermore, I possess strong communication skills that enable effective
        collaboration and problem-solving within teams.
      </p>
    </div>
  );
}
