'use client';

import { RepositoriesModel } from '../../components/models/repositories';

export default function Repositories() {
  return (
    <main className="h-svh w-screen bg-background overflow-x-hidden py-9 px-2 tablet:px-3 laptop:py-10">
      <div className="container pt-36">
        <RepositoriesModel />
      </div>
    </main>
  );
}
