import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaRegStar, FaTimes } from "react-icons/fa";
import type { Review } from "../../types/types";
import StarRating from "../common/StarRating";

const filters = ["ALL", "5", "4", "3", "2", "1"];

const productOptions = ["THE VORTEX", "NIGHT LOTUS"];

// UI-ONLY VERSION
// This is a presentational-only version of the public reviews page. All
// data below is dummy/mock data kept in local component state — there is
// no store, backend, or persistence of any kind. Submitting the form just
// pushes a "pending" review into local state (so, per the real behavior,
// it won't show up in the public list below), and everything resets on
// refresh.

const dummyReviews: Review[] = [
  {
    id: 1,
    status: "approved",
    author: "Ana Lucia Reyes",
    role: "BJJ Brown Belt",
    design: "NIGHT LOTUS",
    rating: 5,
    text: "The design is stunning and it doesn't fade after washing, highly recommend.",
    featured: true,
    initial: "A",
  },
  {
    id: 2,
    status: "approved",
    author: "Coach Ronnie DC",
    role: "BJJ Purple Belt",
    design: "THE VORTEX",
    rating: 5,
    text: "My whole academy wears these now, quality is unreal for the price.",
    featured: true,
    initial: "R",
  },
  {
    id: 3,
    status: "approved",
    author: "Tyler Voss",
    role: "MMA Athlete",
    design: "THE VORTEX",
    rating: 4,
    text: "Great compression fit, breathable even during long sparring sessions.",
    featured: false,
    initial: "T",
  },
  {
    id: 4,
    status: "approved",
    author: "Sofia Marchetti",
    role: "BJJ White Belt",
    design: "NIGHT LOTUS",
    rating: 2,
    text: "Nice look but the sizing chart was a bit off for me.",
    featured: false,
    initial: "S",
  },
  {
    id: 5,
    status: "approved",
    author: "Jamal Whitfield",
    role: "BJJ Black Belt",
    design: "THE VORTEX",
    rating: 5,
    text: "Been competing in these for a year, zero complaints.",
    featured: false,
    initial: "J",
  },
  {
    id: 6,
    status: "approved",
    author: "Priya Nandakumar",
    role: "BJJ Practitioner",
    design: "NIGHT LOTUS",
    rating: 4,
    text: "Really like the print, fit runs a touch small so size up.",
    featured: false,
    initial: "P",
  },
  {
    id: 7,
    status: "approved",
    author: "Devon Okafor",
    role: "No-Gi Competitor",
    design: "THE VORTEX",
    rating: 3,
    text: "Solid rashguard, seams held after a hard training camp.",
    featured: false,
    initial: "D",
  },
];

