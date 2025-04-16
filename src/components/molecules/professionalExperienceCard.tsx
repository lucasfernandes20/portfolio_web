import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Clock } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@components/ui/tooltip';
import { calculateDuration } from '@src/app/utils/calculateDuration';
import Link from 'next/link';

export interface ProfessionalExperience {
  title: string;
  description: string;
  details: string;
  logo?: string;
  technologies: string[];
  startDate: string;
  endDate: string;
}

interface ProfessionalExperienceCardProps {
  experience: ProfessionalExperience;
}

export function ProfessionalExperienceCard({
  experience
}: ProfessionalExperienceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const duration = calculateDuration(experience.startDate, experience.endDate);

  const formatDisplayDate = (dateStr: string): string => {
    if (dateStr === 'current') return 'Current';

    const parts = dateStr.split('/');
    if (parts.length !== 2) return dateStr;

    const month = parseInt(parts[0]);
    const year = parts[1];

    const monthNames = [
      'Jan',
      'Fev',
      'Mar',
      'Abr',
      'Mai',
      'Jun',
      'Jul',
      'Ago',
      'Set',
      'Out',
      'Nov',
      'Dez'
    ];

    return `${monthNames[month - 1]} ${year}`;
  };

  const startDateDisplay = formatDisplayDate(experience.startDate);
  const endDateDisplay = formatDisplayDate(experience.endDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card className="min-w-0 w-full h-full flex flex-col select-none overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-60 pointer-events-none" />
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/5 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute left-0 bottom-0 h-1 bg-primary w-full" />

        <CardHeader className="pb-2 pt-5 relative">
          <div className="flex flex-row items-start gap-4 z-10 relative">
            {experience.logo ? (
              <motion.div
                className="relative overflow-hidden rounded-lg h-14 w-14 flex-shrink-0 bg-background/80 shadow-sm border border-border"
                animate={{ rotate: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={experience.logo}
                  alt={`${experience.title} logo`}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ) : (
              <motion.div
                className="h-14 w-14 rounded-lg bg-primary/10 text-primary font-bold flex items-center justify-center flex-shrink-0 text-xl"
                animate={{ rotate: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {experience.title.charAt(0)}
              </motion.div>
            )}
            <div className="w-full">
              <div className="flex items-center gap-2">
                <h3 className="text-lg laptop:text-xl font-bold text-foreground">
                  {experience.title}
                </h3>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    scale: isHovered ? 1 : 0
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button className="text-primary/70 hover:text-primary transition-colors">
                          <Link
                            href="https://www.linkedin.com/in/lucasfernandesreis"
                            target="_blank"
                          >
                            <ExternalLink size={16} />
                          </Link>
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>More details</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </motion.div>
              </div>
              <div className="flex flex-col laptop:flex-row laptop:items-center text-sm">
                <span className="text-muted-foreground font-medium">
                  {experience.description}
                </span>
              </div>

              {/* Layout de tempo otimizado para mobile */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-muted-foreground">
                <div className="flex items-center">
                  <Calendar
                    size={14}
                    className="text-primary mr-1 flex-shrink-0"
                  />
                  <span className="font-medium">{startDateDisplay}</span>
                  <span className="mx-1">→</span>
                  <span>{endDateDisplay}</span>
                </div>
                <div className="flex items-center">
                  <Clock
                    size={14}
                    className="text-primary mr-1 flex-shrink-0"
                  />
                  <span>{duration.formattedDuration}</span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-grow pb-3 pt-1 relative">
          <p className="text-muted-foreground text-sm laptop:text-base text-wrap leading-relaxed">
            {experience.details}
          </p>
        </CardContent>

        <CardFooter className="pt-0 pb-4 flex flex-wrap gap-2 relative">
          <div className="w-full mb-2 h-px bg-border/50 opacity-50" />
          <p className="w-full text-xs text-muted-foreground mb-1">
            Technologies:
          </p>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((technology, index) => (
              <motion.div
                key={technology}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.2 }}
              >
                <Badge
                  className="text-xs bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-200"
                  variant="secondary"
                >
                  {technology}
                </Badge>
              </motion.div>
            ))}
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
