import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import type { HighlightImagePreviewModalProps } from "../../../types/adminprops";

const HighlightImagePreviewModal = ({
  isOpen,
  imageUrl,
  title,
  onClose,
}: HighlightImagePreviewModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && imageUrl && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close image preview"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center bg-black/70 text-white transition hover:text-floesky"
            >
              <FaTimes size={15} />
            </button>

            <img
              src={imageUrl}
              alt={title ?? "Highlight"}
              className="max-h-[85vh] w-full object-contain"
            />

            {title && (
              <p className="mt-3 text-center font-montserrat text-xs font-bold tracking-wider text-white/60">
                {title}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HighlightImagePreviewModal;