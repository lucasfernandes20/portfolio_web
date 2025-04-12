'use client';

import TypewriterComponent from 'typewriter-effect';
import { ThemeSwitcher } from './themeSwitcher';
import { useEffect, useState } from 'react';
import countYearFromDate from '@app/utils/countYearsFromDate';
import { Contacts } from '@components/molecules/contacts';
import { motion } from 'framer-motion';

const roles = [
  'Front-end developer',
  'Back-end developer',
  'Full-stack developer'
];

export function Presentation() {
  const [totalTimeAsDev, setTotalTimeAsDev] = useState<string>('2 years');

  useEffect(() => {
    const initDate = new Date('2022-02-12');
    const totalTime = countYearFromDate(initDate);
    setTotalTimeAsDev(totalTime);
  }, []);

  return (
    <section className="w-full z-30 min-h-[90vh] py-16 pt-20 laptop:py-24 flex flex-col items-center justify-center relative overflow-hidden">
      <div className="w-full max-w-4xl mx-auto flex flex-col text-center items-center laptop:items-start justify-center relative">
        <ThemeSwitcher />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <div className="text-center laptop:text-start self-start z-30">
            <p className="text-base text-primary font-bold">{`Hello, I'm `}</p>
            <h1 className="text-3xl tablet:text-4xl laptop:text-5xl text-foreground/80 font-bold">
              Lucas Fernandes.
            </h1>
            <h6 className="text-base tablet:text-xl laptop:text-xl text-secondary-foreground z-30">
              <TypewriterComponent
                options={{
                  strings: roles,
                  autoStart: true,
                  loop: true
                }}
              />
            </h6>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-3xl mt-6 laptop:max-w-xl"
        >
          <p className="text-sm tablet:text-base laptop:text-base text-secondary-foreground/80 text-center laptop:text-start z-30">
            {`With ${totalTimeAsDev} `} of experience as a developer, I excel in
            JavaScript, mastering key frameworks for both{' '}
            <span className="text-primary font-bold">front-end</span> and{' '}
            <span className="text-primary font-bold">back-end </span>
            development. Crafting responsive, elegant, and high-performance
            solutions that bring ideas to life. Explore my portfolio to see how
            my expertise can enhance your projects.
          </p>
        </motion.div>
        <div>
          <Contacts />
        </div>
      </div>
    </section>
  );
}
