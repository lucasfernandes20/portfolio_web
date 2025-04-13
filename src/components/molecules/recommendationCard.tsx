import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Quote } from 'lucide-react';

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
    <div>
      <Card className="bg-card h-full select-none border-muted-foreground/10 shadow-md hover:shadow-md transition-all duration-300 relative">
        <div className="absolute top-0 right-0 text-muted-foreground/10">
          <Quote size={120} />
        </div>
        <CardHeader className="desktop:space-y-1.5 desktop:p-6 pb-2">
          <span className="text-xs desktop:text-lg font-semibold text-primary">
            {recommendation.name}
          </span>
          <p className="text-xs desktop:text-sm text-card-foreground/70">
            {recommendation.position}
          </p>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          <p className="text-xs desktop:text-base text-card-foreground leading-relaxed">
            {recommendation.recommendation}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
