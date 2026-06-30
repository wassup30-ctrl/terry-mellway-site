// Static metadata for each gallery category. The artwork itself — and the
// counts derived from it — come from live data (Cloudflare KV in production,
// the JSON file in local dev) via getGalleryData() in '@/lib/data'.
// Do NOT import gallery.json here for display: that bakes a build-time snapshot
// into the bundle and won't reflect admin edits.
export const categoryMeta = [
  {
    name: 'Coloured Pencil',
    slug: 'coloured-pencil',
    key: 'colouredPencil',
    description: 'Detailed coloured pencil works — prints available from most originals',
    featured: '/images/coloured-pencil/cp-01.jpg',
  },
  {
    name: 'Watercolour',
    slug: 'watercolour',
    key: 'watercolour',
    description: 'Expressive watercolour paintings',
    featured: '/images/watercolour/wc-01.jpg',
  },
  {
    name: 'Acrylic & Oil',
    slug: 'acrylic-oil',
    key: 'acrylicOil',
    description: 'Rich acrylic and oil paintings on canvas',
    featured: '/images/acrylic-oil/ao-01.jpg',
  },
];

// Build the category list (name/slug/featured + live count) from a gallery
// data object as returned by getGalleryData().
export function buildCategories(data) {
  return categoryMeta.map(({ key, ...rest }) => ({
    ...rest,
    count: (data?.[key] || []).length,
  }));
}

// Flatten all works across categories, tagging each with its category label
// and slug — used by the "All Works" view.
export function buildAllWorks(data) {
  return categoryMeta.flatMap(({ key, name, slug }) =>
    (data?.[key] || []).map((w) => ({ ...w, category: name, categorySlug: slug }))
  );
}

// Map of filter-slug -> works array (including the combined 'all' view),
// derived from categoryMeta so the category list lives in exactly one place.
export function buildImagesByCategory(data) {
  return {
    all: buildAllWorks(data),
    ...Object.fromEntries(categoryMeta.map(({ slug, key }) => [slug, data?.[key] || []])),
  };
}
