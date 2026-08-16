import { FaTshirt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaVideo } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import ThemeToggle from "../../Components/Navbar/ThemeToggle";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-5 py-2.5 border-l-2 transition-colors ${
      isActive
        ? "border-l-floesky bg-floesky/5 text-floesky"
        : "border-l-transparent text-descText2 hover:text-floesky hover:bg-white/5"
    }`;

  return (
    <>
      <button
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-borderColor bg-black shadow-2xl transition-transform duration-200 lg:static lg:w-55 lg:translate-x-0 lg:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
      <div className="flex items-start justify-between border-b border-borderColor px-5 py-5">
        <div>
        <div className="font-archivo text-lg tracking-[3px] text-white">
          FLOE COMBAT
        </div>
        <div className="font-montserrat text-[12px] tracking-[3px] text-floesky mt-0.5">
          ADMIN
        </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close navigation"
          className="flex h-8 w-8 items-center justify-center text-descText2 transition hover:bg-white/5 hover:text-white lg:hidden"
        >
          <FaTimes size={16} />
        </button>
      </div>

      <nav className="flex-1 py-3">
        <div className="px-5 py-2 font-montserrat text-[12px] tracking-[2px] text-descText2">
          OVERVIEW
        </div>

        <NavLink to="/admin/dashboard" end className={navClass} onClick={onClose}>
          <MdDashboard size={20} />
          <span className="font-montserrat text-sm tracking-wider">
            Dashboard
          </span>
        </NavLink>

        <div className="px-5 py-2 mt-2 font-montserrat text-[12px] tracking-[2px] text-descText2">
          CONTENT
        </div>

        <NavLink to="/admin/products" className={navClass} onClick={onClose}>
          <FaTshirt size={20} />
          <span className="font-montserrat text-sm tracking-wider">
            Products
          </span>
        </NavLink>

        <NavLink to="/admin/highlights" className={navClass} onClick={onClose}>
          <FaVideo size={20} />
          <span className="font-montserrat text-sm tracking-wider">
            Highlights
          </span>
        </NavLink>

        <NavLink to="/admin/reviews" className={navClass} onClick={onClose}>
          <FaRegStar size={20} />
          <span className="font-montserrat text-sm tracking-wider">
            Reviews
          </span>

          <span className="ml-auto bg-floesky text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            3
          </span>
        </NavLink>
      </nav>

      <div className="px-5 py-4 border-t border-borderColor flex items-center gap-2">
        <div className="flex-1 flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-floesky/10 text-floesky flex items-center justify-center font-archivo text-xs font-bold">
            A
          </div>
          <span className="font-montserrat text-xs text-descText2 tracking-wider">
            Admin
          </span>
        </div>

        <ThemeToggle size={20} />
      </div>
      </aside>
    </>
  );
};

export default Sidebar;
