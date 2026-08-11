"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { PlaceImage } from "@/lib/types";

interface GalleryProps {
  images: PlaceImage[];
  fallbackSeed: string;
  // Bug: PlaceholderImage never received this, so every city's gallery
  // thumbnail silently fell back to PlaceholderImage's "marmara" default —
  // category (historical/nature/beach) could be right while the region-
  // specific stock photo pool was wrong (e.g. an Ege city showing a
  // Sultanahmet mosque photo instead of an Ege one).
  regionSlug?: string;
}

export default function Gallery({ images, fallbackSeed, regionSlug }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayImages: PlaceImage[] =
    images.length > 0
      ? images
      : [{ url: "", alt: fallbackSeed, caption: undefined }];

  // Report items 255-267 — keyboard accessibility: Escape closes the
  // lightbox, Left/Right arrows navigate it (native carousel behavior).
  useEffect(() => {
    if (lightboxIndex === null) return;
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIndex(null);
      else if (e.key === "ArrowLeft") {
        setLightboxIndex((i) => (i === null ? i : (i - 1 + displayImages.length) % displayImages.length));
      } else if (e.key === "ArrowRight") {
        setLightboxIndex((i) => (i === null ? i : (i + 1) % displayImages.length));
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, displayImages.length]);

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {displayImages.slice(0, 4).map((img, idx) => (
          <motion.button
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            whileHover={{ scale: 1.03 }}
            aria-label={img.caption || img.alt || `Image ${idx + 1}`}
            className={idx === 0 ? "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2" : ""}
          >
            <PlaceholderImage
              seed={`${fallbackSeed}-${idx}`}
              label={img.caption || img.alt}
              aspect={idx === 0 ? "square" : "square"}
              iconSize={idx === 0 ? 40 : 24}
              regionSlug={regionSlug}
            />
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4"
            onClick={() => setLightboxIndex(null)}
            role="dialog"
            aria-modal="true"
            aria-label={displayImages[lightboxIndex].caption || displayImages[lightboxIndex].alt || "Image viewer"}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              aria-label="Close"
              className="absolute right-6 top-6 text-paper hover:text-safran"
            >
              <X size={28} />
            </button>

            {displayImages.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((lightboxIndex - 1 + displayImages.length) % displayImages.length);
                  }}
                  aria-label="Previous image"
                  className="absolute left-4 text-paper hover:text-safran"
                >
                  <ChevronLeft size={36} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((lightboxIndex + 1) % displayImages.length);
                  }}
                  aria-label="Next image"
                  className="absolute right-4 text-paper hover:text-safran"
                >
                  <ChevronRight size={36} />
                </button>
              </>
            )}

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <PlaceholderImage
                seed={`${fallbackSeed}-${lightboxIndex}`}
                label={displayImages[lightboxIndex].caption || displayImages[lightboxIndex].alt}
                aspect="video"
                iconSize={64}
                regionSlug={regionSlug}
              />
              <p className="mt-3 text-center text-sm text-paper/70">
                {lightboxIndex + 1} / {displayImages.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
