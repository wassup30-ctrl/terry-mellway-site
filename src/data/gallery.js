import data from './gallery.json';

export const colouredPencil = data.colouredPencil;
export const watercolour = data.watercolour;
export const acrylicOil = data.acrylicOil;

export const categories = [
  {
    name: 'Coloured Pencil',
    slug: 'coloured-pencil',
    description: 'Detailed coloured pencil works — prints available from most originals',
    featured: '/images/coloured-pencil/cp-01.jpg',
    count: colouredPencil.length,
  },
  {
    name: 'Watercolour',
    slug: 'watercolour',
    description: 'Expressive watercolour paintings',
    featured: '/images/watercolour/wc-01.jpg',
    count: watercolour.length,
  },
  {
    name: 'Acrylic & Oil',
    slug: 'acrylic-oil',
    description: 'Rich acrylic and oil paintings on canvas',
    featured: '/images/acrylic-oil/ao-01.jpg',
    count: acrylicOil.length,
  },
];

export const allWorks = [
  ...colouredPencil.map(w => ({ ...w, category: 'Coloured Pencil', categorySlug: 'coloured-pencil' })),
  ...watercolour.map(w => ({ ...w, category: 'Watercolour', categorySlug: 'watercolour' })),
  ...acrylicOil.map(w => ({ ...w, category: 'Acrylic & Oil', categorySlug: 'acrylic-oil' })),
];
