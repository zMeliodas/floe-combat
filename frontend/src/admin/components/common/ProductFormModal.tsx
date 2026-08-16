import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaTimes, FaImage, FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import type { ProductFormValues } from "../../../types/admintypes";
import type { ProductFormModalProps } from "../../../types/adminprops";

const emptyForm: ProductFormValues = {
  title: "",
  category: "",
  description: "",
  image: "",
  sizes: [],
};

const ProductFormModal = ({
  isOpen,
  editingProduct,
  categories,
  sizeOptions,
  onClose,
  onSubmit,
}: ProductFormModalProps) => {
  const [form, setForm] = useState<ProductFormValues>(emptyForm);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Tracks blob URLs we created locally so we can revoke them and avoid
  // leaking memory. Only object URLs created here get revoked — real
  // (http) URLs from an existing product are left untouched.
  const objectUrlRef = useRef<string | null>(null);

  // Reset/populate the form whenever the modal opens
  useEffect(() => {
    if (!isOpen) return;

    // Discard any unsaved local preview from a previous open
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    if (editingProduct) {
      setForm({
        title: editingProduct.title,
        category: editingProduct.category,
        description: editingProduct.description,
        image: editingProduct.image,
        sizes: editingProduct.sizes,
      });
    } else {
      setForm({ ...emptyForm, category: categories[0] ?? "" });
    }
  }, [isOpen, editingProduct, categories]);

  // Revoke any local preview URL on unmount
  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  // NOTE: this is a dummy upload — it only creates a local preview via
  // URL.createObjectURL. Nothing is sent anywhere. Once the backend exists,
  // swap this for an actual upload call and store the returned URL instead.
  const handleFileSelect = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) return;

    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
    }

    const previewUrl = URL.createObjectURL(file);
    objectUrlRef.current = previewUrl;
    setForm((f) => ({ ...f, image: previewUrl }));
  };

  const handleRemoveImage = () => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setForm((f) => ({ ...f, image: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files?.[0]);
  };

  const toggleSize = (size: string) => {
    setForm((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || form.sizes.length === 0) return;
    onSubmit(form);
  };

  const isEditing = editingProduct !== null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/70 p-3 backdrop-blur-xs sm:p-4"
        >
          <motion.form
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="relative my-auto flex w-full max-w-lg flex-col border border-borderColor bg-black"
          >
            <div className="flex items-center justify-between border-b border-borderColor px-4 py-4 sm:px-6">
              <h2 className="font-montserrat text-sm font-bold tracking-[2px] text-white">
                {isEditing ? "EDIT PRODUCT" : "ADD PRODUCT"}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="w-8 h-8 flex items-center justify-center text-descText hover:text-white transition"
              >
                <FaTimes size={14} />
              </button>
            </div>

            <div className="custom-scroll flex max-h-[70vh] flex-col gap-4 overflow-y-auto px-4 py-5 sm:px-6">
              <div className="flex flex-col gap-1.5">
                <label className="font-montserrat text-[11px] tracking-wider text-descText">
                  TITLE
                </label>
                <input
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="e.g. Night Lotus"
                  className="bg-white/2 border border-borderColor px-3 py-2.5 font-montserrat text-sm text-white placeholder:text-descText2 focus:outline-none focus:border-floesky/40"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-montserrat text-[11px] tracking-wider text-descText">
                  CATEGORY
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  className="bg-white/2 border border-borderColor px-3 py-2.5 font-montserrat text-sm text-white focus:outline-none focus:border-floesky/40"
                >
                  {categories.map((c) => (
                    <option key={c} value={c} className="bg-black">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-montserrat text-[11px] tracking-wider text-descText">
                  DESCRIPTION
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  rows={4}
                  placeholder="Short product description..."
                  className="bg-white/2 border border-borderColor px-3 py-2.5 font-montserrat text-sm text-white placeholder:text-descText2 focus:outline-none focus:border-floesky/40 resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-montserrat text-[11px] tracking-wider text-descText">
                  PRODUCT IMAGE
                </label>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileSelect(e.target.files?.[0])}
                  className="hidden"
                />

                {form.image ? (
                  <div className="relative w-full aspect-video rounded-sm overflow-hidden bg-white/5 border border-borderColor group">
                    <img
                      src={form.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-[11px] font-montserrat px-3 py-1.5 hover:bg-white/20 transition"
                      >
                        <FaCloudUploadAlt size={12} />
                        CHANGE
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white text-[11px] font-montserrat px-3 py-1.5 hover:bg-red-500/60 transition"
                      >
                        <FaTrash size={11} />
                        REMOVE
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDragging(true);
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`w-full aspect-video rounded-sm border border-dashed flex flex-col items-center justify-center gap-2 cursor-pointer transition ${
                      isDragging
                        ? "border-floesky bg-floesky/5"
                        : "border-borderColor bg-white/2 hover:border-floesky"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-descText">
                      <FaImage size={16} />
                    </div>
                    <span className="font-montserrat text-xs text-descText">
                      Click to upload or drag and drop
                    </span>
                    <span className="font-montserrat text-[10px] tracking-wider text-descText2">
                      PNG, JPG UP TO 5MB
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-montserrat text-[11px] tracking-wider text-descText">
                  AVAILABLE SIZES
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((size) => {
                    const active = form.sizes.includes(size);
                    return (
                      <button
                        type="button"
                        key={size}
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1.5 text-xs font-montserrat border transition ${
                          active
                            ? "border-floesky bg-floesky text-black font-bold"
                            : "border-borderColor text-descText hover:border-white/30"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                {form.sizes.length === 0 && (
                  <span className="font-montserrat text-[11px] text-red-400/70">
                    Select at least one size.
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-1.5 border-t border-white/5 px-4 py-4 sm:gap-3 sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="font-montserrat text-xs tracking-wider text-descText hover:text-white px-4 py-2.5 transition"
              >
                CANCEL
              </button>
              <button
                type="submit"
                disabled={!form.title.trim() || form.sizes.length === 0}
                className="bg-floesky text-black font-montserrat font-bold text-xs px-5 py-2.5 tracking-wider rounded-sm hover:opacity-90 transition disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isEditing ? "SAVE CHANGES" : "ADD PRODUCT"}
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProductFormModal;
