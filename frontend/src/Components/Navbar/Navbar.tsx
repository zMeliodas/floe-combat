import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logos/floelogo.svg";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `text-md font-montserrat font-bold cursor-pointer transition duration-300 ${
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
    <nav className="bg-nav backdrop-blur-xs flex justify-around px-4 items-center border-b border-b-borderColor w-full py-1 fixed h-22 z-50">
      <img
        src={logo}
        alt="logo"
        onClick={handleLogoClick}
        className="w-26 h-26 cursor-pointer"
      />

      <div className="flex gap-10 items-center transition-all duration-300">
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

      <ThemeToggle />
    </nav>
  );
};

export default Navbar;
