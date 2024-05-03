'use client';

import { getReposRequest } from '@/services/github/getRepos';
import { useEffect, useState } from 'react';
import { RepositoryCard } from '../molecules/repositoryCard';
import {
  ListUserReposResponseWithIcon,
  useGlobalContext
} from '@/app/context/store';
import addLanguageIcon from '@/app/utils/addLanguageIcon';
import { Skeleton } from '@/components/ui/skeleton';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { RepositoryDialog } from '../molecules/repositoryDialog';
import { motion } from 'framer-motion';

const REPO_INITIAL_STATE = { data: [], loading: true, error: false };

export function RepositoriesList() {
  const { selectedRepository, setSelectedRepository } = useGlobalContext();

  const [repositories, setRepositories] = useState<{
    data: ListUserReposResponseWithIcon[];
    error: boolean;
    loading: boolean;
  }>(REPO_INITIAL_STATE);

  useEffect(() => {
    getRepositories();
  }, []);

  const getRepositories = async () => {
    try {
      const reposPerPage = 9;
      const page = 1;
      const result = await getReposRequest(reposPerPage, page);
      const repositoriesWithIconPerLanguage = addLanguageIcon(result);
      setRepositories({
        ...REPO_INITIAL_STATE,
        data: repositoriesWithIconPerLanguage
      });
    } catch (er) {
      setRepositories({ ...REPO_INITIAL_STATE, error: true, loading: false });
    } finally {
      setRepositories((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <LayoutGroup>
      <ul className="[&>*:nth-child(n)]:hidden [&>:nth-child(-n+3)]:flex tablet:[&>*:nth-child(n)]:flex w-full flex flex-col tablet:grid tablet:auto-cols-max tablet:grid-cols-3 gap-3">
        {repositories.loading
          ? Array.from(Array(9)).map((_, index) => (
              <Skeleton key={index} className="h-36 rounded-xl" />
            ))
          : repositories.error
            ? null
            : repositories.data?.map((repo) => (
                <RepositoryCard key={repo.id} repository={repo} />
              ))}
      </ul>
      {selectedRepository?.id && (
        <a
          className="block fixed top-0 left-0 right-0 bottom-0 bg-slate-900 opacity-55 z-40"
          onClick={() => setSelectedRepository(null)}
        />
      )}
      <AnimatePresence mode="popLayout">
        {selectedRepository?.id && (
          <motion.div
            key="modal"
            className="absolute w-full max-w-[790px] z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black"
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
