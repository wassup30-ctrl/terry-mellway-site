export const colouredPencil = [
  { src: '/images/coloured-pencil/cp-01.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-02.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-03.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-04.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-05.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-06.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-07.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-08.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-09.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-10.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-11.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-12.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-13.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-14.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-15.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-16.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-17.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-18.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-19.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-20.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-21.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-22.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-23.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-24.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-25.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
  { src: '/images/coloured-pencil/cp-26.jpg', alt: 'Coloured pencil artwork by Terry Mellway', prints: true },
];

export const watercolour = [
  { src: '/images/watercolour/wc-01.jpg', alt: 'Watercolour painting by Terry Mellway' },
  { src: '/images/watercolour/wc-02.jpg', alt: 'Watercolour painting by Terry Mellway' },
  { src: '/images/watercolour/wc-03.jpg', alt: 'Watercolour painting by Terry Mellway' },
  { src: '/images/watercolour/wc-04.jpg', alt: 'Watercolour painting by Terry Mellway' },
];

export const acrylicOil = [
  { src: '/images/acrylic-oil/ao-01.jpg', alt: 'Palmer Rapids — Oil on Canvas 36x60', info: 'Palmer Rapids', medium: 'Oil on Canvas 36x60', price: '$950', sold: true },
  { src: '/images/acrylic-oil/ao-02.jpg', alt: 'Acrylic & Oil painting by Terry Mellway' },
  { src: '/images/acrylic-oil/ao-03.jpg', alt: 'After the Rains — Acrylic & Oil painting by Terry Mellway', info: 'After the Rains' },
  { src: '/images/acrylic-oil/ao-04.jpg', alt: 'Acrylic & Oil painting by Terry Mellway' },
  { src: '/images/acrylic-oil/ao-05.jpg', alt: 'Acrylic & Oil painting by Terry Mellway' },
  { src: '/images/acrylic-oil/ao-06.jpg', alt: 'My Forest Home — Acrylic & Oil painting by Terry Mellway', info: 'My Forest Home' },
  { src: '/images/acrylic-oil/ao-07.jpg', alt: 'Acrylic & Oil painting by Terry Mellway' },
  { src: '/images/acrylic-oil/ao-08.jpg', alt: 'Acrylic & Oil painting by Terry Mellway' },
];

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
