'use client';

import { getReposRequest } from '@/services/github/getRepos';
import { useEffect, useState } from 'react';
import { RepositoryCard } from '../molecules/repositoryCard';
import { ListUserReposResponseWithIcon } from '@/app/context/store';
import addLanguageIcon from '@/app/utils/addLanguageIcon';
import { Skeleton } from '@/components/ui/skeleton';

const REPO_INITIAL_STATE = { data: [], loading: true, error: false };

export function RepositoriesList() {
  const [repositories, setRepositories] = useState<{
    data: ListUserReposResponseWithIcon[];
    error: boolean;
    loading: boolean;
  }>(REPO_INITIAL_STATE);

  useEffect(() => {
    getRepositories();
  }, []);

  useEffect(() => {
    console.log(repositories);
  }, [repositories]);

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
    <div className="w-full flex flex-col tablet:grid tablet:auto-cols-max tablet:grid-cols-3 gap-3">
      {repositories.loading
        ? Array.from(Array(9)).map((_, index) => (
            <Skeleton key={index} className="h-36 rounded-xl" />
          ))
        : repositories.error
          ? null
          : repositories.data?.map((repo) => (
              <RepositoryCard key={repo.id} repository={repo} />
            ))}
    </div>
  );
}
