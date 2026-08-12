import { AnimatePresence, motion } from "framer-motion";
import { FaStar, FaRegStar, FaTimes } from "react-icons/fa";
import type { ReviewProps } from "../../types/props";

const ReviewModal = ({
  isOpen,
  onClose,
  form,
  setForm,
  productOptions,
  onSubmit,
}: ReviewProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="
            fixed inset-0 z-50
            bg-black/70
            backdrop-blur-xs
            flex items-center justify-center
            p-4
          "
        >
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="
              relative
              w-full
              max-w-lg
              bg-black
              border border-borderColor
              p-6
              flex flex-col gap-4
            "
          >
            <button
              onClick={onClose}
              className="
                absolute top-3 right-3
                text-white
                hover:text-floesky
                transition
              "
            >
              <FaTimes />
            </button>

            <h2 className="text-white font-archivo text-2xl">Submit Review</h2>

            <input
              placeholder="Your Name"
              value={form.author}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  author: e.target.value,
                }))
              }
              className="
                bg-transparent
                border border-borderColor
                p-2
                text-white
                text-sm
              "
            />

            <input
              placeholder="Your Role"
              value={form.role}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  role: e.target.value,
                }))
              }
              className="
                bg-transparent
                border border-borderColor
                p-2
                text-white
                text-sm
              "
            />

            <select
              value={form.design}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  design: e.target.value,
                }))
              }
              className="
                bg-black
                border border-borderColor
                p-2
                text-white
                text-sm
              "
            >
              {productOptions.map((product) => (
                <option key={product} value={product}>
                  {product}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60">Rating:</span>

              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      rating: n,
                    }))
                  }
                >
                  {n <= form.rating ? (
                    <FaStar className="text-floesky" />
                  ) : (
                    <FaRegStar className="text-floesky" />
                  )}
                </button>
              ))}
            </div>

            <textarea
              placeholder="Your review..."
              value={form.text}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  text: e.target.value,
                }))
              }
              className="
                bg-transparent
                border border-borderColor
                p-2
                text-white
                text-sm
                min-h-32
              "
            />

            <button
              onClick={onSubmit}
              className="
                bg-floesky
                text-black
                font-bold
                py-2
                text-sm
                hover:opacity-90
                transition
              "
            >
              SUBMIT
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewModal;
