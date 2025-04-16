import React from 'react';
import {
  Step,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper
} from '@chakra-ui/react';
import { ProfessionalExperience } from '@components/molecules/professionalExperienceCard';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { calculateDuration } from '@src/app/utils/calculateDuration';
import { cn } from '@src/lib/utils';

interface StepperProps {
  steps: Array<ProfessionalExperience>;
  activeStep: number;
  orientation: 'horizontal' | 'vertical';
  handleStepClick: (index: number) => void;
}

const CustomStepper: React.FC<StepperProps> = ({
  steps,
  activeStep,
  orientation,
  handleStepClick
}) => {
  // Formatador de data para exibição
  const formatDisplayDate = (dateStr: string): string => {
    if (dateStr === 'current') return 'Current';

    const parts = dateStr.split('/');
    if (parts.length !== 2) return dateStr;

    const month = parseInt(parts[0]);
    const year = parts[1];

    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    return `${monthNames[month - 1]} ${year}`;
  };

  return (
    <div className="w-full">
      <Stepper
        index={activeStep}
        orientation={orientation}
        height={orientation === 'horizontal' ? 'auto' : '400px'}
        gap="0"
        className="w-full"
        colorScheme="primary"
      >
        {steps.map((step, index) => {
          // Verificando estados diferentes para estilização
          const isActive = activeStep === index + 1;
          const isCompleted = index + 1 < activeStep;

          // Calculando a duração da experiência
          const duration = calculateDuration(step.startDate, step.endDate);

          // Formatando datas para exibição
          const startDateDisplay = formatDisplayDate(step.startDate);
          const endDateDisplay = formatDisplayDate(step.endDate);

          return (
            <Step
              key={index}
              className={cn(
                'cursor-pointer group laptop:w-full transition-all duration-300 ease-in-out select-none',
                isActive ? 'opacity-100' : 'opacity-70 hover:opacity-90'
              )}
              onClick={() => handleStepClick(index)}
            >
              <StepIndicator
                className={`
                  transition-all duration-300 shadow-sm
                  ${
                    isActive
                      ? 'bg-primary text-background border-primary transform scale-110'
                      : isCompleted
                        ? 'bg-primary/20 text-primary border-primary/40'
                        : 'laptop:group-hover:border-primary laptop:group-hover:border-1 text-muted-foreground'
                  }
                `}
              >
                <StepStatus
                  complete={
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className="text-primary"
                    >
                      <CheckCircle2 size={34} />
                    </motion.div>
                  }
                  incomplete={<StepNumber />}
                  active={
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{
                        duration: 0.5,
                        ease: 'easeInOut',
                        repeat: 0
                      }}
                    >
                      <StepNumber />
                    </motion.div>
                  }
                />
              </StepIndicator>

              {orientation === 'vertical' ? (
                <motion.div
                  className="flex flex-col ml-2"
                  initial={false}
                  animate={isActive ? { x: 5 } : { x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <StepTitle
                    className={`
                      font-medium text-sm laptop:text-base mb-0.5
                      transition-all duration-200
                      ${
                        isActive
                          ? 'text-foreground font-semibold'
                          : 'text-muted-foreground group-hover:text-foreground/90'
                      }
                    `}
                  >
                    {step.title}
                  </StepTitle>

                  <p
                    className={`
                    laptop:text-nowrap text-xs laptop:text-sm mb-0.5
                    transition-all duration-200
                    ${
                      isActive
                        ? 'text-foreground/90'
                        : 'text-muted-foreground/80'
                    }
                  `}
                  >
                    {step.description}
                  </p>

                  <div className="flex items-center gap-1 text-xs">
                    <span
                      className={`
                      font-medium
                      ${isActive ? 'text-primary' : 'text-muted-foreground'}
                    `}
                    >
                      {startDateDisplay}
                    </span>
                    <ArrowRight
                      size={10}
                      className={cn(
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      )}
                    />
                    <span
                      className={cn(
                        isActive ? 'text-primary' : 'text-muted-foreground'
                      )}
                    >
                      {endDateDisplay}
                    </span>
                    <span className="text-muted-foreground/60 ml-1">
                      ({duration.formattedDuration})
                    </span>
                  </div>
                </motion.div>
              ) : null}

              <StepSeparator
                className={cn(
                  'transition-all duration-300',
                  isActive
                    ? 'bg-primary/80 opacity-100'
                    : isCompleted
                      ? 'bg-primary/30'
                      : 'bg-muted-foreground/20 group-hover:bg-muted-foreground/30'
                )}
                style={{
                  height: orientation === 'vertical' ? undefined : '2px',
                  width: orientation === 'horizontal' ? undefined : '2px'
                }}
              />
            </Step>
          );
        })}
      </Stepper>

      {orientation === 'horizontal' && !!activeStep && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          key={activeStep}
          transition={{ duration: 0.3 }}
          className="pt-3 pb-1 px-1"
        >
          <p className="text-sm text-foreground">
            <span className="font-semibold text-primary">
              {steps[activeStep - 1].title}
            </span>
            <span className="text-muted-foreground ml-2">
              {steps[activeStep - 1].description}
            </span>
          </p>
          <p className="text-xs text-muted-foreground/80 mt-1">
            {formatDisplayDate(steps[activeStep - 1].startDate)} -{' '}
            {formatDisplayDate(steps[activeStep - 1].endDate)}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export { CustomStepper };
