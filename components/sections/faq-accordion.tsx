'use client';
import { useId, useState } from 'react';

export function FaqAccordion({ items }: { items: Array<{ q: string; a: string }> }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className="divide-y divide-border rounded-xl border border-border bg-surface">
      {items.map((item, i) => {
        const triggerId = `${baseId}-trigger-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        const expanded = open === i;

        return (
          <div key={item.q}>
            <button
              id={triggerId}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
              onClick={() => setOpen(expanded ? null : i)}
              aria-expanded={expanded}
              aria-controls={panelId}
            >
              <span className="font-medium">{item.q}</span><span aria-hidden="true">{expanded ? '−' : '+'}</span>
            </button>
            <div id={panelId} role="region" aria-labelledby={triggerId} hidden={!expanded}>
              <p className="px-5 pb-4 text-small text-muted-foreground">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
