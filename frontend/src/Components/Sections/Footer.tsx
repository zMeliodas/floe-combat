import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black text-white px-6 sm:px-10 lg:px-20 pt-16 pb-16">
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 text-[12rem] sm:text-[18rem] lg:text-[25rem] font-black font-archivo text-white/3 leading-none tracking-tighter whitespace-nowrap select-none">
        FLOE
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="text-3xl font-archivo">FLOE</div>
          <div className="text-sm font-montserrat font-bold text-blue-400 tracking-wider mb-3">
            COMBAT
          </div>
          <p className="text-sm font-montserrat text-white/40 leading-relaxed max-w-xs">
            Where art meets the mat. Custom BJJ rashguards built by
            practitioners, for practitioners.
          </p>
        </div>

        <div>
          <div className="text-sm font-montserrat font-bold text-white/40 tracking-wider mb-4">
            NAVIGATE
          </div>
          <ul className="flex flex-col gap-2.5 text-sm text-white/40 font-montserrat">
            {[
              { to: "/products", label: "Products" },
              { to: "/highlights", label: "Highlights" },
              { to: "/order", label: "Order" },
              { to: "/reviews", label: "Reviews" },
            ].map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-sm font-montserrat tracking-wider font-bold text-neutral-500 mb-4">
            FOLLOW THE MOVEMENT
          </div>
          <ul className="flex flex-col gap-2.5 text-sm text-white/40 font-montserrat">
            {[
              {
                href: "https://www.facebook.com/profile.php?id=61573306476553",
                label: "Facebook",
              },
              {
                href: "https://www.instagram.com/floe.combat/",
                label: "Instagram",
              },
              {
                href: "https://www.tiktok.com/@floe.combat?lang=en",
                label: "TikTok",
              },
            ].map(({ href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors inline-flex items-center gap-1"
                >
                  {label} →
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="relative z-10 mt-16 pt-5 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-xs sm:text-sm font-montserrat font-bold tracking-widest text-white/40">
        <span>© 2026 FLOE COMBAT. ALL RIGHTS RESERVED.</span>
        <span className="sm:text-right">WHERE ART MEETS THE MAT.</span>
      </div>
    </footer>
  );
};

export default Footer;
