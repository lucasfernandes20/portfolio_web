'use client';

import TypewriterComponent from 'typewriter-effect';
import { ThemeSwitcher } from './themeSwitcher';
import { useEffect, useState } from 'react';
import countYearFromDate from '@/app/utils/countYearsFromDate';
import { socialMediaList } from '@/app/assets/socialMedia';
import { GradientBall } from '../molecules/gradientBall';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import Link from 'next/link';

export function Presentation() {
  const [totalTimeAsDev, setTotalTimeAsDev] = useState<string>();

  useEffect(() => {
    const initDate = new Date('2022-02-12');
    const totalTime = countYearFromDate(initDate);
    setTotalTimeAsDev(totalTime);
  }, []);
  return (
    <>
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
          <p className="w-full text-secondary-foreground/80 text-center z-30 pt-4 tablet:pt-20 laptop:pt-24 laptop:w-1/2 laptop:text-lg">
            {`With ${totalTimeAsDev} `} of experience as a web developer, I
            excel in JavaScript, mastering key frameworks for both{' '}
            <span className="text-primary">front-end and back-end </span>
            development. Explore my portfolio to see how my expertise can
            enhance your projects.
          </p>
          <ul className="flex items-center gap-3 pt-3 tablet:pt-8 laptop:pt-12 ">
            {socialMediaList.map((socialMedia) => (
              <TooltipProvider key={socialMedia.name}>
                <Tooltip delayDuration={100}>
                  <TooltipTrigger asChild>
                    <li className="text-xl text-primary p-4 rounded-xl tablet:hover:bg-muted-foreground/10 cursor-pointer">
                      <Link href={socialMedia.path} target="_blank">
                        <socialMedia.icon />
                      </Link>
                    </li>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{socialMedia.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </ul>
        </div>
        <GradientBall />
      </div>
    </>
  );
}
