'use client';

import {
  ListUserReposResponseWithIcon,
  useGlobalContext
} from '@app/context/store';
import countYearFromDate from '@app/utils/countYearsFromDate';
import { Badge } from '@components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { BookCheck, Star, GitFork, Eye, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '@src/lib/utils';

interface RepositoryCardProps {
  repository: ListUserReposResponseWithIcon;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const { setSelectedRepository } = useGlobalContext();
  const [isHovered, setIsHovered] = useState(false);

  const selectRepo = () => {
    setSelectedRepository(repository);
  };

  const formatRepositoryName = (name: string) => {
    const reducedName = name.length > 30 ? `${name.slice(0, 30)}...` : name;
    const formattedName = reducedName.replace(/[_-]/g, ' ');
    return formattedName.charAt(0).toUpperCase() + formattedName.slice(1);
  };

  return (
    <motion.li
      onClick={selectRepo}
      layoutId={`${repository.id}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="flex flex-col justify-between cursor-pointer h-full"
    >
      <Card
        className={cn(
          'text-muted-foreground h-full border-border/50 backdrop-blur-sm relative overflow-hidden transition-all duration-300 flex flex-col',
          isHovered
            ? 'shadow-lg border-primary/30 scale-[1.02] -translate-y-1'
            : ''
        )}
      >
        <div
          className={cn(
            'h-1 w-full bg-gradient-to-r from-primary/5 via-primary to-primary/5 absolute top-0 left-0 transition-all duration-500',
            isHovered ? 'opacity-100' : 'opacity-50'
          )}
        ></div>

        <CardHeader className="flex flex-row items-start justify-between gap-2 py-3 pb-0">
          <motion.div
            layoutId={`header-${repository.id}`}
            className="w-[calc(100%-1.5rem) overflow-x-hidden"
          >
            <motion.div
              layoutId={`name-header-${repository.id}`}
              className="flex items-center gap-2 mb-2"
            >
              <BookCheck className="text-primary" />
              <motion.p
                layoutId={`name-${repository.id}`}
                className="text-base font-medium text-card-foreground text-ellipsis overflow-hidden whitespace-nowrap"
              >
                {formatRepositoryName(repository.name)}
              </motion.p>
            </motion.div>
            <motion.span
              layoutId={`infos-${repository.id}`}
              className="text-xs text-muted-foreground/80 flex items-center gap-2 flex-wrap"
            >
              <motion.div className="flex items-center gap-1">
                <Calendar size={12} />
                <motion.p
                  layoutId={`created-date-${repository.id}`}
                >{`${countYearFromDate(
                  new Date(repository.created_at)
                )} ago`}</motion.p>
              </motion.div>
              <div className="w-1 h-1 rounded-full bg-muted-foreground inline-block" />
              <motion.p
                layoutId={`visibility-${repository.id}`}
                className="font-normal capitalize flex items-center"
              >
                <span
                  className={cn(
                    'w-2 h-2 rounded-full mr-1',
                    repository.visibility === 'public'
                      ? 'bg-green-500'
                      : 'bg-amber-500'
                  )}
                ></span>
                {repository.visibility}
              </motion.p>
            </motion.span>
          </motion.div>
        </CardHeader>

        <CardContent className="py-2 px-5 flex-grow">
          {repository.description && (
            <p className="text-xs text-card-foreground/70 line-clamp-1 transition-all overflow-hidden">
              {repository.description}
            </p>
          )}
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-2 pt-0 mt-auto">
          <div className="flex items-center gap-3 text-xs text-muted-foreground w-full">
            {repository.stargazers_count > 0 && (
              <div className="flex items-center gap-1">
                <Star size={12} className="text-amber-400" />
                <span>{repository.stargazers_count}</span>
              </div>
            )}

            {repository.forks_count > 0 && (
              <div className="flex items-center gap-1">
                <GitFork size={12} className="text-blue-400" />
                <span>{repository.forks_count}</span>
              </div>
            )}

            {repository.watchers_count > 0 && (
              <div className="flex items-center gap-1">
                <Eye size={12} className="text-purple-400" />
                <span>{repository.watchers_count}</span>
              </div>
            )}
          </div>

          <div className="w-full flex justify-between items-center">
            {repository.language ? (
              <Badge
                variant="secondary"
                className="cursor-pointer opacity-100 hover:opacity-80 transition-opacity duration-200 ease-in-out hover:shadow-md hover:bg-secondary-foreground/10 hover:text-secondary-foreground"
              >
                {repository.language}
              </Badge>
            ) : (
              <div></div>
            )}

            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
              className="text-xs text-primary italic"
            >
              View details
            </motion.div>
          </div>
        </CardFooter>
      </Card>
    </motion.li>
  );
}
