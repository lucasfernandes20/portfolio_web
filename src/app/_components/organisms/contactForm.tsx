'use client';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRef, useState } from 'react';
import { EmailInput } from '../molecules/emailInput';
import { TextInput } from '../molecules/textInput';
import { useToast } from '@/components/ui/use-toast';
import { LoaderIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export function ContactForm() {
  const form = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      if (!form.current) return;

      const formData: FormData = {
        name: form.current.sender_name.value,
        email: form.current.sender_email.value,
        message: form.current.message.value
      };

      const messageSender = await fetch('/api/mailer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (messageSender.ok) {
        toast({
          title: 'succecss',
          description: 'succecss description',
          variant: 'default'
        });
      } else {
        toast({
          title: 'error',
          description: 'error description',
          variant: 'destructive'
        });
      }
    } catch (err) {
      toast({
        title: 'error',
        description: 'error description',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      ref={form}
      className="w-full flex flex-col gap-2"
      onSubmit={sendEmail}
    >
      <TextInput name="sender_name" placeholder="Your name*" />
      <EmailInput name="sender_email" placeholder="Your email*" />
      <Label className="relative pb-[1rem]">
        <Textarea
          name="message"
          required
          className="resize-none"
          rows={5}
          placeholder="Message..."
        />
      </Label>
      <Button variant="default" size="sm" className="w-full" type="submit">
        <LoaderIcon
          className={cn(
            'mr-2 h-4 w-4 animate-spin',
            loading ? 'inline-block' : 'hidden'
          )}
        />
        Submit
      </Button>
    </form>
  );
}
