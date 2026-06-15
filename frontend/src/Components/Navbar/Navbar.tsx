import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import logo from "../../assets/logos/floelogo.svg";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `font-montserrat font-bold transition duration-300 ${
      isActive ? "text-floesky" : "text-descText hover:text-white"
    }`;

  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <nav className="fixed top-0 z-50 min-w-full h-22 border-b border-borderColor bg-nav backdrop-blur-md">
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <img
            src={logo}
            alt="logo"
            onClick={handleLogoClick}
            className="w-20 h-20 sm:w-24 sm:h-24 cursor-pointer"
          />

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-10">
            <NavLink to="/products" className={navClass}>
              PRODUCTS
            </NavLink>

            <NavLink to="/highlights" className={navClass}>
              HIGHLIGHTS
            </NavLink>

            <NavLink to="/order" className={navClass}>
              HOW TO ORDER
            </NavLink>

            <NavLink to="/reviews" className={navClass}>
              REVIEWS
            </NavLink>
          </div>

          {/* Desktop Theme Toggle */}
          <div className="hidden lg:block">
            <ThemeToggle />
          </div>

          {/* Mobile Controls */}
          <div className="flex lg:hidden items-center gap-4">
            <ThemeToggle />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white text-3xl"
            >
              {isOpen ? <HiOutlineX /> : <HiOutlineMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-22 right-0 z-40
          h-[calc(100vh-88px)]
          w-72
          bg-black
          border border-borderColor
          transform transition-transform duration-300
          lg:hidden
          ${isOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        <div className="flex flex-col p-8 gap-8">
          <NavLink
            to="/products"
            className={navClass}
            onClick={() => setIsOpen(false)}
          >
            PRODUCTS
          </NavLink>

          <NavLink
            to="/highlights"
            className={navClass}
            onClick={() => setIsOpen(false)}
          >
            HIGHLIGHTS
          </NavLink>

          <NavLink
            to="/order"
            className={navClass}
            onClick={() => setIsOpen(false)}
          >
            HOW TO ORDER
          </NavLink>

          <NavLink
            to="/reviews"
            className={navClass}
            onClick={() => setIsOpen(false)}
          >
            REVIEWS
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;