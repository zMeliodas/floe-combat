import About from "../Sections/About";
import Hero from "../Sections/Hero";
import Showcase from "../Sections/Showcase";
import Values from "../Sections/Values";

const LandingPage = () => {
  return (
    <main className="bg-black">
      <section className="min-h-screen flex items-center pt-24">
        <Hero />
        <span className="absolute bottom-8 right-8 sm:right-12 font-montserrat text-[11px] font-bold tracking-[3px] text-white/30">
          SCROLL
        </span>
      </section>

      <section className="min-h-screen flex items-center justify-center border-y border-borderColor">
        <About />
      </section>

      <section className="min-h-screen flex items-center justify-center border-y border-borderColor">
        <Values />
      </section>

      <section className="min-h-screen flex items-center justify-center border-y border-borderColor">
        <Showcase />
      </section>
    </main>
  );
};

export default LandingPage;
