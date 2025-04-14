'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@components/ui/carousel';
import recommendations from '@src/data/recommendations.json';
import { RecommendationCard } from '../molecules/recommendationCard';
import { useEffect, useState } from 'react';
import { cn } from '@src/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@components/ui/button';

export function RecommendationCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (autoPlay && api) {
      interval = setInterval(() => {
        api.scrollNext();
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [api, autoPlay]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const scrollPrev = () => {
    if (api) {
      api.scrollPrev();
      setAutoPlay(false);
      setTimeout(() => setAutoPlay(true), 10000);
    }
  };

  const scrollNext = () => {
    if (api) {
      api.scrollNext();
      setAutoPlay(false);
      setTimeout(() => setAutoPlay(true), 10000);
    }
  };

  const goToSlide = (index: number) => {
    if (api) {
      api.scrollTo(index);
      setAutoPlay(false);
      setTimeout(() => setAutoPlay(true), 10000);
    }
  };

  return (
    <div
      className="w-full flex flex-col items-center gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full rounded-xl overflow-hidden">
        <Carousel
          opts={{
            align: 'center',
            loop: true
          }}
          setApi={setApi}
          className="w-full"
        >
          <CarouselContent>
            {recommendations.map((recommendation, index) => (
              <CarouselItem
                key={index}
                className="basis-full laptop:basis-2/3 desktop:basis-1/2 laptop:p-3 laptop:cursor-grab"
              >
                <RecommendationCard recommendation={recommendation} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <AnimatePresence>
          {(isHovered || count <= 1) && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute left-2 tablet:left-4 top-1/2 -translate-y-1/2 z-10"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-background/70 backdrop-blur-sm shadow-md hover:bg-background/90 hover:scale-110 transition-all duration-300"
                  onClick={scrollPrev}
                >
                  <ChevronLeft className="h-5 w-5 tablet:h-6 tablet:w-6 text-foreground/80" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute right-2 tablet:right-4 top-1/2 -translate-y-1/2 z-10"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-background/70 backdrop-blur-sm shadow-md hover:bg-background/90 hover:scale-110 transition-all duration-300"
                  onClick={scrollNext}
                >
                  <ChevronRight className="h-5 w-5 tablet:h-6 tablet:w-6 text-foreground/80" />
                </Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      {count > 1 && (
        <div className="flex items-center gap-2 mb-4">
          {Array.from({ length: count }).map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'relative flex items-center justify-center h-7 w-7 transition-all',
                {}
              )}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className={cn(
                  'w-2 h-2 rounded-full bg-muted-foreground/30 hover:bg-muted-foreground/60 transition-all duration-300',
                  {
                    'bg-primary scale-100': current === index + 1
                  }
                )}
                whileHover={{ scale: 1.3 }}
                animate={{
                  scale: current === index + 1 ? 1.3 : 1
                }}
                transition={{ duration: 0.3 }}
              />
              {current === index + 1 && (
                <motion.div
                  className="absolute inset-0 rounded-full border border-primary/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: [0, 0.8, 0],
                    scale: [0.8, 1.8, 0.8]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'loop'
                  }}
                />
              )}
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
