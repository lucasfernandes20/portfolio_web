import { CarouselApi } from '../ui/carousel';
import CustomStepper from '../ui/stepper';
import { useEffect, useState } from 'react';
import { Subtitle } from '../ui/subtitle';
import { Award } from 'lucide-react';
import { ProfessionalExperienceCarousel } from '../molecules/professioanlExperienceCarousel';
import { ProfessionalExperience } from '../molecules/professionalExperienceCard';

const experiences: ProfessionalExperience[] = [
  {
    title: 'TripleAI',
    description: 'Frontend web developer',
    details:
      'Responsible for generating design prototypes using Figma, developing and making decisions about front-end applications such as landing pages, an AI-powered chatbot platform, and a chatbot plugin for client websites.',
    technologies: [
      'ReactJS',
      'SnowJS',
      'FastAPI',
      'Typescript',
      'Python',
      'Styled Components',
      'Ant Design',
      'Material-UI',
      'Figma'
    ],
    date: '08/2023 - 04/2024'
  },
  {
    title: '6Place',
    description: 'Fullstack web developer',
    details:
      'I was responsible, alongside the team, for the code of all applications and microservices in the food service marketplace. Through small decision-making moments, I gained significant learning experiences, both in terms of the product and teamwork.',
    technologies: [
      'NextJS',
      'ReactJS',
      'NodeJS',
      'NestJS',
      'Express',
      'PostgreSQL',
      'Typescript',
      'Styled Components',
      'Jest'
    ],
    date: '02/2022 - 08/2023'
  },
  {
    title: 'Trybe',
    description: 'Student',
    details: 'Bootcamp formation in Full Stack Web Development.',
    technologies: [
      'HTML',
      'CSS',
      'Git',
      'Javascript',
      'ReactJS',
      'NodeJS',
      'Express',
      'MongoDB',
      'MySQL',
      'Jest',
      'React Testing Library',
      'Python'
    ],
    date: '04/2021 - 04/2022'
  },
  {
    title: 'ArtDesign',
    description: 'Frontend developer (freelancer)',
    details:
      'Developed a web application for a client that allows them to manage their business',
    technologies: [
      'ReactJS',
      'Javascript',
      'HTML',
      'CSS',
      'Bootstrap',
      'PHP',
      'MariaDB'
    ],
    date: '02/2021 - 12/2021'
  }
];

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
    <div className="w-full flex flex-col gap-5 items-center">
      <Subtitle icon={<Award />}>Career</Subtitle>
      <div className="w-full flex flex-col items-center laptop:flex-row laptop:items-center laptop:justify-between laptop:gap-16">
        <div className="hidden laptop:block">
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
    </div>
  );
}
