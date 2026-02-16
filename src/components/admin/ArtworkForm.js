'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';
import { useToast } from './Toast';

const CATEGORIES = [
  { value: 'coloured-pencil', label: 'Coloured Pencil' },
  { value: 'watercolour', label: 'Watercolour' },
  { value: 'acrylic-oil', label: 'Acrylic & Oil' },
];

export default function ArtworkForm({ artwork, id }) {
  const isEdit = !!id;
  const router = useRouter();
  const addToast = useToast();

  const [form, setForm] = useState({
    category: artwork?.category || 'coloured-pencil',
    src: artwork?.src || '',
    info: artwork?.info || '',
    alt: artwork?.alt || '',
    medium: artwork?.medium || '',
    dimensions: artwork?.dimensions || '',
    price: artwork?.price || '',
    sold: artwork?.sold || false,
    prints: artwork?.prints || false,
  });
  const [saving, setSaving] = useState(false);

  function set(key, value) {
    setForm(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'info' || key === 'medium') {
        next.alt = `${next.info} — ${next.medium}`;
      }
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const { category, ...data } = form;
      const url = isEdit ? `/api/admin/gallery/${id}` : '/api/admin/gallery';
      const method = isEdit ? 'PUT' : 'POST';
      const body = isEdit ? data : { category, ...data };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        addToast(isEdit ? 'Artwork updated' : 'Artwork created');
        router.push('/admin/gallery');
        router.refresh();
      } else {
        const err = await res.json();
        addToast(err.error || 'Something went wrong', 'error');
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Image */}
        <div>
          <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-2">
            Image
          </label>
          <ImageUploader
            category={form.category}
            value={form.src}
            onChange={val => set('src', val)}
            name={form.info}
          />
        </div>

        {/* Right: Fields */}
        <div className="flex flex-col gap-4">
          {!isEdit && (
            <div>
              <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1.5">
                Category
              </label>
              <select
                value={form.category}
                onChange={e => set('category', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-warm-gray bg-white text-charcoal text-sm focus:outline-none focus:border-brown"
              >
                {CATEGORIES.map(c => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={form.info}
              onChange={e => set('info', e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-warm-gray bg-white text-charcoal text-sm focus:outline-none focus:border-brown"
              placeholder="e.g. Stargazing"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1.5">
              Medium
            </label>
            <input
              type="text"
              value={form.medium}
              onChange={e => set('medium', e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-warm-gray bg-white text-charcoal text-sm focus:outline-none focus:border-brown"
              placeholder="e.g. Coloured Pencil on Paper"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1.5">
              Alt Text
            </label>
            <input
              type="text"
              value={form.alt}
              onChange={e => set('alt', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-warm-gray bg-white text-charcoal text-sm focus:outline-none focus:border-brown"
              placeholder="Auto-generated from title + medium"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1.5">
                Dimensions
              </label>
              <input
                type="text"
                value={form.dimensions}
                onChange={e => set('dimensions', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-warm-gray bg-white text-charcoal text-sm focus:outline-none focus:border-brown"
                placeholder="e.g. 11 x 14 in"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1.5">
                Price
              </label>
              <input
                type="text"
                value={form.price}
                onChange={e => set('price', e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-warm-gray bg-white text-charcoal text-sm focus:outline-none focus:border-brown"
                placeholder="e.g. $750"
              />
            </div>
          </div>

          <div className="flex items-center gap-6 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.sold}
                onChange={e => set('sold', e.target.checked)}
                className="w-4 h-4 rounded border-warm-gray text-brown accent-brown"
              />
              <span className="text-sm text-charcoal">Sold</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.prints}
                onChange={e => set('prints', e.target.checked)}
                className="w-4 h-4 rounded border-warm-gray text-brown accent-brown"
              />
              <span className="text-sm text-charcoal">Prints Available</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-8 pt-6 border-t border-warm-gray">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-brown text-white text-sm font-medium hover:bg-brown-light transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : isEdit ? 'Update Artwork' : 'Add Artwork'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/gallery')}
          className="px-6 py-2.5 rounded-lg border border-warm-gray text-charcoal-light text-sm hover:bg-cream-dark transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
