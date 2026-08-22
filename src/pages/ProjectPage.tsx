import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { getAdjacentProjects, getProject, getProjectLocale } from "../data/projects";
import { useLocale } from "../use-locale";
import { usePageMetadata } from "../seo";
import type { Project, ProjectImageCopy, ProjectSection } from "../types/project";

function MarkdownSection({ section }: { section: ProjectSection }) {
  return (
    <section id={section.id} className="scroll-mt-28 border-t border-neutral-200/80 pt-10 first:border-t-0 first:pt-0 sm:pt-14">
      <h2 className="mb-5 font-serif text-3xl font-medium tracking-[-0.03em] text-neutral-900 sm:text-4xl">{section.title}</h2>
      <ReactMarkdown components={{
        p: ({ children }) => <p className="mb-5 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="mb-5 list-disc space-y-2 pl-5 last:mb-0">{children}</ul>,
        li: ({ children }) => <li>{children}</li>,
        strong: ({ children }) => <strong className="font-medium text-neutral-900">{children}</strong>,
        code: ({ children }) => <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.9em] text-neutral-800">{children}</code>,
        a: ({ children, href }) => <a className="text-neutral-900 underline underline-offset-4 transition-opacity hover:opacity-60" href={href}>{children}</a>,
      }}>{section.content}</ReactMarkdown>
    </section>
  );
}

