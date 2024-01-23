import { knowledgeList } from '@/app/assets/knowledge';
import Autoplay from 'embla-carousel-autoplay';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import { useRef } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import { useTheme } from 'next-themes';

export function InfiniteKnowledgeCarousel() {
  const { theme, systemTheme } = useTheme();
  const plugin = useRef(Autoplay({ delay: 900, stopOnInteraction: true }));

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent className="pt-10 pb-4">
        {knowledgeList.map((knowledge) => (
          <CarouselItem key={knowledge.name} className="basis-auto">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Card className="p-3 hover:bg-muted-foreground/10">
                    <knowledge.icon
                      color={
                        currentTheme === 'dark'
                          ? knowledge.darkColor
                          : knowledge.color
                      }
                      className={`w-[50px] laptop:w-[80px] h-auto hover:[color:${knowledge.color}] dark:[color:${knowledge.darkColor}]`}
                    />
                  </Card>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{knowledge.name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
