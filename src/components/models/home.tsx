'use client';

import { ScrollPageSection } from '@/app/assets/scrollpage';
import { AboutMe } from '@/components/molecules/aboutMe';
import { RecommendationSection } from '@/components/organisms/recommendationSection';
import { RepositoriesList } from '@/components/organisms/repositoriesList';
import { Award, GithubIcon } from 'lucide-react';
import Link from 'next/link';
import { Presentation } from '@/components/organisms/presentation';
import { InfiniteKnowledgeCarousel } from '@/components/organisms/infiniteKnowledgeCarousel';
import { BoardBackground } from '@/components/ui/boardBackground';
import { Subtitle } from '@/components/ui/subtitle';
import { ProfessionalExperiences } from '../organisms/professionalExperiences';

export function HomeModel() {
  return (
    <>
      <ScrollPageSection id="hero" className="h-svh">
        <BoardBackground type="top" />
        <Presentation />
      </ScrollPageSection>
      <ScrollPageSection id="about">
        <BoardBackground type="center" />
        <section className="w-full flex flex-col laptop:flex-row items-center laptop:items-start justify-between gap-16">
          <AboutMe />
          <RecommendationSection />
        </section>
      </ScrollPageSection>
      <ScrollPageSection id="repositories">
        <div className="w-full relative">
          <div className="flex items-center justify-between mb-4">
            <Subtitle icon={<GithubIcon />}>Github repositories</Subtitle>
            <Link
              className="underline cursor-pointer text-muted-foreground text-xs tablet:text-base"
              href="/repositories"
            >
              see all
            </Link>
          </div>
          <RepositoriesList />
          <InfiniteKnowledgeCarousel />
        </div>
      </ScrollPageSection>
      <ScrollPageSection id="career" className="pb-28">
        <BoardBackground type="bottom" />
        <div className="w-full flex flex-col gap-5 items-center">
          <Subtitle icon={<Award />}>Career</Subtitle>
          <ProfessionalExperiences />
        </div>
      </ScrollPageSection>
    </>
  );
}
