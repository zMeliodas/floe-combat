import { motion } from "framer-motion";

const Values = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-12">
      <div className="flex justify-between items-end w-6xl border-white">
        <motion.h1
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{
            once: true,
            amount: 0.8,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-white font-archivo font-bold text-8xl leading-tight"
        >
          BRAND
          <br />
          VALUES
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{
            once: true,
            amount: 0.8,
          }}
          transition={{
            duration: 0.6,
          }}
          className="text-white/40 font-montserrat font-bold text-sm tracking-widest text-right"
        >
          THE PILLARS THAT DEFINE EVERY
          <br />
          DESIGN DECISION WE MAKE
        </motion.p>
      </div>

      <div className="flex border-t border-borderColor w-6xl">
        <div className="flex flex-col gap-2 items-start py-8 pr-8 border-r border-borderColor">
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.8,
            }}
            transition={{
              duration: 0.6,
            }}
            className="font-montserrat text-floesky font-bold tracking-widest text-sm"
          >
            AUTHENTICY
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.8,
            }}
            transition={{
              duration: 0.6,
            }}
            className="font-montserrat text-white/60 text-sm"
          >
            We communicate honestly and stay true to our identity in every
            visual and message.
          </motion.p>
        </div>

        <div className="flex flex-col gap-2 items-start pl-8 py-8 pr-8 border-r border-borderColor">
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.8,
            }}
            transition={{
              duration: 0.6,
            }}
            className="font-montserrat text-floesky font-bold tracking-widest text-sm"
          >
            CONSISTENCY
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.8,
            }}
            transition={{
              duration: 0.6,
            }}
            className="font-montserrat text-white/60 text-sm"
          >
            Of our belief, our work and how we operate Floe Combat, with passion
            and creativity.
          </motion.p>
        </div>

        <div className="flex flex-col gap-2 items-start pl-8 py-8 pr-24">
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.8,
            }}
            transition={{
              duration: 0.6,
            }}
            className="font-montserrat text-floesky font-bold tracking-widest text-sm"
          >
            CLARITY
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
              once: true,
              amount: 0.8,
            }}
            transition={{
              duration: 0.6,
            }}
            className="font-montserrat text-white/60 text-sm"
          >
            Everything is kept clear, focused, and easy to understand. Our brand
            is transparent.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Values;
