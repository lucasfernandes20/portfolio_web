import { FilterBar } from '../organisms/filterBar';
import { RepositoriesList } from '../organisms/repositoriesCompleteList';

export function RepositoriesModel() {
  return (
    <>
      <FilterBar />
      <RepositoriesList />
    </>
  );
}
