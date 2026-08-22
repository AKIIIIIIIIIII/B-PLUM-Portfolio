import { useLayoutEffect } from "react";
import { About } from "../components/About";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ProjectGrid } from "../components/ProjectGrid";
import { Reveal } from "../components/Reveal";

export function HomePage() {
  useLayoutEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const sectionId = hash.slice(1);
    window.setTimeout(() => document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
  }, []);

  return (
    <div className="min-h-screen scroll-smooth overflow-x-hidden bg-white font-sans text-neutral-900 antialiased">
      <Header />
      <main>
        <Hero />
        <About />
        <ProjectGrid />
        <section className="bg-white px-4 py-20 text-center sm:px-6 sm:py-28 md:px-12 lg:px-24 lg:py-40">
          <Reveal className="mx-auto max-w-4xl">
            <blockquote className="mb-10 font-serif text-[clamp(1.35rem,3.5vw+0.5rem,3rem)] font-medium italic leading-snug sm:mb-14">
              「完璧とは、これ以上加えるものがない状態ではなく、これ以上削るものがない状態のことである。」
            </blockquote>
            <cite className="text-[9px] font-bold uppercase not-italic tracking-[4px] sm:text-[10px]">Antoine de Saint-Exupéry</cite>
          </Reveal>
        </section>
      </main>
      <Footer />
    </div>
  );
}
