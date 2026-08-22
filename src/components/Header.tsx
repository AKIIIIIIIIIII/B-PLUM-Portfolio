import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { id: "about", href: "/#about", label: "About" },
  { id: "works", href: "/#works", label: "Works" },
  { id: "contact", href: "/#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    setOpen(false);
    if (location.pathname !== "/") return;

    const target = document.getElementById(sectionId);
    if (!target) return;

    event.preventDefault();
    window.history.replaceState(null, "", `/#${sectionId}`);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex h-20 items-center justify-between border-b border-neutral-100 bg-white/75 px-4 backdrop-blur-xl transition-shadow sm:px-8 lg:px-16">
        <Link to="/" className="flex min-w-0 shrink-0 items-center gap-3" aria-label="b-plum home">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 font-serif text-[10px] italic text-white">bp</span>
          <span className="truncate font-serif text-lg italic tracking-[2px] sm:text-xl">b-plum</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex lg:gap-12" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} to={link.href} className="text-[10px] font-medium uppercase tracking-[4px] text-neutral-400 transition-colors hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900" onClick={(event) => handleSectionClick(event, link.id)}>
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-100 text-neutral-900 transition-colors hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="relative h-4 w-5" aria-hidden="true">
            <span className={`absolute left-0 top-1/2 h-px w-5 bg-current transition-transform ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute left-0 top-1/2 h-px w-5 bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 top-1/2 h-px w-5 bg-current transition-transform ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </span>
        </button>
      </header>

      <nav id="mobile-navigation" className={`fixed inset-x-0 top-20 z-40 flex flex-col gap-1 border-b border-neutral-100 bg-white/95 px-4 py-4 shadow-lg backdrop-blur-md transition-[opacity,transform] md:hidden ${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`} aria-label="Mobile navigation">
        {links.map((link) => (
          <Link key={link.href} to={link.href} className="rounded-md px-4 py-3 text-sm font-medium uppercase tracking-[3px] text-neutral-500 transition-colors hover:bg-[#fdfcfb] hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900" onClick={(event) => handleSectionClick(event, link.id)}>
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
