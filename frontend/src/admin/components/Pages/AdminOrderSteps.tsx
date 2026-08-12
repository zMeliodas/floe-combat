import { motion } from "framer-motion";
import { FiSearch, FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const orderSteps = [
  {
    id: 1,
    step: 1,
    title: "Choose Your Design",
    description: "Select your preferred rashguard design and size.",
  },
  {
    id: 2,
    step: 2,
    title: "Submit Order Form",
    description: "Fill out the order form with your details.",
  },
  {
    id: 3,
    step: 3,
    title: "Confirm Payment",
    description: "Send proof of payment and wait for confirmation.",
  },
  {
    id: 4,
    step: 4,
    title: "Production",
    description: "Your order will be manufactured and quality checked.",
  },
  {
    id: 5,
    step: 5,
    title: "Delivery",
    description: "Your order will be shipped to your address.",
  },
];

const AdminOrderSteps = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-4"
    >
      {/* Search + Add */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="flex items-center gap-4"
      >
        <div className="relative flex-1">
          <FiSearch
            size={16}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20"
          />

          <input
            type="text"
            placeholder="Search order steps..."
            className="
              w-full
              h-11
              pl-11
              pr-4
              bg-white/2
              border border-white/5
              text-white
              font-montserrat
              text-sm
              placeholder:text-white/20
              outline-none
              transition-all
              duration-300
              focus:border-floesky/40
            "
          />
        </div>

        <motion.button
          className="
            h-11
            px-4
            flex items-center gap-2
            bg-floesky
            text-black
            font-montserrat
            font-semibold
            text-sm
          "
        >
          <FiPlus size={16} />
          Add Step
        </motion.button>
      </motion.div>

      {/* Steps */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="border border-white/5 bg-white/2"
      >
        <div className="px-5 py-4 border-b border-white/5">
          <h2 className="font-montserrat text-xs font-bold tracking-[2px] text-white">
            ORDER STEPS
          </h2>
        </div>

        <div className="divide-y divide-white/5">
          {orderSteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.15 + index * 0.05,
              }}
              className="px-5 py-5 transition-colors"
            >
              <div className="flex items-start gap-4">
                {/* Step Number */}
                <motion.div
                  className="
                    w-10 h-10
                    rounded-full
                    bg-floesky/10
                    text-floesky
                    flex items-center justify-center
                    font-archivo
                    text-sm
                    shrink-0
                  "
                >
                  {step.step}
                </motion.div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-montserrat text-sm font-semibold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm text-white/50 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-4">
                  <motion.button className="text-white/30 hover:text-floesky transition">
                    <FiEdit2 size={18} />
                  </motion.button>

                  <motion.button className="text-white/30 hover:text-red-400 transition">
                    <FiTrash2 size={18} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AdminOrderSteps;
