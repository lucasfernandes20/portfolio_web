import { useRef } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from '@components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';

export function HeroCarousel() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel className="w-full h-full circle" plugins={[plugin.current]}>
      <CarouselContent className="pt-4 tablet:pt-10">
        <CarouselItem className="basis-full">
          <Image
            src="/images/portfolio_display/mobile.png"
            alt="mobile"
            width={1080}
            height={1080}
            className="w-full rounded-lg"
          />
        </CarouselItem>
        <CarouselItem className="basis-full">
          <Image
            src="/images/portfolio_display/tablet.png"
            alt="mobile"
            width={1080}
            height={1080}
            className="w-full rounded-lg"
          />
        </CarouselItem>
        <CarouselItem className="basis-full">
          <Image
            src="/images/portfolio_display/laptop.png"
            alt="mobile"
            width={1080}
            height={1080}
            className="w-full rounded-lg"
          />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}
