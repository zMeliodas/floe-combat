import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import type { Review } from "../../types/types";
import StarRating from "../common/StarRating";
import ReviewModal from "../common/ReviewModal";

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
    design: "THE VORTEX",
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
    design: "NIGHT LOTUS",
    author: "Carlo Manalo",
    role: "No-Gi Practitioner",
    initial: "C",
  },
];

const filters = ["ALL", "5", "4", "3", "2", "1"];

const productOptions = ["THE VORTEX", "NIGHT LOTUS"];

const Reviews = () => {
  const [filter, setFilter] = useState("ALL");
  const [isOpen, setIsOpen] = useState(false);

  const [form, setForm] = useState({
    rating: 5,
    text: "",
    author: "",
    role: "",
    design: "THE VORTEX",
  });

  const [reviewList, setReviewList] = useState<Review[]>(reviews);

  const filtered =
    filter === "ALL"
      ? reviewList
      : reviewList.filter((r) => r.rating === Number(filter));

  const average =
    reviewList.reduce((sum, r) => sum + r.rating, 0) / reviewList.length;

  const handleSubmit = () => {
    if (!form.text || !form.author || !form.design) return;

    const newReview: Review = {
      id: reviewList.length + 1,
      featured: false,
      rating: form.rating,
      text: form.text,
      design: form.design,
      author: form.author,
      role: form.role || "BJJ Practitioner",
      initial: form.author.charAt(0).toUpperCase(),
    };

    setReviewList([newReview, ...reviewList]);
    setIsOpen(false);

    setForm({
      rating: 5,
      text: "",
      author: "",
      role: "",
      design: "THE VORTEX",
    });
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
              {reviewList.length} REVIEWS
            </span>
          </motion.div>
        </div>

        <div className="w-full max-w-7xl flex justify-end pb-4">
          <button
            onClick={() => setIsOpen(true)}
            className="border border-floesky text-floesky px-4 py-2 text-xs font-bold tracking-widest hover:bg-floesky/10 transition"
          >
            SUBMIT REVIEW
          </button>
        </div>

        <div className="flex gap-2 sm:gap-4 pb-8 max-w-7xl w-full border-y border-borderColor py-6 sm:py-8 flex-wrap">
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
          {filtered.map((review) => (
            <motion.div
              key={review.id}
              className="flex flex-col gap-3 p-5 sm:p-8 border-l border-t border-borderColor"
            >
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

      <ReviewModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        form={form}
        setForm={setForm}
        productOptions={productOptions}
        onSubmit={handleSubmit}
      />
    </main>
  );
};

export default Reviews;
