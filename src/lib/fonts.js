// Curated but comprehensive font list (all loaded via the Google Fonts @import
// in globals.css), grouped by category for the admin picker. `stack` is applied
// via inline style so no per-font utility classes are needed. Leaving a font
// unset ('' / undefined) falls back to the site's default typography.

export const FONTS = [
  // Serif
  { key: 'cormorant', label: 'Cormorant Garamond', category: 'Serif', stack: "'Cormorant Garamond', Georgia, serif" },
  { key: 'playfair', label: 'Playfair Display', category: 'Serif', stack: "'Playfair Display', Georgia, serif" },
  { key: 'eb-garamond', label: 'EB Garamond', category: 'Serif', stack: "'EB Garamond', Georgia, serif" },
  { key: 'merriweather', label: 'Merriweather', category: 'Serif', stack: "'Merriweather', Georgia, serif" },
  { key: 'lora', label: 'Lora', category: 'Serif', stack: "'Lora', Georgia, serif" },
  { key: 'pt-serif', label: 'PT Serif', category: 'Serif', stack: "'PT Serif', Georgia, serif" },
  { key: 'libre-baskerville', label: 'Libre Baskerville', category: 'Serif', stack: "'Libre Baskerville', Georgia, serif" },
  { key: 'crimson', label: 'Crimson Text', category: 'Serif', stack: "'Crimson Text', Georgia, serif" },
  { key: 'cinzel', label: 'Cinzel', category: 'Serif', stack: "'Cinzel', Georgia, serif" },

  // Sans-serif
  { key: 'source-sans', label: 'Source Sans', category: 'Sans-serif', stack: "'Source Sans 3', 'Segoe UI', sans-serif" },
  { key: 'montserrat', label: 'Montserrat', category: 'Sans-serif', stack: "'Montserrat', sans-serif" },
  { key: 'poppins', label: 'Poppins', category: 'Sans-serif', stack: "'Poppins', sans-serif" },
  { key: 'raleway', label: 'Raleway', category: 'Sans-serif', stack: "'Raleway', sans-serif" },
  { key: 'lato', label: 'Lato', category: 'Sans-serif', stack: "'Lato', sans-serif" },
  { key: 'open-sans', label: 'Open Sans', category: 'Sans-serif', stack: "'Open Sans', sans-serif" },
  { key: 'nunito', label: 'Nunito', category: 'Sans-serif', stack: "'Nunito', sans-serif" },
  { key: 'work-sans', label: 'Work Sans', category: 'Sans-serif', stack: "'Work Sans', sans-serif" },

  // Display
  { key: 'oswald', label: 'Oswald', category: 'Display', stack: "'Oswald', sans-serif" },
  { key: 'bebas-neue', label: 'Bebas Neue', category: 'Display', stack: "'Bebas Neue', sans-serif" },
  { key: 'abril-fatface', label: 'Abril Fatface', category: 'Display', stack: "'Abril Fatface', Georgia, serif" },

  // Handwriting / Script
  { key: 'dancing-script', label: 'Dancing Script', category: 'Handwriting', stack: "'Dancing Script', cursive" },
  { key: 'great-vibes', label: 'Great Vibes', category: 'Handwriting', stack: "'Great Vibes', cursive" },
  { key: 'pacifico', label: 'Pacifico', category: 'Handwriting', stack: "'Pacifico', cursive" },
  { key: 'sacramento', label: 'Sacramento', category: 'Handwriting', stack: "'Sacramento', cursive" },
  { key: 'satisfy', label: 'Satisfy', category: 'Handwriting', stack: "'Satisfy', cursive" },
  { key: 'caveat', label: 'Caveat', category: 'Handwriting', stack: "'Caveat', cursive" },

  // Monospace
  { key: 'courier-prime', label: 'Courier Prime', category: 'Monospace', stack: "'Courier Prime', monospace" },
  { key: 'jetbrains-mono', label: 'JetBrains Mono', category: 'Monospace', stack: "'JetBrains Mono', monospace" },
];

export const FONT_CATEGORIES = ['Serif', 'Sans-serif', 'Display', 'Handwriting', 'Monospace'];

// Returns the CSS font-family stack for a stored key, or null for the default.
export function fontStack(key) {
  if (!key) return null;
  const font = FONTS.find(f => f.key === key);
  return font ? font.stack : null;
}

// Convenience for JSX: returns a style object ({} when default) to spread onto an element.
export function fontStyle(key) {
  const stack = fontStack(key);
  return stack ? { fontFamily: stack } : undefined;
}
