import { RepositoryDialog } from '@/app/_components/molecules/repositoryDialog';
import { FilterBar } from '../organisms/filterBar';
import { RepositoriesList } from '../organisms/repositoriesList';

export function RepositoriesModel() {
  return (
    <>
      <FilterBar />
      <RepositoryDialog />
      <RepositoriesList />
    </>
  );
}
