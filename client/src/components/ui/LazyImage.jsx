import { useState, useRef } from 'react';
import { ZoomIn } from 'lucide-react';

const LazyImage = ({ src, alt, className = '', zoom = false }) => {
  const [loaded, setLoaded] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  return (
    <>
      <div className={`relative overflow-hidden ${className}`}>
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-border" />
        )}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
        {zoom && loaded && (
          <button
            onClick={() => setZoomed(true)}
            className="absolute bottom-2 right-2 w-8 h-8 bg-black/40 hover:bg-black/60 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Zoom image"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        )}
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setZoomed(false)}
        >
          <img
            src={src}
            alt={alt}
            className="max-w-full max-h-full object-contain rounded-lg"
          />
          <button
            className="absolute top-4 right-4 text-white text-3xl font-light hover:text-gray-300"
            onClick={() => setZoomed(false)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
};

export default LazyImage;
