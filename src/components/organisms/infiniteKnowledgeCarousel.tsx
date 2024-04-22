import { knowledgeList } from '@/data/knowledge';
import Autoplay from 'embla-carousel-autoplay';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@/components/ui/carousel';
import { useEffect, useRef, useState } from 'react';
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

  const [clientTheme, setClientTheme] = useState('light');

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme;
    setClientTheme(currentTheme);
  }, [systemTheme, theme]);

  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={() => plugin.current.stop()}
      onMouseLeave={() => plugin.current.play()}
    >
      <CarouselContent className="pt-4 tablet:pt-10">
        {knowledgeList.map((knowledge) => (
          <CarouselItem key={knowledge.name} className="basis-auto">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Card className="p-1 tablet:p-3 laptop:hover:bg-muted-foreground/10">
                    <knowledge.icon
                      color={
                        clientTheme === 'dark'
                          ? knowledge.darkColor
                          : knowledge.color
                      }
                      className={`w-[40px] h-auto laptop:w-[80px]`}
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
