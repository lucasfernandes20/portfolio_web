import React from 'react';
import {
  Step,
  StepDescription,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper
} from '@chakra-ui/react';
import { ProfessionalExperience } from '../molecules/professionalExperienceCard';

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
  return (
    <div className="w-full">
      <Stepper
        index={activeStep}
        orientation={orientation}
        height={orientation === 'horizontal' ? 'auto' : '400px'}
        gap="0"
        className="w-full"
      >
        {steps.map((step, index) => (
          <Step
            key={index}
            className="text-muted-foreground cursor-pointer group laptop:w-full"
            onClick={() => handleStepClick(index)}
          >
            <StepIndicator className="laptop:group-hover:border-primary laptop:group-hover:border-1">
              <StepStatus
                complete={<StepNumber />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>

            {orientation === 'vertical' ? (
              <div className="flex flex-col">
                <StepTitle className="text-primary text-xs laptop:group-hover:font-semibold laptop:group-hover:scale-105 transition-all laptop:group-hover:-translate-y-1 laptop:group-hover:translate-x-2">
                  {step.title}
                </StepTitle>
                <StepDescription
                  className="laptop:text-nowrap"
                  style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}
                >
                  {step.description}
                </StepDescription>
                <StepDescription
                  className="text-xs desktop:text-nowrap"
                  style={{ fontSize: '0.65rem', lineHeight: '1rem' }}
                >
                  {step.date}
                </StepDescription>
              </div>
            ) : null}

            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      {orientation === 'horizontal' && !!activeStep ? (
        <p className="text-xs text-muted-foreground my-2">
          <b>{steps[activeStep - 1].title}: </b>
          {steps[activeStep - 1].description}
        </p>
      ) : null}
    </div>
  );
};

export default CustomStepper;
