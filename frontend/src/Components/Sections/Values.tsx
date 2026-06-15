import { motion } from "framer-motion";

const values = [
  {
    label: "AUTHENTICITY",
    desc: "We communicate honestly and stay true to our identity in every visual and message.",
  },
  {
    label: "CONSISTENCY",
    desc: "Of our belief, our work and how we operate Floe Combat, with passion and creativity.",
  },
  {
    label: "CLARITY",
    desc: "Everything is kept clear, focused, and easy to understand. Our brand is transparent.",
  },
];

const fadeX = (x: number) => ({
  initial: { opacity: 0, x },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6 },
});

const fadeY = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, delay },
});

const Values = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 w-full px-6 sm:px-10 py-16 lg:py-0">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end w-full max-w-5xl gap-4 sm:gap-0">
        <motion.h1
          {...fadeX(-60)}
          className="text-white font-archivo font-bold text-5xl sm:text-6xl lg:text-8xl leading-tight"
        >
          BRAND
          <br />
          VALUES
        </motion.h1>
        <motion.p
          {...fadeX(60)}
          className="text-descText2 font-montserrat font-bold text-xs sm:text-sm tracking-widest sm:text-right"
        >
          THE PILLARS THAT DEFINE EVERY
          <br />
          DESIGN DECISION WE MAKE
        </motion.p>
      </div>

      {/* Values grid */}
      <div className="flex flex-col sm:flex-row border-t border-borderColor w-full max-w-5xl">
        {values.map(({ label, desc }, i) => (
          <div
            key={label}
            className={`
              flex flex-col gap-2 items-start py-8 px-0
              sm:px-8 sm:first:pl-0 sm:last:pr-0
              border-b sm:border-b-0 sm:border-r border-borderColor
              last:border-b-0 last:border-r-0
              w-full sm:w-1/3
            `}
          >
            <motion.p
              {...fadeY(i * 0.1)}
              className="font-montserrat text-floesky font-bold tracking-widest text-xs sm:text-sm"
            >
              {label}
            </motion.p>
            <motion.p
              {...fadeY(i * 0.1 + 0.1)}
              className="font-montserrat text-descText text-xs sm:text-sm"
            >
              {desc}
            </motion.p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Values;
