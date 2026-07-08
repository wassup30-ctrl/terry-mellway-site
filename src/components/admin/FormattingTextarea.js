'use client';

import { useRef } from 'react';

// A textarea with Bold / Italic buttons that wrap the current selection in
// markdown-style markers, so a non-technical editor never types ** or * by hand.
export default function FormattingTextarea({ value, onChange, className = '', rows = 3, placeholder, required = false }) {
  const ref = useRef(null);

  function wrap(marker) {
    const ta = ref.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = value.slice(start, end) || 'text';
    const next = value.slice(0, start) + marker + selected + marker + value.slice(end);
    onChange(next);
    // Re-select the wrapped text so the user can immediately apply another mark.
    requestAnimationFrame(() => {
      ta.focus();
      ta.setSelectionRange(start + marker.length, start + marker.length + selected.length);
    });
  }

  const btn = 'w-7 h-7 rounded border border-warm-gray bg-white text-charcoal hover:bg-cream-dark transition-colors flex items-center justify-center text-sm';

  return (
    <div>
      <div className="flex items-center gap-1 mb-1">
        <button type="button" onClick={() => wrap('**')} className={btn + ' font-bold'} title="Bold (select text first)">B</button>
        <button type="button" onClick={() => wrap('*')} className={btn + ' italic font-serif'} title="Italic (select text first)">I</button>
        <span className="ml-1 text-[11px] text-charcoal-light/70">Select text, then B / I</span>
      </div>
      <textarea
        ref={ref}
        value={value}
        onChange={e => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
        required={required}
        className={className}
      />
    </div>
  );
}
