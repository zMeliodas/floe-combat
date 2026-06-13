import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaRegStar } from "react-icons/fa";

interface Review {
  id: number;
  featured?: boolean;
  rating: number;
  text: string;
  design: string;
  author: string;
  role: string;
  initial: string;
}

const reviews: Review[] = [
  {
    id: 1,
    featured: true,
    rating: 5,
    text: "First time I wore The Vortex, I didn't want to take it off. The compression is perfect for grappling — no rolling up, no restricting movement. This is exactly what BJJ gear should feel like.",
    design: "THE VORTEX",
    author: "Coach Ronnie DC",
    role: "BJJ Purple Belt / Coach",
    initial: "C",
  },
  {
    id: 2,
    featured: true,
    rating: 5,
    text: "Wore this at a regional tournament. Multiple opponents noticed the design mid-match. Premium quality, premium feel. Floe Combat is the real deal.",
    design: "THE VORTEX — COMPETITION",
    author: "Mark Santos",
    role: "BJJ Blue Belt / MMA Fighter",
    initial: "M",
  },
  {
    id: 3,
    rating: 5,
    text: "Bro, this is legit. I've been in BJJ for 4 years and worn a lot of brands — Floe Combat hits different. The design is unique, the quality is there, and you can feel the passion behind it.",
    design: "THE VORTEX",
    author: "Jayson Reyes",
    role: "BJJ Blue Belt",
    initial: "J",
  },
  {
    id: 4,
    rating: 4,
    text: "Great design and very comfortable. The custom commission process was smooth — they really listened to what I wanted. Would definitely order again.",
    design: "CUSTOM DESIGN",
    author: "Carlo Manalo",
    role: "No-Gi Practitioner",
    initial: "C",
  },
  {
    id: 5,
    rating: 4,
    text: "Great design and very comfortable. The custom commission process was smooth — they really listened to what I wanted. Would definitely order again.",
    design: "CUSTOM DESIGN",
    author: "Carlo Manalo",
    role: "No-Gi Practitioner",
    initial: "C",
  },
  {
    id: 6,
    rating: 1,
    text: "Bro, this is legit. I've been in BJJ for 4 years and worn a lot of brands — Floe Combat hits different. The design is unique, the quality is there, and you can feel the passion behind it.",
    design: "THE VORTEX",
    author: "Jayson Reyes",
    role: "BJJ Blue Belt",
    initial: "J",
  },
];

const filters = ["ALL", "5", "4", "3", "2", "1"];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {Array.from({ length: 5 }).map((_, i) =>
      i < rating ? (
        <FaStar key={i} className="w-4 h-4 text-floesky" />
      ) : (
        <FaRegStar key={i} className="w-4 h-4 text-floesky" />
      )
    )}
  </div>
);

const Reviews = () => {
  const [filter, setFilter] = useState("ALL");

  const filtered =
    filter === "ALL"
      ? reviews
      : reviews.filter((r) => r.rating === Number(filter));

  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <main className="min-h-screen bg-black">
      <div className="min-h-screen flex flex-col items-center pt-24 px-10 text-white border border-borderColor pb-20">
        <div className="flex flex-col md:flex-row justify-between items-start max-w-7xl w-full py-20 gap-6">
          <div className="flex flex-col gap-2">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-floesky font-montserrat text-sm font-bold tracking-widest"
            >
              COMMUNITY VOICES
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white text-6xl md:text-[8rem] font-archivo tracking-tighter leading-none"
            >
              ON THE
              <br />
              MAT
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col items-start md:items-end gap-1"
          >
            <StarRating rating={5} />
            <span className="font-archivo text-4xl font-bold">
              {average.toFixed(1)}
            </span>
            <span className="text-white/40 font-montserrat text-xs font-bold tracking-widest">
              {reviews.length} REVIEWS
            </span>
          </motion.div>
        </div>

        <div className="flex gap-4 pb-8 max-w-7xl w-full border-y border-borderColor py-8 flex-wrap">
          {filters.map((f, i) => (
            <motion.button
              key={f}
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 * i }}
              onClick={() => setFilter(f)}
              className={`border font-montserrat font-bold text-xs px-5 py-2 cursor-pointer transition duration-300 flex items-center gap-1 ${
                filter === f
                  ? "border-floesky text-floesky bg-floesky/10"
                  : "border-borderColor text-white/60 hover:text-floesky hover:border-floesky"
              }`}
            >
              {f}
              {f !== "ALL" && <FaStar className="w-3 h-3" />}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 max-w-7xl w-full border-b border-borderColor">
          {filtered.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="flex flex-col gap-3 p-8 border-l border-t border-borderColor"
            >
              {review.featured && (
                <span className="text-floesky font-montserrat text-xs font-bold tracking-widest">
                  FEATURED
                </span>
              )}

              <StarRating rating={review.rating} />

              <p className="text-white/80 font-montserrat text-sm leading-relaxed flex-1">
                "{review.text}"
              </p>

              <span className="text-white/40 font-montserrat text-xs font-bold tracking-widest pt-2 border-t border-borderColor">
                DESIGN: {review.design}
              </span>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-floesky/20 text-floesky flex items-center justify-center font-archivo font-bold text-sm">
                  {review.initial}
                </div>
                <div className="flex flex-col">
                  <span className="font-montserrat text-sm font-bold">
                    {review.author.toUpperCase()}
                  </span>
                  <span className="text-white/40 font-montserrat text-xs tracking-widest">
                    {review.role.toUpperCase()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Reviews;