import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export function ContactForm() {
  return (
    <form className="w-full flex flex-col gap-2">
      <Input placeholder="Scope" />
      <Input placeholder="Your email" />
      <Textarea className="resize-none" rows={5} placeholder="Message..." />
      <Button variant="default" size="sm" className="w-full">
        Submit
      </Button>
    </form>
  );
}
