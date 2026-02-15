import { acrylicOil } from '@/data/gallery';
import GalleryGrid from '@/components/GalleryGrid';
import GalleryHeader from '@/components/GalleryHeader';

export const metadata = {
  title: 'Acrylic & Oil Gallery',
  description: 'Acrylic and oil paintings by Terry Mellway — rich, textured works on canvas.',
};

export default function AcrylicOilPage() {
  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <GalleryHeader
          title="Acrylic & Oil"
          description="Rich acrylic and oil paintings on canvas — from sweeping landscapes to intimate nature scenes."
          count={acrylicOil.length}
        />
        <GalleryGrid images={acrylicOil} />
      </div>
    </div>
  );
}
