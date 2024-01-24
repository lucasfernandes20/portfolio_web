import { FilterBar } from '../organisms/filterBar';
import { RepositoriesList } from '../organisms/repositoriesCompleteList';
import { RepositoryDialog } from '../molecules/repositoryDialog';

export function RepositoriesModel() {
  return (
    <>
      <FilterBar />
      <RepositoryDialog />
      <RepositoriesList />
    </>
  );
}
