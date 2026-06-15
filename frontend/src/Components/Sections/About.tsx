import { motion } from "framer-motion";
import floe from "../../assets/images/floeimage.jpg";

const About = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-20 w-full px-6 sm:px-10 py-16 lg:py-0">
      <div className="shrink-0 border-4 rounded-xl border-floesky w-full sm:w-xl h-72 sm:h-96 lg:h-128 overflow-hidden z-10">
        <img src={floe} alt="Floe Combat" className="w-full h-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col w-full max-w-sm sm:max-w-md lg:w-xl gap-4"
      >
        <div className="flex flex-col">
          <h1 className="text-white text-5xl sm:text-6xl lg:text-[6rem] font-archivo tracking-tighter leading-none animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:700ms] opacity-0">
            HOW WE
          </h1>
          <h1 className="text-white text-5xl sm:text-6xl lg:text-[6rem] font-archivo tracking-tighter leading-none animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:700ms] opacity-0">
            STARTED
          </h1>
        </div>

        <div className="w-12 h-px bg-floesky"></div>

        <p className="text-descText font-montserrat text-sm sm:text-base">
          We created Floe Combat with the dialogue of{" "}
          <span className="text-floesky font-montserrat">
            "May dinesign ako para sayo, for your journey in BJJ."
          </span>
        </p>

        <p className="text-descText font-montserrat text-sm sm:text-base">
          Then everything clicked — we wanted to share what we have, even the
          experience of the thought itself. We showed our work with our closest
          people, and they said they wanted to try the design. And that's how{" "}
          <span className="text-white font-montserrat font-bold">
            "The Vortex"
          </span>{" "}
          was born.
        </p>

        <p className="text-descText font-montserrat text-sm sm:text-base">
          We actually didn't expect that we are going to be part of multiple
          communities. We built this as a support for the sport itself and to
          expand with the foundation of being thoughtful.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
