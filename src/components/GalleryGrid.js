'use client';

import { useState } from 'react';
import Lightbox from './Lightbox';
import useReveal from '@/hooks/useReveal';

export default function GalleryGrid({ images, showBadge = false }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <>
      <div className="masonry-grid">
        {images.map((image, i) => (
          <GalleryItem
            key={i}
            image={image}
            index={i}
            showBadge={showBadge}
            onClick={() => setLightboxIndex(i)}
          />
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)}
          onNext={() => setLightboxIndex((lightboxIndex + 1) % images.length)}
        />
      )}
    </>
  );
}

function GalleryItem({ image, index, showBadge, onClick }) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className="masonry-item reveal"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <button
        onClick={onClick}
        className="gallery-card group"
        aria-label={`View ${image.info || image.alt || 'artwork'}`}
      >
        <img
          src={image.src}
          alt={image.alt || 'Artwork by Terry Mellway'}
          loading="lazy"
          className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="gallery-card-overlay">
          {/* Title & details at bottom */}
          {image.info && (
            <div className="gallery-card-info">
              <p className="gallery-card-title">{image.info}</p>
              {image.medium && (
                <p className="gallery-card-medium">{image.medium}</p>
              )}
              {image.price && (
                <p className="gallery-card-price">
                  {image.sold ? `${image.price} \u2014 Sold` : image.price}
                </p>
              )}
            </div>
          )}

          {/* Magnifier icon */}
          <div className="gallery-card-zoom">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
            </svg>
          </div>
        </div>

        {/* Top badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
          {/* Sold badge */}
          {image.sold ? (
            <span className="gallery-badge gallery-badge-sold">Sold</span>
          ) : (
            <span></span>
          )}

          {/* Prints badge */}
          {showBadge && image.prints && (
            <span className="gallery-badge gallery-badge-prints">Prints Available</span>
          )}
        </div>
      </button>
    </div>
  );
}
