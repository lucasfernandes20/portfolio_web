import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

export function ContactMeAside() {
  return (
    <aside className="w-full">
      <Card className="w-full">
        <CardHeader className="flex-row gap-4 items-center">
          <img
            src="images/profile_full.png"
            className="w-12 aspect-square object-cover rounded-2xl object-center"
          />
          <h2 className="text-lg font-bold text-muted-foreground">
            Or find me on:
          </h2>
        </CardHeader>
        <CardContent>
          <div className="w-full flex gap-2">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Link
                    href="https://www.linkedin.com/in/lucasfernandesreis/"
                    target="_blank"
                    className="flex-grow"
                  >
                    <Button variant="secondary" className="w-full">
                      <FaLinkedin className="h-full text-muted-foreground" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Linkedin</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Link
                    href="https://wa.link/v4p3lf"
                    target="_blank"
                    className="flex-grow"
                  >
                    <Button variant="secondary" className="w-full">
                      <FaWhatsapp className="h-full text-muted-foreground" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Whatsapp</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Link
                    href="https://github.com/lucasfernandes20"
                    target="_blank"
                    className="flex-grow"
                  >
                    <Button variant="secondary" className="w-full">
                      <FaGithub className="h-full text-muted-foreground" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>GitHub</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
