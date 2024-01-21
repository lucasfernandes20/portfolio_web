import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import Link from 'next/link';
import { SiLinkedin } from 'react-icons/si';
import { GradientBall } from '../molecules/gradientBall';

export function ContactMeAside() {
  return (
    <aside className="relative h-1/2 w-full tablet:w-1/2">
      <Card className="w-full tablet:w-fit z-50">
        <CardHeader>
          <h2 className="text-primary font-bold text-lg flex items-center gap-3">
            <img
              src="./profile_pic.jpg"
              alt="profile picture"
              className="w-9 aspect-square rounded-full"
            />
            Or contact me on
          </h2>
        </CardHeader>
        <CardContent>
          <Link
            href="https://www.linkedin.com/in/lucasfernandesreis"
            target="_blank"
          >
            <Button variant="secondary" size="sm" className="w-full">
              <SiLinkedin className="mr-2" />
              LinkedIn
            </Button>
          </Link>
        </CardContent>
      </Card>
      <GradientBall />
    </aside>
  );
}
