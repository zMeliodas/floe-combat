import { motion } from "framer-motion";
import { FiSearch, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { FaStar } from "react-icons/fa";

const reviews = [
  {
    id: 1,
    name: "Coach Ronnie DC",
    product: "THE VORTEX",
    rating: 5,
    review: "First time I wore The Vortex, I didn't want to take it off.",
  },
  {
    id: 2,
    name: "Mark Santos",
    product: "THE VORTEX",
    rating: 5,
    review:
      "Wore this at a regional tournament. Multiple opponents noticed the design.",
  },
  {
    id: 3,
    name: "Carlo Manalo",
    product: "NIGHT LOTUS",
    rating: 4,
    review: "Great design and very comfortable. Would definitely order again.",
  },
];

const AdminReviews = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-4"
    >
      {/* Search + Add Button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex items-center gap-4"
      >
        <div className="relative flex-1">
          <FiSearch
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
          />

          <input
            type="text"
            placeholder="Search reviews..."
            className="
              w-full
              h-11
              pl-11
              pr-4
              bg-white/2
              border border-white/5
              text-white
              font-montserrat
              text-sm
              placeholder:text-white/20
              outline-none
              transition-all
              duration-300
              focus:border-floesky/40
            "
          />
        </div>

        <button
          className="
            h-11
            px-4
            flex items-center gap-2
            bg-floesky
            text-black
            font-montserrat
            font-semibold
            text-sm
            whitespace-nowrap
          "
        >
          <FiPlus size={16} />
          Add Review
        </button>
      </motion.div>

      {/* Reviews List */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="border border-white/5 bg-white/2"
      >
        <div className="px-5 py-4 border-b border-white/5">
          <h2 className="font-montserrat text-xs font-bold tracking-[2px] text-white">
            REVIEWS
          </h2>
        </div>

        <div className="divide-y divide-white/5">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.15 + index * 0.05,
              }}
              className="px-5 py-4 transition-colors hover:bg-white/3"
            >
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <motion.div
                  className="
                    w-10 h-10
                    rounded-full
                    bg-floesky/10
                    text-floesky
                    flex items-center justify-center
                    font-archivo
                    text-sm
                    shrink-0
                  "
                >
                  {review.name.charAt(0)}
                </motion.div>

                {/* Review Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-montserrat text-sm font-semibold text-white">
                      {review.name}
                    </h3>

                    <span className="text-[10px] tracking-wider text-white/25">
                      {review.product}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        size={11}
                        className={
                          i < review.rating ? "text-floesky" : "text-white/10"
                        }
                      />
                    ))}
                  </div>

                  <p className="mt-3 text-sm text-white/50 leading-relaxed">
                    {review.review}
                  </p>
                </div>

                <div className="flex gap-4">
                  <motion.button className="text-white/30 hover:text-floesky transition">
                    <FiEdit2 size={18} />
                  </motion.button>

                  <motion.button className="text-white/30 hover:text-red-400 transition">
                    <FiTrash2 size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminReviews;
