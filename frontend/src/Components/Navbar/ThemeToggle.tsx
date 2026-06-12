import { FiMoon } from "react-icons/fi";
import { MdOutlineWbSunny } from "react-icons/md";

export function ThemeToggle() {
  return (
    <button className="p-2 rounded-lg text-white/60 transition-colors hover:text-white transition duration-300">
      <MdOutlineWbSunny className="w-8 h-8 cursor-pointer" />
    </button>
  );
}

export default ThemeToggle;
