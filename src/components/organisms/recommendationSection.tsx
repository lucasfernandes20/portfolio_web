import { Card, CardFooter, CardHeader } from '@/components/ui/card';
import { RecommendationCarousel } from '../molecules/recommendationCarousel';
import { Button } from '@/components/ui/button';
import { ArrowUpRightSquare, Star } from 'lucide-react';
import Link from 'next/link';

export function RecommendationSection() {
  return (
    <Card className="hidden tablet:tall:flex tablet:w-full laptop:flex laptop:w-1/2 z-30 p-4 flex-col items-center justify-center">
      <CardHeader className="py-2">
        <h2 className="text-xl font-bold text-muted-foreground flex items-center gap-2">
          <Star />
          <p>Linkedin recommendations</p>
        </h2>
      </CardHeader>
      <RecommendationCarousel />
      <CardFooter className="py-2">
        <Link
          href="https://www.linkedin.com/in/lucasfernandesreis/details/recommendations/"
          target="_blank"
        >
          <Button size="sm" variant="default">
            <ArrowUpRightSquare className="mr-2 h-4 w-4" />
            Go to Linkedin Recommendation
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
