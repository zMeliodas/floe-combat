import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  FaCloudUploadAlt,
  FaImage,
  FaTimes,
  FaTrash,
  FaVideo,
} from "react-icons/fa";
import type { HighlightFormValues } from "../../../types/admintypes";
import type { HighlightFormModalProps } from "../../../types/adminprops";

const emptyForm: HighlightFormValues = {
  title: "",
  athlete: "",
  mediaType: "image",
  mediaUrl: "",
  thumbnail: "",
};

const HighlightFormModal = ({
  isOpen,
  editingHighlight,
  onClose,
  onSubmit,
}: HighlightFormModalProps) => {
  const [form, setForm] = useState<HighlightFormValues>(emptyForm);

  const [mediaPreview, setMediaPreview] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const [isMediaDragging, setIsMediaDragging] = useState(false);
  const [isThumbnailDragging, setIsThumbnailDragging] = useState(false);

  const mediaInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    setForm({
      title: editingHighlight?.title ?? "",
      athlete: editingHighlight?.athlete ?? "",
      mediaType: editingHighlight?.mediaType ?? "image",
      mediaUrl: "",
      thumbnail: "",
    });

    /*
     * For editing existing highlights, we only show the existing
     * media as a preview. The actual File will only exist after
     * the admin selects a replacement file.
     */
    setMediaPreview(editingHighlight ? editingHighlight.mediaUrl : "");

    setThumbnailPreview(editingHighlight?.thumbnail ?? "");

    if (mediaInputRef.current) {
      mediaInputRef.current.value = "";
    }

    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  }, [isOpen, editingHighlight]);

  const handleMediaFile = (file?: File) => {
    if (!file) return;

    const expectedType = form.mediaType === "image" ? "image/" : "video/";

    if (!file.type.startsWith(expectedType)) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      mediaFile: file,
    }));

    setMediaPreview((previous) => {
      if (previous.startsWith("blob:")) {
        URL.revokeObjectURL(previous);
      }

      return previewUrl;
    });
  };

  const handleThumbnailFile = (file?: File) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setForm((prev) => ({
      ...prev,
      thumbnailFile: file,
    }));

    setThumbnailPreview((previous) => {
      if (previous.startsWith("blob:")) {
        URL.revokeObjectURL(previous);
      }

      return previewUrl;
    });
  };

  const handleMediaInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleMediaFile(e.target.files?.[0]);
  };

  const handleThumbnailInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleThumbnailFile(e.target.files?.[0]);
  };

  const handleMediaDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsMediaDragging(false);

    handleMediaFile(e.dataTransfer.files?.[0]);
  };

  const handleThumbnailDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsThumbnailDragging(false);

    handleThumbnailFile(e.dataTransfer.files?.[0]);
  };

  const removeMedia = () => {
    if (mediaPreview.startsWith("blob:")) {
      URL.revokeObjectURL(mediaPreview);
    }

    setMediaPreview("");

    setForm((prev) => ({
      ...prev,
      mediaFile: null,
    }));

    if (mediaInputRef.current) {
      mediaInputRef.current.value = "";
    }
  };

  const removeThumbnail = () => {
    if (thumbnailPreview.startsWith("blob:")) {
      URL.revokeObjectURL(thumbnailPreview);
    }

    setThumbnailPreview("");

    setForm((prev) => ({
      ...prev,
      thumbnailFile: null,
    }));

    if (thumbnailInputRef.current) {
      thumbnailInputRef.current.value = "";
    }
  };

  const handleMediaTypeChange = (mediaType: "image" | "video") => {
    /*
     * Reset media when switching types so an image isn't
     * accidentally submitted as a video or vice versa.
     */
    removeMedia();

    setForm((prev) => ({
      ...prev,
      mediaType,
      thumbnail: mediaType === "image" ? "" : prev.thumbnail,
    }));

    if (mediaType === "image") {
      removeThumbnail();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.title.trim() || !form.athlete.trim()) {
      return;
    }

    /*
     * When creating a highlight, a media file is required.
     *
     * When editing, mediaFile can be null because the admin
     * may want to keep the existing media.
     */
    if (!editingHighlight && !form.mediaUrl) {
      return;
    }

    /*
     * Video highlights require a thumbnail when creating.
     */
    if (form.mediaType === "video" && !editingHighlight && !form.thumbnail) {
      return;
    }

    onSubmit(form);
  };

  const isEditing = editingHighlight !== null;

  const mediaAccept = form.mediaType === "image" ? "image/*" : "video/*";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-3 sm:p-4"
        >
          <motion.form
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="my-auto flex w-full max-w-lg max-h-[90vh] flex-col border border-white/10 bg-black"
          >
            {/* HEADER */}

            <div className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6">
              <h2 className="font-montserrat text-sm font-bold tracking-[2px] text-white">
                {isEditing ? "EDIT HIGHLIGHT" : "ADD HIGHLIGHT"}
              </h2>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="w-8 h-8 flex items-center justify-center text-descText hover:text-white transition"
              >
                <FaTimes size={14} />
              </button>
            </div>

            {/* FORM BODY */}

            <div className="custom-scroll flex flex-col gap-5 px-6 py-5 overflow-y-auto">
              {/* TITLE */}

              <div className="flex flex-col gap-1.5">
                <label className="font-montserrat text-[11px] tracking-wider text-descText">
                  TITLE
                </label>

                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  placeholder="Highlight title"
                  className="w-full bg-white/2 border border-borderColor px-3 py-2.5 font-montserrat text-sm text-white placeholder:text-descText2 outline-none focus:border-floesky/40 transition"
                />
              </div>

              {/* ATHLETE */}

              <div className="flex flex-col gap-1.5">
                <label className="font-montserrat text-[11px] tracking-wider text-descText">
                  ATHLETE
                </label>

                <input
                  type="text"
                  required
                  value={form.athlete}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      athlete: e.target.value,
                    }))
                  }
                  placeholder="Athlete name"
                  className="w-full bg-white/2 border border-borderColor px-3 py-2.5 font-montserrat text-sm text-white placeholder:text-descText2 outline-none focus:border-floesky/40 transition"
                />
              </div>

              {/* MEDIA TYPE */}

              <div className="flex flex-col gap-1.5">
                <label className="font-montserrat text-[11px] tracking-wider text-descText">
                  MEDIA TYPE
                </label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleMediaTypeChange("image")}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 border font-montserrat text-xs tracking-wider transition ${
                      form.mediaType === "image"
                        ? "border-floesky/50 bg-floesky/10 text-floesky"
                        : "border-borderColor text-descText2 hover:text-floesky hover:border-floesky"
                    }`}
                  >
                    <FaImage size={13} />
                    IMAGE
                  </button>

                  <button
                    type="button"
                    onClick={() => handleMediaTypeChange("video")}
                    className={`flex items-center justify-center gap-2 px-3 py-2.5 border font-montserrat text-xs tracking-wider transition ${
                      form.mediaType === "video"
                        ? "border-floesky/50 bg-floesky/10 text-floesky"
                        : "border-borderColor text-descText2 hover:text-floesky hover:border-floesky"
                    }`}
                  >
                    <FaVideo size={13} />
                    VIDEO
                  </button>
                </div>
              </div>

              {/* MEDIA UPLOAD */}

              <div className="flex flex-col gap-1.5">
                <label className="font-montserrat text-[11px] tracking-wider text-descText">
                  {form.mediaType === "image" ? "IMAGE" : "VIDEO"}
                </label>

                <input
                  ref={mediaInputRef}
                  type="file"
                  accept={mediaAccept}
                  onChange={handleMediaInputChange}
                  className="hidden"
                />

                {mediaPreview ? (
                  <div className="relative w-full aspect-video overflow-hidden border border-borderColor bg-white/5 group">
                    {form.mediaType === "image" ? (
                      <img
                        src={mediaPreview}
                        alt="Media preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <video
                        src={mediaPreview}
                        controls
                        className="w-full h-full object-contain bg-black"
                      />
                    )}

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => mediaInputRef.current?.click()}
                        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-montserrat text-[10px] tracking-wider px-3 py-2 hover:bg-white/20 transition"
                      >
                        <FaCloudUploadAlt size={12} />
                        CHANGE
                      </button>

                      <button
                        type="button"
                        onClick={removeMedia}
                        className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-montserrat text-[10px] tracking-wider px-3 py-2 hover:bg-red-500/60 transition"
                      >
                        <FaTrash size={11} />
                        REMOVE
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => mediaInputRef.current?.click()}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsMediaDragging(true);
                    }}
                    onDragLeave={() => setIsMediaDragging(false)}
                    onDrop={handleMediaDrop}
                    className={`w-full aspect-video rounded-sm border border-borderColor border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition ${
                      isMediaDragging
                        ? "border-floesky bg-floesky/5"
                        : "border-borderColor bg-white/2 hover:border-floesky"
                    }`}
                  >
                    <div className="w-10 h-10 flex items-center rounded-full justify-center bg-white/5 text-descText">
                      {form.mediaType === "image" ? (
                        <FaImage size={17} />
                      ) : (
                        <FaVideo size={17} />
                      )}
                    </div>

                    <div className="flex flex-col items-center gap-1">
                      <span className="font-montserrat text-xs text-descText">
                        Click to upload or drag & drop
                      </span>

                      <span className="font-montserrat text-[10px] text-descText2">
                        {form.mediaType === "image"
                          ? "PNG, JPG, WEBP"
                          : "MP4, WEBM, MOV"}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* VIDEO THUMBNAIL */}

              {form.mediaType === "video" && (
                <div className="flex flex-col gap-1.5">
                  <label className="font-montserrat text-[11px] tracking-wider text-descText2">
                    VIDEO THUMBNAIL
                  </label>

                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailInputChange}
                    className="hidden"
                  />

                  {thumbnailPreview ? (
                    <div className="relative w-full aspect-video overflow-hidden border border-borderColor bg-white/5 group">
                      <img
                        src={thumbnailPreview}
                        alt="Video thumbnail preview"
                        className="w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => thumbnailInputRef.current?.click()}
                          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-montserrat text-[10px] tracking-wider px-3 py-2 hover:bg-white/20 transition"
                        >
                          <FaCloudUploadAlt size={12} />
                          CHANGE
                        </button>

                        <button
                          type="button"
                          onClick={removeThumbnail}
                          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white font-montserrat text-[10px] tracking-wider px-3 py-2 hover:bg-red-500/60 transition"
                        >
                          <FaTrash size={11} />
                          REMOVE
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => thumbnailInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsThumbnailDragging(true);
                      }}
                      onDragLeave={() => setIsThumbnailDragging(false)}
                      onDrop={handleThumbnailDrop}
                      className={`w-full aspect-video rounded-sm border border-dashed flex flex-col items-center justify-center gap-3 cursor-pointer transition ${
                        isThumbnailDragging
                          ? "border-floesky bg-floesky/5"
                          : "border-white/10 bg-white/2 hover:border-floesky"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-descText">
                        <FaImage size={17} />
                      </div>

                      <div className="flex flex-col items-center gap-1">
                        <span className="font-montserrat text-xs text-descText">
                          Upload video thumbnail
                        </span>

                        <span className="font-montserrat text-[10px] text-descText2">
                          PNG, JPG, WEBP
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* FOOTER */}

            <div className="flex items-center justify-end gap-1.5 border-t border-white/5 px-4 py-4 sm:gap-3 sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="font-montserrat text-xs tracking-wider text-white/40 hover:text-white px-4 py-2.5 transition"
              >
                CANCEL
              </button>

              <button
                type="submit"
                className="bg-floesky text-black font-montserrat font-bold text-xs px-5 py-2.5 tracking-wider rounded-sm hover:opacity-90 transition"
              >
                {isEditing ? "SAVE CHANGES" : "ADD HIGHLIGHT"}
              </button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HighlightFormModal;
