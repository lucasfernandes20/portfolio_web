import React from 'react';

export function FloatingDiv({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card aspect-square p-3 cursor-pointer rounded-lg">
      {children}
    </div>
  );
}
