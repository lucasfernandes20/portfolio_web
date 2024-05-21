import { ListUserReposResponse } from '@app/context/store';
import octokitService from './index';

const GITHUB_NAME = process.env.NEXT_PUBLIC_GITHUB_NAME;

export async function getReposRequest(
  perPage: number,
  page: number
): Promise<ListUserReposResponse[]> {
  const result = await octokitService.octokitInstance.request(
    `GET /users/${GITHUB_NAME}/repos`,
    {
      username: GITHUB_NAME,
      sort: 'created',
      type: 'all',
      per_page: perPage,
      page,
      headers: { Accept: 'application/vnd.github+json' }
    }
  );

  return result.data;
}
