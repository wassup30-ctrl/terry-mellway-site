import { getGalleryData } from '@/lib/data';
import { buildCategories, buildImagesByCategory } from '@/data/gallery';
import GalleryFilter from '@/components/GalleryFilter';

// Render per-request so admin edits in KV show up immediately.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Gallery',
  description: 'Explore the full collection by Terry Mellway — coloured pencil, watercolour, acrylic and oil works.',
};

export default async function GalleryPage() {
  const data = await getGalleryData();

  const categories = buildCategories(data);
  const imagesByCategory = buildImagesByCategory(data);

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-serif text-4xl sm:text-5xl text-charcoal mb-3">Gallery</h1>
          <p className="text-charcoal-light max-w-lg mx-auto">
            Explore the full collection — coloured pencil, watercolour, acrylic and oil works.
          </p>
        </div>

        <GalleryFilter imagesByCategory={imagesByCategory} categories={categories} />
      </div>
    </div>
  );
}
