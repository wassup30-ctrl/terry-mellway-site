import { getGalleryData } from '@/lib/data';
import GalleryGrid from '@/components/GalleryGrid';
import GalleryHeader from '@/components/GalleryHeader';

// Render per-request so admin edits in KV show up immediately.
export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Watercolour Gallery',
  description: 'Watercolour paintings by Terry Mellway — expressive, fluid works capturing light and colour.',
};

export default async function WatercolourPage() {
  const data = await getGalleryData();
  const watercolour = data.watercolour || [];

  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <GalleryHeader
          title="Watercolour"
          description="Expressive watercolour paintings exploring the fluid beauty of light, colour, and natural forms."
          count={watercolour.length}
        />
        <GalleryGrid images={watercolour} />
      </div>
    </div>
  );
}
