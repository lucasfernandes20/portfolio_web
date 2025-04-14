import { useGlobalContext } from '@app/context/store';
import countYearFromDate from '@app/utils/countYearsFromDate';
import { formatDate } from '@app/utils/formatDate';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import { motion } from 'framer-motion';
import { Card, CardContent, CardFooter, CardHeader } from '@components/ui/card';
import {
  BookCheck,
  Link as LinkIcon,
  Star,
  GitFork,
  Eye,
  Calendar,
  X
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@src/lib/utils';

export function RepositoryDialog() {
  const { selectedRepository, setSelectedRepository } = useGlobalContext();

  if (!selectedRepository) return null;

  const createdDate = new Date(selectedRepository.created_at);
  const updatedDate = new Date(selectedRepository.updated_at);

  return (
    <Card className="w-full overflow-hidden border-primary/20 shadow-lg">
      <div className="h-1 w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>

      <CardHeader className="flex flex-row items-start justify-between gap-2 py-4 border-b border-border/10">
        <motion.div
          layoutId={`header-${selectedRepository.id}`}
          className="w-[calc(100%-1.5rem) overflow-x-hidden"
        >
          <motion.div
            layoutId={`name-header-${selectedRepository.id}`}
            className="flex items-center gap-2 mb-2"
          >
            <BookCheck className="text-primary h-5 w-5" />
            <motion.h3
              layoutId={`name-${selectedRepository.id}`}
              className="text-lg font-medium text-card-foreground"
            >
              {selectedRepository.name}
            </motion.h3>
          </motion.div>
          <motion.span
            layoutId={`infos-${selectedRepository.id}`}
            className="text-xs text-muted-foreground/80 flex flex-wrap items-center gap-2"
          >
            <motion.div className="flex items-center gap-1">
              <Calendar size={12} />
              <motion.p layoutId={`created-date-${selectedRepository.id}`}>
                {`Created ${countYearFromDate(createdDate)} ago`}
              </motion.p>
            </motion.div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground inline-block" />
            <motion.p
              layoutId={`visibility-${selectedRepository.id}`}
              className="font-normal capitalize flex items-center"
            >
              <span
                className={cn(
                  'w-2 h-2 rounded-full mr-1',
                  selectedRepository.visibility === 'public'
                    ? 'bg-green-500'
                    : 'bg-amber-500'
                )}
              ></span>
              {selectedRepository.visibility}
            </motion.p>
          </motion.span>
        </motion.div>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setSelectedRepository(null)}
          className="text-muted-foreground hover:text-card-foreground transition-colors rounded-full p-1 hover:bg-muted"
        >
          <X className="w-5 h-5" />
        </motion.button>
      </CardHeader>

      <CardContent className="py-4 space-y-4">
        <motion.div className="space-y-2">
          {selectedRepository.description && (
            <motion.div>
              <h4 className="text-sm font-medium mb-1">Description</h4>
              <motion.p className="text-sm text-card-foreground/90 leading-relaxed">
                {selectedRepository.description}
              </motion.p>
            </motion.div>
          )}

          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Created on</span>
              <span className="text-sm">{formatDate(createdDate)}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs text-muted-foreground">Last update</span>
              <span className="text-sm">{formatDate(updatedDate)}</span>
            </div>

            {selectedRepository.homepage && (
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground">Homepage</span>
                <Link
                  href={selectedRepository.homepage}
                  target="_blank"
                  className="text-sm text-primary hover:underline"
                >
                  {selectedRepository.homepage.replace(
                    /^https?:\/\/(www\.)?/i,
                    ''
                  )}
                </Link>
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-4 text-sm">
            {selectedRepository.stargazers_count > 0 && (
              <div className="flex items-center gap-1">
                <Star size={14} className="text-amber-400" />
                <span>
                  {selectedRepository.stargazers_count}{' '}
                  {selectedRepository.stargazers_count === 1 ? 'star' : 'stars'}
                </span>
              </div>
            )}

            {selectedRepository.forks_count > 0 && (
              <div className="flex items-center gap-1">
                <GitFork size={14} className="text-blue-400" />
                <span>
                  {selectedRepository.forks_count}{' '}
                  {selectedRepository.forks_count === 1 ? 'fork' : 'forks'}
                </span>
              </div>
            )}

            {selectedRepository.watchers_count > 0 && (
              <div className="flex items-center gap-1">
                <Eye size={14} className="text-purple-400" />
                <span>
                  {selectedRepository.watchers_count}{' '}
                  {selectedRepository.watchers_count === 1
                    ? 'watcher'
                    : 'watchers'}
                </span>
              </div>
            )}
          </div>
        </motion.div>

        {!!selectedRepository.topics && selectedRepository.topics.length > 0 ? (
          <motion.div className="pt-2 border-t border-border/10">
            <h4 className="text-sm font-medium mb-2">Topics</h4>
            <motion.ul className="w-full flex flex-wrap gap-2">
              {selectedRepository.topics.map((topic) => (
                <motion.li
                  key={topic}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Badge variant="outline" className="bg-primary/5">
                    {topic}
                  </Badge>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        ) : null}
      </CardContent>

      <CardFooter className="gap-2 border-t border-border/10 py-4">
        <Link
          href={selectedRepository.html_url}
          target="_blank"
          className="flex-grow"
        >
          <Button className="w-full group">
            <LinkIcon className="h-4 w-4 mr-2 group-hover:rotate-[-40deg] transition-transform" />
            View on GitHub
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
