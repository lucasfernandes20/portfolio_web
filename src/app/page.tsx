'use client';

import { HomeModel } from '@/components/models/home';

export default function Home() {
  return (
    <main className="h-svh w-screen bg-background snap-y snap-mandatory overflow-x-hidden laptop:py-10">
      <HomeModel />
    </main>
  );
}
