import { type CarouselApi } from '../ui/carousel';
import { CustomStepper } from '@components/ui/stepper';
import { useEffect, useState } from 'react';
import { ProfessionalExperienceCarousel } from '@components/organisms/professioanlExperienceCarousel';
import { ProfessionalExperience } from '@components/molecules/professionalExperienceCard';
import experiencesData from '@src/data/experiences.json';
import { Subtitle } from '@components/ui/subtitle';
import { Briefcase } from 'lucide-react';
import { motion } from 'framer-motion';

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

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px', amount: 0.1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      variants={containerVariants}
      className="w-full flex flex-col items-center justify-center gap-8"
    >
      <Subtitle icon={<Briefcase className="text-primary" />}>Career</Subtitle>
      <div className="w-full flex flex-col laptop:flex-row items-center justify-between laptop:gap-16">
        <div className=" hidden laptop:block">
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
    </motion.div>
  );
}
