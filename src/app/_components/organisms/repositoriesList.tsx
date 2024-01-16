import { getReposRequest } from '@/services/github/getRepos';
import { useEffect, useState } from 'react';
import { RepositoryCard } from '../molecules/repositoryCard';
import { ListUserReposResponseWithIcon } from '@/app/context/store';
import addLanguageIcon from '@/app/utils/addLanguageIcon';

export function RepositoriesList() {
  const [repositories, setRepositories] =
    useState<ListUserReposResponseWithIcon[]>();

  useEffect(() => {
    getRepositories();
  }, []);

  const getRepositories = async () => {
    const reposPerPage = 9;
    const page = 1;
    const result = await getReposRequest(reposPerPage, page);
    const repositoriesWithIconPerLanguage = addLanguageIcon(result);
    setRepositories(repositoriesWithIconPerLanguage);
  };

  return (
    <div className="flex flex-col tablet:grid tablet:auto-cols-max tablet:grid-cols-3 gap-3">
      {repositories?.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  );
}
