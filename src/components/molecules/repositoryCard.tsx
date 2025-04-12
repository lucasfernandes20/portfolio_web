'use client';

import {
  ListUserReposResponseWithIcon,
  useGlobalContext
} from '@app/context/store';
import countYearFromDate from '@app/utils/countYearsFromDate';
import { Badge } from '@components/ui/badge';
import { Card, CardFooter, CardHeader } from '@components/ui/card';
import { BookCheck } from 'lucide-react';
import { motion } from 'framer-motion';

interface RepositoryCardProps {
  repository: ListUserReposResponseWithIcon;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const { setSelectedRepository } = useGlobalContext();

  const selectRepo = () => {
    setSelectedRepository(repository);
  };

  return (
    <motion.li
      onClick={selectRepo}
      layoutId={`${repository.id}`}
      className="flex flex-col justify-between cursor-pointer"
    >
      <Card className="text-muted-foreground">
        <CardHeader className="flex flex-row items-start justify-between gap-2 py-3">
          <motion.div
            layoutId={`header-${repository.id}`}
            className="w-[calc(100%-1.5rem) overflow-x-hidden"
          >
            <motion.div
              layoutId={`name-header-${repository.id}`}
              className="flex items-end gap-2 mb-1"
            >
              <BookCheck />
              <motion.p
                layoutId={`name-${repository.id}`}
                className="text-base text-ellipsis overflow-hidden whitespace-nowrap"
              >
                {repository.name}
              </motion.p>
            </motion.div>
            <motion.span
              layoutId={`infos-${repository.id}`}
              className=" text-xs text-muted-foreground/80 flex items-center gap-2 tablet:flex-col tablet:items-start laptop:items-center laptop:flex-row"
            >
              <motion.p
                layoutId={`created-date-${repository.id}`}
              >{`${countYearFromDate(
                new Date(repository.created_at)
              )} ago`}</motion.p>
              <div className="w-1 h-1 rounded-full bg-muted-foreground inline-block tablet:hidden laptop:inline-block" />
              <motion.p
                layoutId={`visibility-${repository.id}`}
                className="font-normal tablet:font-bold laptop:font-normal"
              >
                {repository.visibility}
              </motion.p>
            </motion.span>
          </motion.div>
        </CardHeader>
        <CardFooter className="gap-2">
          {repository.language ? (
            <Badge
              variant="secondary"
              className="cursor-pointer opacity-100 hover:opacity-80 transition-opacity duration-200 ease-in-out hover:shadow-md hover:bg-secondary-foreground/10 hover:text-secondary-foreground"
            >
              {repository.language}
            </Badge>
          ) : (
            <Badge variant="secondary" className="opacity-0">
              Not identifiable
            </Badge>
          )}
        </CardFooter>
      </Card>
    </motion.li>
  );
}
