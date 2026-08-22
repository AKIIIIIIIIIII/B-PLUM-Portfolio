import type { Locale } from "../i18n";

export type ProjectStatus = "published" | "coming-soon";

export interface ProjectSection {
  id: string;
  title: string;
  content: string;
}

export interface ProjectImage {
  src: string;
}

export interface ProjectImageCopy {
  alt: string;
  caption?: string;
}

export interface ProjectLocale {
  title: string;
  category: string;
  summary: string;
  sections: ProjectSection[];
  coverImage: ProjectImageCopy;
  gallery?: ProjectImageCopy[];
}

export interface Project {
  slug: string;
  year: string;
  status: ProjectStatus;
  technologies: string[];
  platform: string;
  coverImage: ProjectImage;
  gallery?: ProjectImage[];
  repositoryUrl?: string;
  liveUrl?: string;
  featured: boolean;
  locales: Record<Locale, ProjectLocale>;
}
