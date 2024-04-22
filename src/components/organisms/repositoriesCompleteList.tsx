'use client';

import { getReposRequest } from '@/services/github/getRepos';
import { useEffect, useState } from 'react';
import {
  ListUserReposResponseWithIcon,
  useGlobalContext
} from '@/app/context/store';
import addLanguageIcon from '@/app/utils/addLanguageIcon';
import { Skeleton } from '@/components/ui/skeleton';
import { RepositoryCard } from '../molecules/repositoryCard';
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion';
import { RepositoryDialog } from '../molecules/repositoryDialog';

const REPO_INITIAL_STATE = { data: [], loading: true, error: false };

export function RepositoriesList() {
  const {
    debouncedNameInputValue,
    languageInputValue,
    onlyPublic,
    typingNameInputValue,
    selectedRepository,
    setSelectedRepository
  } = useGlobalContext();

  const [repositories, setRepositories] = useState<{
    data: ListUserReposResponseWithIcon[];
    error: boolean;
    loading: boolean;
  }>(REPO_INITIAL_STATE);

  const matchTopic = (repo: ListUserReposResponseWithIcon) =>
    repo.topics?.some((topic) =>
      topic.split('-').join(' ').includes(debouncedNameInputValue)
    );

  const matchName = (repo: ListUserReposResponseWithIcon) =>
    repo.name
      .toLocaleLowerCase()
      .includes(debouncedNameInputValue.toLocaleLowerCase());

  const filterRepositories = (
    repos: ListUserReposResponseWithIcon[]
  ): ListUserReposResponseWithIcon[] => {
    let filteredRepos = [...repos];

    if (debouncedNameInputValue) {
      filteredRepos = filteredRepos.filter(
        (repo) => matchName(repo) || matchTopic(repo)
      );
    }

    if (languageInputValue) {
      filteredRepos = filteredRepos.filter(
        (repo) =>
          repo.language
            ?.toLowerCase()
            .includes(languageInputValue.toLowerCase())
      );
    }

    if (onlyPublic) {
      filteredRepos = filteredRepos.filter(
        (repo) => repo.visibility === 'public'
      );
    }

    return filteredRepos;
  };

  const getRepositories = async () => {
    try {
      setRepositories({
        ...REPO_INITIAL_STATE,
        loading: true
      });
      // No pagination implementation because the GitHub API does not support filtering repositories.
      const reposPerPage = 1000;
      const page = 1;
      const result = await getReposRequest(reposPerPage, page);
      const repositoriesWithIconPerLanguage = addLanguageIcon(result);
      const filterRepos = filterRepositories(repositoriesWithIconPerLanguage);
      setRepositories({
        ...REPO_INITIAL_STATE,
        data: filterRepos
      });
    } catch (er) {
      setRepositories({ ...REPO_INITIAL_STATE, error: true, loading: false });
    } finally {
      setRepositories((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    getRepositories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedNameInputValue, languageInputValue, onlyPublic]);

  return (
    <LayoutGroup>
      <ul className="w-full pt-6 flex flex-col tablet:grid tablet:auto-cols-max tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-3">
        {repositories.loading || typingNameInputValue
          ? Array.from(Array(20)).map((_, index) => (
              <Skeleton key={index} className="h-32 rounded-xl" />
            ))
          : repositories.error
            ? null
            : repositories.data?.map((repo) => (
                <RepositoryCard key={repo.id} repository={repo} />
              ))}
        {!repositories.data.length &&
        !repositories.error &&
        !repositories.loading ? (
          <h2 className="text-muted-foreground/80 text-center">
            There are no repositories
          </h2>
        ) : null}
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
            key="repo"
            className="absolute w-full max-w-[790px] px-[2rem] z-40 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop:bg-black"
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
