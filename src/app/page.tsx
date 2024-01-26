'use client';

import { HomeModel } from '@/components/models/home';
import { useScroll, motion } from 'framer-motion';
import { useRef } from 'react';

export default function Home() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ container: ref });
  return (
    <main
      ref={ref}
      className="h-svh w-screen bg-background snap-y snap-mandatory overflow-x-hidden scroll-smooth"
    >
      <motion.div
        className="fixed top-0 left-0 right-0 bg-primary z-50 h-1 [transform-origin:0%]"
        style={{ scaleX: scrollYProgress }}
      />
      <HomeModel />
    </main>
  );
}
