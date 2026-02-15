'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setGalleryOpen(false);
  }, [pathname]);

  const isActive = (path) => pathname === path;
  const isGalleryActive = pathname.startsWith('/gallery');

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/95 backdrop-blur-md shadow-sm py-3'
          : 'bg-cream py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <span className="font-serif text-2xl md:text-3xl text-charcoal tracking-wide group-hover:text-brown transition-colors">
            Terry Mellway
          </span>
          <span className="hidden sm:block text-xs tracking-[0.25em] uppercase text-charcoal-light mt-0.5">
            Fine Art
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/" active={isActive('/')}>Home</NavLink>

          {/* Gallery dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setGalleryOpen(true)}
            onMouseLeave={() => setGalleryOpen(false)}
          >
            <Link
              href="/gallery"
              className={`font-sans text-sm tracking-wide uppercase transition-colors flex items-center gap-1 ${
                isGalleryActive ? 'text-brown' : 'text-charcoal-light hover:text-brown'
              }`}
              onClick={(e) => {
                // On touch devices, first tap opens dropdown; second navigates
                if ('ontouchstart' in window && !galleryOpen) {
                  e.preventDefault();
                  setGalleryOpen(true);
                }
              }}
              aria-expanded={galleryOpen}
              aria-haspopup="true"
            >
              Gallery
              <svg className={`w-3.5 h-3.5 transition-transform ${galleryOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </Link>

            {galleryOpen && (
              <div className="absolute top-full left-0 pt-2 min-w-[200px]">
              <div className="bg-cream border border-warm-gray rounded-md shadow-lg py-2 animate-fade-in">
                <Link href="/gallery" className="block px-4 py-2 text-sm text-charcoal-light hover:text-brown hover:bg-cream-dark transition-colors">
                  All Works
                </Link>
                <Link href="/gallery/coloured-pencil" className="block px-4 py-2 text-sm text-charcoal-light hover:text-brown hover:bg-cream-dark transition-colors">
                  Coloured Pencil
                </Link>
                <Link href="/gallery/watercolour" className="block px-4 py-2 text-sm text-charcoal-light hover:text-brown hover:bg-cream-dark transition-colors">
                  Watercolour
                </Link>
                <Link href="/gallery/acrylic-oil" className="block px-4 py-2 text-sm text-charcoal-light hover:text-brown hover:bg-cream-dark transition-colors">
                  Acrylic &amp; Oil
                </Link>
              </div>
              </div>
            )}
          </div>

          <NavLink href="/blog" active={isActive('/blog') || pathname.startsWith('/blog/')}>Blog</NavLink>
          <NavLink href="/#contact" active={false}>Contact</NavLink>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-charcoal"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-cream border-t border-warm-gray animate-fade-in">
          <div className="max-w-7xl mx-auto px-6 py-4 space-y-3">
            <MobileLink href="/" active={isActive('/')}>Home</MobileLink>
            <MobileLink href="/gallery" active={isActive('/gallery')}>Gallery — All Works</MobileLink>
            <MobileLink href="/gallery/coloured-pencil" active={isActive('/gallery/coloured-pencil')} indent>Coloured Pencil</MobileLink>
            <MobileLink href="/gallery/watercolour" active={isActive('/gallery/watercolour')} indent>Watercolour</MobileLink>
            <MobileLink href="/gallery/acrylic-oil" active={isActive('/gallery/acrylic-oil')} indent>Acrylic &amp; Oil</MobileLink>
            <MobileLink href="/blog" active={isActive('/blog')}>Blog</MobileLink>
            <MobileLink href="/#contact" active={false}>Contact</MobileLink>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, active, children }) {
  return (
    <Link
      href={href}
      className={`font-sans text-sm tracking-wide uppercase transition-colors ${
        active ? 'text-brown' : 'text-charcoal-light hover:text-brown'
      }`}
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, active, indent, children }) {
  return (
    <Link
      href={href}
      className={`block text-sm tracking-wide transition-colors ${
        indent ? 'pl-4' : ''
      } ${active ? 'text-brown font-medium' : 'text-charcoal-light hover:text-brown'}`}
    >
      {children}
    </Link>
  );
}
