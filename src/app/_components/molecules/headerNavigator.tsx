import { Button } from '@/components/ui/button';

export function HeaderNavigator() {
  return (
    <ul className="hidden tablet:flex gap-2 text-muted-foreground">
      <li>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-inherit hover:scale-105"
        >
          <p className="text-muted-foreground text-base font-normal">home</p>
        </Button>
      </li>
      <li>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-inherit hover:scale-105"
        >
          <p className="text-muted-foreground text-base font-normal">stacks</p>
        </Button>
      </li>
      <li>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-inherit hover:scale-105"
        >
          <p className="text-muted-foreground text-base font-normal">
            about me
          </p>
        </Button>
      </li>
      <li>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-inherit hover:scale-105"
        >
          <p className="text-muted-foreground text-base font-normal">
            projects
          </p>
        </Button>
      </li>
    </ul>
  );
}
