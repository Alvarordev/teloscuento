/* eslint-disable @next/next/no-img-element */
"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useRef, useState } from "react";

interface CarouselProps {
  children: React.ReactNode;
}

function Carousel({ children }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => handleScroll("left")}
        className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-lg border border-gray-200 bg-white items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-md"
        aria-label="Anterior"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button
        onClick={() => handleScroll("right")}
        className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-lg border border-gray-200 bg-white items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors shadow-md"
        aria-label="Siguiente"
      >
        <ArrowRight className="w-5 h-5" />
      </button>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-3 pb-2 lg:pb-6 -mx-4 px-4 md:mx-0 md:px-0"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {children}
      </div>
    </div>
  );
}

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2574&auto=format&fit=crop";

export function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const displayImages = images.length > 0 ? images : [DEFAULT_IMAGE];
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1,
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1,
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      goToNext();
    } else if (distance < -minSwipeDistance) {
      goToPrevious();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <>
      <Carousel>
        {displayImages.map((image, idx) => (
          <div
            key={idx}
            className="snap-center shrink-0 w-[85%] md:w-[320px] lg:w-95 cursor-pointer"
            onClick={() => openModal(idx)}
          >
            <img
              src={image}
              alt={`${alt} - Imagen ${idx + 1}`}
              className="w-full aspect-4/3 object-cover rounded-xl hover:opacity-90 transition-opacity"
            />
          </div>
        ))}
      </Carousel>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setShowModal(false)}
          />

          <button
            onClick={() => setShowModal(false)}
            className="hidden md:block absolute top-4 right-4 z-50 text-white hover:bg-white/10 p-2 rounded-full transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={goToPrevious}
            className="hidden md:flex absolute left-4 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full items-center justify-center transition-colors"
            aria-label="Anterior"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={goToNext}
            className="hidden md:flex absolute right-4 z-50 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full items-center justify-center transition-colors"
            aria-label="Siguiente"
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>

          <div 
            className="relative z-40 max-w-6xl max-h-[90vh] px-4 md:px-16 w-full"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={displayImages[currentIndex]}
              alt={`${alt} - Imagen ${currentIndex + 1}`}
              className="w-full max-h-[90vh] object-cover"
            />
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 text-white text-sm">
            {currentIndex + 1} / {displayImages.length}
          </div>
        </div>
      )}
    </>
  );
}
