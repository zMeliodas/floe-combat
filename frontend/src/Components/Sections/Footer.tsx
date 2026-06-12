const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-black text-white px-86 pt-16 pb-16">
      <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-0 text-[25rem] font-black font-archivo text-white/3 leading-none tracking-tighter whitespace-nowrap select-none">
        FLOE
      </div>

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
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
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Projects
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Stories
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Reviews
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Commission
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-sm font-montserrat tracking-wider font-bold text-neutral-500 mb-4">
            FOLLOW THE MOVEMENT
          </div>
          <ul className="flex flex-col gap-2.5 text-sm text-white/40 font-montserrat">
            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61573306476553"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1"
              >
                Facebook →
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/floe.combat/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1"
              >
                Instagram →
              </a>
            </li>
            <li>
              <a
                href="https://www.tiktok.com/@floe.combat?lang=en"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-1"
              >
                TikTok →
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative z-10 mt-16 pt-5 border-t border-white/10 flex flex-col md:flex-row justify-between gap-2 text-sm font-montserrat font-bold tracking-widest text-white/40">
        <span>© 2026 FLOE COMBAT. ALL RIGHTS RESERVED.</span>
        <span>WHERE ART MEETS THE MAT.</span>
      </div>
    </footer>
  );
};

export default Footer;
