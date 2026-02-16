'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

function StatCard({ label, value, href }) {
  return (
    <Link href={href} className="bg-white rounded-xl border border-warm-gray p-6 hover:border-brown-light transition-colors group">
      <p className="text-3xl font-serif text-charcoal group-hover:text-brown transition-colors">{value}</p>
      <p className="text-sm text-charcoal-light mt-1">{label}</p>
    </Link>
  );
}

export default function AdminDashboard() {
  const [gallery, setGallery] = useState(null);
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch('/api/admin/gallery').then(r => r.json()).then(setGallery);
    fetch('/api/admin/blog').then(r => r.json()).then(setPosts);
  }, []);

  const cp = gallery?.colouredPencil?.length || 0;
  const wc = gallery?.watercolour?.length || 0;
  const ao = gallery?.acrylicOil?.length || 0;
  const blogCount = posts?.length || 0;

  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="Coloured Pencil" value={cp} href="/admin/gallery" />
        <StatCard label="Watercolour" value={wc} href="/admin/gallery" />
        <StatCard label="Acrylic & Oil" value={ao} href="/admin/gallery" />
        <StatCard label="Blog Posts" value={blogCount} href="/admin/blog" />
      </div>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/gallery/new"
          className="px-5 py-2.5 rounded-lg bg-brown text-white text-sm font-medium hover:bg-brown-light transition-colors"
        >
          + Add Artwork
        </Link>
        <Link
          href="/admin/blog/new"
          className="px-5 py-2.5 rounded-lg bg-sage text-white text-sm font-medium hover:bg-sage-light transition-colors"
        >
          + New Blog Post
        </Link>
      </div>
    </div>
  );
}
