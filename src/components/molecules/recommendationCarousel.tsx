'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import recommendations from '@/data/recommendations.json';
import { RecommendationCard } from './recommendationCard';

export function RecommendationCarousel() {
  return (
    <div className="hidden h-full tablet:inline-block px-16 py-6 tablet:py-0 laptop:py-6 w-full">
      <Carousel
        opts={{
          align: 'center'
        }}
        className="w-full"
      >
        <CarouselContent className="tablet:h-full laptop:h-auto">
          {recommendations.map((recommendation, index) => (
            <CarouselItem
              key={index}
              className="basis-full laptop:basis-5/6 desktop:basis-5/6"
            >
              <RecommendationCard recommendation={recommendation} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-foreground/70 border border-border" />
        <CarouselNext className="text-foreground/70 border border-border" />
      </Carousel>
    </div>
  );
}
