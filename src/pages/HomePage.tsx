import { useCallback, useLayoutEffect, useState } from "react";
import { About } from "../components/About";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ProjectGrid } from "../components/ProjectGrid";
import { Reveal } from "../components/Reveal";
import { useLocale } from "../use-locale";
import { usePageMetadata } from "../seo";
import { SupportPanel } from "../components/BuyMeACoffee";

export function HomePage() {
  const { locale, copy } = useLocale();
  const [supportOpen, setSupportOpen] = useState(false);
  const openSupport = useCallback(() => setSupportOpen(true), []);
  const closeSupport = useCallback(() => setSupportOpen(false), []);
  usePageMetadata({ locale, title: copy.seo.homeTitle, description: copy.seo.homeDescription, path: `/${locale}` });

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
        <Hero onSupport={openSupport} />
        <About />
        <ProjectGrid />
        <section className="bg-white py-20 text-center sm:py-28 lg:py-40">
          <div className="site-container">
          <Reveal className="mx-auto max-w-4xl">
            <blockquote className="mb-10 font-serif text-[clamp(1.35rem,3.5vw+0.5rem,3rem)] font-medium italic leading-snug sm:mb-14">
              “{copy.quote}”
            </blockquote>
            <cite className="text-[9px] font-bold uppercase not-italic tracking-[4px] sm:text-[10px]">Antoine de Saint-Exupéry</cite>
          </Reveal>
          </div>
        </section>
      </main>
      <Footer onSupport={openSupport} />
      <SupportPanel open={supportOpen} title={copy.contact.supportTitle} closeLabel={copy.contact.supportClose} externalLabel={copy.contact.supportExternal} frameTitle={copy.contact.supportFrameTitle} onClose={closeSupport} />
    </div>
  );
}
