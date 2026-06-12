import { Link } from "react-router-dom";
import logo from "../../assets/floelogo.svg";
import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
  return (
    <>
      <nav className="bg-backgroundColor flex justify-around px-4 items-center border-b border-b-gray-1000 w-full py-1 fixed h-22 z-10">
        <img src={logo} alt="logo" className="w-26 h-26 cursor-pointer" />

        <div className="flex gap-10 items-center">
          <p className="text-md font-montserrat font-bold text-white/60 hover:text-white cursor-pointer transition duration-300">
            PROJECTS
          </p>
          <p className="text-md font-montserrat font-bold text-white/60 hover:text-white cursor-pointer transition duration-300">
            STORIES
          </p>
          <p className="text-md font-montserrat font-bold text-white/60 hover:text-white cursor-pointer transition duration-300">
            REVIEWS
          </p>
          <p className="text-md font-montserrat font-bold text-white/60 hover:text-white cursor-pointer transition duration-300">
            ABOUT
          </p>
        </div>

        <ThemeToggle />
      </nav>
    </>
  );
};

export default Navbar;
