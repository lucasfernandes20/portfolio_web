'use client';
import { cn } from '@src/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@components/ui/carousel';
import {
  ProfessionalExperience,
  ProfessionalExperienceCard
} from '../molecules/professionalExperienceCard';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback } from 'react';

interface ProfessionalExperienceCarouselProps {
  experiences: Array<ProfessionalExperience>;
  api?: CarouselApi;
  current: number;
  count: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setApi: any;
}

export function ProfessionalExperienceCarousel({
  experiences,
  api,
  current,
  setApi,
  count
}: ProfessionalExperienceCarouselProps) {
  const handlePrev = useCallback(() => {
    if (api) {
      api.scrollPrev();
    }
  }, [api]);

  const handleNext = useCallback(() => {
    if (api) {
      api.scrollNext();
    }
  }, [api]);

  return (
    <div className="w-full laptop:w-1 flex flex-grow flex-col items-center gap-4 relative">
      <div className="w-full relative group">
        <Carousel
          opts={{
            align: 'center',
            loop: true
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent>
            {experiences.map((experience, index) => (
              <CarouselItem
                key={index}
                className="basis-full laptop:cursor-grab"
              >
                <ProfessionalExperienceCard experience={experience} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <button
          className="group-hover:opacity-100 opacity-0 absolute left-2 top-1/2 -translate-y-1/2 hidden laptop:flex items-center justify-center w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm z-10 text-foreground hover:bg-background transition-colors"
          onClick={handlePrev}
          aria-label="Previous experience"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          className="group-hover:opacity-100 opacity-0 absolute right-2 top-1/2 -translate-y-1/2 hidden laptop:flex items-center justify-center w-8 h-8 rounded-full bg-background/80 backdrop-blur-sm border border-border shadow-sm z-10 text-foreground hover:bg-background transition-colors"
          onClick={handleNext}
          aria-label="Next experience"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      <div className="flex items-center justify-center flex-wrap gap-1 md:gap-2 px-3 md:px-4 py-1 md:py-2 rounded-full bg-background/60 backdrop-blur-sm border border-border/20 shadow-sm">
        {Array.from({ length: count }).map((_, index) => {
          const isActive = current === index + 1;

          return (
            <motion.div
              key={index}
              onClick={() => api?.scrollTo(index)}
              className="transition-all cursor-pointer mx-0.5 md:mx-1"
              initial={false}
              animate={isActive ? { scale: 1 } : { scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={cn(
                  'rounded-full transition-all duration-300',
                  isActive
                    ? 'w-4 md:w-6 h-2 bg-primary'
                    : 'w-2 h-2 bg-muted-foreground/40 hover:bg-muted-foreground/60'
                )}
                layout
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20
                }}
              />
            </motion.div>
          );
        })}

        <div className="text-xs text-muted-foreground ml-2 hidden md:block">
          <span className="font-medium text-foreground">{current}</span>
          <span>/</span>
          <span>{count}</span>
        </div>
      </div>
    </div>
  );
}
