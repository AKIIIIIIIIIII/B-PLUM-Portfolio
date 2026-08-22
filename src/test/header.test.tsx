import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import { Header } from "../components/Header";

function LocationProbe() {
  const location = useLocation();
  return <output data-testid="location">{location.pathname}{location.hash}</output>;
}

describe("section navigation", () => {
  it("smoothly scrolls to a section on the home page and updates the hash", () => {
    const scrollIntoView = vi.fn();
    Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: scrollIntoView });

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
        <div id="works" />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getAllByRole("link", { name: "Works" })[0]);

    expect(window.location.hash).toBe("#works");
    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: "smooth", block: "start" });
  });

  it("keeps the destination hash when navigating from a project page", () => {
    render(
      <MemoryRouter initialEntries={["/projects/plum-b"]}>
        <Header />
        <LocationProbe />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getAllByRole("link", { name: "Contact" })[0]);

    expect(screen.getByTestId("location")).toHaveTextContent("/#contact");
  });
});
