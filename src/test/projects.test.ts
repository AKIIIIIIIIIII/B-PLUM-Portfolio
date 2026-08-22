import { describe, expect, it } from "vitest";
import { getAdjacentProjects, getProject, getProjectLocale, projects } from "../data/projects";

describe("project content", () => {
  const caseStudySectionIds = ["context", "contribution", "decisions", "implementation", "outcome"];

  it("keeps the two real projects in the intended order", () => {
    expect(projects.filter((project) => project.featured).map((project) => project.slug)).toEqual([
      "easy-cat-minesweeper",
      "plum-b",
    ]);
  });

  it("uses the shared case study structure for every project", () => {
    for (const project of projects) {
      expect(getProjectLocale(project).sections.map((section) => section.id)).toEqual(caseStudySectionIds);
      expect(getProjectLocale(project).sections.map((section) => section.title)).toEqual([
        "Context & goal",
        "My contribution",
        "Experience & decisions",
        "Implementation",
        "Outcome & learnings",
      ]);
      expect(getProjectLocale(project).sections.find((section) => section.id === "contribution")?.content).toMatch(/independently/i);
    }
  });

  it("resolves Plum.B with two supporting gallery frames", () => {
    expect(getProject("plum-b")?.title).toBe("Plum.B");
    expect(getProject("plum-b")?.gallery).toHaveLength(2);
  });

  it("removes the Eco Flow System example", () => {
    expect(getProject("eco-flow-system")).toBeUndefined();
  });

  it("returns circular previous and next projects", () => {
    expect(getAdjacentProjects("easy-cat-minesweeper").next?.slug).toBe("plum-b");
    expect(getAdjacentProjects("easy-cat-minesweeper").previous?.slug).toBe("plum-b");
    expect(getAdjacentProjects("plum-b").next?.slug).toBe("easy-cat-minesweeper");
    expect(getAdjacentProjects("plum-b").previous?.slug).toBe("easy-cat-minesweeper");
  });
});
