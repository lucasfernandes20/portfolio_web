import { useGlobalContext } from '@/app/context/store';
import countYearFromDate from '@/app/utils/countYearsFromDate';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader
} from '@/components/ui/dialog';
import { ArrowUpRightSquare } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function RepositoryDialog() {
  const { selectedRepository, setSelectedRepository, setLanguageInputValue } =
    useGlobalContext();
  const route = useRouter();

  if (!selectedRepository) return;

  const onSelectLanguage = () => {
    setLanguageInputValue(selectedRepository.language);
    setSelectedRepository(null);
    route.push('/repositories');
  };

  const onCLose = (open: boolean) => {
    if (!open) {
      setSelectedRepository(null);
    }
  };

  return (
    <Dialog open={!!selectedRepository} onOpenChange={onCLose}>
      <DialogContent>
        <DialogHeader>
          <div>
            <div className="flex items-end gap-2 mb-1">
              {selectedRepository.language_icon}
              <p className="text-lg leading-none text-muted-foreground">
                {selectedRepository.name}
              </p>
            </div>
            <span className="text-xs text-muted-foreground/80 flex items-center gap-2">
              <p>{`${countYearFromDate(
                new Date(selectedRepository.created_at)
              )} ago`}</p>
              <div className="w-1 h-1 rounded-full bg-muted-foreground" />
              <p>{selectedRepository.visibility}</p>
            </span>
          </div>
        </DialogHeader>
        <div>
          <p className="text-base text-muted-foreground/80">
            {selectedRepository.description}
          </p>
        </div>
        <DialogFooter>
          <div className="w-full flex items-start justify-between gap-4">
            {selectedRepository.language ? (
              <Badge
                variant="secondary"
                className="cursor-pointer"
                onClick={onSelectLanguage}
              >
                {selectedRepository.language}
              </Badge>
            ) : null}
            <Button
              variant="default"
              size="sm"
              className={
                selectedRepository.visibility !== 'public' ? 'hidden' : 'block'
              }
            >
              <Link
                target="_blank"
                href={selectedRepository.clone_url}
                className="flex items-center gap-2"
              >
                <ArrowUpRightSquare />
                Visit repository
              </Link>
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
