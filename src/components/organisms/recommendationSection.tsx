import { RecommendationCarousel } from './recommendationCarousel';
import { Button } from '@components/ui/button';
import { ArrowUpRightFromCircle, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';
import { Subtitle } from '@components/ui/subtitle';

export function RecommendationSection() {
  return (
    <div className="w-full flex flex-col gap-4 items-center">
      <Subtitle icon={<LinkedinIcon />}>LinkedIn recommendations</Subtitle>
      <RecommendationCarousel />
      <Link
        href="https://www.linkedin.com/in/lucasfernandesreis/details/recommendations/"
        target="_blank"
      >
        <Button size="sm" variant="link">
          <ArrowUpRightFromCircle className="mr-2 h-4 w-4" />
          Go to Linkedin Recommendation
        </Button>
      </Link>
    </div>
  );
}
