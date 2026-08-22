import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { App } from "../App";
import { detectLocale, localeStorageKey, localizePath } from "../i18n";
import { LocaleProvider } from "../locale-context";
import { HomePage } from "../pages/HomePage";

describe("locale detection and routing", () => {
  beforeEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, "", "/");
  });

  afterEach(() => {
    window.localStorage.clear();
    window.history.replaceState({}, "", "/");
  });

  it("prefers a remembered choice over the browser language", () => {
    Object.defineProperty(window.navigator, "languages", { configurable: true, value: ["ja-JP"] });
    window.localStorage.setItem(localeStorageKey, "zh");
    expect(detectLocale()).toBe("zh");
  });

  it("detects supported browser languages and falls back to English", () => {
    Object.defineProperty(window.navigator, "languages", { configurable: true, value: ["ja-JP"] });
    expect(detectLocale()).toBe("ja");
    Object.defineProperty(window.navigator, "languages", { configurable: true, value: ["fr-FR"] });
    expect(detectLocale()).toBe("en");
  });

  it("replaces only the locale segment of an existing path", () => {
    expect(localizePath("/ja/projects/plum-b", "zh")).toBe("/zh/projects/plum-b");
    expect(localizePath("/projects/plum-b", "en")).toBe("/en/projects/plum-b");
  });

  it("redirects old project links to the remembered language", async () => {
    window.localStorage.setItem(localeStorageKey, "zh");
    window.history.replaceState({}, "", "/projects/plum-b");
    render(<App />);

    await waitFor(() => expect(window.location.pathname).toBe("/zh/projects/plum-b"));
    expect(screen.getByText("项目案例")).toBeInTheDocument();
  });
});

describe("localized metadata", () => {
  it("sets document language, localized metadata, canonical and alternate links", async () => {
    window.history.replaceState({}, "", "/zh");
    render(
      <MemoryRouter initialEntries={["/zh"]}>
        <LocaleProvider locale="zh"><HomePage /></LocaleProvider>
      </MemoryRouter>,
    );

    await waitFor(() => expect(document.documentElement.lang).toBe("zh-CN"));
    expect(document.title).toBe("b-plum — Silent Narrative.");
    expect(document.head.querySelector('meta[name="description"]')).toHaveAttribute("content", expect.stringContaining("个人项目"));
    expect(document.head.querySelector('meta[property="og:locale"]')).toHaveAttribute("content", "zh_CN");
    expect(document.head.querySelector('link[rel="canonical"]')).toHaveAttribute("href", "http://localhost:3000/zh");
    expect(document.head.querySelector('link[rel="alternate"][hreflang="en"]')).toHaveAttribute("href", "http://localhost:3000/en");
    expect(document.head.querySelector('link[rel="alternate"][hreflang="ja"]')).toHaveAttribute("href", "http://localhost:3000/ja");
    expect(document.head.querySelector('link[rel="alternate"][hreflang="zh-CN"]')).toHaveAttribute("href", "http://localhost:3000/zh");
    expect(document.head.querySelector('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", "http://localhost:3000/");
  });
});
