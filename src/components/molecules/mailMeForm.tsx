import { useEffect, useRef, useState } from 'react';
import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { Textarea } from '@components/ui/textarea';
import { EmailInput } from '@components/molecules/emailInput';
import { TextInput } from '@components/molecules/textInput';
import { BiCheckCircle } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { LoaderIcon } from 'lucide-react';
import { useToast } from '@components/ui/use-toast';
import { cn } from '@src/lib/utils';

type FormData = {
  name: string;
  email: string;
  message: string;
};

export function MailMeForm() {
  const form = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
          title: 'Succecss',
          description: 'email sent!',
          variant: 'default'
        });
        form.current.reset();
        setSuccess(true);
      } else {
        toast({
          title: 'Error',
          description: 'error sending email',
          variant: 'destructive'
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'error sending email',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 4000);
    }
  }, [success]);

  return (
    <form ref={form} className="w-full flex flex-col p-4" onSubmit={sendEmail}>
      <TextInput
        tabIndex={1}
        name="sender_name"
        placeholder="Your name*"
        required
      />
      <EmailInput
        tabIndex={2}
        name="sender_email"
        placeholder="Your email*"
        required
      />
      <Label className="relative pb-[1rem]">
        <Textarea
          tabIndex={3}
          name="message"
          required
          className="resize-none"
          rows={5}
          placeholder="Message..."
        />
      </Label>
      <Button
        variant="default"
        size="sm"
        className={`w-full ${success ? 'bg-green-700 hover:bg-green-700' : ''}`}
        type="submit"
      >
        {success ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ rotate: 360, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20
            }}
          >
            <BiCheckCircle className="text-3xl" />
          </motion.div>
        ) : (
          <>
            <LoaderIcon
              className={cn(
                'mr-2 h-4 w-4 animate-spin',
                loading ? 'inline-block' : 'hidden'
              )}
            />
            Submit
          </>
        )}
      </Button>
    </form>
  );
}