function ProjectImage({ image, imageCopy, featured = false }: { image: Project["coverImage"]; imageCopy: ProjectImageCopy; featured?: boolean }) {
  return (
    <figure className={`overflow-hidden rounded-[2px] bg-neutral-100 ${featured ? "shadow-[0_30px_80px_-32px_rgba(0,0,0,0.35)]" : ""}`}>
      <img src={image.src} alt={imageCopy.alt} className={`w-full ${featured ? "h-full object-cover" : "h-auto object-contain"}`} loading={featured ? "eager" : "lazy"} />
      {imageCopy.caption && <figcaption className="border-t border-neutral-200/80 px-4 py-3 text-[9px] uppercase tracking-[3px] text-neutral-400">{imageCopy.caption}</figcaption>}
    </figure>
  );
}

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const { locale, copy: site } = useLocale();
  const project = slug ? getProject(slug) : undefined;
  const localizedProject = project ? getProjectLocale(project, locale) : undefined;
  usePageMetadata({
    locale,
    title: localizedProject ? `${localizedProject.title} — b-plum` : site.seo.notFoundTitle,
    description: localizedProject?.summary ?? site.notFound.body,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [project]);

  if (!project) return <NotFoundPage />;

  const copy = getProjectLocale(project, locale);
  const gallery = project.gallery;
  const { previous, next } = getAdjacentProjects(project.slug);
  const nextCopy = next ? getProjectLocale(next, locale) : undefined;
  const previousCopy = previous ? getProjectLocale(previous, locale) : undefined;
  const statusLabel = project.status === "published" ? site.project.published : site.project.inProgress;

  return (
    <div className="min-h-screen bg-[#fdfcfb] font-sans text-neutral-900 antialiased">
      <Header />
      <main>
        <section className="mx-auto max-w-[1440px] px-4 pb-20 pt-32 sm:px-8 sm:pb-28 sm:pt-40 lg:px-16 lg:pb-36">
          <Link to={`/${locale}#works`} className="inline-flex min-h-11 items-center gap-3 text-[10px] font-bold uppercase tracking-[3px] text-neutral-400 transition-colors hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900">
            <span aria-hidden="true">←</span> {site.project.back}
          </Link>
          <div className="mt-14 max-w-none">
            <div className="mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-[4px] text-[#7e9882]">
              <span>{copy.category}</span><span aria-hidden="true" className="text-neutral-300">/</span><span>{project.year}</span>
            </div>
            <h1 className="break-words font-serif text-[clamp(3rem,10vw,6rem)] font-medium leading-[0.9] tracking-[-0.06em] [overflow-wrap:anywhere] lg:text-[clamp(4rem,6.5vw,6rem)]">{copy.title}</h1>
            <p className="mt-10 max-w-none text-base font-light leading-8 text-neutral-500 sm:text-lg">{copy.summary}</p>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1440px] gap-12 px-4 pb-20 sm:px-8 sm:pb-28 lg:px-16 lg:pb-36 xl:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] xl:gap-16 2xl:gap-20">
          <div className="min-w-0 border-t border-neutral-200/80 pt-10 sm:pt-12">
            <aside>
              <p className="mb-4 text-[9px] font-bold uppercase tracking-[3px] text-neutral-400">{site.project.caseStudy}</p>
              <nav aria-label={site.project.sectionsNav} className="flex flex-wrap gap-x-5 gap-y-2">
                {copy.sections.map((section) => <a key={section.id} href={`#${section.id}`} className="text-xs text-neutral-500 underline-offset-4 transition-colors hover:text-neutral-900 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900">{section.title}</a>)}
              </nav>
            </aside>
            <article className="mt-12 max-w-3xl break-words text-base font-light leading-8 text-neutral-500 sm:text-lg">
              {copy.sections.map((section) => <MarkdownSection key={section.id} section={section} />)}
            </article>
          </div>
          <div className="min-w-0 self-start">
            <ProjectImage image={project.coverImage} imageCopy={copy.coverImage} featured />
          </div>
        </section>

        <section className="border-y border-neutral-200/80 bg-white px-4 py-8 sm:px-8 lg:px-16">
          <div className="mx-auto grid max-w-[1280px] gap-7 sm:grid-cols-2 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1.5fr)_auto] xl:gap-8 2xl:gap-12">
            <div><p className="mb-2 text-[9px] font-bold uppercase tracking-[3px] text-neutral-400">{site.project.platform}</p><p className="text-sm text-neutral-800">{project.platform}</p></div>
            <div><p className="mb-2 text-[9px] font-bold uppercase tracking-[3px] text-neutral-400">{site.project.status}</p><p className="text-sm text-neutral-800">{statusLabel}</p></div>
            <div className="sm:col-span-2 xl:col-span-1"><p className="mb-2 text-[9px] font-bold uppercase tracking-[3px] text-neutral-400">{site.project.stack}</p><div className="flex flex-wrap gap-2">{project.technologies.map((technology) => <span key={technology} className="rounded-full border border-neutral-200 px-3 py-1 text-[9px] uppercase tracking-[1px] text-neutral-500">{technology}</span>)}</div></div>
            <div className="flex flex-wrap items-start gap-x-6 gap-y-2 sm:col-span-2 xl:col-span-1 xl:col-start-4 xl:row-start-1 xl:justify-self-end">
              {project.repositoryUrl && <a aria-label={site.project.repository} href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center border-b border-neutral-900 py-2 text-[10px] font-bold uppercase tracking-[2px] transition-opacity hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900">{site.project.repository} ↗</a>}
              {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center border-b border-neutral-900 py-2 text-[10px] font-bold uppercase tracking-[2px] transition-opacity hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900">{site.project.live} ↗</a>}
              {project.status === "coming-soon" && <span className="inline-flex min-h-11 items-center text-[10px] font-bold uppercase tracking-[2px] text-neutral-400">{site.project.comingSoon}</span>}
            </div>
          </div>
        </section>

        {gallery && gallery.length > 0 && <section className="border-t border-neutral-200/80 bg-white px-4 py-16 sm:px-8 sm:py-24 lg:px-16 lg:py-32"><div className="mx-auto max-w-[1280px]"><p className="mb-8 text-[9px] font-bold uppercase tracking-[4px] text-neutral-400">{site.project.interfaceFrames}</p><div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{gallery.map((image, index) => <ProjectImage key={image.src} image={image} imageCopy={copy.gallery?.[index] ?? { alt: copy.title }} />)}</div></div></section>}

        {next && nextCopy && <section className="border-t border-neutral-200/80 bg-[#f3f1ed] px-4 py-20 sm:px-8 sm:py-28 lg:px-16 lg:py-36"><div className="mx-auto max-w-[1280px]"><div className="mb-8 flex items-center justify-between gap-5"><p className="text-[9px] font-bold uppercase tracking-[4px] text-neutral-400">{site.project.nextLabel}</p>{previous && previousCopy && previous.slug !== next.slug && <Link to={`/${locale}/projects/${previous.slug}`} className="text-[9px] font-bold uppercase tracking-[3px] text-neutral-400 transition-colors hover:text-neutral-900">← {site.project.previous}: {previousCopy.title}</Link>}</div><Link aria-label={`${site.project.next}: ${nextCopy.title}`} to={`/${locale}/projects/${next.slug}`} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-neutral-900"><div className="grid items-start gap-8 md:grid-cols-[minmax(0,1fr)_minmax(260px,380px)]"><div><p className="mb-5 text-[10px] font-bold uppercase tracking-[4px] text-[#7e9882]">{nextCopy.category} / {next.year}</p><h2 className="font-serif text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.9] tracking-[-0.06em] transition-transform duration-500 group-hover:translate-x-2">{nextCopy.title}</h2></div><img src={next.coverImage.src} alt={nextCopy.coverImage.alt} className={`w-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 ${next.slug === "plum-b" ? "aspect-[3/4] object-[50%_10%]" : "aspect-[4/3] object-center"}`} width={next.slug === "plum-b" ? "393" : "800"} height={next.slug === "plum-b" ? "2099" : "600"} loading="lazy" /></div></Link><Link to={`/${locale}#works`} className="mt-12 inline-flex min-h-11 items-center border-b border-neutral-900 py-2 text-[10px] font-bold uppercase tracking-[3px] transition-opacity hover:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900">{site.project.allWorks}</Link></div></section>}
      </main>
      <Footer />
    </div>
  );
}

export function NotFoundPage() {
  const { locale, copy } = useLocale();
  usePageMetadata({ locale, title: copy.seo.notFoundTitle, description: copy.notFound.body });
  return <div className="min-h-screen bg-[#fdfcfb] px-4 pt-32 font-sans text-neutral-900 sm:px-8 sm:pt-40"><Header /><main className="mx-auto max-w-3xl py-20"><p className="text-[10px] uppercase tracking-[4px] text-[#8ea291]">{copy.notFound.label}</p><h1 className="mt-6 font-serif text-6xl italic">{copy.notFound.title}</h1><p className="mt-8 max-w-md text-neutral-500">{copy.notFound.body}</p><Link to={`/${locale}`} className="mt-10 inline-flex min-h-11 items-center border-b border-neutral-900 text-[10px] font-bold uppercase tracking-[3px]">{copy.notFound.home}</Link></main></div>;
}
