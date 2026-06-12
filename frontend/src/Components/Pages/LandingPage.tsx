import About from "../Sections/About";
import Hero from "../Sections/Hero";
import Showcase from "../Sections/Showcase";
import Values from "../Sections/Values";

const LandingPage = () => {
  return (
    <main className="bg-black min-h-screen">
      <section className="h-screen flex items-center pt-24">
        <Hero />
      </section>

      <section className="h-screen flex items-center justify-center border-y border-borderColor">
        <About />
      </section>

      <section className="h-screen flex items-center justify-center border-y border-borderColor">
        <Values />
      </section>

      <section className="h-screen flex items-center justify-center border-y border-borderColor">
        <Showcase />
      </section>
    </main>
  );
};

export default LandingPage;
