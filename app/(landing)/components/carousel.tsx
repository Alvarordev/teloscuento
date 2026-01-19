"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";

interface CarouselProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  onPrevious?: () => void;
  onNext?: () => void;
}

export function Carousel({ children, title, subtitle, onPrevious, onNext }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }

    if (direction === "left" && onPrevious) {
      onPrevious();
    } else if (direction === "right" && onNext) {
      onNext();
    }
  };

  return (
    <>
      <div className="flex justify-between items-end mb-10">
        <div>
          {title && (
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-2">
              {title}
            </h2>
          )}
          {subtitle && <p className="text-gray-500">{subtitle}</p>}
        </div>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => handleScroll("left")}
            className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors"
            aria-label="Anterior"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-colors"
            aria-label="Siguiente"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div
        ref={carouselRef}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4 md:mx-0 md:px-0"
        style={{
          scrollbarWidth: "none",
        }}
      >
        {children}
      </div>
    </>
  );
}
