import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { PaginationProps } from "../../types/props";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>
      {/* Previous arrow */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className="
          absolute
          -left-14
          lg:-left-20
          top-1/2
          -translate-y-1/2
          flex
          items-center
          justify-center
          w-12 h-12
          text-3xl
          text-floesky
          transition
          hover:scale-110
          disabled:opacity-30
          disabled:cursor-not-allowed
        "
      >
        <FaChevronLeft />
      </button>

      {/* Next arrow */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className="
          absolute
          -right-14
          lg:-right-20
          top-1/2
          -translate-y-1/2
          flex
          items-center
          justify-center
          w-12 h-12
          text-3xl
          text-floesky
          transition
          hover:scale-110
          disabled:opacity-30
          disabled:cursor-not-allowed
        "
      >
        <FaChevronRight />
      </button>

      {/* Page dots */}
      <div
        className="
          absolute
          top-full
          left-1/2
          -translate-x-1/2
          mt-6
          flex
          items-center
          justify-center
          gap-3
        "
      >
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          const isActive = currentPage === page;

          return (
            <motion.button
              key={page}
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              animate={{
                opacity: isActive ? 1 : 0.4,
              }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              className={`w-2.5 h-2.5 rounded-full ${
                isActive ? "bg-floesky" : "bg-white"
              }`}
            />
          );
        })}
      </div>
    </>
  );
};

export default Pagination;
