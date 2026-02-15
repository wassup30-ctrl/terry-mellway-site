'use client';

import Link from 'next/link';
import { categories } from '@/data/gallery';
import { blogPosts } from '@/data/blog';
import ContactForm from '@/components/ContactForm';
import useReveal from '@/hooks/useReveal';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <GalleryPreview />
      <AboutSection />
      <BlogPreview />
      <ContactSection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative h-[85vh] min-h-[500px] flex items-center justify-center overflow-hidden -mt-20">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/coloured-pencil/cp-01.jpg"
          alt="Featured artwork by Terry Mellway"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 via-charcoal/30 to-charcoal/60" />
      </div>

      {/* Content */}
      <div className="relative text-center px-6 animate-fade-in-up">
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-4 leading-tight">
          Seeing the World<br />Through My Eyes
        </h1>
        <p className="text-white/80 text-lg sm:text-xl font-light max-w-xl mx-auto mb-8">
          Fine art by Terry Mellway — coloured pencil, watercolour, acrylic &amp; oil
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/gallery"
            className="px-8 py-3 bg-white/90 text-charcoal text-sm tracking-wide uppercase rounded-md hover:bg-white transition-colors"
          >
            View Gallery
          </Link>
          <Link
            href="/#about"
            className="px-8 py-3 border border-white/50 text-white text-sm tracking-wide uppercase rounded-md hover:bg-white/10 transition-colors"
          >
            About the Artist
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}

function GalleryPreview() {
  const ref = useReveal();

  return (
    <section className="py-20 px-6">
      <div ref={ref} className="max-w-7xl mx-auto reveal">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal mb-3">Gallery</h2>
          <p className="text-charcoal-light max-w-lg mx-auto">
            Explore original works across three mediums, each reflecting my deep connection to the beauty around us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/gallery/${cat.slug}`}
              className="group relative overflow-hidden rounded-lg aspect-[4/5] bg-warm-gray block"
            >
              <img
                src={cat.featured}
                alt={`${cat.name} gallery`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-serif text-2xl text-white mb-1">{cat.name}</h3>
                <p className="text-white/70 text-sm">{cat.count} works</p>
              </div>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/gallery"
            className="inline-block px-8 py-3 border border-brown text-brown text-sm tracking-wide uppercase rounded-md hover:bg-brown hover:text-white transition-colors"
          >
            View All Works
          </Link>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useReveal();

  return (
    <section id="about" className="py-20 px-6 bg-cream-dark">
      <div ref={ref} className="max-w-6xl mx-auto reveal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Artist photo */}
          <div className="relative">
            <img
              src="/images/misc/artist-photo.jpg"
              alt="Terry Mellway in her studio"
              loading="lazy"
              className="w-full max-w-md mx-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Bio */}
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal mb-2">About the Artist</h2>
            <p className="text-brown text-sm tracking-wide uppercase mb-6">Pencil &amp; Brush Studio — Sandy Hook, Manitoba</p>

            <div className="space-y-4 text-charcoal-light leading-relaxed">
              <p>
                My name is Terry Mellway and I am an artist. Art has always been a part of my life. The connection I feel to everything around me, in the shapes, the colors and the details comes from deep within and my aim is to enable my viewers to see that connection through my artwork and hopefully allow them to appreciate the beauty all around us.
              </p>
              <p>
                My love for colored pencils goes back to junior high and every year getting a new set for school and the excitement I felt of sharpening all the bright new colors and using them for the first time. Today colored pencils are an extension of my passion for art.
              </p>
              <p>
                When a piece turns out well for me I feel it, so each painting is part of my joy. I have added watercolour, acrylic and oils to my portfolio. I hope you enjoy them all as much as I enjoy creating them.
              </p>
            </div>

            <div className="mt-8 flex gap-4">
              <a
                href="https://www.instagram.com/terrymellway/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-charcoal-light hover:text-brown transition-colors text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                @terrymellway
              </a>
              <a
                href="http://www.facebook.com/terrymellway"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-charcoal-light hover:text-brown transition-colors text-sm"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogPreview() {
  const ref = useReveal();
  const recentPosts = blogPosts.slice(0, 3);

  return (
    <section className="py-20 px-6">
      <div ref={ref} className="max-w-7xl mx-auto reveal">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal mb-3">From the Studio</h2>
          <p className="text-charcoal-light">Works in progress, completed pieces, and thoughts from the easel.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <time className="text-xs text-charcoal-light tracking-wide uppercase">
                  {new Date(post.date).toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <h3 className="font-serif text-xl text-charcoal mt-1 mb-2 group-hover:text-brown transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-charcoal-light line-clamp-2">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blog"
            className="inline-block px-8 py-3 border border-brown text-brown text-sm tracking-wide uppercase rounded-md hover:bg-brown hover:text-white transition-colors"
          >
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useReveal();

  return (
    <section id="contact" className="py-20 px-6 bg-cream-dark">
      <div ref={ref} className="max-w-6xl mx-auto reveal">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl text-charcoal mb-3">Get in Touch</h2>
            <p className="text-charcoal-light mb-6 max-w-md">
              Interested in a piece, have questions about prints, or just want to say hello? I&apos;d love to hear from you.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-brown flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:6artist6@gmail.com" className="text-charcoal-light hover:text-brown transition-colors">
                  6artist6@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-brown flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0115 0z" />
                </svg>
                <span className="text-charcoal-light">Pencil &amp; Brush Studio, Sandy Hook, Manitoba</span>
              </div>
            </div>

            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/terrymellway/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-warm-gray rounded-md text-charcoal-light hover:text-brown hover:border-brown transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                Instagram
              </a>
              <a
                href="http://www.facebook.com/terrymellway"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-warm-gray rounded-md text-charcoal-light hover:text-brown hover:border-brown transition-colors text-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </a>
            </div>
          </div>

          <div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
