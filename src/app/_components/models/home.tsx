'use client';

import TypewriterComponent from 'typewriter-effect';
import { Header } from '../organisms/header';
import { ThemeSwitcher } from '../organisms/themeSwitcher';

export function HomeModel() {
  return (
    <>
      <Header />
      <section className="w-screen z-30 pt-36">
        <div className="h-full container flex flex-col items-center justify-center z-30">
          <ThemeSwitcher />
          <h1 className="text-5xl tablet:text-6xl laptop:text-7xl text-foreground bold font-bold z-30">
            {`Hi, I'm `}
            <span className="text-primary">Lucas Fernandes</span>
          </h1>
          <h6 className="text-secondary-foreground text-2xl z-30">
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
        </div>
      </section>
      <div className="w-96 h-96 rounded-full blur-3xl absolute ml-auto left-1/2 top-1/3 bg-gradient-to-r translate-x-[-50%] from-indigo-500/30 via-purple-500/30 to-pink-500/30 z-0"></div>
    </>
  );
}
