import './globals.css';
import LayoutShell from '@/components/LayoutShell';

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Bebas+Neue&family=Caveat:wght@400;700&family=Cinzel:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Courier+Prime:wght@400;700&family=Crimson+Text:wght@400;600&family=Dancing+Script:wght@400;700&family=EB+Garamond:wght@400;700&family=Great+Vibes&family=JetBrains+Mono:wght@400;700&family=Lato:wght@400;700&family=Libre+Baskerville:wght@400;700&family=Lora:wght@400;700&family=Merriweather:wght@400;700&family=Montserrat:wght@400;700&family=Nunito:wght@400;700&family=Open+Sans:wght@400;700&family=Oswald:wght@400;700&family=Pacifico&family=Playfair+Display:wght@400;700&family=Poppins:wght@400;700&family=PT+Serif:wght@400;700&family=Raleway:wght@400;700&family=Sacramento&family=Satisfy&family=Source+Sans+3:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Work+Sans:wght@400;700&display=swap"
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <LayoutShell>
          {children}
        </LayoutShell>
      </body>
    </html>
  );
}
