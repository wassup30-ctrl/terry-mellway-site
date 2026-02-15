import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://www.terrymellway.com'),
  title: {
    default: 'Terry Mellway Fine Art — Seeing the World Through My Eyes',
    template: '%s | Terry Mellway Fine Art',
  },
  description: 'Fine art by Terry Mellway — coloured pencil, watercolour, acrylic and oil paintings from Pencil & Brush Studio in Sandy Hook, Manitoba.',
  keywords: ['Terry Mellway', 'fine art', 'coloured pencil art', 'watercolour', 'acrylic painting', 'oil painting', 'Canadian artist', 'Manitoba artist', 'wildlife art', 'nature art'],
  authors: [{ name: 'Terry Mellway' }],
  openGraph: {
    title: 'Terry Mellway Fine Art',
    description: 'Seeing the World Through My Eyes — coloured pencil, watercolour, acrylic and oil paintings.',
    url: 'https://www.terrymellway.com',
    siteName: 'Terry Mellway Fine Art',
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terry Mellway Fine Art',
    description: 'Seeing the World Through My Eyes — coloured pencil, watercolour, acrylic and oil paintings.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
