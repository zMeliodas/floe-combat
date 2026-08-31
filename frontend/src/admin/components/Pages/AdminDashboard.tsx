import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTshirt, FaVideo, FaRegStar, FaStar } from "react-icons/fa";

import type { Product, Highlight, Review } from "../../../types/types";

import { getProducts } from "../../../services/products.service";
import { getHighlights } from "../../../services/highlights.service";
import { getAdminReviews } from "../../../services/reviews.service";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const [productsError, setProductsError] = useState("");
  const [highlightsError, setHighlightsError] = useState("");
  const [reviewsError, setReviewsError] = useState("");

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);

        setProductsError("");
        setHighlightsError("");
        setReviewsError("");

        const results = await Promise.allSettled([
          getProducts(),
          getHighlights(),
          getAdminReviews(),
        ]);

        const [productsResult, highlightsResult, reviewsResult] = results;

        if (productsResult.status === "fulfilled") {
          setProducts(productsResult.value);
        } else {
          setProductsError("Could not load products.");
        }

        if (highlightsResult.status === "fulfilled") {
          setHighlights(highlightsResult.value);
        } else {
          setHighlightsError("Could not load highlights.");
        }

        if (reviewsResult.status === "fulfilled") {
          setReviews(reviewsResult.value);
        } else {
          setReviewsError("Could not load reviews.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const approvedReviews = reviews.filter(
    (review) => review.status === "approved",
  );

  const averageRating =
    approvedReviews.length > 0
      ? approvedReviews.reduce((sum, review) => sum + review.rating, 0) /
        approvedReviews.length
      : 0;

  const recentReviews = [...approvedReviews]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, 3);

  const stats = [
    {
      label: "Products",
      value: productsError ? "—" : products.length,
      icon: FaTshirt,
      error: productsError,
    },
    {
      label: "Highlights",
      value: highlightsError ? "—" : highlights.length,
      icon: FaVideo,
      error: highlightsError,
    },
    {
      label: "Reviews",
      value: reviewsError ? "—" : approvedReviews.length,
      icon: FaRegStar,
      error: reviewsError,
    },
    {
      label: "Avg Rating",
      value: reviewsError ? "—" : averageRating.toFixed(1),
      icon: FaStar,
      error: reviewsError,
    },
  ];

  const contentBreakdown = [
    {
      label: "Products",
      count: products.length,
      icon: FaTshirt,
      hasError: !!productsError,
    },
    {
      label: "Highlights",
      count: highlights.length,
      icon: FaVideo,
      hasError: !!highlightsError,
    },
    {
      label: "Reviews",
      count: approvedReviews.length,
      icon: FaRegStar,
      hasError: !!reviewsError,
    },
  ];

  const maxCount = Math.max(1, ...contentBreakdown.map((item) => item.count));

  if (isLoading) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="font-montserrat text-xs font-bold tracking-widest text-white/30">
          LOADING DASHBOARD...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="flex flex-col gap-4 border border-borderColor bg-white/2 p-4 sm:p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-montserrat text-[11px] tracking-[2px] text-descText2">
                  {stat.label.toUpperCase()}
                </span>
                <div className="w-8 h-8 rounded-full bg-floesky/10 text-floesky flex items-center justify-center">
                  <Icon size={14} />
                </div>
              </div>
              <span className="font-archivo text-3xl text-white">
                {stat.value}
              </span>
              {stat.error && (
                <span className="font-montserrat text-[10px] text-red-400">
                  {stat.error}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-3 border border-borderColor bg-white/2 flex flex-col"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5 border-b border-borderColor">
            <h2 className="font-montserrat text-xs font-bold tracking-[2px] text-white">
              RECENT REVIEWS
            </h2>
            <Link
              to="/admin/reviews"
              className="font-montserrat text-[11px] tracking-widest text-floesky hover:text-white transition"
            >
              VIEW ALL
            </Link>
          </div>

          <div className="flex flex-col divide-y divide-white/5">
            {reviewsError ? (
              <div className="px-5 py-10 text-center">
                <p className="font-montserrat text-xs text-red-400">
                  Could not load recent reviews.
                </p>
              </div>
            ) : recentReviews.length > 0 ? (
              recentReviews.map((review) => (
                <div
                  key={review.id}
                  className="flex items-start gap-3 px-4 py-4 sm:px-5"
                >
                  <div className="w-8 h-8 shrink-0 rounded-full bg-floesky/10 text-floesky flex items-center justify-center font-archivo text-xs">
                    {review.author.charAt(0).toUpperCase()}
                  </div>

                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                      <span className="font-montserrat text-xs font-bold text-white">
                        {review.author}
                      </span>

                      <span className="font-montserrat text-[10px] tracking-wider text-descText2">
                        {review.product_name}
                      </span>
                    </div>

                    <p className="font-montserrat text-xs text-descText leading-relaxed truncate">
                      {review.review_text}
                    </p>
                  </div>

                  <div className="ml-auto hidden items-center gap-0.5 shrink-0 pl-2 min-[420px]:flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <FaStar
                        key={i}
                        size={10}
                        className={
                          i < review.rating ? "text-floesky" : "text-descText"
                        }
                      />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="px-5 py-10 text-center">
                <p className="font-montserrat text-xs text-descText2">
                  NO RECENT REVIEWS
                </p>
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="lg:col-span-2 border border-borderColor bg-white/2 flex flex-col"
        >
          <div className="px-4 py-4 sm:px-5 border-b border-borderColor">
            <h2 className="font-montserrat text-xs font-bold tracking-[2px] text-white">
              CONTENT OVERVIEW
            </h2>
          </div>

          <div className="flex flex-col gap-4 px-4 py-5 sm:px-5">
            {contentBreakdown.map((item) => {
              const Icon = item.icon;
              const pct = item.hasError ? 0 : (item.count / maxCount) * 100;
              return (
                <div key={item.label} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-descText2">
                      <Icon size={12} />
                      <span className="font-montserrat text-[11px] tracking-wider">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-montserrat text-[11px] font-bold text-white">
                      {item.hasError ? "—" : item.count}
                    </span>
                  </div>

                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-floesky rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
