import {
  ListUserReposResponse,
  getReposRequest
} from '@/services/github/getRepos';
import { useEffect, useState } from 'react';
import { RepositoryCard } from '../molecules/repositoryCard';

export function RepositoriesList() {
  const [repositories, setRepositories] = useState<ListUserReposResponse[]>();

  useEffect(() => {
    getRepositories();
  }, []);

  const getRepositories = async () => {
    const result = await getReposRequest(9, 1);
    console.log(result);
    setRepositories(result);
  };
  return (
    <div className="grid auto-cols-max grid-cols-3 gap-3">
      {repositories?.map((repo) => (
        <RepositoryCard key={repo.id} repository={repo} />
      ))}
    </div>
  );
}
