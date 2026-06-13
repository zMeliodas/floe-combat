import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaClipboardList,
  FaCreditCard,
  FaTruck,
} from "react-icons/fa";

const steps = [
  {
    icon: FaFacebookF,
    title: "Message us on Facebook",
    desc: "Send us a DM with the design or rashguard you're interested in.",
  },
  {
    icon: FaClipboardList,
    title: "Fill in your details",
    desc: "We'll ask for your size, design preferences, and contact info.",
  },
  {
    icon: FaCreditCard,
    title: "Confirm and pay",
    desc: "Once details are confirmed, we'll send payment instructions.",
  },
  {
    icon: FaTruck,
    title: "Sit back and wait",
    desc: "Your custom piece gets crafted and shipped straight to you.",
  },
];

const Order = () => {
  return (
    <main className="min-h-screen bg-black">
      <div className="min-h-screen flex flex-col items-center pt-24 px-10 text-white border-b border-borderColor">
        <div className="flex flex-col max-w-7xl w-full py-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-floesky font-montserrat text-sm font-bold tracking-widest"
          >
            HOW TO
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white text-6xl md:text-[10rem] font-archivo tracking-tighter leading-none"
          >
            ORDER
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/60 font-montserrat text-md font-light max-w-lg"
          >
            No checkout, no hassle. Every piece is custom made — just reach out
            and we'll guide you through it.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 max-w-7xl w-full border border-borderColor">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className="flex flex-col gap-4 p-8 border-r border-borderColor last:border-r-0 lg:nth-[4n]:border-r-0"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-full bg-floesky text-white flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-white/10 font-archivo text-5xl font-bold leading-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="font-archivo text-xl tracking-tight">
                  {step.title}
                </h3>
                <p className="text-white/60 font-montserrat text-sm leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-col items-center gap-4 max-w-7xl w-full border border-t-0 border-borderColor p-12 text-center"
        >
          <p className="text-white/60 font-montserrat text-sm tracking-widest">
            READY TO START YOUR COMMISSION?
          </p>
          <a
            href="https://www.facebook.com/profile.php?id=61573306476553"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black border border-floesky
            font-montserrat font-bold text-white text-sm w-82 h-13 flex
            items-center justify-center gap-2 tracking-widest hover:opacity-90
            transition duration-300 hover:bg-floesky hover:text-black"
          >
            <FaFacebookF /> MESSAGE US ON FACEBOOK
          </a>
        </motion.div>

        <div className="pb-20" />
      </div>
    </main>
  );
};

export default Order;
