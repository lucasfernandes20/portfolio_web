import { RecommendationCarousel } from './recommendationCarousel';
import { Button } from '@components/ui/button';
import { ArrowUpRightFromCircle, LinkedinIcon } from 'lucide-react';
import Link from 'next/link';
import { Subtitle } from '@components/ui/subtitle';
import { motion } from 'framer-motion';

export function RecommendationSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full max-w-5xl flex flex-col gap-6 items-center py-8"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Subtitle icon={<LinkedinIcon className="text-blue-500" />}>
          LinkedIn recommendations
        </Subtitle>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="w-full"
      >
        <RecommendationCarousel />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link
          href="https://www.linkedin.com/in/lucasfernandesreis/details/recommendations/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            size="default"
            variant="outline"
            className="group hover:bg-blue-50 dark:hover:bg-blue-950/20 transition-all duration-300 text-foreground/80"
          >
            <ArrowUpRightFromCircle className="mr-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            Ver todas as recomendações no LinkedIn
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
