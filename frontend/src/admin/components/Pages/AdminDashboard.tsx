import { motion } from "framer-motion";
import { FaTshirt, FaVideo, FaRegStar, FaStar } from "react-icons/fa";
import { GoListOrdered } from "react-icons/go";

const stats = [
  {
    label: "Products",
    value: 2,
    icon: FaTshirt,
  },
  {
    label: "Highlights",
    value: 4,
    icon: FaVideo,
  },
  {
    label: "Reviews",
    value: 4,
    icon: FaRegStar,
  },
  {
    label: "Avg Rating",
    value: "4.8",
    icon: FaStar,
  },
];

const recentReviews = [
  {
    author: "Coach Ronnie DC",
    design: "THE VORTEX",
    rating: 5,
    text: "First time I wore The Vortex, I didn't want to take it off.",
  },
  {
    author: "Mark Santos",
    design: "THE VORTEX",
    rating: 5,
    text: "Wore this at a regional tournament. Multiple opponents noticed the design.",
  },
  {
    author: "Carlo Manalo",
    design: "NIGHT LOTUS",
    rating: 4,
    text: "Great design and very comfortable. Would definitely order again.",
  },
];

const contentBreakdown = [
  { label: "Products", count: 2, icon: FaTshirt },
  { label: "Highlights", count: 4, icon: FaVideo },
  { label: "Reviews", count: 4, icon: FaRegStar },
  { label: "Order Steps", count: 4, icon: GoListOrdered },
];

const maxCount = Math.max(...contentBreakdown.map((c) => c.count));

const AdminDashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="flex flex-col gap-4 border border-borderColor bg-white/2 p-4 sm:p-5"
            >
              <div className="flex items-center justify-between">
                <span className="font-montserrat text-[11px] tracking-[2px] text-descText2">
                  {stat.label.toUpperCase()}
                </span>
                <div className="w-8 h-8 rounded-full bg-floesky/10 text-floesky flex items-center justify-center">
                  <Icon size={14} />
                </div>
              </div>
              <span className="font-archivo text-3xl text-white">
                {stat.value}
              </span>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* RECENT REVIEWS */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="lg:col-span-3 border border-borderColor bg-white/2 flex flex-col"
        >
          <div className="flex items-center justify-between gap-3 px-4 py-4 sm:px-5 border-b border-borderColor">
            <h2 className="font-montserrat text-xs font-bold tracking-[2px] text-white">
              RECENT REVIEWS
            </h2>
            <span className="font-montserrat text-[11px] tracking-widest text-floesky cursor-pointer hover:text-white transition">
              VIEW ALL
            </span>
          </div>

          <div className="flex flex-col divide-y divide-white/5">
            {recentReviews.map((review) => (
              <div
                key={review.author}
                className="flex items-start gap-3 px-4 py-4 sm:px-5"
              >
                <div className="w-8 h-8 shrink-0 rounded-full bg-floesky/10 text-floesky flex items-center justify-center font-archivo text-xs">
                  {review.author.charAt(0)}
                </div>

                <div className="flex flex-col gap-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <span className="font-montserrat text-xs font-bold text-white">
                      {review.author}
                    </span>
                    <span className="font-montserrat text-[10px] tracking-wider text-descText2">
                      {review.design}
                    </span>
                  </div>

                  <p className="font-montserrat text-xs text-descText leading-relaxed truncate">
                    {review.text}
                  </p>
                </div>

                <div className="ml-auto hidden items-center gap-0.5 shrink-0 pl-2 min-[420px]:flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar
                      key={i}
                      size={10}
                      className={
                        i < review.rating ? "text-floesky" : "text-descText"
                      }
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CONTENT BREAKDOWN */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="lg:col-span-2 border border-borderColor bg-white/2 flex flex-col"
        >
          <div className="px-4 py-4 sm:px-5 border-b border-borderColor">
            <h2 className="font-montserrat text-xs font-bold tracking-[2px] text-white">
              CONTENT OVERVIEW
            </h2>
          </div>

          <div className="flex flex-col gap-4 px-4 py-5 sm:px-5">
            {contentBreakdown.map((item) => {
              const Icon = item.icon;
              const pct = (item.count / maxCount) * 100;
              return (
                <div key={item.label} className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-descText2">
                      <Icon size={12} />
                      <span className="font-montserrat text-[11px] tracking-wider">
                        {item.label}
                      </span>
                    </div>
                    <span className="font-montserrat text-[11px] font-bold text-white">
                      {item.count}
                    </span>
                  </div>

                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-floesky rounded-full"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
