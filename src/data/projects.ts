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
    coverImage: { src: "https://raw.githubusercontent.com/AKIIIIIIIIIII/B-PLUM-EasyCatMinesweeper/main/docs/screenshot.jpg", alt: "Easy Cat Minesweeper game interface with cat-themed visuals", caption: "Playable desktop interface" },
    repositoryUrl: "https://github.com/AKIIIIIIIIIII/B-PLUM-EasyCatMinesweeper",
    featured: true,
    locales: en({
      title: "Easy Cat Minesweeper",
      category: "Mini Game",
      summary: "A Java Swing desktop game that layers a small cat-themed visual experience onto the familiar rhythm of Minesweeper.",
      sections: [
        { id: "context", title: "Context & goal", content: "Easy Cat Minesweeper began as an independent desktop experiment: rebuild the familiar Minesweeper loop in Java Swing while making the experience feel more approachable through cat-themed imagery and gentle visual feedback. The goal was a compact, playable game that preserves the rules players already understand without inheriting the severity of a traditional system interface." },
        { id: "contribution", title: "My contribution", content: "I independently shaped the concept, visual direction, interaction behavior, game rules, and Java Swing implementation. I also organized the source into focused units for the window, board layers, mine generation, number calculation, shared state, and interface settings." },
        { id: "decisions", title: "Experience & decisions", content: "The first click is always safe so a new round begins without an arbitrary loss. Left-click opens a tile, right-click places or removes a mark, and hover and pressed states make the board respond clearly to every action. A compact status panel keeps the remaining marks, elapsed time, and current game state visible without interrupting play." },
        { id: "implementation", title: "Implementation", content: "`Minesweeper_Win` creates the Swing window and handles mouse events, while `MapTop` and `MapBottom` separate the visible tile layer from the underlying minefield. `BottomCat` generates mines, `Num` calculates nearby mine counts, and `GameUtil` centralizes shared state, images, constants, and UI settings." },
        { id: "outcome", title: "Outcome & learnings", content: "The result is a complete playable desktop loop for JDK 17+, including safe board generation, opening and marking interactions, timing, status feedback, and win or loss handling. Building it reinforced how separating board state from the visible layer makes interaction rules easier to reason about, and how small feedback states can give a familiar game a distinct character." },
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
    coverImage: { src: "https://raw.githubusercontent.com/AKIIIIIIIIIII/B-PLUM-ASK/main/docs/images/result-page.png", alt: "Plum.B hexagram result screen", caption: "Generated hexagram result" },
    gallery: [
      { src: "https://raw.githubusercontent.com/AKIIIIIIIIIII/B-PLUM-ASK/main/docs/images/input-empty.png", alt: "Plum.B empty input screen", caption: "Empty input state" },
      { src: "https://raw.githubusercontent.com/AKIIIIIIIIIII/B-PLUM-ASK/main/docs/images/input-ready.png", alt: "Plum.B ready-to-cast input screen", caption: "Ready-to-cast state" },
    ],
    repositoryUrl: "https://github.com/AKIIIIIIIIIII/B-PLUM-ASK",
    featured: true,
    locales: en({
      title: "Plum.B",
      category: "Mobile App",
      summary: "A SwiftUI app that turns a three-number I Ching consultation into a quiet, readable result experience.",
      sections: [
        { id: "context", title: "Context & goal", content: "Plum.B began with the question of how a three-number I Ching consultation could become a calm mobile reading experience rather than a dense utility screen. The goal was to respect the symbolic structure and typographic atmosphere of the source material while making the path from input to interpretation clear on a contemporary phone." },
        { id: "contribution", title: "My contribution", content: "I independently developed the product concept, visual direction, interaction flow, typographic system, and SwiftUI implementation. I defined how users move from three numeric inputs to a generated result and how each layer of the reading is ordered on screen." },
        { id: "decisions", title: "Experience & decisions", content: "The casting flow keeps the input state deliberately minimal, then opens into a longer result page only after the three numbers are ready. Whitespace, restrained type scales, and a steady heading rhythm separate the judgment, commentary, moving line, and full reading without turning them into disconnected cards." },
        { id: "implementation", title: "Implementation", content: "The app uses SwiftUI to build the input and result flows. Three numeric inputs generate a hexagram, after which the result view presents the gua, judgment text, da xiang, tuan zhuan, moving line, and all six lines in a structured reading sequence." },
        { id: "outcome", title: "Outcome & learnings", content: "The resulting prototype completes the journey from an empty input state to a generated, readable hexagram result. The project showed that dense classical content does not need to be compressed to feel efficient: careful hierarchy, spacing, and pacing can preserve context while making each layer easier to absorb." },
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
