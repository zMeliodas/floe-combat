import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaPlay, FaTimes, FaExpand } from "react-icons/fa";
import type { Highlight } from "../../types/types";
import videow from "../../assets/videos/floe-highlight1.mp4";
import videow2 from "../../assets/videos/floe-highlight2.mp4";
import videow3 from "../../assets/videos/FloePH.mp4";
import photosample from "../../assets/images/floeimage.jpg";

const highlights: Highlight[] = [
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

const Highlights = () => {
  const [selected, setSelected] = useState<Highlight | null>(null);
  const [isPortrait, setIsPortrait] = useState<boolean | null>(null);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const handleClose = () => {
    setSelected(null);
    setIsPortrait(false);
  };

  const handleVideoMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    setIsPortrait(video.videoHeight > video.videoWidth);
  };

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    setIsPortrait(img.naturalHeight > img.naturalWidth);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    if (selected) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selected]);

  return (
    <main className="min-h-screen bg-black">
      <div className="min-h-screen flex flex-col items-center pt-24 px-10 text-white border-b border-borderColor">
        {/* Header */}
        <div className="flex flex-col max-w-7xl w-full py-20 gap-2">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-floesky font-montserrat text-sm font-bold tracking-widest"
          >
            ATHLETE CHRONICLES
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-6xl md:text-[10rem] font-archivo tracking-tighter leading-none"
          >
            HIGHLIGHTS
          </motion.h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full pb-20">
          {highlights.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              onClick={() => setSelected(item)}
              className="group relative aspect-video bg-white/5 border border-borderColor overflow-hidden cursor-pointer"
            >
              {/* Grid thumbnail — smart fallback */}
              {item.mediaType === "video" ? (
                item.thumbnail ? (
                  // Custom thumbnail provided
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  // No thumbnail — show first frame of video
                  <video
                    src={item.mediaUrl}
                    className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    muted
                    playsInline
                    preload="metadata"
                  />
                )
              ) : (
                // Image type
                <img
                  src={item.mediaUrl}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                />
              )}

              {/* Different icon for video vs image */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                {item.mediaType === "video" ? (
                  <FaPlay className="w-10 h-10 text-white drop-shadow-lg" />
                ) : (
                  <FaExpand className="w-10 h-10 text-white drop-shadow-lg" />
                )}
              </div>

              {/* Bottom info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent">
                <h3 className="font-archivo text-lg font-bold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-white/60 font-montserrat text-xs tracking-widest">
                  {item.athlete.toUpperCase()}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full bg-black border border-borderColor overflow-hidden transition-all duration-300 ${
                isPortrait === null
                  ? "max-w-xl"
                  : isPortrait
                    ? "max-w-sm"
                    : "max-w-3xl"
              }`}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-black/20 rounded-3xl text-white hover:text-floesky transition duration-300"
              >
                <FaTimes className="w-4 h-4" />
              </button>

              {/* Render video or image based on mediaType */}
              {selected.mediaType === "video" ? (
                <video
                  key={selected.id}
                  src={selected.mediaUrl}
                  className="w-full"
                  controls
                  autoPlay
                  muted
                  playsInline
                  preload="metadata"
                  onLoadedMetadata={handleVideoMetadata}
                />
              ) : (
                <img
                  key={selected.id}
                  src={selected.mediaUrl}
                  alt={selected.title}
                  className="w-full object-contain"
                  onLoad={handleImageLoad} // 👈 detect portrait for images too
                />
              )}

              {/* Info */}
              <div className="flex flex-col gap-2 p-6">
                <h3 className="font-archivo text-white text-2xl font-bold tracking-tight">
                  {selected.title}
                </h3>
                <p className="text-descText font-montserrat text-xs tracking-widest">
                  {selected.athlete.toUpperCase()}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Highlights;
