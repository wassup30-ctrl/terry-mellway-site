import { watercolour } from '@/data/gallery';
import GalleryGrid from '@/components/GalleryGrid';
import GalleryHeader from '@/components/GalleryHeader';

export const metadata = {
  title: 'Watercolour Gallery',
  description: 'Watercolour paintings by Terry Mellway — expressive, fluid works capturing light and colour.',
};

export default function WatercolourPage() {
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
