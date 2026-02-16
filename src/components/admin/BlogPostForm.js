'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';
import { useToast } from './Toast';

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function BlogPostForm({ post, isEdit }) {
  const router = useRouter();
  const addToast = useToast();

  const [form, setForm] = useState({
    slug: post?.slug || '',
    title: post?.title || '',
    date: post?.date || new Date().toISOString().slice(0, 10),
    image: post?.image || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
  });
  const [saving, setSaving] = useState(false);

  function set(key, value) {
    setForm(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'title' && !isEdit) {
        next.slug = slugify(value);
      }
      return next;
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);

    try {
      const url = isEdit ? `/api/admin/blog/${post.slug}` : '/api/admin/blog';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        addToast(isEdit ? 'Post updated' : 'Post created');
        router.push('/admin/blog');
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
            Featured Image
          </label>
          <ImageUploader
            category="blog"
            value={form.image}
            onChange={val => set('image', val)}
            name={form.title}
          />
        </div>

        {/* Right: Fields */}
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1.5">
              Title
            </label>
            <input
              type="text"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              required
              className="w-full px-3 py-2 rounded-lg border border-warm-gray bg-white text-charcoal text-sm focus:outline-none focus:border-brown"
              placeholder="Post title"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1.5">
                Slug
              </label>
              <input
                type="text"
                value={form.slug}
                onChange={e => set('slug', e.target.value)}
                required
                disabled={isEdit}
                className="w-full px-3 py-2 rounded-lg border border-warm-gray bg-white text-charcoal text-sm focus:outline-none focus:border-brown disabled:bg-cream-dark disabled:text-charcoal-light"
                placeholder="auto-generated"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1.5">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={e => set('date', e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-warm-gray bg-white text-charcoal text-sm focus:outline-none focus:border-brown"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1.5">
              Excerpt
            </label>
            <textarea
              value={form.excerpt}
              onChange={e => set('excerpt', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border border-warm-gray bg-white text-charcoal text-sm focus:outline-none focus:border-brown resize-none"
              placeholder="Short description for previews"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1.5">
              Content
            </label>
            <textarea
              value={form.content}
              onChange={e => set('content', e.target.value)}
              rows={8}
              required
              className="w-full px-3 py-2 rounded-lg border border-warm-gray bg-white text-charcoal text-sm focus:outline-none focus:border-brown resize-y"
              placeholder="Full blog post content (use blank lines for paragraphs)"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-8 pt-6 border-t border-warm-gray">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-brown text-white text-sm font-medium hover:bg-brown-light transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : isEdit ? 'Update Post' : 'Publish Post'}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/blog')}
          className="px-6 py-2.5 rounded-lg border border-warm-gray text-charcoal-light text-sm hover:bg-cream-dark transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
