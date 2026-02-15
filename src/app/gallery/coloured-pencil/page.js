import { colouredPencil } from '@/data/gallery';
import GalleryGrid from '@/components/GalleryGrid';
import GalleryHeader from '@/components/GalleryHeader';

export const metadata = {
  title: 'Coloured Pencil Gallery',
  description: 'Coloured pencil artwork by Terry Mellway — detailed, realistic works with prints available from most originals.',
};

export default function ColouredPencilPage() {
  return (
    <div className="py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <GalleryHeader
          title="Coloured Pencil"
          subtitle="Prints Available from most originals"
          description="Detailed coloured pencil works capturing the intricate beauty of nature, wildlife, and everyday objects. Each piece is a labor of love, built up layer by layer."
          count={colouredPencil.length}
        />
        <GalleryGrid images={colouredPencil} showBadge={true} />
      </div>
    </div>
  );
}
