import { FaTshirt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { GoListOrdered } from "react-icons/go";

const Sidebar = () => {
  return (
    <aside className="w-55 shrink-0 border-r border-white/5 flex flex-col">
      <div className="px-5 py-5 border-b border-white/5">
        <div className="font-archivo text-lg tracking-[3px] text-white">
          FLOE COMBAT
        </div>
        <div className="font-montserrat text-[12px] tracking-[3px] text-floesky mt-0.5">
          ADMIN
        </div>
      </div>

      <nav className="flex-1 py-3">
        <div className="px-5 py-2 font-montserrat text-[12px] tracking-[2px] text-white/20">
          OVERVIEW
        </div>

        <div className="flex items-center gap-3 px-5 py-2.5 border-l-2 border-l-floesky bg-floesky/5 text-floesky cursor-pointer">
          <span>
            <MdDashboard size={20} />
          </span>
          <span className="font-montserrat text-sm tracking-wider">
            Dashboard
          </span>
        </div>

        <div className="px-5 py-2 mt-2 font-montserrat text-[12px] tracking-[2px] text-white/20">
          CONTENT
        </div>

        <div className="flex items-center gap-3 px-5 py-2.5 border-l-2 border-l-transparent text-white/40 cursor-pointer hover:text-white hover:bg-white/5">
          <span>
            <FaTshirt size={20} />
          </span>
          <span className="font-montserrat text-sm tracking-wider">
            Products
          </span>
        </div>

        <div className="flex items-center gap-3 px-5 py-2.5 border-l-2 border-l-transparent text-white/40 cursor-pointer hover:text-white hover:bg-white/5">
          <span>
            <FaVideo size={20} />
          </span>
          <span className="font-montserrat text-sm tracking-wider">
            Highlights
          </span>
        </div>

        <div className="flex items-center gap-3 px-5 py-2.5 border-l-2 border-l-transparent text-white/40 cursor-pointer hover:text-white hover:bg-white/5">
          <span>
            <FaRegStar size={20} />
          </span>
          <span className="font-montserrat text-sm tracking-wider">
            Reviews
          </span>

          <span className="ml-auto bg-floesky text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            3
          </span>
        </div>

        <div className="flex items-center gap-3 px-5 py-2.5 border-l-2 border-l-transparent text-white/40 cursor-pointer hover:text-white hover:bg-white/5">
          <span>
            <GoListOrdered size={20} />
          </span>
          <span className="font-montserrat text-sm tracking-wider">
            Order Steps
          </span>
        </div>
      </nav>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-white/5 flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-floesky/10 text-floesky flex items-center justify-center font-archivo text-xs font-bold">
          A
        </div>
        <span className="font-montserrat text-xs text-white/30 tracking-wider">
          Admin
        </span>
      </div>
    </aside>
  );
};

export default Sidebar;
