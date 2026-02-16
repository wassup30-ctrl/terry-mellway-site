'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import DataTable from '@/components/admin/DataTable';
import DeleteDialog from '@/components/admin/DeleteDialog';
import { useToast } from '@/components/admin/Toast';

const COLUMNS = [
  {
    key: 'image',
    label: '',
    render: row => (
      row.image ? <img src={row.image} alt="" className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 bg-warm-gray rounded" />
    ),
  },
  { key: 'title', label: 'Title' },
  {
    key: 'date',
    label: 'Date',
    render: row => new Date(row.date + 'T00:00:00').toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }),
  },
  {
    key: 'excerpt',
    label: 'Excerpt',
    render: row => (
      <span className="line-clamp-2 max-w-xs text-charcoal-light text-xs">
        {row.excerpt}
      </span>
    ),
  },
];

export default function BlogAdmin() {
  const [posts, setPosts] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const addToast = useToast();

  useEffect(() => {
    fetch('/api/admin/blog').then(r => r.json()).then(setPosts);
  }, []);

  async function handleDelete() {
    const res = await fetch(`/api/admin/blog/${deleteTarget.slug}`, { method: 'DELETE' });
    if (res.ok) {
      addToast('Post deleted');
      setDeleteTarget(null);
      const fresh = await fetch('/api/admin/blog').then(r => r.json());
      setPosts(fresh);
    } else {
      addToast('Failed to delete', 'error');
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl text-charcoal">Blog Posts</h1>
        <Link
          href="/admin/blog/new"
          className="px-4 py-2 rounded-lg bg-brown text-white text-sm font-medium hover:bg-brown-light transition-colors"
        >
          + New Post
        </Link>
      </div>

      {posts ? (
        <DataTable
          columns={COLUMNS}
          rows={posts.map(p => ({ ...p, _key: p.slug }))}
          editHref={row => `/admin/blog/${row.slug}`}
          onDelete={row => setDeleteTarget(row)}
        />
      ) : (
        <div className="text-center py-12 text-charcoal-light">Loading...</div>
      )}

      <DeleteDialog
        open={!!deleteTarget}
        title={deleteTarget?.title}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
