import type { Project, ProjectLocale } from "../types/project";

const en = (locale: ProjectLocale) => ({ en: locale });

export const projects: Project[] = [
  {
    slug: "easy-cat-minesweeper",
    title: "Easy Cat Minesweeper",
    year: "2025",
    status: "published",
    technologies: ["Java", "Swing", "Game"],
    platform: "Desktop / JDK 17+",
    coverImage: { src: "https://raw.githubusercontent.com/AKIIIIIIIIIII/B-PLUM-EasyCatMinesweeper/main/docs/screenshot.jpg", alt: "Easy Cat Minesweeper game interface with cat-themed visuals" },
    repositoryUrl: "https://github.com/AKIIIIIIIIIII/B-PLUM-EasyCatMinesweeper",
    featured: true,
    locales: en({
      title: "Easy Cat Minesweeper",
      category: "Mini Game",
      summary: "A Java Swing desktop game that layers a small cat-themed visual experience onto the familiar rhythm of Minesweeper.",
      sections: [
        { id: "overview", title: "Overview", content: "Easy Cat Minesweeper is a focused game experiment that reworks the familiar Minesweeper rules with cat-themed visuals and gentle interaction feedback." },
        { id: "experience", title: "Gameplay & feedback", content: "The first click is kept safe, while left-click opens a tile and right-click places or removes a mark. Hover and pressed states give each tile a clear response, and the status panel keeps remaining marks, elapsed time, and game state visible without interrupting play." },
        { id: "structure", title: "Implementation structure", content: "`Minesweeper_Win` manages the window and input, while `MapTop` and `MapBottom` divide the visible tile layer from the underlying board. `BottomCat`, `Num`, and `GameUtil` keep mine generation, number calculation, shared state, and UI settings in focused units." },
      ],
    }),
  },
  {
    slug: "plum-b",
    title: "Plum.B",
    year: "2025",
    status: "published",
    technologies: ["Swift", "SwiftUI", "I Ching"],
    platform: "iOS / SwiftUI",
    coverImage: { src: "https://raw.githubusercontent.com/AKIIIIIIIIIII/B-PLUM-ASK/main/docs/images/result-page.png", alt: "Plum.B hexagram result screen" },
    gallery: [
      { src: "https://raw.githubusercontent.com/AKIIIIIIIIIII/B-PLUM-ASK/main/docs/images/input-empty.png", alt: "Plum.B empty input screen", caption: "Input" },
      { src: "https://raw.githubusercontent.com/AKIIIIIIIIIII/B-PLUM-ASK/main/docs/images/input-ready.png", alt: "Plum.B ready-to-cast input screen", caption: "Ready" },
      { src: "https://raw.githubusercontent.com/AKIIIIIIIIIII/B-PLUM-ASK/main/docs/images/result-page.png", alt: "Plum.B hexagram result screen", caption: "Result" },
    ],
    repositoryUrl: "https://github.com/AKIIIIIIIIIII/B-PLUM-ASK",
    featured: true,
    locales: en({
      title: "Plum.B",
      category: "Mobile App",
      summary: "A SwiftUI app that turns a three-number I Ching consultation into a quiet, readable result experience.",
      sections: [
        { id: "overview", title: "Overview", content: "Plum.B is a minimalist divination experience inspired by classical East Asian typography and the symbolic structure of the I Ching. The flow from input to result is designed as one calm, continuous reading space." },
        { id: "flow", title: "The casting flow", content: "Users enter three numbers and then move into a generated hexagram result. Judgment text, image commentary, the moving line, and the full six-line reading are arranged as a sequence so each layer can be read without losing the larger context." },
        { id: "type", title: "Typography as structure", content: "Rather than compressing every piece of interpretation into one screen, the interface uses whitespace, type scale, and a steady heading rhythm to guide attention. The result keeps the atmosphere of classical text while remaining legible on a contemporary mobile screen." },
      ],
    }),
  },
  {
    slug: "eco-flow-system",
    title: "Eco Flow System",
    year: "In progress",
    status: "coming-soon",
    technologies: ["React Native", "Firebase", "IoT"],
    platform: "Mobile concept",
    coverImage: { src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1280", alt: "Abstract green and blue texture representing Eco Flow System" },
    featured: true,
    locales: en({
      title: "Eco Flow System",
      category: "Personal App",
      summary: "An early concept for reframing everyday environmental signals as a calmer view of progress.",
      sections: [
        { id: "concept", title: "Concept", content: "Eco Flow System is a personal app concept for looking at environmental data and small behavior changes from a low-pressure perspective." },
        { id: "direction", title: "Design direction", content: "The project explores how signals from IoT devices could become a calm flow to reflect on, rather than a wall of numbers. React Native and Firebase are being considered as the foundation for a lightweight mobile record of everyday change." },
        { id: "status", title: "Current status", content: "This project is currently at the concept stage. The next step is to clarify which signals are meaningful and what kind of feedback can support everyday action without adding noise." },
      ],
    }),
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export function getProjectLocale(project: Project, locale: keyof Project["locales"] = "en") {
  return project.locales[locale] ?? project.locales.en;
}

export function getAdjacentProjects(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return { previous: undefined, next: undefined };
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
