import { motion, AnimatePresence } from "framer-motion";
import type { DeleteConfirmModalProps } from "../../../types/adminprops";
import { FaSpinner } from "react-icons/fa";

const DeleteConfirmModal = ({
  isOpen,
  title = "DELETE ITEM",
  itemName,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-3 sm:p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="flex w-full max-w-sm flex-col gap-4 border border-white/10 bg-black p-4 sm:p-6"
          >
            <h2 className="font-montserrat text-sm font-bold tracking-[2px] text-white">
              {title}
            </h2>
            <p className="font-montserrat text-xs text-white/40 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="text-white">"{itemName}"</span>? This can't be
              undone.
            </p>

            <div className="flex items-center justify-end gap-1.5 pt-2 sm:gap-3">
              <button
                onClick={onClose}
                className="font-montserrat text-xs tracking-wider text-white/40 hover:text-white px-4 py-2.5 transition"
              >
                CANCEL
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={isDeleting}
                className="flex items-center justify-center gap-2 bg-red-500/90 text-white font-montserrat font-bold text-xs px-5 py-2.5 tracking-wider rounded-sm hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isDeleting && <FaSpinner size={12} className="animate-spin" />}

                {isDeleting ? "DELETING..." : "DELETE"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
