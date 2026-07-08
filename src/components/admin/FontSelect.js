'use client';

import { FONTS, FONT_CATEGORIES, fontStyle } from '@/lib/fonts';

// Dropdown for choosing a typeface, grouped by category. Empty value = site default.
export default function FontSelect({ value, onChange, label = 'Font' }) {
  return (
    <div>
      <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1.5">
        {label}
      </label>
      <select
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        style={fontStyle(value)}
        className="w-full px-3 py-2 rounded-lg border border-warm-gray bg-white text-charcoal text-sm focus:outline-none focus:border-brown"
      >
        <option value="">Default</option>
        {FONT_CATEGORIES.map(cat => (
          <optgroup key={cat} label={cat}>
            {FONTS.filter(f => f.category === cat).map(f => (
              <option key={f.key} value={f.key} style={{ fontFamily: f.stack }}>
                {f.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
