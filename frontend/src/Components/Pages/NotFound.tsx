import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="min-h-screen bg-black">
      <div className="min-h-screen flex flex-col items-center justify-center px-6 sm:px-10 text-white border border-borderColor relative overflow-hidden">

        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-floesky font-montserrat text-xs font-bold tracking-widest"
        >
          SUBMISSION REGISTERED
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="text-white text-7xl sm:text-9xl md:text-[11rem] font-archivo tracking-tighter leading-none py-4"
        >
          TAPPED
          <span className="text-floesky">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-descText font-montserrat text-sm sm:text-base max-w-md text-center leading-relaxed pt-2"
        >
          This page tapped out. Whatever you're looking for isn't on the
          mat anymore — check the address, or head back to solid ground.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-col sm:flex-row items-center gap-3 pt-10"
        >
          <Link
            to="/"
            className="flex items-center gap-2 bg-floesky text-black font-montserrat font-bold text-xs px-6 py-3 tracking-widest hover:opacity-90 transition"
          >
            <FaArrowLeft size={11} />
            BACK TO HOME
          </Link>

          <Link
            to="/products"
            className="flex items-center gap-2 border border-borderColor text-descText2 font-montserrat font-bold text-xs px-6 py-3 tracking-widest hover:text-floesky hover:border-floesky transition"
          >
            BROWSE THE SHOP
          </Link>
        </motion.div>

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="absolute bottom-6 sm:bottom-10 text-descText2 font-montserrat text-[11px] font-bold tracking-widest"
        >
          ERROR 404 — POSITION NOT FOUND
        </motion.span>
      </div>
    </main>
  );
};

export default NotFound;