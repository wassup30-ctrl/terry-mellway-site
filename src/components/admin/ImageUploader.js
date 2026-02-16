'use client';

import { useState, useRef } from 'react';

export default function ImageUploader({ category, value, onChange, name }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef(null);

  async function upload(file) {
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('category', category);
      if (name) form.append('name', name);

      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (res.ok) {
        onChange(data.path);
      }
    } finally {
      setUploading(false);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith('image/')) upload(file);
  }

  function handleChange(e) {
    const file = e.target.files?.[0];
    if (file) upload(file);
  }

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-colors overflow-hidden ${
        dragging ? 'border-brown bg-brown/5' : 'border-warm-gray hover:border-brown-light'
      } ${value ? 'aspect-auto' : 'aspect-[4/3]'} flex items-center justify-center`}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      {uploading && (
        <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-10">
          <div className="w-6 h-6 border-2 border-brown border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {value ? (
        <img src={value} alt="Preview" className="w-full h-auto max-h-80 object-contain" />
      ) : (
        <div className="text-center p-6">
          <svg className="mx-auto mb-2 text-charcoal-light/40" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="M21 15l-5-5L5 21" />
          </svg>
          <p className="text-sm text-charcoal-light">
            Drop an image here or click to upload
          </p>
        </div>
      )}
    </div>
  );
}
