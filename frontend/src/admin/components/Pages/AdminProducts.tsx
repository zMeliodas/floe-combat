import { useState } from "react";
import { FaPlus, FaPen, FaTrash, FaSearch, FaImage } from "react-icons/fa";
import nightlotus from "../../../assets/images/products/night-lotus.jpg";
import thevortex from "../../../assets/images/products/the-vortex.jpg";
import type { ProductFormValues } from "../../../types/admintypes";
import type { Project } from "../../../types/types";
import ProductFormModal from "../../components/common/ProductFormModal";
import DeleteConfirmModal from "../common/DeleteConfirmModal";
import ImagePreviewModal from "../../components/common/ImagePreviewModal";

// NOTE: UI only for now — everything lives in local state. Once this is
// wired to a real data source, `products` here should become the single
// source of truth that Products.tsx (the public page) also reads from.

const categories = ["SHORT SLEEVE", "LONG SLEEVE", "SPATS", "FULL SET"];
const sizeOptions = ["XS", "S", "M", "L", "XL", "2XL", "3XL", "4XL", "5XL", "6XL"];

const initialProducts: Project[] = [
  {
    id: 1,
    title: "Night Lotus",
    category: "SHORT SLEEVE",
    description:
      "In the heat of the exchange, let the chaos fade. The Night Lotus set is crafted for the fighters who finds strength in composure and power in the quiet moments of the roll.",
    image: nightlotus,
    sizes: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: 2,
    title: "The Vortex",
    category: "SHORT SLEEVE",
    description:
      "In the chaos of the roll, find your focus. The Vortex rashguard is designed for practitioners who prioritize movement and technical precision.",
    image: thevortex,
    sizes: ["XS", "S", "M", "L", "XL", "6XL"],
  },
];

const AdminProducts = () => {
  const [products, setProducts] = useState<Project[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Project | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [previewProduct, setPreviewProduct] = useState<Project | null>(null);

  const filtered = products.filter((p) => {
    const matchesSearch = p.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "ALL" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const openAddForm = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (product: Project) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const handleFormSubmit = (values: ProductFormValues) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                title: values.title,
                category: values.category,
                description: values.description,
                image: values.image || p.image,
                sizes: values.sizes,
              }
            : p
        )
      );
    } else {
      const newProduct: Project = {
        id: Date.now(),
        title: values.title,
        category: values.category,
        description: values.description,
        image: values.image,
        sizes: values.sizes,
      };
      setProducts((prev) => [newProduct, ...prev]);
    }

    closeForm();
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setProducts((prev) => prev.filter((p) => p.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <FaSearch
            size={12}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-descText2"
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-white/2 border border-borderColor pl-9 pr-3 py-2.5 font-montserrat text-xs text-white placeholder:text-descText2 focus:outline-none focus:border-floesky/40"
          />
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="bg-white/2 border border-borderColor px-3 py-2.5 font-montserrat text-xs text-descText2 focus:outline-none focus:border-floesky/40"
        >
          <option value="ALL" className="bg-black ">
            ALL
          </option>
          {categories.map((c) => (
            <option key={c} value={c} className="bg-black">
              {c}
            </option>
          ))}
        </select>

        <button
          onClick={openAddForm}
          className="sm:ml-auto flex items-center justify-center gap-2 bg-floesky text-black font-montserrat font-bold text-xs px-4 py-2.5 tracking-wider rounded-sm hover:opacity-90 transition"
        >
          <FaPlus size={10} />
          ADD PRODUCT
        </button>
      </div>

      {/* TABLE */}
      <div className="border border-borderColor bg-white/2 overflow-hidden">
        <div className="hidden sm:grid grid-cols-[64px_1.5fr_1fr_1fr_auto] gap-4 px-5 py-3 border-b border-borderColor font-montserrat text-[11px] tracking-[2px] text-descText">
          <span></span>
          <span>PRODUCT</span>
          <span>CATEGORY</span>
          <span>SIZES</span>
          <span className="text-right">ACTIONS</span>
        </div>

        {filtered.length > 0 ? (
          <div className="flex flex-col divide-y divide-white/5">
            {filtered.map((product) => (
              <div
                key={product.id}
                className="grid grid-cols-[64px_1fr_auto] sm:grid-cols-[64px_1.5fr_1fr_1fr_auto] gap-4 px-5 py-3 items-center"
              >
                <button
                  type="button"
                  onClick={() => product.image && setPreviewProduct(product)}
                  disabled={!product.image}
                  aria-label={`Preview ${product.title} image`}
                  className="w-12 h-12 rounded-sm overflow-hidden bg-white/5 shrink-0 disabled:cursor-default enabled:cursor-zoom-in enabled:hover:ring-2 enabled:hover:ring-floesky/60 transition"
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/15">
                      <FaImage size={14} />
                    </div>
                  )}
                </button>

                <div className="min-w-0 flex flex-col gap-0.5">
                  <span className="font-montserrat text-sm font-bold text-white truncate">
                    {product.title}
                  </span>
                  <span className="font-montserrat text-xs text-descText2 truncate sm:hidden">
                    {product.category}
                  </span>
                  <p className="hidden sm:block font-montserrat text-xs text-descText2 truncate max-w-xs">
                    {product.description}
                  </p>
                </div>

                <span className="hidden sm:inline font-montserrat text-[11px] tracking-wider text-floesky">
                  {product.category}
                </span>

                <div className="hidden sm:flex flex-wrap gap-1">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="text-[10px] px-1.5 py-0.5 border border-borderColor text-descText2"
                    >
                      {size}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditForm(product)}
                    aria-label={`Edit ${product.title}`}
                    className="w-8 h-8 flex items-center justify-center rounded-sm text-descText2 hover:text-floesky hover:bg-white/5 transition"
                  >
                    <FaPen size={12} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(product)}
                    aria-label={`Delete ${product.title}`}
                    className="w-8 h-8 flex items-center justify-center rounded-sm text-descText2 hover:text-red-400 hover:bg-white/5 transition"
                  >
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-16">
            <span className="text-white/10 font-archivo text-5xl font-bold">
              0
            </span>
            <p className="text-white/25 font-montserrat text-xs font-bold tracking-widest">
              NO PRODUCTS FOUND
            </p>
          </div>
        )}
      </div>

      <ProductFormModal
        isOpen={isFormOpen}
        editingProduct={editingProduct}
        categories={categories}
        sizeOptions={sizeOptions}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
      />

      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        title="DELETE PRODUCT"
        itemName={deleteTarget?.title ?? ""}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      <ImagePreviewModal
        isOpen={previewProduct !== null}
        imageUrl={previewProduct?.image ?? ""}
        title={previewProduct?.title}
        onClose={() => setPreviewProduct(null)}
      />
    </div>
  );
};

export default AdminProducts;