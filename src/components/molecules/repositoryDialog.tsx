import { useGlobalContext } from '@app/context/store';
import countYearFromDate from '@app/utils/countYearsFromDate';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import { BookCheck, Link as LinkIcon } from 'lucide-react';
import { RiCloseCircleLine } from 'react-icons/ri';
import Link from 'next/link';

export function RepositoryDialog() {
  const { selectedRepository, setSelectedRepository } = useGlobalContext();

  if (!selectedRepository) return;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between gap-2 py-3">
        <motion.div
          layoutId={`header-${selectedRepository.id}`}
          className="w-[calc(100%-1.5rem) overflow-x-hidden"
        >
          <motion.div
            layoutId={`name-header-${selectedRepository.id}`}
            className="flex items-center gap-2 mb-1"
          >
            <BookCheck />
            <motion.p
              layoutId={`name-${selectedRepository.id}`}
              className="text-base leading-none text-ellipsis overflow-hidden whitespace-nowrap"
            >
              {selectedRepository.name}
            </motion.p>
          </motion.div>
          <motion.span
            layoutId={`infos-${selectedRepository.id}`}
            className=" text-xs text-muted-foreground/80 flex items-center gap-2 tablet:flex-col tablet:items-start laptop:items-center laptop:flex-row"
          >
            <motion.p
              layoutId={`created-date-${selectedRepository.id}`}
            >{`${countYearFromDate(
              new Date(selectedRepository.created_at)
            )} ago`}</motion.p>
            <div className="w-1 h-1 rounded-full bg-muted-foreground inline-block tablet:hidden laptop:inline-block" />
            <motion.p
              layoutId={`visibility-${selectedRepository.id}`}
              className="font-normal tablet:font-bold laptop:font-normal"
            >
              {selectedRepository.visibility}
            </motion.p>
          </motion.span>
        </motion.div>
        <motion.div
          onClick={() => setSelectedRepository(null)}
          className="cursor-pointer text-muted-foreground"
        >
          <RiCloseCircleLine className="w-6 h-6" />
        </motion.div>
      </CardHeader>
      <CardContent>
        <motion.div>
          <motion.p className="text-base text-muted-foreground">
            {selectedRepository.description}
          </motion.p>
        </motion.div>
        {!!selectedRepository.topics && selectedRepository.topics.length > 0 ? (
          <motion.ul className="w-full flex flex-wrap gap-2 mt-5">
            {selectedRepository.topics.map((topic) => (
              <motion.li key={topic}>
                <Badge variant="outline">{topic}</Badge>
              </motion.li>
            ))}
          </motion.ul>
        ) : null}
      </CardContent>
      <CardFooter className="gap-2 relative">
        <Link
          href={selectedRepository.html_url}
          target="_blank"
          className="flex-grow"
        >
          <Button variant="outline" className="text-xs">
            <LinkIcon className="h-full mr-2" />
            View repository
          </Button>
        </Link>
        {selectedRepository.language ? (
          <Badge
            variant="secondary"
            className="cursor-pointer opacity-100 hover:opacity-80 transition-opacity duration-200 ease-in-out hover:shadow-md hover:bg-secondary-foreground/10 hover:text-secondary-foreground"
          >
            {selectedRepository.language}
          </Badge>
        ) : null}
      </CardFooter>
    </Card>
  );
}
