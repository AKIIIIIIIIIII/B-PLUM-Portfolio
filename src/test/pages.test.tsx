import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { NotFoundPage, ProjectPage } from "../pages/ProjectPage";
import { HomePage } from "../pages/HomePage";
import { LocaleProvider } from "../locale-context";
import type { Locale } from "../i18n";

function renderProject(path: string, locale: Locale = "en") {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <LocaleProvider locale={locale}>
        <Routes>
          <Route path="/:locale/projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </LocaleProvider>
    </MemoryRouter>,
  );
}

describe("project routes", () => {
  it("renders the Easy Cat Minesweeper repository action", () => {
    renderProject("/en/projects/easy-cat-minesweeper");
    const repositoryLink = screen.getByRole("link", { name: /view repository/i });

    expect(screen.getByRole("heading", { name: "Easy Cat Minesweeper" })).toBeInTheDocument();
    expect(screen.getByText("Playable desktop interface")).toBeInTheDocument();
    expect(repositoryLink).toHaveAttribute("href", "https://github.com/AKIIIIIIIIIII/B-PLUM-EasyCatMinesweeper");
    expect(repositoryLink).toHaveAttribute("target", "_blank");
    expect(repositoryLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByAltText("Plum.B hexagram result screen")).toHaveClass("aspect-[3/4]", "object-[50%_10%]");
    expect(screen.queryByRole("button", { name: "Open Buy Me a Coffee" })).not.toBeInTheDocument();
    expect(screen.queryByAltText("QR code to support b-plum on Buy Me a Coffee")).not.toBeInTheDocument();
  });

  it("renders the Plum.B detail page", () => {
    renderProject("/en/projects/plum-b");
    expect(screen.getByRole("heading", { name: "Plum.B" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view repository/i })).toHaveAttribute("href", "https://github.com/AKIIIIIIIIIII/B-PLUM-ASK");
    expect(screen.getByText("Case study")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Context & goal" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "My contribution" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Outcome & learnings" })).toBeInTheDocument();
    expect(screen.getAllByAltText("Plum.B hexagram result screen")).toHaveLength(1);
    expect(screen.getByAltText("Plum.B ready-to-cast input screen")).toHaveClass("h-auto", "object-contain");
    expect(screen.getByAltText("Plum.B empty input screen")).toBeInTheDocument();
    expect(screen.getByText("Generated hexagram result")).toBeInTheDocument();
    expect(screen.getByText("Empty input state")).toBeInTheDocument();
    expect(screen.getByText("Ready-to-cast state")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /next project/i })).toHaveAttribute("href", "/en/projects/easy-cat-minesweeper");
    expect(screen.queryByRole("link", { name: /previous project/i })).not.toBeInTheDocument();
  });

  it("renders the not found page for the removed Eco Flow System route", () => {
    renderProject("/en/projects/eco-flow-system");
    expect(screen.getByRole("heading", { name: "Quietly missing." })).toBeInTheDocument();
  });

  it("renders the not found page for an unknown project", () => {
    renderProject("/en/projects/missing");
    expect(screen.getByRole("heading", { name: "Quietly missing." })).toBeInTheDocument();
  });
});

describe("home sections", () => {
  it("exposes the three primary section titles at stable anchors", () => {
    render(<MemoryRouter initialEntries={["/en"]}><LocaleProvider locale="en"><HomePage /></LocaleProvider></MemoryRouter>);
    expect(screen.getByRole("heading", { name: "A space for ideas." })).toHaveAttribute("id", "about");
    expect(screen.getByRole("heading", { name: "Selected projects." })).toHaveAttribute("id", "works");
    expect(screen.getByText("Contact", { selector: "p" })).toHaveAttribute("id", "contact");
    expect(screen.getByText("2", { selector: "span" })).toBeInTheDocument();
  });

  it("opens one support panel from the native homepage actions and closes it with Escape", () => {
    render(<MemoryRouter initialEntries={["/en"]}><LocaleProvider locale="en"><HomePage /></LocaleProvider></MemoryRouter>);

    expect(screen.getAllByRole("button", { name: "Support my work" })).toHaveLength(2);
    const qrLink = screen.getByRole("link", { name: "QR code to support b-plum on Buy Me a Coffee" });
    expect(qrLink).toHaveAttribute("href", "https://www.buymeacoffee.com/plum.b");
    expect(qrLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByAltText("QR code to support b-plum on Buy Me a Coffee")).toHaveAttribute("src", "/images/qr-code.png");
    const heroSupport = screen.getAllByRole("button", { name: "Support my work" })[0];
    heroSupport.focus();
    fireEvent.click(heroSupport);

    expect(screen.getByRole("dialog", { name: "Support the work" })).toBeInTheDocument();
    expect(screen.getByTitle("Support b-plum on Buy Me a Coffee")).toHaveAttribute("src", expect.stringContaining("/widget/page/plum.b"));
    expect(screen.getByRole("link", { name: /open in a new tab/i })).toHaveAttribute("rel", "noopener noreferrer");

    fireEvent.keyDown(document, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(heroSupport).toHaveFocus();
  });

  it.each([
    ["ja" as const, "アイデアのための 余白。", "作品を見る"],
    ["zh" as const, "一处容纳 想法的空间。", "查看项目"],
  ])("renders localized %s home and project content", (locale, homeHeading, projectAction) => {
    const home = render(<MemoryRouter initialEntries={[`/${locale}`]}><LocaleProvider locale={locale}><HomePage /></LocaleProvider></MemoryRouter>);
    expect(screen.getByRole("heading", { name: homeHeading })).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: projectAction }).length).toBeGreaterThan(0);
    expect(screen.getAllByRole("button", { name: locale === "ja" ? "創作を応援する" : "支持我的创作" })).toHaveLength(2);
    expect(screen.getByAltText(locale === "ja" ? "Buy Me a Coffeeでb-plumを応援するQRコード" : "在 Buy Me a Coffee 上支持 b-plum 的二维码")).toBeInTheDocument();
    home.unmount();

    renderProject(`/${locale}/projects/plum-b`, locale);
    expect(screen.getByRole("heading", { name: locale === "ja" ? "背景と目標" : "背景与目标" })).toBeInTheDocument();
    expect(screen.getByText(locale === "ja" ? "ケーススタディ" : "项目案例")).toBeInTheDocument();
  });
});
