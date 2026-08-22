import { projects } from "../data/projects";
import { Reveal } from "./Reveal";
import { ProjectCard } from "./ProjectCard";
import { SectionHeading } from "./SectionHeading";
import { useLocale } from "../use-locale";

export function ProjectGrid() {
  const { copy } = useLocale();
  const featured = projects.filter((project) => project.featured);

  return (
    <section className="bg-white px-4 py-20 sm:px-6 sm:py-28 md:px-12 lg:px-24 lg:py-40">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 sm:gap-16 lg:gap-24">
        <SectionHeading id="works" eyebrow={copy.works.eyebrow} title={copy.works.title} accent={copy.works.accent} />

        <div className="flex flex-col gap-8 lg:gap-8">
          {featured.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}
        </div>

        <Reveal className="flex justify-center pt-4 sm:pt-8">
          <a href="https://github.com/AKIIIIIIIIIII" target="_blank" rel="noopener noreferrer" className="inline-flex h-14 w-full max-w-60 items-center justify-center rounded-full border border-neutral-100 bg-white text-[11px] font-bold uppercase tracking-[4px] text-neutral-900 shadow-sm transition-all hover:border-neutral-900 hover:bg-neutral-900 hover:text-white hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900">{copy.works.github}</a>
        </Reveal>
      </div>
    </section>
  );
}
