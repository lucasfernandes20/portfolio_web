'use client';

import TypewriterComponent from 'typewriter-effect';
import { Header } from '../organisms/header';
import { ThemeSwitcher } from '../organisms/themeSwitcher';
import { ScrollPageSection } from '@/app/assets/scrollpage';
import { GradientBall } from '../molecules/gradientBall';
import { useEffect, useState } from 'react';
import { AboutMe } from '../molecules/aboutMe';

export function HomeModel() {
  const [totalTimeAsDev, setTotalTimeAsDev] = useState<string>();

  useEffect(() => {
    const initDate = new Date('2022-02-12');
    const currentDate = new Date();
    const monthsOnAYear = 12;

    const diffYears = currentDate.getFullYear() - initDate.getFullYear();
    const diffMonths = currentDate.getMonth() + 1 - (initDate.getMonth() + 1);
    const totalMonths = diffYears * monthsOnAYear + diffMonths;

    const intYears = Math.floor(totalMonths / monthsOnAYear).toFixed(0);

    console.log(diffMonths, diffYears, totalMonths);
    console.log(totalMonths);

    let total = `${intYears} year${diffYears !== 1 ? 's' : ''}`;

    if (totalMonths % 12) {
      total +=
        ' ' +
        `and ${totalMonths % 12} month${totalMonths % 12 !== 1 ? 's' : ''}`;
    }

    console.log(total);
    setTotalTimeAsDev(total);
  }, []);

  return (
    <>
      <Header />
      <ScrollPageSection id="first_section">
        <div className="w-full h-full z-30 relative">
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
        <AboutMe />
      </ScrollPageSection>
      <ScrollPageSection id="third_section">
        <div className="flex items-center justify-center h-full">
          <h2 className="text-7xl text-muted-foreground">Section 3</h2>
        </div>
      </ScrollPageSection>
    </>
  );
}
