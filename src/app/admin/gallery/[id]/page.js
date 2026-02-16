'use client';

import { useState, useEffect, use } from 'react';
import ArtworkForm from '@/components/admin/ArtworkForm';

export default function EditArtwork({ params }) {
  const { id } = use(params);
  const [artwork, setArtwork] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`/api/admin/gallery/${id}`)
      .then(r => {
        if (!r.ok) throw new Error('Not found');
        return r.json();
      })
      .then(setArtwork)
      .catch(() => setError('Artwork not found'));
  }, [id]);

  if (error) {
    return <div className="text-center py-12 text-charcoal-light">{error}</div>;
  }

  if (!artwork) {
    return <div className="text-center py-12 text-charcoal-light">Loading...</div>;
  }

  return (
    <div>
      <h1 className="font-serif text-2xl text-charcoal mb-6">Edit Artwork</h1>
      <ArtworkForm artwork={artwork} id={id} />
    </div>
  );
}