const Reviews = () => {
  const [filter, setFilter] = useState("ALL");
  const [isOpen, setIsOpen] = useState(false);
  const [justSubmitted, setJustSubmitted] = useState(false);

  const [form, setForm] = useState({
    rating: 5,
    text: "",
    author: "",
    role: "",
    design: "THE VORTEX",
  });

  const [reviewList, setReviewList] = useState<Review[]>(dummyReviews);

  // Only approved reviews are ever shown publicly — anything pending sits
  // in the admin queue until approved.
  const approvedReviews = reviewList.filter((r) => r.status === "approved");

  const filtered =
    filter === "ALL"
      ? approvedReviews
      : approvedReviews.filter((r) => r.rating === Number(filter));

  // Featured reviews surface first, everything else keeps its original order.
  const sortedFiltered = [...filtered].sort(
    (a, b) => Number(b.featured) - Number(a.featured)
  );

  const average =
    approvedReviews.length > 0
      ? approvedReviews.reduce((sum, r) => sum + r.rating, 0) /
        approvedReviews.length
      : 0;

  const handleSubmit = () => {
    if (!form.text || !form.author || !form.design) return;

    const newReview: Review = {
      id: Date.now(),
      featured: false,
      status: "pending",
      rating: form.rating,
      text: form.text,
      design: form.design,
      author: form.author,
      role: form.role || "BJJ Practitioner",
      initial: form.author.charAt(0).toUpperCase(),
    };

    setReviewList((prev) => [newReview, ...prev]);
    setIsOpen(false);

    setForm({
      rating: 5,
      text: "",
      author: "",
      role: "",
      design: "THE VORTEX",
    });

    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 5000);
  };

  return (
    <main className="min-h-screen bg-black">
      <div className="min-h-screen flex flex-col items-center pt-20 sm:pt-24 px-6 sm:px-10 text-white border border-borderColor pb-16 sm:pb-20">

        <div className="flex flex-col sm:flex-row justify-between items-start max-w-7xl w-full py-10 sm:py-16 lg:py-20 gap-6">
          <div className="flex flex-col gap-2">
            <motion.p className="text-floesky font-montserrat text-xs font-bold tracking-widest">
              COMMUNITY VOICES
            </motion.p>

            <motion.h1 className="text-white text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-archivo tracking-tighter leading-none">
              ON THE
              <br />
              MAT
            </motion.h1>
          </div>

          <motion.div className="flex flex-col items-end gap-2 sm:gap-1">
            <div className="flex flex-col items-end gap-2">
              <StarRating rating={5} />
              <span className="font-archivo text-3xl font-bold">
                {average.toFixed(1)}
              </span>
            </div>

            <span className="text-descText2 font-montserrat text-sm font-bold tracking-widest">
              {approvedReviews.length} REVIEWS
            </span>
          </motion.div>
        </div>

        <div className="w-full max-w-7xl flex flex-col items-end gap-2 pb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="border border-floesky text-floesky px-4 py-2 text-xs font-bold tracking-widest hover:bg-floesky/10 transition"
          >
            SUBMIT REVIEW
          </button>

          <AnimatePresence>
            {justSubmitted && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-floesky font-montserrat text-xs"
              >
                Thanks! Your review has been submitted and is awaiting
                approval.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-2 sm:gap-4 pb-8 max-w-7xl w-full border-t border-borderColor py-6 sm:py-8 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`flex items-center gap-2 border font-montserrat font-bold text-sm px-4 py-2 transition ${
                filter === f
                  ? "border-floesky text-floesky bg-floesky/10"
                  : "border-borderColor text-descText2 hover:text-floesky"
              }`}
            >
              {f} <FaStar />
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 max-w-7xl w-full border-b border-borderColor">
          {sortedFiltered.map((review) => (
            <motion.div
              key={review.id}
              className={`relative flex flex-col gap-3 p-5 sm:p-8 border-l border-t transition ${
                review.featured
                  ? "border-floesky/40 bg-floesky/5"
                  : "border-borderColor"
              }`}
            >
              {review.featured && (
                <span className="absolute top-3 right-3 sm:top-5 sm:right-5 flex items-center gap-1 bg-floesky text-black text-[10px] font-montserrat font-bold px-2 py-1 tracking-widest">
                  <FaStar size={9} />
                  FEATURED
                </span>
              )}

              <StarRating rating={review.rating} />

              <p className="text-desctText text-sm font-montserrat sm:text-base">
                "{review.text}"
              </p>

              <span className="text-descText2 font-montserrat text-sm font-bold tracking-widest pt-2 border-b pb-4 border-borderColor">
                DESIGN: {review.design}
              </span>

              <div className="flex items-center gap-3 pt-2">
                <div className="w-8 h-8 rounded-full bg-floesky/20 text-floesky font-archivo font-normal flex items-center justify-center">
                  {review.initial}
                </div>

                <div className="flex flex-col">
                  <span className="text-xs font-bold font-archivo">
                    {review.author.toUpperCase()}
                  </span>
                  <span className="text-white/40 text-xs font-montserrat font-bold">
                    {review.role.toUpperCase()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg bg-black border border-borderColor p-6 flex flex-col gap-4"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-3 right-3 text-white hover:text-floesky"
              >
                <FaTimes />
              </button>

              <h2 className="text-white font-archivo text-2xl font-bold">
                Submit Review
              </h2>

              <input
                placeholder="Your Name"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="bg-transparent border border-borderColor p-2 text-white text-sm"
              />

              <input
                placeholder="Your Role"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="bg-transparent border border-borderColor p-2 text-white text-sm"
              />

              <select
                value={form.design}
                onChange={(e) => setForm({ ...form, design: e.target.value })}
                className="bg-black border border-borderColor p-2 text-white text-sm"
              >
                {productOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>

              <div className="flex gap-2 items-center">
                <span className="text-xs text-white/60">Rating:</span>
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setForm({ ...form, rating: n })}
                  >
                    {n <= form.rating ? (
                      <FaStar className="text-floesky" />
                    ) : (
                      <FaRegStar className="text-floesky" />
                    )}
                  </button>
                ))}
              </div>

              <textarea
                placeholder="Your review..."
                value={form.text}
                onChange={(e) => setForm({ ...form, text: e.target.value })}
                className="bg-transparent border border-borderColor p-2 text-white text-sm min-h-30"
              />

              <button
                onClick={handleSubmit}
                className="bg-floesky text-black font-bold py-2 text-sm hover:opacity-90 transition"
              >
                SUBMIT
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Reviews;