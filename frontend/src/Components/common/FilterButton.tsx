// components/Sections/FilterButton.tsx
import { motion } from "framer-motion";
import type { FilterButtonProps } from "../../types/types";

const FilterButton = ({
  label,
  isActive,
  onClick,
  delay = 0,
}: FilterButtonProps) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`border font-montserrat font-bold text-xs px-5 py-2 cursor-pointer transition duration-300 ${
        isActive
          ? "border-floesky text-black bg-floesky"
          : "border-borderColor text-white/60 hover:text-floesky hover:border-floesky"
      }`}
    >
      {label}
    </motion.button>
  );
};

export default FilterButton;
