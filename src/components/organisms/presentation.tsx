'use client';

import TypewriterComponent from 'typewriter-effect';
import { ThemeSwitcher } from './themeSwitcher';
import { useEffect, useState } from 'react';
import countYearFromDate from '@app/utils/countYearsFromDate';
import { GradientBall } from '../molecules/gradientBall';
import { Contacts } from '@components/molecules/contacts';
import { HeroCarousel } from './heroCarousel';

const roles = ['Web developer', 'Front-end developer', 'Back-end developer'];

export function Presentation() {
  const [totalTimeAsDev, setTotalTimeAsDev] = useState<string>('2 years');

  useEffect(() => {
    const initDate = new Date('2022-02-12');
    const totalTime = countYearFromDate(initDate);
    setTotalTimeAsDev(totalTime);
  }, []);

  return (
    <section className="w-full z-30 pt-24 laptop:pt-0 flex flex-col laptop:flex-row items-center justify-between gap-12">
      <div className="w-full flex flex-col text-center items-center justify-center relative">
        <ThemeSwitcher />
        <h1 className="text-4xl tablet:text-6xl laptop:text-7xl text-foreground bold font-bold z-30">
          {`Hi, I'm `}
          <span className="text-primary">Lucas</span>
        </h1>
        <h6 className="text-base tablet:text-xl text-secondary-foreground laptop:text-2xl z-30">
          <TypewriterComponent
            options={{
              strings: roles,
              autoStart: true,
              loop: true
            }}
          />
        </h6>
        <p className="w-full text-sm tablet:text-base text-secondary-foreground/80 text-center z-30 pt-4 tablet:pt-20 laptop:pt-24 laptop:text-lg">
          {`With ${totalTimeAsDev} `} of experience as a web developer, I excel
          in JavaScript, mastering key frameworks for both{' '}
          <span className="text-primary">front-end and back-end </span>
          development. Explore my portfolio to see how my expertise can enhance
          your projects.
        </p>
        <Contacts />
        <GradientBall />
      </div>
      <div className="w-full tablet:w-2/3 laptop:w-full">
        <HeroCarousel />
      </div>
    </section>
  );
}
