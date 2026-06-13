import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import FilterButton from "../common/FilterButton";
import nightlotus from "../../assets/projects/night-lotus.jpg";
import thevortex from "../../assets/projects/the-vortex.jpg";
import type { Project } from "../../types/types";

const categories = ["ALL", "SHORT SLEEVE", "LONG SLEEVE", "SPATS", "FULL SET"];

const projects: Project[] = [
  {
    id: 1,
    title: "Night Lotus",
    category: "SHORT SLEEVE",
    description:
      "In the heat of the exchange, let the chaos fade. The Night Lotus set is crafted for the fighters who finds strength in composure and power in the quiet moments of the roll. Featuring an ergonomic compression fit and extended torso length to prevent ride up during live training.",
    image: nightlotus,
  },
  {
    id: 2,
    title: "The Vortex",
    category: "SHORT SLEEVE",
    description:
      "In the chaos of the roll, find your focus. The Vortex rashguard is designed for practitioners who prioritize movement and technical precision.",
    image: thevortex,
  },
];

const Products = () => {
  const [active, setActive] = useState("ALL");
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const filtered =
    active === "ALL" ? projects : projects.filter((p) => p.category === active);

  return (
    <main className="min-h-screen bg-black">
      <div className="min-h-screen flex flex-col items-center pt-24 px-10 text-white border-b border-borderColor">
        <div className="flex flex-col max-w-7xl w-full py-20 gap-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-floesky font-montserrat text-sm font-bold tracking-widest"
          >
            THE DESIGN DOSSIER
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-6xl md:text-[10rem] font-archivo tracking-tighter leading-none"
          >
            PRODUCTS
          </motion.h1>
        </div>

        <div className="flex gap-4 py-8 max-w-7xl w-full border-y border-borderColor flex-wrap">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 max-w-7xl w-full pb-20">
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
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 flex flex-col gap-2">
                  <span className="text-floesky font-montserrat text-xs font-bold tracking-widest">
                    {project.category}
                  </span>
                  <h3 className="font-archivo text-2xl font-bold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-white/60 font-montserrat text-sm leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 gap-2">
            <span className="text-white/10 font-archivo text-7xl font-bold">
              0
            </span>
            <p className="text-white/40 font-montserrat text-sm font-bold tracking-widest">
              NO PROJECTS YET
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
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 overflow-y-auto custom-scroll"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-w-3xl w-full my-auto bg-black border border-borderColor overflow-hidden"
              >
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/60 text-white hover:text-floesky transition duration-300"
                >
                  <FaTimes className="w-4 h-4" />
                </button>

                <div className="w-full">
                  <img
                    src={selected.image}
                    alt={selected.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex flex-col gap-2 p-8">
                  <span className="text-floesky font-montserrat text-xs font-bold tracking-widest">
                    {selected.category}
                  </span>
                  <h3 className="font-archivo text-3xl font-bold tracking-tight">
                    {selected.title}
                  </h3>
                  <p className="text-white/60 font-montserrat text-sm leading-relaxed">
                    {selected.description}
                  </p>
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
