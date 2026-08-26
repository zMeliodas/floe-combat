import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import FilterButton from "../common/FilterButton";
import type { Product } from "../../types/types";
import { getProducts } from "../../services/products.service";

const categories = ["ALL", "SHORT SLEEVE", "LONG SLEEVE", "SPATS", "FULL SET"];

const Products = () => {
  const [active, setActive] = useState("ALL");
  const [selected, setSelected] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        setFetchError("");

        const data = await getProducts();

        setProducts(data);
      } catch (error) {
        setFetchError(
          error instanceof Error ? error.message : "Could not fetch products.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const filtered =
    active === "ALL"
      ? products
      : products.filter((product) => product.category === active);

  return (
    <main className="min-h-screen bg-black">
      <div className="min-h-screen flex flex-col items-center pt-20 sm:pt-24 px-6 sm:px-10 text-white border-b border-borderColor">
        <div className="flex flex-col max-w-7xl w-full py-10 sm:py-16 lg:py-20 gap-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-floesky font-montserrat text-xs sm:text-sm font-bold tracking-widest"
          >
            THE DESIGN DOSSIER
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-archivo tracking-tighter leading-none"
          >
            PRODUCTS
          </motion.h1>
        </div>

        <div className="flex gap-2 sm:gap-4 py-6 sm:py-8 max-w-7xl w-full border-y border-borderColor flex-wrap">
          {categories.map((cat, i) => (
            <FilterButton
              key={cat}
              label={cat}
              isActive={active === cat}
              onClick={() => setActive(cat)}
              delay={0.1 * i}
            />
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 max-w-7xl w-full pb-16 sm:pb-20">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                onClick={() => setSelected(project)}
                className="group relative aspect-4/5 overflow-hidden cursor-pointer"
              >
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 flex flex-col gap-1.5 sm:gap-2">
                  <span className="text-floesky font-montserrat text-xs font-bold tracking-widest">
                    {project.category}
                  </span>

                  <h3 className="font-archivo text-xl sm:text-2xl font-bold tracking-tight">
                    {project.title}
                  </h3>

                  <p className="text-descText font-montserrat text-xs sm:text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1 mt-2">
                    {project.sizes.map((size) => (
                      <span
                        key={size}
                        className="text-[10px] px-2 py-0.5 border border-white/20 text-white/70"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 gap-2 py-20">
            <span className="text-semitrans font-archivo text-5xl sm:text-7xl font-bold">
              0
            </span>
            <p className="text-descText2 font-montserrat text-sm font-bold tracking-widest">
              NO PRODUCTS YET
            </p>
          </div>
        )}

        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-sm sm:max-w-xl lg:max-w-3xl w-full my-auto bg-black border border-borderColor overflow-hidden"
              >
                <button
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-black/40 rounded-full text-white hover:text-floesky transition duration-300"
                >
                  <FaTimes className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <img
                  src={selected.image_url}
                  alt={selected.title}
                  className="w-full h-full object-contain"
                />

                <div className="flex flex-col gap-4 p-5 sm:p-8">
                  <span className="text-floesky font-montserrat text-xs font-bold tracking-widest">
                    {selected.category}
                  </span>

                  <h3 className="font-archivo text-2xl sm:text-3xl font-bold tracking-tight">
                    {selected.title}
                  </h3>

                  <p className="text-descText font-montserrat text-xs sm:text-sm leading-relaxed">
                    {selected.description}
                  </p>

                  <div className="flex flex-col gap-2 pt-2">
                    <span className="text-white/60 text-xs tracking-widest">
                      AVAILABLE SIZES
                    </span>

                    <div className="flex flex-wrap gap-2">
                      {selected.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-3 py-1 border border-white/20 text-white text-xs"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default Products;
