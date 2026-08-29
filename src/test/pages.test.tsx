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
  it.each([
    [
      "fusheng-records",
      "B-PLUM-FushengRecords",
      "A ChatGPT and Codex plugin that turns memories and future wishes into collectible tickets, then stores them in a local interactive album modeled after traditional Chinese books.",
      "Closed Fusheng Records album on a traditional wooden desk",
      ["Closed Fusheng Records album", "Past chapter with memorial tickets", "Future chapter with wish tickets"],
    ],
    [
      "easy-cat-minesweeper",
      "B-PLUM-EasyCatMinesweeper",
      "A desktop Minesweeper game built with Java Swing, with cat artwork and understated interaction feedback.",
      "Cat-themed B-PLUM-EasyCatMinesweeper game board",
      ["Desktop game board"],
    ],
    [
      "plum-b",
      "B-PLUM-Ask",
      "A SwiftUI app that casts an I Ching hexagram from three numbers and presents the reading in a calm, legible layout.",
      "B-PLUM-Ask hexagram reading screen",
      ["Generated hexagram reading", "Empty input screen", "Completed input screen"],
    ],
  ])("renders the rewritten English copy for %s", (slug, title, summary, coverAlt, captions) => {
    renderProject(`/en/projects/${slug}`);

    expect(screen.getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
    expect(screen.getByAltText(coverAlt)).toBeInTheDocument();
    for (const caption of captions) expect(screen.getByText(caption)).toBeInTheDocument();
    for (const sectionTitle of ["Context & goal", "My contribution", "Experience & decisions", "Implementation", "Outcome & learnings"]) {
      expect(screen.getByRole("heading", { name: sectionTitle })).toBeInTheDocument();
    }
  });

  it.each([
    [
      "fusheng-records",
      "B-PLUM-FushengRecords",
      "人生の記憶やこれから叶えたいことを切符に仕立て、古籍風のインタラクティブな冊子へ収める、ChatGPT・Codex向けプラグインです。データはローカルに保存します。",
      "伝統的な机に置かれた、表紙を閉じた浮生録",
      ["表紙を閉じた浮生録", "記念票を収めた過去篇", "願いの切符を収めた未来篇"],
    ],
    [
      "easy-cat-minesweeper",
      "B-PLUM-EasyCatMinesweeper",
      "猫のビジュアルを取り入れた、Java Swing製のデスクトップ版マインスイーパーです。",
      "猫のビジュアルを取り入れたB-PLUM-EasyCatMinesweeperのゲーム画面",
      ["デスクトップ版のプレイ画面"],
    ],
    [
      "plum-b",
      "B-PLUM-Ask",
      "3つの数字から易の卦を立て、結果を落ち着いて読める形で表示するSwiftUIアプリです。",
      "B-PLUM-Askの占断結果画面",
      ["生成した占断結果", "入力前の画面", "卦を立てる前の入力完了画面"],
    ],
  ])("renders the rewritten Japanese copy for %s", (slug, title, summary, coverAlt, captions) => {
    renderProject(`/ja/projects/${slug}`, "ja");

    expect(screen.getByRole("heading", { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
    expect(screen.getByAltText(coverAlt)).toBeInTheDocument();
    for (const caption of captions) expect(screen.getByText(caption)).toBeInTheDocument();
    for (const sectionTitle of ["背景と目標", "担当したこと", "体験設計と判断", "実装", "成果と学び"]) {
      expect(screen.getByRole("heading", { name: sectionTitle })).toBeInTheDocument();
    }
  });

  it("keeps the navigation, primary image, and first section in narrow-screen reading order while aligning the desktop content row", () => {
    renderProject("/en/projects/fusheng-records");

    const navigation = screen.getByRole("navigation", { name: "Project sections" });
    const primaryImage = screen.getByTestId("project-primary-image");
    const firstHeading = screen.getByRole("heading", { name: "Context & goal" });
    const article = firstHeading.closest("article");
    const firstSection = firstHeading.closest("section");

    expect(navigation.compareDocumentPosition(primaryImage) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(primaryImage.compareDocumentPosition(firstHeading) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(primaryImage).toHaveClass("xl:row-start-2");
    expect(article).toHaveClass("xl:row-start-2");
    expect(article).not.toHaveClass("mt-12");
    expect(firstSection).toHaveClass("first:pt-0");
  });

  it("uses a smaller responsive size and safe wrapping for the longest next-project title", () => {
    renderProject("/en/projects/fusheng-records");

    const nextProjectTitle = screen.getByRole("heading", { level: 2, name: "B-PLUM-EasyCatMinesweeper" });

    expect(nextProjectTitle).toHaveClass("text-[clamp(2.5rem,5vw,5rem)]", "break-words", "[overflow-wrap:anywhere]");
    expect(nextProjectTitle).not.toHaveClass("text-[clamp(3rem,8vw,7rem)]");
  });

  it("renders the Fusheng Records case study and repository action", () => {
    renderProject("/en/projects/fusheng-records");
    const repositoryLink = screen.getByRole("link", { name: /view repository/i });

    expect(screen.getByRole("heading", { name: "B-PLUM-FushengRecords" })).toBeInTheDocument();
    expect(screen.getByText("Closed Fusheng Records album")).toBeInTheDocument();
    expect(screen.getByText("Past chapter with memorial tickets")).toBeInTheDocument();
    expect(screen.getByText("Future chapter with wish tickets")).toBeInTheDocument();
    expect(screen.getByAltText("Fusheng Records past chapter filled with memorial tickets")).toHaveClass("h-auto", "object-contain");
    expect(repositoryLink).toHaveAttribute("href", "https://github.com/Tabascoiiii/B-PLUM-FushengRecords");
    expect(repositoryLink).toHaveAttribute("target", "_blank");
    expect(repositoryLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: /next project/i })).toHaveAttribute("href", "/en/projects/easy-cat-minesweeper");
    expect(screen.getByRole("link", { name: /previous project/i })).toHaveAttribute("href", "/en/projects/plum-b");
  });

  it("renders the Easy Cat Minesweeper repository action", () => {
    renderProject("/en/projects/easy-cat-minesweeper");
    const repositoryLink = screen.getByRole("link", { name: /view repository/i });

    expect(screen.getByRole("heading", { name: "B-PLUM-EasyCatMinesweeper" })).toBeInTheDocument();
    expect(screen.getByText("Desktop game board")).toBeInTheDocument();
    expect(repositoryLink).toHaveAttribute("href", "https://github.com/AKIIIIIIIIIII/B-PLUM-EasyCatMinesweeper");
    expect(repositoryLink).toHaveAttribute("target", "_blank");
    expect(repositoryLink).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByAltText("B-PLUM-Ask hexagram reading screen")).toHaveClass("aspect-[3/4]", "object-[50%_10%]");
    expect(screen.queryByRole("button", { name: "Open Buy Me a Coffee" })).not.toBeInTheDocument();
    expect(screen.queryByAltText("QR code to support b-plum on Buy Me a Coffee")).not.toBeInTheDocument();
  });

  it("renders the B-PLUM-Ask detail page", () => {
    renderProject("/en/projects/plum-b");
    expect(screen.getByRole("heading", { name: "B-PLUM-Ask" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view repository/i })).toHaveAttribute("href", "https://github.com/AKIIIIIIIIIII/B-PLUM-Ask");
    expect(screen.getByText("Case study")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Context & goal" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "My contribution" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Outcome & learnings" })).toBeInTheDocument();
    expect(screen.getAllByAltText("B-PLUM-Ask hexagram reading screen")).toHaveLength(1);
    expect(screen.getByAltText("B-PLUM-Ask with all three numbers entered")).toHaveClass("h-auto", "object-contain");
    expect(screen.getByAltText("B-PLUM-Ask before any numbers are entered")).toBeInTheDocument();
    expect(screen.getByText("Generated hexagram reading")).toBeInTheDocument();
    expect(screen.getByText("Empty input screen")).toBeInTheDocument();
    expect(screen.getByText("Completed input screen")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /next project/i })).toHaveAttribute("href", "/en/projects/fusheng-records");
    expect(screen.getByRole("link", { name: /previous project/i })).toHaveAttribute("href", "/en/projects/easy-cat-minesweeper");
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
    expect(screen.getByText("3", { selector: "span" })).toBeInTheDocument();
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

    renderProject(`/${locale}/projects/fusheng-records`, locale);
    expect(screen.getByRole("heading", { name: locale === "ja" ? "背景と目標" : "背景与目标" })).toBeInTheDocument();
    expect(screen.getByText(locale === "ja" ? "ケーススタディ" : "项目案例")).toBeInTheDocument();
    expect(screen.getByText(locale === "ja" ? "表紙を閉じた浮生録" : "合拢状态的浮生录")).toBeInTheDocument();
  });
});
