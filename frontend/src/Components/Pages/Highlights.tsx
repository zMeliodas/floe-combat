import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";
import type { Highlight } from "../../types/types";

const highlights: Highlight[] = [
  {
    id: 1,
    title: "Triangle Submission",
    athlete: "John Doe",
    videoUrl: "/videos/highlight1.mp4",
    thumbnail: "/images/thumb1.jpg",
  },
  {
    id: 2,
    title: "Sweep to Mount",
    athlete: "Jane Smith",
    videoUrl: "/videos/highlight2.mp4",
    thumbnail: "/images/thumb2.jpg",
  },
  {
    id: 3,
    title: "Berimbolo Setup",
    athlete: "Carlos Reyes",
    videoUrl: "/videos/highlight3.mp4",
    thumbnail: "/images/thumb3.jpg",
  },
];

const Highlights = () => {
  return (
    <main className="min-h-screen bg-black">
      <div className="min-h-screen flex flex-col items-center pt-24 px-10 text-white border-b border-borderColor">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl w-full pb-20">
          {highlights.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group relative aspect-video bg-white/5 border border-borderColor overflow-hidden cursor-pointer"
            >
              <video
                src={item.videoUrl}
                poster={item.thumbnail}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
                onMouseOver={(e) => e.currentTarget.play()}
                onMouseOut={(e) => {
                  e.currentTarget.pause();
                  e.currentTarget.currentTime = 0;
                }}
              />

              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                <FaPlay className="w-12 h-12 text-white" fill="white" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
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
    </main>
  );
};

export default Highlights;
