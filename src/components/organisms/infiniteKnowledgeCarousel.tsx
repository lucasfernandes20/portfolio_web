import { knowledgeList } from '@src/data/knowledge';
import Autoplay from 'embla-carousel-autoplay';
import { Card } from '@components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@components/ui/carousel';
import { useEffect, useRef, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@components/ui/tooltip';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';
import { cn } from '@src/lib/utils';

export function InfiniteKnowledgeCarousel() {
  const { theme, systemTheme } = useTheme();
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const [clientTheme, setClientTheme] = useState('light');

  useEffect(() => {
    if (!theme || !systemTheme) return;
    const currentTheme = theme === 'system' ? systemTheme : theme;
    setClientTheme(currentTheme);
  }, [systemTheme, theme]);

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setActiveIndex(api.selectedScrollSnap());
    });

    setActiveIndex(api.selectedScrollSnap());
  }, [api]);

  useEffect(() => {
    if (isHovered || !api) return;

    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % knowledgeList.length;
      api.scrollTo(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [isHovered, activeIndex, api]);

  return (
    <div
      className="relative w-full overflow-hidden py-4"
      onMouseEnter={() => {
        setIsHovered(true);
        plugin.current.stop();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        plugin.current.play();
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />

      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        opts={{
          align: 'center',
          loop: true,
          skipSnaps: false
        }}
        setApi={setApi}
      >
        <CarouselContent className="py-4 tablet:py-10">
          {knowledgeList.map((knowledge, index) => (
            <CarouselItem
              key={knowledge.name}
              className="basis-auto px-2 tablet:px-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: index === activeIndex ? 1.1 : 1,
                  y: index === activeIndex ? -5 : 0
                }}
                transition={{
                  duration: 0.3,
                  ease: 'easeOut'
                }}
                whileHover={{
                  scale: 1.15,
                  y: -8,
                  transition: { duration: 0.2 }
                }}
              >
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Card
                        className={cn(
                          'p-3 tablet:p-4 laptop:p-5 transition-all duration-300',
                          'border border-border/50 backdrop-blur-sm',
                          'hover:shadow-lg hover:border-primary/30',
                          'relative overflow-hidden',
                          index === activeIndex ? 'bg-muted/30' : 'bg-card/50'
                        )}
                      >
                        {index === activeIndex && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              repeatType: 'reverse'
                            }}
                          />
                        )}

                        <knowledge.icon
                          color={
                            clientTheme === 'dark'
                              ? knowledge.darkColor
                              : knowledge.color
                          }
                          className={cn(
                            'w-[40px] h-auto laptop:w-[80px] transition-all duration-300',
                            index === activeIndex ? 'drop-shadow-md' : ''
                          )}
                        />
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-background/90 backdrop-blur-sm border-primary/20"
                    >
                      <p className="font-medium text-muted-foreground">
                        {knowledge.name}
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
