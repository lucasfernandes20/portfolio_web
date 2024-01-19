'use client';
import {
  ListUserReposResponseWithIcon,
  useGlobalContext
} from '@/app/context/store';
import countYearFromDate from '@/app/utils/countYearsFromDate';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { BookCheck, MoveDiagonal } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface RepositoryCardProps {
  repository: ListUserReposResponseWithIcon;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const { setSelectedRepository, setLanguageInputValue } = useGlobalContext();
  const route = useRouter();

  const selectRepo = () => {
    setSelectedRepository(repository);
  };

  const onSelectLanguage = () => {
    setLanguageInputValue(repository.language);
    setSelectedRepository(null);
    route.push('/repositories');
  };

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="flex flex-row items-start justify-between gap-2 py-3">
        <div className="w-[calc(100%-1.5rem) overflow-x-hidden">
          <div className="flex items-end gap-2 mb-1">
            <BookCheck />
            <p className="text-base leading-none text-ellipsis overflow-hidden whitespace-nowrap">
              {repository.name}
            </p>
          </div>
          <span className=" text-xs text-muted-foreground/80 flex items-center gap-2 tablet:flex-col tablet:items-start laptop:items-center laptop:flex-row">
            <p>{`${countYearFromDate(new Date(repository.created_at))} ago`}</p>
            <div className="w-1 h-1 rounded-full bg-muted-foreground inline-block tablet:hidden laptop:inline-block" />
            <p className="font-normal tablet:font-bold laptop:font-normal">
              {repository.visibility}
            </p>
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={selectRepo}
          className="w-6 h-6"
        >
          <MoveDiagonal />
        </Button>
      </CardHeader>
      <CardFooter className="gap-2">
        {repository.language ? (
          <Badge
            variant="secondary"
            className="cursor-pointer"
            onClick={onSelectLanguage}
          >
            {repository.language}
          </Badge>
        ) : null}
      </CardFooter>
    </Card>
  );
}
