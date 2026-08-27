import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
} from "react-icons/fa";

import type { ImagePreviewModalProps } from "../../../types/adminprops";

const ImagePreviewModal = ({
  isOpen,
  images,
  title,
  onClose,
}: ImagePreviewModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      const primaryIndex = images.findIndex(
        (image) => image.is_primary,
      );

      setCurrentIndex(primaryIndex >= 0 ? primaryIndex : 0);
    }
  }, [isOpen, images]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) =>
          prev === 0 ? images.length - 1 : prev - 1,
        );
      }

      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) =>
          prev === images.length - 1 ? 0 : prev + 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, images.length, onClose]);

  if (images.length === 0) {
    return null;
  }

  const currentImage = images[currentIndex];

  const handlePrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <AnimatePresence>
      {isOpen && currentImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-4xl flex-col gap-3"
          >
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                {title && (
                  <span className="font-montserrat text-sm font-bold text-white">
                    {title}
                  </span>
                )}

                <span className="font-montserrat text-[10px] text-white/40">
                  {currentIndex + 1} / {images.length}
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close image preview"
                className="flex h-9 w-9 items-center justify-center text-white/50 transition hover:text-white"
              >
                <FaTimes size={16} />
              </button>
            </div>

            <div className="relative flex min-h-0 items-center justify-center overflow-hidden border border-borderColor bg-black">
              <motion.img
                key={currentImage.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={currentImage.image_url}
                alt={`${title ?? "Product"} ${currentIndex + 1}`}
                className="max-h-[65vh] w-full object-contain"
              />

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevious}
                    aria-label="Previous image"
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-black/60 text-white transition hover:bg-black hover:text-floesky"
                  >
                    <FaChevronLeft size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next image"
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-black/60 text-white transition hover:bg-black hover:text-floesky"
                  >
                    <FaChevronRight size={14} />
                  </button>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="flex justify-center gap-2 overflow-x-auto py-1">
                {images.map((image, index) => (
                  <button
                    key={image.id}
                    type="button"
                    onClick={() => setCurrentIndex(index)}
                    className={`h-16 w-16 shrink-0 overflow-hidden border transition ${
                      currentIndex === index
                        ? "border-floesky"
                        : "border-borderColor opacity-50 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={image.image_url}
                      alt={`${title ?? "Product"} thumbnail ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImagePreviewModal;