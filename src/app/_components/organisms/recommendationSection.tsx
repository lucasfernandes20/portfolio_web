import { Card } from '@/components/ui/card';
import { RecommendationCarousel } from '../molecules/recommendationCarousel/recommendationCarousel';
import { Button } from '@/components/ui/button';
import { ArrowUpRightSquare } from 'lucide-react';
import Link from 'next/link';

export function RecommendationSection() {
  return (
    <Card className="hidden laptop:flex z-30 w-1/2 p-4 flex-col items-center justify-center">
      <h2 className="text-xl font-bold text-muted-foreground">
        Linkedin recommendations
      </h2>
      <RecommendationCarousel />
      <Link
        href="https://www.linkedin.com/in/lucasfernandesreis/details/recommendations/"
        target="_blank"
      >
        <Button size="sm" variant="default">
          <ArrowUpRightSquare className="mr-2 h-4 w-4" />
          Go to Linkedin Recommendation
        </Button>
      </Link>
    </Card>
  );
}
