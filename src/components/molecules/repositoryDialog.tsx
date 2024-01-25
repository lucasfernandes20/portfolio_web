import { useGlobalContext } from '@/app/context/store';
import countYearFromDate from '@/app/utils/countYearsFromDate';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from '@/components/ui/card';
import { BookCheck } from 'lucide-react';
import { RiCloseCircleLine } from 'react-icons/ri';

export function RepositoryDialog() {
  const { selectedRepository, setSelectedRepository, setLanguageInputValue } =
    useGlobalContext();
  const route = useRouter();

  if (!selectedRepository) return;

  const onSelectLanguage = () => {
    setLanguageInputValue(selectedRepository.language || '');
    setSelectedRepository(null);
    route.push('/repositories');
  };

  return (
    <Card>
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
      </CardContent>
      <CardFooter className="gap-2">
        {selectedRepository.language ? (
          <Badge
            variant="secondary"
            className="cursor-pointer"
            onClick={onSelectLanguage}
          >
            {selectedRepository.language}
          </Badge>
        ) : null}
      </CardFooter>
    </Card>
  );
}
