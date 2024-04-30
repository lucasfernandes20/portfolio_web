'use client';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel';
import {
  ProfessionalExperience,
  ProfessionalExperienceCard
} from './professionalExperienceCard';

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
  return (
    <div className="w-full laptop:w-1 flex flex-grow flex-col items-center gap-2">
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
            <CarouselItem key={index} className="basis-full laptop:cursor-grab">
              <ProfessionalExperienceCard experience={experience} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex items-center gap-1">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={cn(
              'w-2 h-2 rounded-full bg-muted-foreground/40 transition-all duration-200 cursor-pointer hover:bg-muted-foreground/80',
              {
                'bg-muted-foreground scale-125': current === index + 1
              }
            )}
          />
        ))}
      </div>
    </div>
  );
}
