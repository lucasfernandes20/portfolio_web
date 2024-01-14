import countYearFromDate from '@/app/utils/countYearsFromDate';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ListUserReposResponse } from '@/services/github/getRepos';
import { BookCheck, Eye, MoveDiagonal } from 'lucide-react';
import { useState } from 'react';

interface RepositoryCardProps {
  repository: ListUserReposResponse;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  const [expand, setExpand] = useState(false);
  return (
    <Card
      className={cn(
        expand ? 'scale-125 origin-top-left z-40' : 'scale-100',
        'transition-all overflow-hidden relative'
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between gap-2 py-3">
        <div>
          <div className="flex items-end gap-2 mb-1">
            <BookCheck />
            <p className="text-base leading-none">{repository.name}</p>
          </div>
          <span className="text-xs text-muted-foreground/80 flex items-center gap-2">
            <p>{`${countYearFromDate(new Date(repository.created_at))} ago`}</p>
            <div className="w-1 h-1 rounded-full bg-muted-foreground" />
            <p>{repository.visibility}</p>
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setExpand((prev) => !prev)}
        >
          <MoveDiagonal />
        </Button>
      </CardHeader>
      <CardContent className={expand ? '' : 'truncate h-11'}>
        {repository.description}
        <div>
          {expand ? (
            <Button variant="link" size="sm" className="w-full">
              <p className="truncate">{repository.url}</p>
            </Button>
          ) : null}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Badge variant="secondary">{repository.language}</Badge>
      </CardFooter>
    </Card>
  );
}
