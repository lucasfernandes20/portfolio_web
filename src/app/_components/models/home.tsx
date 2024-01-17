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
        <div className="w-full z-30">
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
              {`With ${totalTimeAsDev} of experience as a web developer, I excel
              in JavaScript, mastering key frameworks for both front-end and
              back-end development. Explore my portfolio to see how my expertise
              can enhance your projects.`}
            </p>
          </div>
          <GradientBall />
        </div>
      </ScrollPageSection>
      <ScrollPageSection id="second_section">
        <div className="w-full flex flex-col laptop:flex-row items-center justify-between gap-16">
          <RecommendationSection />
          <AboutMe />
        </div>
      </ScrollPageSection>
      <ScrollPageSection id="third_section">
        <div className="w-full">
          <RepositoryDialog />
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-muted-foreground flex items-center gap-2 mb-7">
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
    </>
  );
}
