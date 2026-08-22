export type ProjectStatus = "published" | "coming-soon";

export interface ProjectSection {
  id: string;
  title: string;
  content: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface ProjectLocale {
  title: string;
  category: string;
  summary: string;
  sections: ProjectSection[];
}

export interface Project {
  slug: string;
  /** Compatibility alias for older consumers; locale data is canonical. */
  title: string;
  year: string;
  status: ProjectStatus;
  technologies: string[];
  platform: string;
  coverImage: ProjectImage;
  gallery?: ProjectImage[];
  repositoryUrl?: string;
  liveUrl?: string;
  featured: boolean;
  locales: {
    en: ProjectLocale;
    [locale: string]: ProjectLocale;
  };
}
