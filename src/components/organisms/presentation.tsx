'use client';

import TypewriterComponent from 'typewriter-effect';
import { ThemeSwitcher } from './themeSwitcher';
import { useEffect, useState } from 'react';
import countYearFromDate from '@app/utils/countYearsFromDate';
import { GradientBall } from '../molecules/gradientBall';
import { Contacts } from '@components/molecules/contacts';
import { motion } from 'framer-motion';

const roles = ['Front-end developer', 'Back-end developer', 'Full-stack developer'];

export function Presentation() {
  const [totalTimeAsDev, setTotalTimeAsDev] = useState<string>('2 years');

  useEffect(() => {
    const initDate = new Date('2022-02-12');
    const totalTime = countYearFromDate(initDate);
    setTotalTimeAsDev(totalTime);
  }, []);

  return (
    <section className="w-full z-30 min-h-[90vh] py-16 pt-20 laptop:py-24 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl mx-auto flex flex-col text-center items-center justify-center relative">
        <ThemeSwitcher />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl tablet:text-7xl laptop:text-8xl text-foreground bold font-bold z-30">
            {`Hello, I'm `}
            <span className="text-primary">Lucas</span>
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="mt-4 mb-8"
        >
          <h6 className="text-lg tablet:text-2xl laptop:text-3xl text-secondary-foreground z-30">
            <TypewriterComponent
              options={{
                strings: roles,
                autoStart: true,
                loop: true
              }}
            />
          </h6>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <p className="text-base tablet:text-lg laptop:text-xl text-secondary-foreground/80 text-center z-30 mb-8">
            {`With ${totalTimeAsDev} `} of experience as a developer, I excel
            in JavaScript, mastering key frameworks for both{' '}
            <span className="text-primary font-bold">front-end</span> and <span className="text-primary font-bold">back-end </span>
            development. Crafting responsive, elegant, and high-performance solutions
            that bring ideas to life. Explore my portfolio to see how my expertise can enhance
            your projects.
          </p>
        </motion.div>
        <div>
          <Contacts />
        </div>
        <GradientBall />
      </div>
    </section>
  );
}
