/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Grid, X } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop";

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGallery, setShowGallery] = useState(false);

  const displayImages = images.length > 0 ? images : [DEFAULT_IMAGE];

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <>
      <div className="block md:hidden relative h-75 rounded-2xl overflow-hidden">
        <img
          src={displayImages[currentIndex]}
          alt={`${alt} - Imagen ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {displayImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {displayImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentIndex
                      ? "bg-white w-4"
                      : "bg-white/60 hover:bg-white/80"
                  }`}
                  aria-label={`Ir a imagen ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="hidden md:grid grid-cols-4 grid-rows-2 gap-2 h-112.5 rounded-2xl overflow-hidden relative">
        <div
          className="col-span-2 row-span-2 relative group cursor-pointer"
          onClick={() => setShowGallery(true)}
        >
          <img
            src={displayImages[0]}
            alt={`${alt} - Principal`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        </div>

        {displayImages.slice(1, 5).map((image, idx) => (
          <div
            key={idx}
            className="relative group cursor-pointer"
            onClick={() => {
              setCurrentIndex(idx + 1);
              setShowGallery(true);
            }}
          >
            <img
              src={image}
              alt={`${alt} - ${idx + 2}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>
        ))}

        {displayImages.length < 5 &&
          Array.from({ length: 5 - displayImages.length }).map((_, idx) => (
            <div
              key={`placeholder-${idx}`}
              className="bg-gray-100 flex items-center justify-center"
            >
              <span className="text-gray-400 text-sm">Sin imagen</span>
            </div>
          ))}

        <button
          onClick={() => setShowGallery(true)}
          className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:scale-105 transition-transform flex items-center gap-2"
        >
          <Grid className="w-4 h-4" />
          Mostrar todas las fotos
        </button>
      </div>

      {showGallery && (
        <div className="fixed inset-0 z-50 bg-black flex flex-col">
          <div className="flex justify-between items-center p-4">
            <span className="text-white text-sm">
              {currentIndex + 1} / {displayImages.length}
            </span>
            <button
              onClick={() => setShowGallery(false)}
              className="text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              aria-label="Cerrar galería"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center relative px-16">
            <button
              onClick={goToPrevious}
              className="absolute left-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              aria-label="Imagen anterior"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>

            <img
              src={displayImages[currentIndex]}
              alt={`${alt} - Imagen ${currentIndex + 1}`}
              className="max-h-[80vh] max-w-full object-contain"
            />

            <button
              onClick={goToNext}
              className="absolute right-4 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              aria-label="Siguiente imagen"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          <div className="p-4 flex justify-center gap-2 overflow-x-auto">
            {displayImages.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-16 h-16 rounded-lg overflow-hidden shrink-0 transition-all ${
                  idx === currentIndex
                    ? "ring-2 ring-white"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
