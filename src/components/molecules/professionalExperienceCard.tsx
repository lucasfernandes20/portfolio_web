import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import Image from 'next/image';

export interface ProfessionalExperience {
  title: string;
  description: string;
  details: string;
  logo?: string;
  technologies: string[];
  date: string;
}

interface ProfessionalExperienceCardProps {
  experience: ProfessionalExperience;
}

export function ProfessionalExperienceCard({
  experience
}: ProfessionalExperienceCardProps) {
  return (
    <Card className="min-w-0 w-full bg-card h-full flex flex-col select-none">
      <CardHeader className="max-w-full">
        <div className=" flex flex-row items-center gap-4">
          {experience.logo && (
            <Image
              src={experience.logo}
              alt="company logo"
              width={40}
              height={40}
              className="rounded-lg"
            />
          )}
          <h3 className="text-lg laptop:text-xl font-semibold text-muted-foreground">
            {experience.title}
          </h3>
        </div>
        <div className="flex flex-col laptop:flex-row laptop:items-center w-fit">
          <span className="text-muted-foreground text-xs laptop:text-base">
            {experience.description}
          </span>
          <div className="h-1 w-1 bg-muted-foreground rounded-full mx-2 hidden laptop:inline-block" />
          <span className="text-muted-foreground text-xs laptop:text-base">
            {experience.date}
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm laptop:text-base text-wrap">
          {experience.details}
        </p>
      </CardContent>
      <CardFooter className="max-w-full flex flex-wrap gap-2">
        {experience.technologies.map((technology) => (
          <Badge key={technology} className="text-xs" variant="default">
            {technology}
          </Badge>
        ))}
      </CardFooter>
    </Card>
  );
}
