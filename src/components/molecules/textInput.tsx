'use client';

import { Input } from '@components/ui/input';
import { Label } from '@components/ui/label';
import React, { useRef, useState } from 'react';

export function TextInput({
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');

  const handleDataVerifier = () => {
    if (!input.current) return;

    const value = input.current.value;

    if (value && !isNaN(Number(value))) {
      setError('name must be a text');
      return;
    } else {
      setError('');
    }
  };

  return (
    <Label className="relative pb-[1rem]">
      <Input ref={input} {...props} type="text" onBlur={handleDataVerifier} />
      {error ? (
        <span className="text-xs text-destructive absolute bottom-0 left-0">
          {error}
        </span>
      ) : null}
    </Label>
  );
}
