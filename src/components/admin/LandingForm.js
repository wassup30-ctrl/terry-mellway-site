'use client';

import { useState } from 'react';
import ImageUploader from './ImageUploader';
import { useToast } from './Toast';

function Section({ title, defaultOpen, children }) {
  const [open, setOpen] = useState(defaultOpen ?? true);
  return (
    <div className="border border-warm-gray rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3.5 bg-cream-dark hover:bg-warm-gray/30 transition-colors"
      >
        <span className="font-serif text-lg text-charcoal">{title}</span>
        <svg
          className={`w-5 h-5 text-charcoal-light transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="p-5 space-y-4">{children}</div>}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-medium text-charcoal-light uppercase tracking-wider mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass = 'w-full px-3 py-2 rounded-lg border border-warm-gray bg-white text-charcoal text-sm focus:outline-none focus:border-brown';
const textareaClass = inputClass + ' resize-y';

export default function LandingForm({ initialData }) {
  const [form, setForm] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const addToast = useToast();

  function setHero(key, value) {
    setForm(prev => ({ ...prev, hero: { ...prev.hero, [key]: value } }));
  }

  function setGalleryPreview(key, value) {
    setForm(prev => ({ ...prev, galleryPreview: { ...prev.galleryPreview, [key]: value } }));
  }

  function setCategory(index, key, value) {
    setForm(prev => {
      const cats = [...prev.galleryPreview.categories];
      cats[index] = { ...cats[index], [key]: value };
      return { ...prev, galleryPreview: { ...prev.galleryPreview, categories: cats } };
    });
  }

  function setAbout(key, value) {
    setForm(prev => ({ ...prev, about: { ...prev.about, [key]: value } }));
  }

  function setParagraph(index, value) {
    setForm(prev => {
      const paragraphs = [...prev.about.paragraphs];
      paragraphs[index] = value;
      return { ...prev, about: { ...prev.about, paragraphs } };
    });
  }

  function addParagraph() {
    setForm(prev => ({
      ...prev,
      about: { ...prev.about, paragraphs: [...prev.about.paragraphs, ''] },
    }));
  }

  function removeParagraph(index) {
    setForm(prev => ({
      ...prev,
      about: { ...prev.about, paragraphs: prev.about.paragraphs.filter((_, i) => i !== index) },
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch('/api/admin/landing', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        addToast('Landing page updated');
      } else {
        const err = await res.json();
        addToast(err.error || 'Something went wrong', 'error');
      }
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      {/* Hero Section */}
      <Section title="Hero" defaultOpen={true}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Field label="Background Image">
              <ImageUploader
                category="landing"
                value={form.hero.image}
                onChange={val => setHero('image', val)}
              />
            </Field>
          </div>
          <div className="space-y-4">
            <Field label="Heading (use newlines for line breaks)">
              <textarea
                value={form.hero.heading}
                onChange={e => setHero('heading', e.target.value)}
                rows={3}
                className={textareaClass}
              />
            </Field>
            <Field label="Tagline">
              <input
                type="text"
                value={form.hero.tagline}
                onChange={e => setHero('tagline', e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </Section>

      {/* Gallery Preview Section */}
      <Section title="Gallery Preview" defaultOpen={false}>
        <div className="space-y-4">
          <Field label="Section Heading">
            <input
              type="text"
              value={form.galleryPreview.heading}
              onChange={e => setGalleryPreview('heading', e.target.value)}
              className={inputClass}
            />
          </Field>
          <Field label="Description">
            <textarea
              value={form.galleryPreview.description}
              onChange={e => setGalleryPreview('description', e.target.value)}
              rows={2}
              className={textareaClass}
            />
          </Field>

          <div className="space-y-4 pt-2">
            <p className="text-xs font-medium text-charcoal-light uppercase tracking-wider">Category Cards</p>
            {form.galleryPreview.categories.map((cat, i) => (
              <div key={cat.slug} className="border border-warm-gray/60 rounded-lg p-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div>
                    <Field label={`${cat.name} — Featured Image`}>
                      <ImageUploader
                        category="landing"
                        value={cat.featured}
                        onChange={val => setCategory(i, 'featured', val)}
                      />
                    </Field>
                  </div>
                  <div className="space-y-4">
                    <Field label="Display Name">
                      <input
                        type="text"
                        value={cat.name}
                        onChange={e => setCategory(i, 'name', e.target.value)}
                        className={inputClass}
                      />
                    </Field>
                    <Field label="Slug">
                      <input
                        type="text"
                        value={cat.slug}
                        disabled
                        className={inputClass + ' bg-cream-dark text-charcoal-light cursor-not-allowed'}
                      />
                    </Field>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* About Section */}
      <Section title="About the Artist" defaultOpen={false}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <Field label="Artist Photo">
              <ImageUploader
                category="landing"
                value={form.about.image}
                onChange={val => setAbout('image', val)}
              />
            </Field>
          </div>
          <div className="space-y-4">
            <Field label="Heading">
              <input
                type="text"
                value={form.about.heading}
                onChange={e => setAbout('heading', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Subheading">
              <input
                type="text"
                value={form.about.subheading}
                onChange={e => setAbout('subheading', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Instagram URL">
              <input
                type="url"
                value={form.about.instagramUrl}
                onChange={e => setAbout('instagramUrl', e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field label="Facebook URL">
              <input
                type="url"
                value={form.about.facebookUrl}
                onChange={e => setAbout('facebookUrl', e.target.value)}
                className={inputClass}
              />
            </Field>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-charcoal-light uppercase tracking-wider">Bio Paragraphs</p>
            <button
              type="button"
              onClick={addParagraph}
              className="text-xs text-brown hover:text-brown-light transition-colors font-medium"
            >
              + Add Paragraph
            </button>
          </div>
          <div className="space-y-3">
            {form.about.paragraphs.map((p, i) => (
              <div key={i} className="flex gap-2">
                <textarea
                  value={p}
                  onChange={e => setParagraph(i, e.target.value)}
                  rows={3}
                  className={textareaClass + ' flex-1'}
                />
                {form.about.paragraphs.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeParagraph(i)}
                    className="self-start p-2 text-charcoal-light hover:text-red-500 transition-colors"
                    title="Remove paragraph"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Save */}
      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-lg bg-brown text-white text-sm font-medium hover:bg-brown-light transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}
