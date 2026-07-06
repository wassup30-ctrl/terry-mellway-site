'use client';

import { useState, useRef, useEffect } from 'react';

export default function MultiImageUploader({ category, value, onChange, name }) {
  const images = value || [];
  const [dragging, setDragging] = useState(false);
  const [uploadingCount, setUploadingCount] = useState(0);
  // Local blob previews keyed by stored path, so a freshly uploaded image shows
  // instantly even before the CDN/KV read is consistent.
  const [previews, setPreviews] = useState({});
  const previewsRef = useRef(previews);
  previewsRef.current = previews;
  const inputRef = useRef(null);

  useEffect(() => () => {
    Object.values(previewsRef.current).forEach(url => URL.revokeObjectURL(url));
  }, []);

  async function uploadFiles(fileList) {
    const files = Array.from(fileList).filter(f => f.type?.startsWith('image/'));
    if (!files.length) return;

    setUploadingCount(c => c + files.length);
    const added = [];
    try {
      // Upload sequentially so the server assigns unique filenames without racing.
      for (const file of files) {
        try {
          const form = new FormData();
          form.append('file', file);
          form.append('category', category);
          if (name) form.append('name', name);

          const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
          const data = await res.json();
          if (res.ok && data.path) {
            added.push(data.path);
            const url = URL.createObjectURL(file);
            setPreviews(p => ({ ...p, [data.path]: url }));
            onChange([...images, ...added]);
          }
        } finally {
          setUploadingCount(c => c - 1);
        }
      }
    } finally {
      if (inputRef.current) inputRef.current.value = '';
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.length) uploadFiles(e.dataTransfer.files);
  }

  function handleChange(e) {
    if (e.target.files?.length) uploadFiles(e.target.files);
  }

  function remove(index) {
    onChange(images.filter((_, i) => i !== index));
  }

  function makeFeatured(index) {
    const next = [...images];
    const [item] = next.splice(index, 1);
    next.unshift(item);
    onChange(next);
  }

  return (
    <div>
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
          {images.map((src, i) => (
            <div
              key={`${src}-${i}`}
              className="group relative rounded-lg overflow-hidden border border-warm-gray bg-white aspect-square"
            >
              <img src={previews[src] || src} alt={`Image ${i + 1}`} className="w-full h-full object-cover" />

              {i === 0 && (
                <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-full bg-brown text-white text-[10px] font-medium uppercase tracking-wider">
                  Featured
                </span>
              )}

              <div className="absolute inset-0 bg-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                {i !== 0 && (
                  <button
                    type="button"
                    onClick={() => makeFeatured(i)}
                    className="px-2 py-1 rounded bg-white/90 text-charcoal text-xs font-medium hover:bg-white"
                  >
                    Make featured
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => remove(i)}
                  aria-label="Remove image"
                  className="w-7 h-7 rounded-full bg-white/90 text-charcoal flex items-center justify-center hover:bg-white"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative cursor-pointer rounded-xl border-2 border-dashed transition-colors flex items-center justify-center aspect-[5/2] ${
          dragging ? 'border-brown bg-brown/5' : 'border-warm-gray hover:border-brown-light'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleChange}
          className="hidden"
        />
        {uploadingCount > 0 ? (
          <div className="flex items-center gap-2 text-charcoal-light text-sm">
            <div className="w-5 h-5 border-2 border-brown border-t-transparent rounded-full animate-spin" />
            Uploading {uploadingCount} image{uploadingCount > 1 ? 's' : ''}…
          </div>
        ) : (
          <div className="text-center p-6">
            <svg className="mx-auto mb-2 text-charcoal-light/40" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <p className="text-sm text-charcoal-light">
              Drop images here or click to upload{images.length > 0 ? ' more' : ''}
            </p>
            <p className="text-xs text-charcoal-light/60 mt-1">
              You can select several at once. The first image is featured.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
