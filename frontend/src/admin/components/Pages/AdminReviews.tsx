import { useState } from "react";
import {
  FaPlus,
  FaPen,
  FaTrash,
  FaSearch,
  FaStar,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import type { Review } from "../../../types/types";
import type { ReviewFormValues } from "../../../types/admintypes";
import ReviewFormModal from "../../components/common/ReviewFormModal";
import DeleteConfirmModal from "../common/DeleteConfirmModal";

const designOptions = ["THE VORTEX", "NIGHT LOTUS"];
const ratingFilters = ["ALL", "5", "4", "3", "2", "1"];

type Tab = "pending" | "approved";

const dummyReviews: Review[] = [
  {
    id: 1,
    status: "pending",
    author: "Marcus Alden",
    role: "BJJ Blue Belt",
    design: "THE VORTEX",
    rating: 5,
    text: "Rolled in this all weekend at the gym, holds up better than anything else I own.",
    featured: false,
    initial: "M",
  },
  {
    id: 2,
    status: "pending",
    author: "Priya Nandakumar",
    role: "BJJ Practitioner",
    design: "NIGHT LOTUS",
    rating: 4,
    text: "Really like the print, fit runs a touch small so size up.",
    featured: false,
    initial: "P",
  },
  {
    id: 3,
    status: "pending",
    author: "Devon Okafor",
    role: "No-Gi Competitor",
    design: "THE VORTEX",
    rating: 3,
    text: "Solid rashguard, seams held after a hard training camp.",
    featured: false,
    initial: "D",
  },
  {
    id: 4,
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
    id: 5,
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
    id: 6,
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
    id: 7,
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
    id: 8,
    status: "approved",
    author: "Jamal Whitfield",
    role: "BJJ Black Belt",
    design: "THE VORTEX",
    rating: 5,
    text: "Been competing in these for a year, zero complaints.",
    featured: false,
    initial: "J",
  },
];

const AdminReviews = () => {
  const [reviews, setReviews] = useState<Review[]>(dummyReviews);
  const [tab, setTab] = useState<Tab>("pending");

  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("ALL");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  const [deleteTarget, setDeleteTarget] = useState<Review | null>(null);
  const [rejectTarget, setRejectTarget] = useState<Review | null>(null);

  const pending = reviews.filter((r) => r.status === "pending");
  const approved = reviews.filter((r) => r.status === "approved");

  const filteredApproved = approved.filter((r) => {
    const matchesSearch = r.author
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRating =
      ratingFilter === "ALL" || r.rating === Number(ratingFilter);
    return matchesSearch && matchesRating;
  });

  const openAddForm = () => {
    setEditingReview(null);
    setIsFormOpen(true);
  };

  const openEditForm = (review: Review) => {
    setEditingReview(review);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingReview(null);
  };

  const handleFormSubmit = (values: ReviewFormValues) => {
    if (editingReview) {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === editingReview.id
            ? {
                ...r,
                author: values.author,
                role: values.role || "BJJ Practitioner",
                design: values.design,
                rating: values.rating,
                text: values.text,
                featured: values.featured,
                initial: values.author.charAt(0).toUpperCase(),
              }
            : r
        )
      );
    } else {
      // Manually added by an admin — published immediately, skips the queue.
      const newReview: Review = {
        id: Date.now(),
        status: "approved",
        author: values.author,
        role: values.role || "BJJ Practitioner",
        design: values.design,
        rating: values.rating,
        text: values.text,
        featured: values.featured,
        initial: values.author.charAt(0).toUpperCase(),
      };
      setReviews((prev) => [newReview, ...prev]);
    }

    closeForm();
  };

  const approveReview = (review: Review) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === review.id ? { ...r, status: "approved" } : r))
    );
  };

  const confirmReject = () => {
    if (!rejectTarget) return;
    setReviews((prev) => prev.filter((r) => r.id !== rejectTarget.id));
    setRejectTarget(null);
  };

  const toggleFeatured = (review: Review) => {
    setReviews((prev) =>
      prev.map((r) =>
        r.id === review.id ? { ...r, featured: !r.featured } : r
      )
    );
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setReviews((prev) => prev.filter((r) => r.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* TABS */}
      <div className="flex gap-2">
        <button
          onClick={() => setTab("pending")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-montserrat font-bold tracking-wider border transition ${
            tab === "pending"
              ? "border-floesky bg-floesky/10 text-floesky"
              : "border-borderColor text-descText hover:border-floesky hover:text-floesky"
          }`}
        >
          PENDING
          {pending.length > 0 && (
            <span className="bg-floesky text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {pending.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setTab("approved")}
          className={`px-4 py-2 text-xs font-montserrat font-bold tracking-wider border transition ${
            tab === "approved"
              ? "border-floesky bg-floesky/10 text-floesky"
              : "border-borderColor text-descText hover:border-floesky hover:text-floesky"
          }`}
        >
          APPROVED ({approved.length})
        </button>
      </div>

      {tab === "pending" ? (
        <div className="border border-borderColor bg-white/2 overflow-hidden">
          {pending.length > 0 ? (
            <div className="flex flex-col divide-y divide-white/5">
              {pending.map((review) => (
                <div
                  key={review.id}
                  className="flex flex-col sm:flex-row sm:items-center gap-3 px-5 py-4"
                >
                  <div className="w-9 h-9 rounded-full bg-floesky/10 text-floesky font-archivo flex items-center justify-center text-sm shrink-0">
                    {review.initial}
                  </div>

                  <div className="min-w-0 flex-1 flex flex-col gap-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-montserrat text-sm font-bold text-white">
                        {review.author}
                      </span>
                      <span className="font-montserrat text-[11px] text-descText">
                        {review.role}
                      </span>
                      <span className="font-montserrat text-[11px] tracking-wider text-floesky">
                        {review.design}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            size={10}
                            className={
                              i < review.rating
                                ? "text-floesky"
                                : "text-descText2"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    <p className="font-montserrat text-xs text-descText2 leading-relaxed">
                      "{review.text}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start sm:self-center">
                    <button
                      onClick={() => approveReview(review)}
                      className="flex items-center gap-1.5 bg-floesky text-black font-montserrat font-bold text-[11px] px-3 py-1.5 tracking-wider rounded-sm hover:opacity-90 transition"
                    >
                      <FaCheck size={10} />
                      APPROVE
                    </button>
                    <button
                      onClick={() => setRejectTarget(review)}
                      className="flex items-center gap-1.5 border border-borderColor text-descText font-montserrat text-[11px] px-3 py-1.5 tracking-wider hover:border-red-400/50 hover:text-red-400 transition"
                    >
                      <FaTimes size={10} />
                      REJECT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-2 py-16">
              <span className="text-descText2 font-archivo text-5xl font-bold">
                0
              </span>
              <p className="text-descText2 font-montserrat text-xs font-bold tracking-widest">
                NOTHING WAITING ON APPROVAL
              </p>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* TOOLBAR */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <FaSearch
                size={12}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-descText"
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by author..."
                className="w-full bg-white/2 border border-borderColor pl-9 pr-3 py-2.5 font-montserrat text-xs text-white placeholder:text-descText focus:outline-none focus:border-floesky/40"
              />
            </div>

            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="bg-white/2 border border-borderColor px-3 py-2.5 font-montserrat text-xs text-descText focus:outline-none focus:border-floesky/40"
            >
              {ratingFilters.map((f) => (
                <option key={f} value={f} className="bg-black">
                  {f === "ALL" ? "ALL RATINGS" : `${f} STAR`}
                </option>
              ))}
            </select>

            <button
              onClick={openAddForm}
              className="sm:ml-auto flex items-center justify-center gap-2 bg-floesky text-black font-montserrat font-bold text-xs px-4 py-2.5 tracking-wider rounded-sm hover:opacity-90 transition"
            >
              <FaPlus size={10} />
              ADD REVIEW
            </button>
          </div>

          {/* TABLE */}
          <div className="border border-borderColor bg-white/2 overflow-hidden">
            <div className="hidden sm:grid grid-cols-[48px_1.3fr_1fr_0.8fr_auto_auto] gap-4 px-5 py-3 border-b border-borderColor font-montserrat text-[11px] tracking-[2px] text-descText">
              <span></span>
              <span>REVIEW</span>
              <span>DESIGN</span>
              <span>RATING</span>
              <span>FEATURED</span>
              <span className="text-right">ACTIONS</span>
            </div>

            {filteredApproved.length > 0 ? (
              <div className="flex flex-col divide-y divide-white/5">
                {filteredApproved.map((review) => (
                  <div
                    key={review.id}
                    className="grid grid-cols-[48px_1fr_auto] sm:grid-cols-[48px_1.3fr_1fr_0.8fr_auto_auto] gap-4 px-5 py-3 items-center"
                  >
                    <div className="w-9 h-9 rounded-full bg-floesky/10 text-floesky font-archivo flex items-center justify-center text-sm shrink-0">
                      {review.initial}
                    </div>

                    <div className="min-w-0 flex flex-col gap-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-montserrat text-sm font-bold text-white truncate">
                          {review.author}
                        </span>
                        <span className="font-montserrat text-[11px] text-descText truncate hidden sm:inline">
                          {review.role}
                        </span>
                      </div>
                      <p className="font-montserrat text-xs text-descText2 truncate max-w-sm">
                        {review.text}
                      </p>
                    </div>

                    <span className="hidden sm:inline font-montserrat text-[11px] tracking-wider text-floesky">
                      {review.design}
                    </span>

                    <div className="hidden sm:flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          size={11}
                          className={
                            i < review.rating
                              ? "text-floesky"
                              : "text-descText2"
                          }
                        />
                      ))}
                    </div>

                    <button
                      onClick={() => toggleFeatured(review)}
                      className={`hidden sm:inline-flex items-center justify-center w-fit px-2.5 py-1 text-[10px] font-montserrat font-bold tracking-wider border transition ${
                        review.featured
                          ? "border-floesky bg-floesky/10 text-floesky"
                          : "border-borderColor text-descText2 hover:border-floesky hover:text-floesky"
                      }`}
                    >
                      {review.featured ? "FEATURED" : "REGULAR"}
                    </button>

                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditForm(review)}
                        aria-label={`Edit review by ${review.author}`}
                        className="w-8 h-8 flex items-center justify-center rounded-sm text-white/40 hover:text-floesky hover:bg-white/5 transition"
                      >
                        <FaPen size={12} />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(review)}
                        aria-label={`Delete review by ${review.author}`}
                        className="w-8 h-8 flex items-center justify-center rounded-sm text-white/40 hover:text-red-400 hover:bg-white/5 transition"
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
                  NO REVIEWS FOUND
                </p>
              </div>
            )}
          </div>
        </>
      )}

      <ReviewFormModal
        isOpen={isFormOpen}
        editingReview={editingReview}
        designOptions={designOptions}
        onClose={closeForm}
        onSubmit={handleFormSubmit}
      />

      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        title="DELETE REVIEW"
        itemName={deleteTarget?.author ?? ""}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      <DeleteConfirmModal
        isOpen={rejectTarget !== null}
        title="REJECT REVIEW"
        itemName={rejectTarget?.author ?? ""}
        onClose={() => setRejectTarget(null)}
        onConfirm={confirmReject}
      />
    </div>
  );
};

export default AdminReviews;