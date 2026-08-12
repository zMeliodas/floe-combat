import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import type { ImagePreviewModalProps } from "../../../types/adminprops";

const ImagePreviewModal = ({
  isOpen,
  imageUrl,
  title,
  onClose,
}: ImagePreviewModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 w-9 h-9 flex items-center justify-center text-white/60 hover:text-white transition"
          >
            <FaTimes size={18} />
          </button>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="flex flex-col items-center gap-3 max-w-3xl w-full"
          >
            <img
              src={imageUrl}
              alt={title ?? "Preview"}
              className="w-full max-h-[80vh] object-contain rounded-sm border border-white/10"
            />
            {title && (
              <span className="font-montserrat text-xs tracking-wider text-white/50">
                {title}
              </span>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImagePreviewModal;