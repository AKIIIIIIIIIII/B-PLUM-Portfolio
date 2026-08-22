import { Link } from "react-router-dom";
import { useLocale } from "../use-locale";
import { Reveal } from "./Reveal";

export function Hero() {
  const { locale, copy } = useLocale();
  return (
    <section className="relative overflow-hidden bg-[#fdfcfb] px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:min-h-[800px] lg:px-[clamp(1.5rem,calc((100vw-1280px)/2),5.9375rem)] lg:pb-20 lg:pt-36">
      <div className="pointer-events-none absolute left-1/2 top-36 h-[min(90vw,420px)] w-[min(90vw,420px)] -translate-x-1/2 rounded-full bg-[#e8eae3]/60 blur-[120px] motion-safe:animate-pulse lg:left-auto lg:right-20 lg:top-48 lg:h-[560px] lg:w-[560px]" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid w-full max-w-[1280px] gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(280px,477px)] lg:items-start lg:gap-x-[clamp(2rem,5vw,6.25rem)]">
        <Reveal className="min-w-0 lg:max-w-[707px]">
          <div className="mb-12 sm:mb-20 lg:mb-24">
            <h1 className="font-serif text-[clamp(3.5rem,10vw+0.5rem,8.5rem)] leading-[0.92] tracking-[-0.08em]">
              <span className="block text-neutral-900 transition-transform duration-700 hover:translate-x-2">Silent</span>
              <span className="block pl-1 italic text-neutral-300 transition-transform duration-700 hover:translate-x-4 sm:pl-3 lg:pl-5">Narrative.</span>
            </h1>
          </div>
          <div className="max-w-[512px] space-y-8 sm:space-y-12">
            <p className="text-base font-light leading-relaxed text-neutral-500 sm:text-lg sm:leading-9">
              {copy.hero.body}
            </p>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10">
              <Link to={`/${locale}#works`} className="inline-flex min-h-11 items-center self-start border-b border-neutral-900 py-3 text-[11px] font-bold uppercase tracking-[5px] text-neutral-900 transition-opacity hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900">
                {copy.hero.archive}
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay="medium" className="relative mx-auto w-full max-w-lg shrink-0 lg:mx-0 lg:mt-0 lg:max-w-[477px]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] transition-transform duration-1000 hover:scale-[1.02]">
            <img src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800" alt={copy.hero.imageAlt} className="h-full w-full object-cover" width="800" height="1000" fetchPriority="high" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
