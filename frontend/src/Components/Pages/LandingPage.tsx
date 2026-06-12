import About from "../Sections/About";
import Hero from "../Sections/Hero";
import Values from "../Sections/Values";

const LandingPage = () => {
  return (
    <main className="bg-black h-screen">
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
        {/* <CTA /> */}
      </section>
    </main>
  );
};

export default LandingPage;
