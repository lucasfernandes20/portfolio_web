'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import React, { useRef, useState } from 'react';

export function EmailInput({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleDataVerifier = () => {
    if (!input.current) return;

    const value = input.current.value;

    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;

    if (value && !value.match(emailRegex)) {
      setError('email must be in the format email@email.com');
    } else {
      setError('');
    }
  };

  return (
    <Label className="relative pb-[1rem]">
      <Input ref={input} {...props} type="email" onBlur={handleDataVerifier} />
      {error ? (
        <span className="text-xs text-destructive absolute bottom-0 left-0">
          {error}
        </span>
      ) : null}
    </Label>
  );
}
