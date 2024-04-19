import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface RecommendationCardProps {
  recommendation: {
    name: string;
    recommendation: string;
    position: string;
  };
}

export function RecommendationCard({
  recommendation
}: RecommendationCardProps) {
  return (
    <Card className="bg-card h-full">
      <CardHeader className="desktop:space-y-1.5 desktop:p-6">
        <span className="text-lg font-semibold text-primary">
          {recommendation.name}
        </span>
        <p className="text-xs text-card-foreground/80">
          {recommendation.position}
        </p>
      </CardHeader>
      <CardContent className="flex flex-col items-start justify-center p-6 bg-transparent desktop:p-6">
        <p className="text-sm text-card-foreground">
          {recommendation.recommendation}
        </p>
      </CardContent>
    </Card>
  );
}
