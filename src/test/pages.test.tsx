import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { NotFoundPage, ProjectPage } from "../pages/ProjectPage";
import { HomePage } from "../pages/HomePage";

function renderProject(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("project routes", () => {
  it("renders the Easy Cat Minesweeper repository action", () => {
    renderProject("/projects/easy-cat-minesweeper");
    const repositoryLink = screen.getByRole("link", { name: /view repository/i });

    expect(screen.getByRole("heading", { name: "Easy Cat Minesweeper" })).toBeInTheDocument();
    expect(repositoryLink).toHaveAttribute("href", "https://github.com/AKIIIIIIIIIII/B-PLUM-EasyCatMinesweeper");
    expect(repositoryLink).toHaveAttribute("target", "_blank");
    expect(repositoryLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders the Plum.B detail page", () => {
    renderProject("/projects/plum-b");
    expect(screen.getByRole("heading", { name: "Plum.B" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view repository/i })).toHaveAttribute("href", "https://github.com/AKIIIIIIIIIII/B-PLUM-ASK");
    expect(screen.getByRole("heading", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getAllByAltText("Plum.B hexagram result screen")).toHaveLength(1);
    expect(screen.getByAltText("Plum.B ready-to-cast input screen")).toHaveClass("h-auto", "object-contain");
    expect(screen.getByAltText("Plum.B empty input screen")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /next project/i })).toHaveAttribute("href", "/projects/eco-flow-system");
  });

  it("renders a coming soon status without an invalid repository link", () => {
    renderProject("/projects/eco-flow-system");
    expect(screen.getByRole("heading", { name: "Eco Flow System" })).toBeInTheDocument();
    expect(screen.getByText("Coming soon")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /view repository/i })).not.toBeInTheDocument();
  });

  it("renders the not found page for an unknown project", () => {
    renderProject("/projects/missing");
    expect(screen.getByRole("heading", { name: "Quietly missing." })).toBeInTheDocument();
  });
});

describe("home sections", () => {
  it("exposes the three primary section titles at stable anchors", () => {
    render(<MemoryRouter initialEntries={["/"]}><HomePage /></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "A space for ideas." })).toHaveAttribute("id", "about");
    expect(screen.getByRole("heading", { name: "Selected projects." })).toHaveAttribute("id", "works");
    expect(screen.getByText("Contact", { selector: "p" })).toHaveAttribute("id", "contact");
  });
});
