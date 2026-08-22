import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { useLocale } from "../use-locale";

export function About() {
  const { copy } = useLocale();
  return (
    <section className="bg-white py-20 sm:py-28 lg:py-40">
      <div className="site-container flex flex-col gap-12 sm:gap-16 lg:gap-20">
        <SectionHeading id="about" eyebrow={copy.about.eyebrow} title={copy.about.title} accent={copy.about.accent} />
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-24">
        <Reveal className="overflow-hidden rounded-md bg-[#fafafa] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)]">
          <img src="/images/about.jpg" alt={copy.about.imageAlt} className="aspect-[4/5] h-full w-full object-cover object-center transition-transform duration-1000 hover:scale-[1.01] sm:aspect-square" width="1200" height="800" loading="lazy" />
        </Reveal>
        <Reveal delay="short" className="lg:pt-14">
          <h3 className="mb-8 font-serif text-[clamp(2.5rem,5vw+0.5rem,4.5rem)] font-medium leading-[1.12] sm:mb-12">
            {copy.about.statementStart}<br /><span className="italic font-normal text-neutral-600">{copy.about.statementAccent}</span>{copy.about.statementEnd}
          </h3>
          <p className="mb-10 max-w-[592px] text-base font-light leading-relaxed text-neutral-500 sm:mb-16 sm:text-lg sm:leading-8">
            {copy.about.body}
          </p>
          <div className="flex flex-wrap gap-x-12 gap-y-8 sm:gap-24">
            <div>
              <span className="mb-2 block font-serif text-3xl font-medium">2</span>
              <span className="text-[10px] uppercase tracking-[1px] text-neutral-400">{copy.about.projects}</span>
            </div>
            <div>
              <span className="mb-2 block font-serif text-3xl font-medium">{copy.about.experienceValue}</span>
              <span className="text-[10px] uppercase tracking-[1px] text-neutral-400">{copy.about.experience}</span>
            </div>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
