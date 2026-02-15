import Link from 'next/link';

export default function GalleryHeader({ title, subtitle, description, count }) {
  return (
    <div className="text-center mb-10">
      <nav className="text-sm text-charcoal-light mb-4">
        <Link href="/gallery" className="hover:text-brown transition-colors">Gallery</Link>
        <span className="mx-2">/</span>
        <span className="text-charcoal">{title}</span>
      </nav>
      <h1 className="font-serif text-4xl sm:text-5xl text-charcoal mb-2">{title}</h1>
      {subtitle && (
        <p className="text-sage text-sm tracking-wide uppercase mb-3">{subtitle}</p>
      )}
      {description && (
        <p className="text-charcoal-light max-w-xl mx-auto mb-2">{description}</p>
      )}
      {count && (
        <p className="text-charcoal-light/60 text-sm">{count} works</p>
      )}
    </div>
  );
}
