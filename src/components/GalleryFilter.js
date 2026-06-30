'use client';

import { useState } from 'react';
import Link from 'next/link';
import GalleryGrid from '@/components/GalleryGrid';

// Interactive filter for the gallery page. Receives already-resolved live data
// from the server component so there is no client-side loading state.
export default function GalleryFilter({ imagesByCategory, categories }) {
  const [active, setActive] = useState('all');

  // Tabs are derived from the same category list (single source of truth).
  const filters = [
    { label: 'All Works', value: 'all' },
    ...categories.map((c) => ({ label: c.name, value: c.slug })),
  ];

  const images = imagesByCategory[active] || [];

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setActive(f.value)}
            className={`px-5 py-2 text-sm tracking-wide rounded-full transition-colors ${
              active === f.value
                ? 'bg-brown text-white'
                : 'bg-warm-gray text-charcoal-light hover:bg-warm-gray-dark'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Category link cards (shown only when All is selected) */}
      {active === 'all' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/gallery/${cat.slug}`}
              className="group flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={cat.featured}
                alt={cat.name}
                className="w-16 h-16 object-cover rounded"
              />
              <div>
                <h3 className="font-serif text-lg text-charcoal group-hover:text-brown transition-colors">{cat.name}</h3>
                <p className="text-xs text-charcoal-light">{cat.count} works</p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Gallery grid */}
      <GalleryGrid images={images} showBadge={active === 'all' || active === 'coloured-pencil'} />
    </>
  );
}
