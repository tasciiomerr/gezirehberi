"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { PlaceImage } from "@/lib/types";

interface GalleryProps {
  images: PlaceImage[];
  fallbackSeed: string;
}

export default function Gallery({ images, fallbackSeed }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const displayImages: PlaceImage[] =
    images.length > 0
      ? images
      : [{ url: "", alt: fallbackSeed, caption: undefined }];

  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {displayImages.slice(0, 4).map((img, idx) => (
          <motion.button
            key={idx}
            onClick={() => setLightboxIndex(idx)}
            whileHover={{ scale: 1.03 }}
            className={idx === 0 ? "col-span-2 row-span-2 sm:col-span-2 sm:row-span-2" : ""}
          >
            <PlaceholderImage
              seed={`${fallbackSeed}-${idx}`}
              label={img.caption || img.alt}
              aspect={idx === 0 ? "square" : "square"}
              iconSize={idx === 0 ? 40 : 24}
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
          >
            <button
              onClick={() => setLightboxIndex(null)}
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
                  className="absolute left-4 text-paper hover:text-safran"
                >
                  <ChevronLeft size={36} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxIndex((lightboxIndex + 1) % displayImages.length);
                  }}
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
