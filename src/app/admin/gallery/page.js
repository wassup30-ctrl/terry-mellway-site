'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DataTable from '@/components/admin/DataTable';
import DeleteDialog from '@/components/admin/DeleteDialog';
import { useToast } from '@/components/admin/Toast';

const TABS = [
  { key: 'colouredPencil', label: 'Coloured Pencil', slug: 'coloured-pencil' },
  { key: 'watercolour', label: 'Watercolour', slug: 'watercolour' },
  { key: 'acrylicOil', label: 'Acrylic & Oil', slug: 'acrylic-oil' },
];

const COLUMNS = [
  {
    key: 'thumbnail',
    label: '',
    render: row => (
      <img src={row.src} alt="" className="w-12 h-12 object-cover rounded" />
    ),
  },
  { key: 'info', label: 'Title' },
  { key: 'medium', label: 'Medium' },
  { key: 'dimensions', label: 'Size' },
  { key: 'price', label: 'Price' },
  {
    key: 'status',
    label: 'Status',
    render: row => (
      <div className="flex items-center gap-1.5">
        {row.sold && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-brown/10 text-brown">Sold</span>
        )}
        {row.prints && (
          <span className="px-2 py-0.5 text-xs rounded-full bg-sage/10 text-sage">Prints</span>
        )}
      </div>
    ),
  },
];

export default function GalleryAdmin() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('colouredPencil');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const addToast = useToast();

  useEffect(() => {
    fetch('/api/admin/gallery').then(r => r.json()).then(setData);
  }, []);

  const tab = TABS.find(t => t.key === activeTab);
  const rows = data?.[activeTab]?.map((item, i) => ({ ...item, _key: `${tab.slug}-${i}`, _index: i })) || [];

  async function handleDelete() {
    const id = `${tab.slug}-${deleteTarget._index}`;
    const res = await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
    if (res.ok) {
      addToast('Artwork deleted');
      setDeleteTarget(null);
      const fresh = await fetch('/api/admin/gallery').then(r => r.json());
      setData(fresh);
    } else {
      addToast('Failed to delete', 'error');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-charcoal">Gallery</h1>
        <Link
          href="/admin/gallery/new"
          className="px-4 py-2 rounded-lg bg-brown text-white text-sm font-medium hover:bg-brown-light transition-colors"
        >
          + Add Artwork
        </Link>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-1 mb-6 bg-white rounded-lg border border-warm-gray p-1 w-fit">
        {TABS.map(t => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              activeTab === t.key
                ? 'bg-brown text-white'
                : 'text-charcoal-light hover:bg-cream-dark'
            }`}
          >
            {t.label}
            {data && <span className="ml-1.5 opacity-60">({data[t.key]?.length || 0})</span>}
          </button>
        ))}
      </div>

      {data ? (
        <DataTable
          columns={COLUMNS}
          rows={rows}
          editHref={row => `/admin/gallery/${row._key}`}
          onDelete={row => setDeleteTarget(row)}
        />
      ) : (
        <div className="text-center py-12 text-charcoal-light">Loading...</div>
      )}

      <DeleteDialog
        open={!!deleteTarget}
        title={deleteTarget?.info}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
