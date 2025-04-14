import { Card, CardContent, CardHeader } from '@components/ui/card';
import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="h-full bg-card/90 backdrop-blur-sm select-none border border-border/30 shadow-lg transition-all duration-300 overflow-hidden">
        {/* Quote decorative element */}
        <div className="absolute top-3 right-3 text-primary/10">
          <Quote size={70} />
        </div>

        {/* Gradient accent line at top of card */}
        <div className="h-1 w-full bg-gradient-to-r from-primary/50 via-primary to-primary/50"></div>

        <CardHeader className="desktop:space-y-1.5 pt-5 pb-2 px-5">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
              className="w-1 h-16 rounded-full bg-primary"
            ></motion.div>
            <div>
              <span className="text-sm desktop:text-lg font-semibold text-card-foreground">
                {recommendation.name}
              </span>
              <p className="text-xs desktop:text-sm text-muted-foreground">
                {recommendation.position}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-5 pt-3">
          <p className="text-xs desktop:text-base text-card-foreground/90 leading-relaxed">
            &ldquo;{recommendation.recommendation}&rdquo;
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
