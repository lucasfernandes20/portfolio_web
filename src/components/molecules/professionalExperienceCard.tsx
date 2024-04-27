import { Badge } from '../ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';

export interface ProfessionalExperience {
  title: string;
  description: string;
  details: string;
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
    <Card className="bg-card h-full flex flex-col">
      <CardHeader>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg laptop:text-xl font-semibold text-muted-foreground">
            {experience.title}
          </h3>
          <div className="flex flex-col laptop:flex-row laptop:items-center">
            <span className="text-muted-foreground text-xs laptop:text-base">
              {experience.description}
            </span>
            <div className="h-1 w-1 bg-muted-foreground rounded-full mx-2 hidden laptop:inline-block" />
            <span className="text-muted-foreground text-xs laptop:text-base">
              {experience.date}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm laptop:text-base">
          {experience.details}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex flex-wrap gap-2">
          {experience.technologies.map((technology) => (
            <Badge key={technology} className="text-xs" variant="default">
              {technology}
            </Badge>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
