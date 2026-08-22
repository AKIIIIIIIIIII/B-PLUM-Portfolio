import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { Header } from "../components/Header";
import { LocaleProvider } from "../locale-context";

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="location">{location.pathname}{location.hash}</output>;
}

describe("section navigation", () => {
  it("shows compact desktop language labels and marks the active language", () => {
    render(
      <MemoryRouter initialEntries={["/ja"]}>
        <LocaleProvider locale="ja"><Header /></LocaleProvider>
      </MemoryRouter>,
    );

    expect(screen.getAllByRole("link", { name: "EN" })).toHaveLength(2);
    expect(screen.getAllByRole("link", { name: "JP" })[0]).toHaveAttribute("aria-current", "page");
    expect(screen.getAllByRole("link", { name: "中" })).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: "日本語" })).toHaveLength(1);
    expect(screen.getAllByRole("link", { name: "中文" })).toHaveLength(1);
  });

  it("smoothly scrolls to a section on the home page and updates the hash", () => {
    const scrollIntoView = vi.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: scrollIntoView });

    render(
      <MemoryRouter initialEntries={["/en"]}>
        <LocaleProvider locale="en"><Header /><div id="works" /></LocaleProvider>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getAllByRole("link", { name: "Works" })[0]);

    expect(window.location.hash).toBe("#works");
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });

  it("keeps the destination hash when navigating from a project page", () => {
    render(
      <MemoryRouter initialEntries={["/en/projects/plum-b"]}>
        <LocaleProvider locale="en"><Header /><LocationProbe /></LocaleProvider>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getAllByRole("link", { name: "Contact" })[0]);

    expect(screen.getByTestId("location")).toHaveTextContent("/en#contact");
  });

  it("switches language without losing the current route and hash", () => {
    render(
      <MemoryRouter initialEntries={["/ja/projects/plum-b#outcome"]}>
        <LocaleProvider locale="ja"><Header /><LocationProbe /></LocaleProvider>
      </MemoryRouter>,
    );

    fireEvent.click(screen.getAllByRole("link", { name: "中文" })[0]);
    expect(screen.getByTestId("location")).toHaveTextContent("/zh/projects/plum-b#outcome");
    expect(window.localStorage.getItem("b-plum-locale")).toBe("zh");
  });
});
