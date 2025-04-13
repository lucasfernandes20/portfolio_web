'use client';

import { ScrollPageSection } from '@app/assets/scrollpage';
import { RecommendationSection } from '@components/organisms/recommendationSection';
import { RepositoriesList } from '@components/organisms/repositoriesList';
import { Award, GithubIcon } from 'lucide-react';
import { Presentation } from '@components/organisms/presentation';
import { InfiniteKnowledgeCarousel } from '@components/organisms/infiniteKnowledgeCarousel';
import { BoardBackground } from '@components/ui/boardBackground';
import { Subtitle } from '@components/ui/subtitle';
import { ProfessionalExperiences } from '../organisms/professionalExperiences';
import { ParticlesBackground } from '@components/ui/particlesBackground';
import { useTheme } from 'next-themes';
import { AboutMe } from '@components/organisms/aboutMe';

export function HomeModel() {
  const { theme } = useTheme();
  return (
    <>
      <ScrollPageSection
        id="hero"
        className="min-h-svh max-w-[none_!important]"
      >
        <BoardBackground type="top" />
        <Presentation />
        <ParticlesBackground
          particleCount={80}
          particleColor={
            theme === 'dark'
              ? 'rgba(255, 255, 255, 0.15)'
              : 'rgba(0, 0, 0, 0.155)'
          }
          particleSize={2}
          particleSpeed={0.2}
          connectParticles={true}
          connectionDistance={200}
          connectionOpacity={0.5}
          interactive={false}
          interactionRadius={180}
          interactionStrength={0.8}
        />
      </ScrollPageSection>
      <ScrollPageSection id="about" className="py-12">
        <BoardBackground type="center" />
        <section className="w-full flex flex-col items-center justify-center">
          <AboutMe />
          <RecommendationSection />
        </section>
      </ScrollPageSection>
      <ScrollPageSection id="repositories" className="py-12">
        <div className="w-full relative">
          <Subtitle className="mb-4" icon={<GithubIcon />}>
            Github repositories
          </Subtitle>
          <RepositoriesList />
          <InfiniteKnowledgeCarousel />
        </div>
      </ScrollPageSection>
      <ScrollPageSection id="career" className="pt-12 pb-28">
        <BoardBackground type="bottom" />
        <div className="w-full flex flex-col gap-5 items-center">
          <Subtitle icon={<Award />}>Career</Subtitle>
          <ProfessionalExperiences />
        </div>
      </ScrollPageSection>
    </>
  );
}
