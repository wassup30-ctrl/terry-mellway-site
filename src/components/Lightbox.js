'use client';

import { useEffect, useCallback } from 'react';
import Link from 'next/link';

export default function Lightbox({ images, currentIndex, onClose, onPrev, onNext }) {
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowLeft') onPrev();
    if (e.key === 'ArrowRight') onNext();
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  if (currentIndex === null || currentIndex === undefined) return null;

  const image = images[currentIndex];
  const hasInfo = image.info || image.medium || image.price;

  return (
    <div className="lightbox-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Image lightbox">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-10"
        aria-label="Close lightbox"
      >
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
          aria-label="Previous image"
        >
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Image + Info Panel */}
      <div onClick={(e) => e.stopPropagation()} className="lightbox-content">
        <img
          src={image.src}
          alt={image.alt || 'Artwork by Terry Mellway'}
          className="lightbox-image"
        />

        {/* Info Panel */}
        {hasInfo && (
          <div className="lightbox-info">
            {/* Title */}
            {image.info && (
              <h3 className="lightbox-title">{image.info}</h3>
            )}

            {/* Medium & Dimensions */}
            <div className="lightbox-meta">
              {image.medium && <span>{image.medium}</span>}
              {image.dimensions && (
                <>
                  <span className="lightbox-meta-dot" aria-hidden="true"></span>
                  <span>{image.dimensions}</span>
                </>
              )}
            </div>

            {/* Status Badges */}
            <div className="lightbox-badges">
              {image.sold ? (
                <span className="lightbox-badge lightbox-badge-sold">
                  Sold{image.price ? ` \u2014 ${image.price}` : ''}
                </span>
              ) : image.price ? (
                <span className="lightbox-badge lightbox-badge-price">
                  {image.price}
                </span>
              ) : null}

              {image.prints && (
                <span className="lightbox-badge lightbox-badge-prints">
                  <svg className="w-3.5 h-3.5 mr-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18.25 7.234l-.003.005" />
                  </svg>
                  Prints Available
                </span>
              )}
            </div>

            {/* Inquire Link */}
            <Link
              href="/#contact"
              onClick={onClose}
              className="lightbox-inquire"
            >
              Inquire About This Piece
              <svg className="w-4 h-4 ml-1 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors z-10"
          aria-label="Next image"
        >
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/50 text-sm font-sans tracking-wide">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
