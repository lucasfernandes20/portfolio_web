import { cn } from '@/lib/utils';
import { Carousel, CarouselContent, CarouselItem } from '../ui/carousel';
import {
  ProfessionalExperience,
  ProfessionalExperienceCard
} from './professionalExperienceCard';
import { EmblaCarouselType } from 'embla-carousel';
import { Dispatch, SetStateAction } from 'react';

interface ProfessionalExperienceCarouselProps {
  experiences: Array<ProfessionalExperience>;
  api: EmblaCarouselType;
  current: number;
  count: number;
  setApi: Dispatch<SetStateAction<EmblaCarouselType>>;
}

export function ProfessionalExperienceCarousel({
  experiences,
  api,
  current,
  setApi,
  count
}: ProfessionalExperienceCarouselProps) {
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
