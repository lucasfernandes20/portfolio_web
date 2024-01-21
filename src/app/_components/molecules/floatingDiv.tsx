import React from 'react';

export function FloatingDiv({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-card aspect-square p-3 cursor-pointer [box-shadow:1px_1px_0_1px_hsl(var(--border)),_-1px_0_28px_0_rgba(34,_33,_81,_0.01),_28px_28px_28px_0_rgba(34,_33,_81,_0.25)] [transition:0.4s_ease-in-out_transform,_0.4s_ease-in-out_box-shadow] rounded-3xl hover:[transform:translate3d(0px,_-16px,_0px)] hover:[box-shadow:1px_1px_0_1px_hsl(var(--border)),_-1px_0_28px_0_rgba(34,_33,_81,_0.01),_54px_54px_28px_-10px_rgba(34,_33,_81,_0.15)]">
      {children}
    </div>
  );
}
