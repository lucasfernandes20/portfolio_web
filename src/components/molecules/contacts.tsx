import { socialMediaList } from '@src/data/socialMedia';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@components/ui/tooltip';
import Link from 'next/link';
import { motion } from 'framer-motion';

export function Contacts() {
  return (
    <ul className="flex items-center gap-3 pt-3 tablet:pt-8 laptop:pt-12 z-30">
      {socialMediaList.map((socialMedia, index) => (
        <TooltipProvider key={socialMedia.name}>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <motion.li
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + (index * 0.5) }}
                className="text-xl text-primary p-4 rounded-xl bg-muted-foreground/5 tablet:hover:bg-muted-foreground/10 cursor-pointer z-30"
              >
                <Link href={socialMedia.path} target="_blank">
                  <socialMedia.icon />
                </Link>
              </motion.li>
            </TooltipTrigger>
            <TooltipContent>
              <p>{socialMedia.name}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </ul>
  );
}
