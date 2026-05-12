'use client';
import { useState } from 'react';

export function FaqAccordion({ items }: { items: Array<{ q: string; a: string }> }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-surface">
      {items.map((item, i) => (
        <div key={item.q}>
          <button className="flex w-full items-center justify-between px-5 py-4 text-left" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span className="font-medium">{item.q}</span><span>{open === i ? '−' : '+'}</span>
          </button>
          {open === i ? <p className="px-5 pb-4 text-sm text-muted-foreground">{item.a}</p> : null}
        </div>
      ))}
    </div>
  );
}
