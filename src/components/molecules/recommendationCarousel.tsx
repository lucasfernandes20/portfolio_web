'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel';
import recommendations from '@/data/recommendations.json';
import { RecommendationCard } from './recommendationCard';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function RecommendationCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

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

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <Carousel
        opts={{
          align: 'center'
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {recommendations.map((recommendation, index) => (
            <CarouselItem key={index} className="basis-full laptop:cursor-grab">
              <RecommendationCard recommendation={recommendation} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center gap-1">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className={cn('w-2 h-2 rounded-full bg-muted-foreground/50', {
              'bg-muted-foreground': current === index + 1
            })}
          />
        ))}
      </div>
    </div>
  );
}
