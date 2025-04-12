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
    api?.scrollPrev();
  };

  const scrollNext = () => {
    api?.scrollNext();
  };

  return (
    <div
      className="w-full flex flex-col items-center gap-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full">
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
                className="basis-full laptop:cursor-grab"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <RecommendationCard recommendation={recommendation} />
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <AnimatePresence>
          {isHovered && (
            <>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background/90"
                  onClick={scrollPrev}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full bg-background/80 backdrop-blur-sm shadow-md hover:bg-background/90"
                  onClick={scrollNext}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2">
        {Array.from({ length: count }).map((_, index) => (
          <motion.div
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              'w-2.5 h-2.5 rounded-full bg-muted-foreground/40 transition-all duration-300 cursor-pointer hover:bg-muted-foreground/80',
              {
                'bg-blue-500 scale-125': current === index + 1
              }
            )}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
}
