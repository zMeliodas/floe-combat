const LandingPage = () => {
  return (
    <main className="bg-black h-screen flex items-center pt-24 overflow-auto">
      <span className="text-white/40 text-md font-montserrat font-bold rotate-90 tracking-widest pt-46">
        BJJ RASHGUARD — EST. 2026
      </span>

      <div className="flex flex-col">
        <p className="text-floesky font-archivo text-sm font-light tracking-widest animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:500ms] opacity-0">
          WHERE ART MEETS THE MAT.
        </p>
        <div className="flex flex-col my-5">
          <h1 className="text-white text-[11rem] text-logo font-archivo tracking-tighter leading-none animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:700ms] opacity-0">
            FLOE
          </h1>
          <h1 className="text-floesky text-[11rem] text-logo font-archivo tracking-tighter leading-none animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:700ms] opacity-0">
            COMBAT
          </h1>
        </div>
        <p className="text-white/60 font-montserrat text-lg font-light tracking-widest mb-8 max-w-lg animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:850ms] opacity-0">
          By Practitioners, For Practitioners. Custom rashguards crafted with
          purpose and built for the mat.
        </p>

        <div className="flex items-center gap-4 animate-[fadeInUp_0.6s_ease-out_forwards] [animation-delay:1000ms] opacity-0">
          <button className="bg-floesky font-montserrat font-bold text-white text-sm w-66 h-13 tracking-widest animate-[neonPulse_2.5s_ease-in-out_infinite] transition-all duration-300 hover:bg-white hover:text-black cursor-pointer">
            START COMMISSION →
          </button>
          <div className="flex items-center gap-2 group">
            <span className="content-center font-montserrat text-white/70 text-sm h-12 tracking-widest group-hover:text-white transition cursor-pointer">
              VIEW PROJECTS
            </span>
            <span className="inline-block w-6 h-px bg-white/60 group-hover:bg-white transition"></span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LandingPage;
