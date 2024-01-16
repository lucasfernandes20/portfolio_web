'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import recommendations from './recommendations.json';
import { RecommendationCard } from '../recommendationCard';

export function RecommendationCarousel() {
  return (
    <div className="hidden h-full laptop:block px-16 py-6">
      <Carousel
        opts={{
          align: 'center'
        }}
        className="w-full"
      >
        <CarouselContent className="">
          {recommendations.reverse().map((recommendation, index) => (
            <CarouselItem key={index} className="pt-2 md:basis-3/4">
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
