'use client';

import TypewriterComponent from 'typewriter-effect';
import { ThemeSwitcher } from '../organisms/themeSwitcher';
import { ScrollPageSection } from '@/app/assets/scrollpage';
import { GradientBall } from '../molecules/gradientBall';
import { useEffect, useState } from 'react';
import { AboutMe } from '../molecules/aboutMe';
import { RecommendationSection } from '../organisms/recommendationSection';
import countYearFromDate from '@/app/utils/countYearsFromDate';
import { RepositoriesList } from '../organisms/repositoriesList';
import { Github } from 'lucide-react';
import { RepositoryDialog } from '../molecules/repositoryDialog';
import Link from 'next/link';
import { ContactForm } from '../organisms/contactForm';

export function HomeModel() {
  const [totalTimeAsDev, setTotalTimeAsDev] = useState<string>();

  useEffect(() => {
    const initDate = new Date('2022-02-12');
    const totalTime = countYearFromDate(initDate);
    setTotalTimeAsDev(totalTime);
  }, []);

  return (
    <>
      <ScrollPageSection id="first_section">
        <svg className="pointer-events-none absolute inset-0 h-full w-full stroke-gray-400 dark:stroke-muted-foreground opacity-30 [mask-image:radial-gradient(100%_70%_at_top_center,white,transparent)]">
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
        <div className="w-full z-30 relative">
          <div className="w-full flex flex-col text-center items-center justify-center">
            <ThemeSwitcher />
            <h1 className="text-5xl tablet:text-6xl laptop:text-7xl text-foreground bold font-bold z-30">
              {`Hi, I'm `}
              <span className="text-primary">Lucas Fernandes</span>
            </h1>
            <h6 className="text-xl text-secondary-foreground laptop:text-2xl z-30">
              <TypewriterComponent
                options={{
                  strings: [
                    'Web developer',
                    'Front-end developer',
                    'Back-end developer'
                  ],
                  autoStart: true,
                  loop: true
                }}
              />
            </h6>
            <p className="w-full text-secondary-foreground/80 text-center z-30 pt-24 laptop:w-1/2 laptop:text-lg">
              {`With ${totalTimeAsDev} `} of experience as a web developer, I
              excel in JavaScript, mastering key frameworks for both{' '}
              <span className="text-primary">front-end and back-end </span>
              development. Explore my portfolio to see how my expertise can
              enhance your projects.
            </p>
          </div>
          <GradientBall />
        </div>
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
        <div className="w-full flex flex-col laptop:flex-row items-center justify-between gap-16">
          <RecommendationSection />
          <AboutMe />
        </div>
      </ScrollPageSection>
      <ScrollPageSection id="third_section">
        <div className="w-full">
          <RepositoryDialog />
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-muted-foreground flex items-center gap-2">
              <Github />
              Github repositories
            </h2>
            <Link
              className="underline cursor-pointer text-muted-foreground"
              href="/repositories"
            >
              see all
            </Link>
          </div>
          <RepositoriesList />
        </div>
      </ScrollPageSection>
      <ScrollPageSection id="forth_section">
        <div className="w-full">
          <aside className="w-full tablet:w-1/2">
            <h2 className="text-muted-foreground text-xl font-bold mb-6">
              Send me a email:
            </h2>
            <ContactForm />
          </aside>
        </div>
      </ScrollPageSection>
    </>
  );
}
