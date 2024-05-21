import { type CarouselApi } from '../ui/carousel';
import { CustomStepper } from '@components/ui/stepper';
import { useEffect, useState } from 'react';
import { ProfessionalExperienceCarousel } from '@components/organisms/professioanlExperienceCarousel';
import { ProfessionalExperience } from '@components/molecules/professionalExperienceCard';
import experiencesData from '@src/data/experiences.json';

const experiences: ProfessionalExperience[] = experiencesData;

export function ProfessionalExperiences() {
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

  const handleStepClick = (index: number) => {
    if (!api) {
      return;
    }

    api.scrollTo(index);
    setCurrent(index + 1);
  };

  return (
    <div className="w-full flex flex-col laptop:flex-row items-center justify-between laptop:gap-16">
      <div className="w-[full] hidden laptop:block">
        <CustomStepper
          steps={experiences}
          activeStep={current}
          orientation="vertical"
          handleStepClick={handleStepClick}
        />
      </div>
      <div className="w-full mb-2 laptop:hidden">
        <CustomStepper
          steps={experiences}
          activeStep={current}
          orientation="horizontal"
          handleStepClick={handleStepClick}
        />
      </div>
      <ProfessionalExperienceCarousel
        experiences={experiences}
        api={api}
        current={current}
        setApi={setApi}
        count={count}
      />
    </div>
  );
}
