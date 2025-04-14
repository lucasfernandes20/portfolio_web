'use client';

import { getReposRequest } from '@src/services/github/getRepos';
import { useEffect, useState } from 'react';
import { RepositoryCard } from '../molecules/repositoryCard';
import {
  ListUserReposResponseWithIcon,
  useGlobalContext
} from '@app/context/store';
import addLanguageIcon from '@app/utils/addLanguageIcon';
import { Skeleton } from '@components/ui/skeleton';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { RepositoryDialog } from '../molecules/repositoryDialog';
import { Search, Filter, X, GithubIcon } from 'lucide-react';
import { Input } from '@components/ui/input';
import { Badge } from '@components/ui/badge';
import { Button } from '@components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@components/ui/select';

const REPO_INITIAL_STATE = { data: [], loading: true, error: false };

export function RepositoriesList() {
  const { selectedRepository, setSelectedRepository } = useGlobalContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'stars' | 'updated' | 'created'>(
    'updated'
  );
  const [languages, setLanguages] = useState<string[]>([]);

  const [repositories, setRepositories] = useState<{
    data: ListUserReposResponseWithIcon[];
    filteredData: ListUserReposResponseWithIcon[];
    error: boolean;
    loading: boolean;
  }>({ ...REPO_INITIAL_STATE, filteredData: [] });

  useEffect(() => {
    getRepositories();
  }, []);

  // Filtrar e ordenar repositórios
  useEffect(() => {
    if (repositories.data.length > 0) {
      let filtered = [...repositories.data];

      // Filtrar por termo de busca
      if (searchTerm) {
        filtered = filtered.filter(
          (repo) =>
            repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (repo.description &&
              repo.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      }

      // Filtrar por linguagem
      if (selectedLanguage) {
        if (selectedLanguage === 'all') {
          filtered = filtered.filter((repo) => repo.language);
        } else {
          filtered = filtered.filter(
            (repo) => repo.language === selectedLanguage
          );
        }
      }

      // Ordenar
      filtered.sort((a, b) => {
        if (sortBy === 'stars') {
          return (b.stargazers_count || 0) - (a.stargazers_count || 0);
        } else if (sortBy === 'updated') {
          return (
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          );
        } else {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        }
      });

      setRepositories((prev) => ({ ...prev, filteredData: filtered }));
    }
  }, [searchTerm, selectedLanguage, sortBy, repositories.data]);

  const getRepositories = async () => {
    try {
      const reposPerPage = 12;
      const page = 1;
      const result = await getReposRequest(reposPerPage, page);
      const repositoriesWithIconPerLanguage = addLanguageIcon(result);

      // Extrair linguagens únicas para o filtro
      const uniqueLanguages = Array.from(
        new Set(
          repositoriesWithIconPerLanguage
            .filter((repo) => repo.language)
            .map((repo) => repo.language)
        )
      );

      setLanguages(uniqueLanguages as string[]);

      setRepositories({
        ...REPO_INITIAL_STATE,
        data: repositoriesWithIconPerLanguage,
        filteredData: repositoriesWithIconPerLanguage,
        loading: false
      });
    } catch (er) {
      setRepositories({
        ...REPO_INITIAL_STATE,
        error: true,
        loading: false,
        filteredData: []
      });
    } finally {
      setRepositories((prev) => ({ ...prev, loading: false }));
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedLanguage(null);
    setSortBy('updated');
  };

  return (
    <LayoutGroup>
      <div className="w-full flex flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col tablet:flex-row justify-between items-start tablet:items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <GithubIcon className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-bold">My Repositories</h2>
            </div>

            <div className="flex items-center gap-2 w-full tablet:w-auto">
              <div className="relative w-full tablet:w-60">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search repositories..."
                  className="pl-8 w-full"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-muted-foreground hover:text-primary" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="text-sm">Filters:</span>
            </div>

            <div className="w-full flex flex-col tablet:flex-row items-center gap-2">
              <Select
                value={sortBy}
                onValueChange={(value) =>
                  setSortBy(value as 'stars' | 'updated' | 'created')
                }
              >
                <SelectTrigger className="h-8 min-w-[150px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="stars">Most Stars</SelectItem>
                  <SelectItem value="updated">Recently Updated</SelectItem>
                  <SelectItem value="created">Recently Created</SelectItem>
                </SelectContent>
              </Select>

              <Select
                value={selectedLanguage || ''}
                onValueChange={(value) => setSelectedLanguage(value || null)}
              >
                <SelectTrigger className="h-8 min-w-[150px]">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {(searchTerm || selectedLanguage) && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="h-8"
              >
                <X className="w-3 h-3 mr-1" />
                Clear filters
              </Button>
            )}

            <div className="ml-auto">
              <span className="text-xs text-muted-foreground mr-2">
                max: 12
              </span>
              <Badge variant="outline">
                {repositories.filteredData.length}{' '}
                {repositories.filteredData.length === 1
                  ? 'repository'
                  : 'repositories'}{' '}
                found
              </Badge>
            </div>
          </div>
        </motion.div>

        <AnimatePresence>
          {repositories.loading ? (
            <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4">
              {Array.from(Array(9)).map((_, index) => (
                <Skeleton key={index} className="h-36 rounded-xl" />
              ))}
            </div>
          ) : repositories.error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <p className="text-muted-foreground">
                Error loading repositories. Please try again later.
              </p>
              <Button
                onClick={getRepositories}
                variant="outline"
                className="mt-4"
              >
                Try again
              </Button>
            </motion.div>
          ) : repositories.filteredData.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10"
            >
              <p className="text-muted-foreground">
                No repositories found with the applied filters.
              </p>
              <Button onClick={clearFilters} variant="outline" className="mt-4">
                Clear filters
              </Button>
            </motion.div>
          ) : (
            <motion.ul
              className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-4 auto-rows-fr"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
            >
              {repositories.filteredData.map((repo) => (
                <motion.div
                  key={repo.id}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                  transition={{ duration: 0.4 }}
                  className="h-full"
                >
                  <RepositoryCard repository={repo} />
                </motion.div>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {selectedRepository?.id && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed top-0 left-0 right-0 bottom-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setSelectedRepository(null)}
        />
      )}

      <AnimatePresence mode="popLayout">
        {selectedRepository?.id && (
          <motion.div
            key="modal"
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed w-[95%] max-w-[790px] z-[9999] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 tablet:px-0"
          >
            <motion.div layoutId={`${selectedRepository.id}`}>
              <RepositoryDialog />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LayoutGroup>
  );
}
