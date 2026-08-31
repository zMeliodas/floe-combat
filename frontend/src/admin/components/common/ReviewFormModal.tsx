import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaTimes, FaStar, FaRegStar, FaSpinner } from "react-icons/fa";
import type { ReviewFormValues } from "../../../types/admintypes";
import type { ReviewFormModalProps } from "../../../types/adminprops";

const emptyForm: ReviewFormValues = {
  author: "",
  role: "",
  product_id: null,
  product_name: "",
  rating: 5,
  review_text: "",
  featured: false,
};

const ReviewFormModal = ({
  isOpen,
  editingReview,
  products,
  isSubmitting,
  error,
  onClose,
  onSubmit,
}: ReviewFormModalProps) => {
  const [form, setForm] = useState<ReviewFormValues>(emptyForm);

  useEffect(() => {
    if (!isOpen) return;

    if (editingReview) {
      setForm({
        author: editingReview.author,
        role: editingReview.role,
        product_id: editingReview.product_id,
        product_name: editingReview.product_name,
        rating: editingReview.rating,
        review_text: editingReview.review_text,
        featured: editingReview.featured,
      });
    } else {
      const firstProduct = products[0];

      setForm({
        ...emptyForm,
        product_id: firstProduct?.id ?? null,
        product_name: firstProduct?.title ?? "",
      });
    }
  }, [isOpen, editingReview, products]);

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!form.author.trim() || !form.review_text.trim() || !form.product_name) {
      return;
    }

    onSubmit(form);
  };

  const isEditing = editingReview !== null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto"
        >
          <motion.form
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="relative w-full max-w-lg my-auto bg-black border border-white/10 flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-4 sm:px-6 border-b border-white/5">
              <h2 className="font-montserrat text-sm font-bold tracking-[2px] text-white">
                {isEditing ? "EDIT REVIEW" : "ADD REVIEW"}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="w-8 h-8 flex items-center justify-center text-white/40 hover:text-white transition"
              >
                <FaTimes size={14} />
              </button>
            </div>

            <div className="custom-scroll flex flex-col gap-4 px-4 py-5 sm:px-6 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label className="font-montserrat text-[11px] tracking-wider text-white/40">
                    AUTHOR
                  </label>
                  <input
                    required
                    value={form.author}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, author: e.target.value }))
                    }
                    placeholder="e.g. Coach Ronnie DC"
                    className="bg-white/2 border border-white/10 px-3 py-2.5 font-montserrat text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-floesky/40"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-montserrat text-[11px] tracking-wider text-white/40">
                    ROLE
                  </label>
                  <input
                    value={form.role}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, role: e.target.value }))
                    }
                    placeholder="e.g. BJJ Purple Belt"
                    className="bg-white/2 border border-white/10 px-3 py-2.5 font-montserrat text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-floesky/40"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-montserrat text-[11px] tracking-wider text-white/40">
                  PRODUCT
                </label>

                <select
                  value={form.product_id ?? ""}
                  onChange={(e) => {
                    const productId = Number(e.target.value);

                    const selectedProduct = products.find(
                      (product) => product.id === productId,
                    );

                    setForm((prev) => ({
                      ...prev,
                      product_id: selectedProduct?.id ?? null,
                      product_name: selectedProduct?.title ?? "",
                    }));
                  }}
                  className="bg-white/2 border border-white/10 px-3 py-2.5 font-montserrat text-sm text-white/80 focus:outline-none focus:border-floesky/40"
                >
                  {products.map((product) => (
                    <option
                      key={product.id}
                      value={product.id}
                      className="bg-black"
                    >
                      {product.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-montserrat text-[11px] tracking-wider text-white/40">
                  RATING
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      type="button"
                      key={n}
                      onClick={() => setForm((f) => ({ ...f, rating: n }))}
                      aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    >
                      {n <= form.rating ? (
                        <FaStar className="text-floesky" size={18} />
                      ) : (
                        <FaRegStar className="text-white/20" size={18} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-montserrat text-[11px] tracking-wider text-white/40">
                  REVIEW TEXT
                </label>
                <textarea
                  required
                  value={form.review_text}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      review_text: e.target.value,
                    }))
                  }
                  rows={4}
                  placeholder="What did they say?"
                  className="bg-white/2 border border-white/10 px-3 py-2.5 font-montserrat text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-floesky/40 resize-none"
                />
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer select-none w-fit">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, featured: e.target.checked }))
                  }
                  className="w-4 h-4 accent-floesky"
                />
                <span className="font-montserrat text-xs text-white/60">
                  Feature this review
                </span>
              </label>
            </div>

            {error && (
              <div className="mx-4 mb-4 border border-red-500/20 bg-red-500/10 px-4 py-3 sm:mx-6">
                <p className="font-montserrat text-[11px] leading-relaxed text-red-400">
                  {error}
                </p>
              </div>
            )}

            <div className="flex items-center justify-end gap-1.5 px-4 py-4 sm:gap-3 sm:px-6 border-t border-white/5">
              <button
                type="button"
                onClick={onClose}
                className="font-montserrat text-xs tracking-wider text-white/40 hover:text-white px-4 py-2.5 transition"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !form.author.trim() ||
                  !form.review_text.trim() ||
                  !form.product_name
                }
                className="flex items-center justify-center gap-2 bg-floesky text-black font-montserrat font-bold text-xs px-5 py-2.5 tracking-wider rounded-sm hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isSubmitting && (
                  <FaSpinner size={12} className="animate-spin" />
                )}

                {isSubmitting
                  ? isEditing
                    ? "SAVING..."
                    : "ADDING..."
                  : isEditing
                    ? "SAVE CHANGES"
                    : "ADD REVIEW"}
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ReviewFormModal;
