'use client';

import { ScrollPageSection } from '@/app/assets/scrollpage';
import { AboutMe } from '../molecules/aboutMe';
import { RecommendationSection } from '../organisms/recommendationSection';
import { RepositoriesList } from '../organisms/repositoriesList';
import { Github } from 'lucide-react';
import Link from 'next/link';
import { ContactForm } from '../organisms/contactForm';
import { ContactMeAside } from '../organisms/contactMeAside';
import { Presentation } from '../organisms/presentation';
import { InfiniteKnowledgeCarousel } from '../organisms/infiniteKnowledgeCarousel';

export function HomeModel() {
  return (
    <>
      <ScrollPageSection id="first_section">
        <Presentation />
      </ScrollPageSection>
      <ScrollPageSection id="second_section">
        <svg className="pointer-events-none absolute inset-0 h-full w-full stroke-gray-400 dark:stroke-muted-foreground opacity-30 [mask-image:radial-gradient(60%_60%_at_center,white,transparent)]">
          <defs>
            <pattern
              id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
              width="200"
              height="200"
              x="50%"
              y="-1"
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none"></path>
            </pattern>
          </defs>
          <rect
            width="100%"
            height="100%"
            strokeWidth="0"
            fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
          ></rect>
        </svg>
        <div className="w-full flex flex-col laptop:flex-row items-center justify-between gap-5 laptop:gap-16">
          <RecommendationSection />
          <AboutMe />
        </div>
      </ScrollPageSection>
      <ScrollPageSection id="third_section">
        <div className="w-full relative">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg tablet:text-2xl font-bold text-muted-foreground flex items-center gap-2">
              <Github />
              Github repositories
            </h2>
            <Link
              className="underline cursor-pointer text-muted-foreground text-xs tablet:text-base"
              href="/repositories"
            >
              see all
            </Link>
          </div>
          <RepositoriesList />
          <InfiniteKnowledgeCarousel />
        </div>
      </ScrollPageSection>
      <ScrollPageSection id="contact_section">
        <div className="w-full flex flex-col items-center justify-between gap-4 tablet:flex-row tablet:gap-12">
          <div className="w-full tablet:w-1/2">
            <h2 className="text-muted-foreground text-xl font-bold mb-6">
              Send me a email:
            </h2>
            <ContactForm />
          </div>
          <ContactMeAside />
        </div>
      </ScrollPageSection>
    </>
  );
}
