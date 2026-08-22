import { Link } from "react-router-dom";
import { getProjectLocale } from "../data/projects";
import { useLocale } from "../use-locale";
import type { Project } from "../types/project";
import { Reveal } from "./Reveal";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { locale, copy: site } = useLocale();
  const copy = getProjectLocale(project, locale);
  const coverPosition = project.slug === "easy-cat-minesweeper"
    ? "object-[50%_12%]"
    : project.slug === "plum-b"
      ? "object-[50%_5%]"
      : "object-center";

  return (
    <Reveal delay={index === 1 ? "medium" : index === 2 ? "long" : "short"}>
      <article className="group relative min-h-[18rem] overflow-hidden rounded-md bg-neutral-100 sm:aspect-[16/10] sm:min-h-0 lg:aspect-[1280/582]">
        <img src={project.coverImage.src} alt={copy.coverImage.alt} className={`absolute inset-0 h-full w-full object-cover ${coverPosition} transition-transform duration-1000 group-hover:scale-105`} width="1280" height="582" loading="lazy" />
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/55 px-6 py-12 transition-colors duration-500 group-hover:bg-neutral-900/40 sm:px-12">
          <div className="flex max-w-[560px] flex-col items-center text-center transition-transform duration-700 group-hover:scale-105">
            <p className="text-[10px] uppercase tracking-[6px] text-white/65">{copy.category}</p>
            <h3 className="mt-6 font-serif text-[clamp(1.75rem,6vw,4rem)] font-medium italic leading-none text-white">{copy.title}</h3>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {project.technologies.map((technology) => <span key={technology} className="inline-flex h-6 items-center rounded-full border border-white/25 px-4 text-[9px] uppercase tracking-[1px] text-white/85">{technology}</span>)}
            </div>
            {project.status === "published" ? (
              <Link to={`/${locale}/projects/${project.slug}`} className="mt-8 inline-flex h-10 min-w-44 items-center justify-center rounded-full bg-white px-6 text-[10px] font-bold uppercase tracking-[3px] text-neutral-900 transition-colors hover:bg-neutral-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white lg:mt-10">{site.works.viewProject}</Link>
            ) : (
              <span className="mt-8 inline-flex h-10 items-center rounded-full border border-white/40 px-6 text-[10px] font-bold uppercase tracking-[3px] text-white/80">{site.works.comingSoon}</span>
            )}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
