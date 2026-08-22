import { describe, expect, it } from "vitest";
import { getAdjacentProjects, getProject, getProjectLocale, projects } from "../data/projects";

describe("project content", () => {
  it("keeps three featured projects in the intended order", () => {
    expect(projects.filter((project) => project.featured).map((project) => project.slug)).toEqual([
      "easy-cat-minesweeper",
      "plum-b",
      "eco-flow-system",
    ]);
  });

  it("resolves a project by slug", () => {
    expect(getProject("plum-b")?.title).toBe("Plum.B");
    expect(getProjectLocale(getProject("plum-b")!).sections.map((section) => section.id)).toEqual(["overview", "flow", "type"]);
    expect(getProjectLocale(getProject("plum-b")!).sections[0].title).toBe("Overview");
    expect(getProject("plum-b")?.gallery).toHaveLength(3);
  });

  it("keeps coming-soon projects free from invalid links", () => {
    const project = getProject("eco-flow-system");
    expect(project?.status).toBe("coming-soon");
    expect(project?.repositoryUrl).toBeUndefined();
    expect(project?.liveUrl).toBeUndefined();
  });

  it("returns circular previous and next projects", () => {
    expect(getAdjacentProjects("easy-cat-minesweeper").next?.slug).toBe("plum-b");
    expect(getAdjacentProjects("easy-cat-minesweeper").previous?.slug).toBe("eco-flow-system");
  });
});
