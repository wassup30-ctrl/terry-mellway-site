'use client';

import { useState } from 'react';
import Link from 'next/link';
import { colouredPencil, watercolour, acrylicOil, allWorks, categories } from '@/data/gallery';
import GalleryGrid from '@/components/GalleryGrid';

const filters = [
  { label: 'All Works', value: 'all' },
  { label: 'Coloured Pencil', value: 'coloured-pencil' },
  { label: 'Watercolour', value: 'watercolour' },
  { label: 'Acrylic & Oil', value: 'acrylic-oil' },
];

const imagesByCategory = {
  'all': allWorks,
  'coloured-pencil': colouredPencil,
  'watercolour': watercolour,
  'acrylic-oil': acrylicOil,
};

export default function GalleryPage() {
  const [active, setActive] = useState('all');

  const images = imagesByCategory[active];

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal mb-3">Gallery</h1>
          <p className="text-charcoal-light max-w-lg mx-auto">
            Explore the full collection — coloured pencil, watercolour, acrylic and oil works.
          </p>
        </div>

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
      </div>
    </div>
  );
}
