import { motion } from "framer-motion";

const Hero = () => {
  return (
    <div className="flex items-center pt-12 w-full px-10">
      <span className="text-white/40 text-md font-montserrat font-bold rotate-90 tracking-widest pt-68">
        BJJ RASHGUARD — EST. 2026
      </span>

      <div className="flex flex-col">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-floesky font-montserrat text-sm font-bold tracking-widest"
        >
          WHERE ART MEETS THE MAT.
        </motion.p>

        <div className="flex flex-col my-5">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.65,
            }}
            className="text-white text-[11rem] text-logo font-archivo tracking-tighter leading-none"
          >
            FLOE
          </motion.h1>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.65,
            }}
            className="text-floesky text-[11rem] text-logo font-archivo tracking-tighter leading-none"
          >
            COMBAT
          </motion.h1>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.85,
          }}
          className="text-descText font-montserrat text-lg font-light tracking-widest mb-8 max-w-lg"
        >
          By Practitioners, For Practitioners. Custom rashguards crafted with
          purpose and built for the mat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 1,
          }}
          className="flex items-center gap-4"
        >
          <button className="bg-floesky font-montserrat font-bold text-white text-sm w-66 h-13 tracking-widest animate-[neonPulse_2.5s_ease-in-out_infinite] transition-all duration-300 hover:bg-white hover:text-black cursor-pointer">
            START COMMISSION →
          </button>
          <div className="flex items-center gap-2 group">
            <span className="content-center font-montserrat text-descText text-sm h-12 tracking-widest group-hover:text-white transition cursor-pointer">
              VIEW PROJECTS
            </span>
            <span className="inline-block w-6 h-px bg-descText group-hover:bg-white transition"></span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
