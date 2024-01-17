'use client';

import { getReposRequest } from '@/services/github/getRepos';
import { useEffect, useState } from 'react';
import {
  ListUserReposResponseWithIcon,
  useGlobalContext
} from '@/app/context/store';
import addLanguageIcon from '@/app/utils/addLanguageIcon';
import { Skeleton } from '@/components/ui/skeleton';
import { RepositoryCard } from '@/app/_components/molecules/repositoryCard';

const REPO_INITIAL_STATE = { data: [], loading: true, error: false };

export function RepositoriesList() {
  const { debouncedNameInputValue, languageInputValue, onlyPublic } =
    useGlobalContext();

  const [repositories, setRepositories] = useState<{
    data: ListUserReposResponseWithIcon[];
    error: boolean;
    loading: boolean;
  }>(REPO_INITIAL_STATE);

  useEffect(() => {
    getRepositories();
  }, [debouncedNameInputValue, languageInputValue, onlyPublic]);

  const filterRepositories = (
    repos: ListUserReposResponseWithIcon[]
  ): ListUserReposResponseWithIcon[] => {
    let filteredRepos = [...repos];

    if (debouncedNameInputValue) {
      filteredRepos = filteredRepos.filter((repo) =>
        repo.name.includes(debouncedNameInputValue)
      );
    }

    if (languageInputValue) {
      filteredRepos = filteredRepos.filter((repo) =>
        repo.language.toLowerCase().includes(languageInputValue.toLowerCase())
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

  return (
    <div className="w-full pt-6 flex flex-col tablet:grid tablet:auto-cols-max tablet:grid-cols-3 gap-3">
      {repositories.loading
        ? Array.from(Array(20)).map((_, index) => (
            <Skeleton key={index} className="h-36 rounded-xl" />
          ))
        : repositories.error
          ? null
          : repositories.data?.map((repo) => (
              <RepositoryCard key={repo.id} repository={repo} />
            ))}
      {!repositories.data.length &&
      !repositories.error &&
      !repositories.loading ? (
        <h2>There are no repositories</h2>
      ) : null}
    </div>
  );
}
