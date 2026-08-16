import { useState } from "react";
import {
  FaPlus,
  FaPen,
  FaTrash,
  FaSearch,
  FaImage,
  FaVideo,
} from "react-icons/fa";
import type { Highlight } from "../../../types/types";
import HighlightFormModal from "../../components/common/HighlightFormModal";
import DeleteConfirmModal from "../common/DeleteConfirmModal";
import ImagePreviewModal from "../../components/common/ImagePreviewModal";
import VideoPreviewModal from "../../components/common/VideoPreviewModal";
import type { HighlightFormValues } from "../../../types/admintypes";

import videow from "../../../assets/videos/floe-highlight1.mp4";
import videow2 from "../../../assets/videos/floe-highlight2.mp4";
import videow3 from "../../../assets/videos/FloePH.mp4";
import photosample from "../../../assets/images/floeimage.jpg";

const initialHighlights: Highlight[] = [
  {
    id: 1,
    title: "Valiant MMA",
    athlete: "Jonathan Banzuelo",
    mediaUrl: videow,
    mediaType: "video",
    thumbnail: photosample,
  },
  {
    id: 2,
    title: "Sprawl MMA",
    athlete: "Bryant Calindas",
    mediaUrl: videow2,
    mediaType: "video",
  },
  {
    id: 3,
    title: "Berimbolo Setup",
    athlete: "Carlos Reyes",
    mediaUrl: videow3,
    mediaType: "video",
  },
  {
    id: 4,
    title: "Competition Day",
    athlete: "John Doe",
    mediaType: "image",
    mediaUrl: photosample,
  },
];

const AdminHighlights = () => {
  const [highlights, setHighlights] = useState<Highlight[]>(initialHighlights);

  const [search, setSearch] = useState("");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingHighlight, setEditingHighlight] = useState<Highlight | null>(
    null,
  );

  const [deleteTarget, setDeleteTarget] = useState<Highlight | null>(null);

  const [previewImage, setPreviewImage] = useState<Highlight | null>(null);

  const [previewVideo, setPreviewVideo] = useState<Highlight | null>(null);

  const filtered = highlights.filter((h) =>
    h.title.toLowerCase().includes(search.toLowerCase()),
  );

  const openAddForm = () => {
    setEditingHighlight(null);
    setIsFormOpen(true);
  };

  const openEditForm = (highlight: Highlight) => {
    setEditingHighlight(highlight);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setEditingHighlight(null);
    setIsFormOpen(false);
  };

  const handleSubmit = (values: HighlightFormValues) => {
    if (editingHighlight) {
      setHighlights((prev) =>
        prev.map((h) =>
          h.id === editingHighlight.id
            ? {
                ...h,
                ...values,
              }
            : h,
        ),
      );
    } else {
      setHighlights((prev) => [
        {
          id: Date.now(),
          ...values,
        },
        ...prev,
      ]);
    }

    closeForm();
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;

    setHighlights((prev) => prev.filter((h) => h.id !== deleteTarget.id));

    setDeleteTarget(null);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* TOOLBAR */}

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <FaSearch
            size={12}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-descText2"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search highlights..."
            className="w-full bg-white/2 border border-borderColor pl-9 pr-3 py-2.5 font-montserrat text-xs text-white placeholder:text-descText2 focus:outline-none focus:border-floesky/40"
          />
        </div>

        <button
          onClick={openAddForm}
          className="sm:ml-auto flex items-center justify-center gap-2 bg-floesky text-black font-montserrat font-bold text-xs px-4 py-2.5 tracking-wider rounded-sm hover:opacity-90 transition"
        >
          <FaPlus size={10} />
          ADD HIGHLIGHT
        </button>
      </div>

      {/* TABLE */}

      <div className="border border-borderColor bg-white/2 overflow-hidden">
        <div className="hidden sm:grid grid-cols-[64px_1.5fr_120px_1fr_auto] gap-4 px-5 py-3 border-b border-borderColor font-montserrat text-[11px] tracking-[2px] text-descText">
          <span />
          <span>HIGHLIGHT</span>
          <span>TYPE</span>
          <span>ATHLETE</span>
          <span className="text-right">ACTIONS</span>
        </div>

        {filtered.length > 0 ? (
          <div className="flex flex-col divide-y divide-white/5">
            {filtered.map((highlight) => (
              <div
                key={highlight.id}
                className="grid grid-cols-[64px_1fr_auto] sm:grid-cols-[64px_1.5fr_120px_1fr_auto] gap-4 px-5 py-3 items-center"
              >
                <button
                  type="button"
                  onClick={() =>
                    highlight.mediaType === "image"
                      ? setPreviewImage(highlight)
                      : setPreviewVideo(highlight)
                  }
                  className="w-12 h-12 rounded-sm overflow-hidden bg-white/5 shrink-0 hover:ring-2 hover:ring-floesky/60 transition"
                >
                  {highlight.mediaType === "image" ? (
                    <img
                      src={highlight.mediaUrl}
                      alt={highlight.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={highlight.mediaUrl}
                      className="w-full h-full object-cover"
                      disablePictureInPicture
                      muted
                    />
                  )}
                </button>

                <div className="min-w-0 flex flex-col gap-0.5">
                  <span className="font-montserrat text-sm font-bold text-white truncate">
                    {highlight.title}
                  </span>

                  <span className="font-montserrat text-xs text-descText2 truncate sm:hidden">
                    {highlight.athlete}
                  </span>
                </div>

                <div className="hidden sm:flex items-center gap-2">
                  {highlight.mediaType === "video" ? (
                    <FaVideo size={12} className="text-red-400" />
                  ) : (
                    <FaImage size={12} className="text-floesky" />
                  )}

                  <span className="font-montserrat text-[11px] tracking-wider text-descText2 uppercase">
                    {highlight.mediaType}
                  </span>
                </div>

                <span className="hidden sm:inline font-montserrat text-[11px] tracking-wider text-floesky">
                  {highlight.athlete}
                </span>

                <div className="flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditForm(highlight)}
                    className="w-8 h-8 flex items-center justify-center rounded-sm text-descText2 hover:text-floesky hover:bg-white/5 transition"
                  >
                    <FaPen size={12} />
                  </button>

                  <button
                    onClick={() => setDeleteTarget(highlight)}
                    className="w-8 h-8 flex items-center justify-center rounded-sm text-descText2 hover:text-red-400 hover:bg-white/5 transition"
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
              NO HIGHLIGHTS FOUND
            </p>
          </div>
        )}
      </div>

      <HighlightFormModal
        isOpen={isFormOpen}
        editingHighlight={editingHighlight}
        onClose={closeForm}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        title="DELETE HIGHLIGHT"
        itemName={deleteTarget?.title ?? ""}
        onClose={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />

      <ImagePreviewModal
        isOpen={previewImage !== null}
        imageUrl={previewImage?.mediaUrl ?? ""}
        title={previewImage?.title}
        onClose={() => setPreviewImage(null)}
      />

      <VideoPreviewModal
        isOpen={previewVideo !== null}
        videoUrl={previewVideo?.mediaUrl ?? ""}
        title={previewVideo?.title}
        onClose={() => setPreviewVideo(null)}
      />
    </div>
  );
};

export default AdminHighlights;
