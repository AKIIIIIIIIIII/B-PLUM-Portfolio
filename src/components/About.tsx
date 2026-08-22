import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function About() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 md:px-12 lg:px-24 lg:py-40">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-12 sm:gap-16 lg:gap-20">
        <SectionHeading id="about" eyebrow="About Me" title="A space" accent="for ideas." />
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-24">
        <Reveal className="overflow-hidden rounded-md bg-[#fafafa] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)]">
          <img src="/images/about.jpg" alt="b-plum portrait" className="aspect-[4/5] h-full w-full object-cover object-center transition-transform duration-1000 hover:scale-[1.01] sm:aspect-square" width="1200" height="800" loading="lazy" />
        </Reveal>
        <Reveal delay="short" className="lg:pt-14">
          <h3 className="mb-8 font-serif text-[clamp(2.5rem,5vw+0.5rem,4.5rem)] font-medium leading-[1.12] sm:mb-12">
            コードで、<br /><span className="italic font-normal text-neutral-600">体温</span>を届ける。
          </h3>
          <p className="mb-10 max-w-[592px] text-base font-light leading-relaxed text-neutral-500 sm:mb-16 sm:text-lg sm:leading-8">
            b-plumは、私のデジタルな実験と創造の場です。ウェブアプリは単なるツールの集まりではありません。それは、作り手の思索がユーザーと交差する「空間」だと考えています。
          </p>
          <div className="flex flex-wrap gap-x-12 gap-y-8 sm:gap-24">
            <div>
              <span className="mb-2 block font-serif text-3xl font-medium">3</span>
              <span className="text-[10px] uppercase tracking-[1px] text-neutral-400">Personal Projects</span>
            </div>
            <div>
              <span className="mb-2 block font-serif text-3xl font-medium">1年</span>
              <span className="text-[10px] uppercase tracking-[1px] text-neutral-400">Dev Experience</span>
            </div>
          </div>
        </Reveal>
        </div>
      </div>
    </section>
  );
}
