'use client';

import { Code, Laptop, Server, Star } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@components/ui/button';
import Link from 'next/link';

export function AboutMe() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const skills = [
    {
      icon: <Code className="w-5 h-5" />,
      title: 'Frontend',
      description: 'React, Next.js, Angular, TypeScript'
    },
    {
      icon: <Laptop className="w-5 h-5" />,
      title: 'UI/UX',
      description: 'Responsive Design, Accessibility, Animations'
    },
    {
      icon: <Server className="w-5 h-5" />,
      title: 'Backend',
      description: 'Node.js, Nest.js, Express, Python, FastAPI'
    }
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center py-12 z-30">
      <div className="relative w-full max-w-5xl mx-auto mb-16 px-4">
        <div className="flex flex-col tablet:flex-row items-center gap-8 tablet:gap-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 3 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="w-64 h-64 tablet:w-72 tablet:h-72 rounded-2xl overflow-hidden shadow-xl relative">
              <div className="absolute inset-0 bg-blue-700 mix-blend-overlay z-10"></div>
              <Image
                src="/images/linkedin_profile.jpg"
                alt="Lucas Fernandes"
                fill
                className="object-cover grayscale-[0.8]"
                sizes="(max-width: 768px) 16rem, 18rem"
                priority
              />

              <motion.div
                className="absolute -top-2 -right-2 size-5 rounded-full bg-primary/60 blur-sm"
                animate={{ y: [-4, 4, -4] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
              <motion.div
                className="absolute bottom-3 -left-2 size-4 rounded-full bg-primary/60 blur-sm"
                animate={{ y: [4, -4, 4] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="absolute -z-10 -bottom-3 -right-3 w-64 h-64 tablet:w-72 tablet:h-72 border-[3px] border-primary/50 rounded-2xl"
            />
          </motion.div>

          <div className="max-w-xl text-center tablet:text-left">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-xl tablet:text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70"
            >
              About Me
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-muted-foreground mb-6"
            >
              With over 3 years of experience crafting modern web interfaces, I
              specialize in building responsive, elegant, and high-performance
              applications. I&apos;m passionate about creating intuitive user
              experiences through clean code and thoughtful design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap gap-3 justify-center tablet:justify-start"
            >
              <Link href="#repositories">
                <Button
                  variant="default"
                  className="transition-all hover:scale-105"
                >
                  View Projects
                </Button>
              </Link>
              <Link href="#career">
                <Button
                  variant="outline"
                  className="transition-all hover:scale-105"
                >
                  Professional Experience
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 tablet:col-span-3 bg-gradient-to-br from-card to-card/70 p-6 rounded-xl shadow-md border border-border/50 mb-6 overflow-hidden relative"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/60 to-primary/0 -z-10"
              animate={{
                x: ['0%', '100%', '0%']
              }}
              transition={{
                duration: 5,
                ease: 'linear',
                repeat: Infinity
              }}
            />

            <div className="flex items-center gap-2 mb-4">
              <div>
                <Star className="text-primary" />
              </div>
              <h4 className="text-lg font-semibold text-card-foreground">
                My Journey
              </h4>
            </div>
            <p className="text-muted-foreground">
              My professional journey includes building applications for the
              food service industry, developing B2B solutions, and contributing
              to AI projects. I combine technical knowledge with a focus on user
              experience to deliver projects that not only work well but also
              provide an enjoyable experience.
            </p>
          </motion.div>

          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: 0.5 + 0.2 * index
              }}
              className="bg-card/50 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-border/50 transition-all duration-300"
            >
              <div className="flex items-center gap-2 mb-3">
                <motion.div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {skill.icon}
                </motion.div>
                <h4 className="font-semibold text-card-foreground">
                  {skill.title}
                </h4>
              </div>
              <p className="text-muted-foreground text-sm">
                {skill.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
