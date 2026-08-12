import { motion, AnimatePresence } from "framer-motion";
import type { DeleteConfirmModalProps } from "../../../types/adminprops";

const DeleteConfirmModal = ({
  isOpen,
  title = "DELETE ITEM",
  itemName,
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
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm bg-black border border-white/10 p-6 flex flex-col gap-4"
          >
            <h2 className="font-montserrat text-sm font-bold tracking-[2px] text-white">
              {title}
            </h2>
            <p className="font-montserrat text-xs text-white/40 leading-relaxed">
              Are you sure you want to delete{" "}
              <span className="text-white">"{itemName}"</span>? This can't be
              undone.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={onClose}
                className="font-montserrat text-xs tracking-wider text-white/40 hover:text-white px-4 py-2.5 transition"
              >
                CANCEL
              </button>
              <button
                onClick={onConfirm}
                className="bg-red-500/90 text-white font-montserrat font-bold text-xs px-5 py-2.5 tracking-wider rounded-sm hover:opacity-90 transition"
              >
                DELETE
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;