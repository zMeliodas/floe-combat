import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface VideoPreviewModalProps {
  isOpen: boolean;
  videoUrl: string;
  title?: string;
  onClose: () => void;
}

const VideoPreviewModal = ({
  isOpen,
  videoUrl,
  title,
  onClose,
}: VideoPreviewModalProps) => {
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
            className="flex flex-col items-center gap-3 max-w-4xl w-full"
          >
            <video
              controls
              autoPlay
              disablePictureInPicture
              className="w-full max-h-[80vh] border border-white/10 bg-black"
            >
              <source src={videoUrl} />
              Your browser does not support video playback.
            </video>

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

export default VideoPreviewModal;
