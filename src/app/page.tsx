'use client';

import { HomeModel } from '@/app/_components/models/home';

export default function Home() {
  return (
    <main className="h-svh w-screen bg-background snap-y snap-mandatory overflow-x-hidden py-9 px-2 tablet:px-3 laptop:py-10">
      <HomeModel />
    </main>
  );
}
