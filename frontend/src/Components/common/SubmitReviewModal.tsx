import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaRegStar, FaStar, FaTimes } from "react-icons/fa";
import type {
  SubmitReviewFormValues,
  SubmitReviewModalProps,
} from "../../types/props";

const SubmitReviewModal = ({
  isOpen,
  products,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: SubmitReviewModalProps) => {
  const [form, setForm] = useState<SubmitReviewFormValues>({
    author: "",
    role: "",
    product_id: null,
    product_name: "",
    rating: 5,
    review_text: "",
  });

  useEffect(() => {
    if (!isOpen) return;

    const firstProduct = products[0];

    setForm({
      author: "",
      role: "",
      product_id: firstProduct?.id ?? null,
      product_name: firstProduct?.title ?? "",
      rating: 5,
      review_text: "",
    });
  }, [isOpen, products]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!form.author.trim() || !form.review_text.trim() || !form.product_name) {
      return;
    }

    onSubmit(form);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <motion.form
            initial={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.9,
              y: 30,
            }}
            transition={{
              duration: 0.25,
              ease: "easeOut",
            }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="relative flex w-full max-w-lg flex-col gap-4 border border-borderColor bg-black p-6"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="absolute top-3 right-3 text-white hover:text-floesky"
            >
              <FaTimes />
            </button>

            <h2 className="font-archivo text-2xl font-bold text-white">
              Submit Review
            </h2>

            <input
              required
              placeholder="Your Name"
              value={form.author}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  author: e.target.value,
                }))
              }
              className="border border-borderColor bg-transparent p-2 text-sm text-white"
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
              className="border border-borderColor bg-transparent p-2 text-sm text-white"
            />

            <select
              value={form.product_id ?? ""}
              onChange={(e) => {
                const selectedProduct = products.find(
                  (product) => String(product.id) === e.target.value,
                );

                if (!selectedProduct) return;

                setForm((prev) => ({
                  ...prev,
                  product_id: Number(selectedProduct.id),
                  product_name: selectedProduct.title,
                }));
              }}
              className="border border-borderColor bg-black p-2 text-sm text-white"
            >
              {products.map((product) => (
                <option key={product.id} value={String(product.id)}>
                  {product.title}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60">Rating:</span>

              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  type="button"
                  key={rating}
                  onClick={() =>
                    setForm((prev) => ({
                      ...prev,
                      rating,
                    }))
                  }
                >
                  {rating <= form.rating ? (
                    <FaStar className="text-floesky" />
                  ) : (
                    <FaRegStar className="text-floesky" />
                  )}
                </button>
              ))}
            </div>

            <textarea
              required
              placeholder="Your review..."
              value={form.review_text}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  review_text: e.target.value,
                }))
              }
              className="min-h-30 border border-borderColor bg-transparent p-2 text-sm text-white"
            />

            {error && (
              <div className="border border-red-500/20 bg-red-500/10 px-4 py-3">
                <p className="font-montserrat text-[11px] text-red-400">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={
                isSubmitting ||
                !form.author.trim() ||
                !form.review_text.trim() ||
                !form.product_name
              }
              className="bg-floesky py-2 text-sm font-bold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-30"
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
            </button>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubmitReviewModal;
