import { motion } from "framer-motion";
import floe from "../../assets/floeimage.jpg";

const About = () => {
  return (
    <div className="flex justify-center items-center gap-20">
      <div className="flex border-4 rounded-xl border-floesky w-xl h-128 overflow-hidden z-10">
        <img src={floe} alt="logo" className="w-full h-full" />
      </div>

      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{
          once: true,
          amount: 0.7,
        }}
        transition={{
          duration: 0.6,
        }}
        className="flex flex-col w-xl h-128 gap-4"
      >
        <div className="flex flex-col">
          <h1 className="text-white text-[6rem] text-logo font-archivo tracking-tighter leading-none animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:700ms] opacity-0">
            HOW WE
          </h1>
          <h1 className="text-white text-[6rem] text-logo font-archivo tracking-tighter leading-none animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:700ms] opacity-0">
            STARTED
          </h1>
        </div>

        <div className="w-12 h-px bg-floesky"></div>

        <p className="text-descText font-montserrat text-base">
          We created Floe Combat with the dialogue of{" "}
          <span className="text-floesky font-montserrat">
            "May dinesign ako para sayo, for your journey in BJJ."
          </span>
        </p>

        <p className="text-descText font-montserrat text-base">
          Then everything clicked — we wanted to share what we have, even the
          experience of the thought itself. We showed our work with our closest
          people, and they said they wanted to try the design. And that's how{" "}
          <span className="text-white font-montserrat font-bold text-base">
            "The Vortex"
          </span>{" "}
          was born.
        </p>

        <p className="text-descText font-montserrat text-base">
          We actually didn't expect that we are going to be part of multiple
          communities. We built this as a support for the sport itself and to
          expand with the foundation of being thoughtful.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
