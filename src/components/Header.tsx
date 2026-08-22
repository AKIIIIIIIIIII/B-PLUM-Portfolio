import { useEffect, useState, type MouseEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import { localeConfig, locales, localizePath, rememberLocale, type Locale } from "../i18n";
import { useLocale } from "../use-locale";

function LanguageSwitcher({ mobile = false, onNavigate }: { mobile?: boolean; onNavigate?: () => void }) {
  const { locale, copy } = useLocale();
  const location = useLocation();

  const destination = (nextLocale: Locale) => `${localizePath(location.pathname, nextLocale)}${location.search}${location.hash}`;

  return (
    <div className={`flex items-center ${mobile ? "gap-1 border-t border-neutral-100 px-2 pt-4" : "ml-8 gap-1 lg:ml-10"}`} aria-label={copy.nav.language} role="group">
      {locales.map((option) => (
        <Link
          key={option}
          to={destination(option)}
          lang={localeConfig[option].htmlLang}
          aria-current={option === locale ? "page" : undefined}
          className={`${mobile ? "min-h-10 flex-1 rounded-md px-2" : "relative min-h-8 px-2"} inline-flex items-center justify-center text-[9px] font-bold uppercase tracking-[1.5px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 ${option === locale ? (mobile ? "bg-neutral-900 text-white" : "text-neutral-900 after:absolute after:bottom-0 after:left-1/2 after:h-px after:w-3 after:-translate-x-1/2 after:bg-neutral-900") : "text-neutral-400 hover:text-neutral-900"}`}
          onClick={() => { rememberLocale(option); onNavigate?.(); }}
        >
          {mobile ? localeConfig[option].label : localeConfig[option].compactLabel}
        </Link>
      ))}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { locale, copy } = useLocale();
  const homePath = `/${locale}`;
  const links = [
    { id: "about", href: `${homePath}#about`, label: copy.nav.about },
    { id: "works", href: `${homePath}#works`, label: copy.nav.works },
    { id: "contact", href: `${homePath}#contact`, label: copy.nav.contact },
  ];

  const handleSectionClick = (event: MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    setOpen(false);
    if (location.pathname !== homePath) return;

    const target = document.getElementById(sectionId);
    if (!target) return;

    event.preventDefault();
    window.history.replaceState(null, "", `${homePath}#${sectionId}`);
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleHomeClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);
    if (location.pathname !== homePath) return;

    event.preventDefault();
    window.history.replaceState(null, "", homePath);
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
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
        <Link to={homePath} className="flex min-w-0 shrink-0 items-center gap-3" aria-label={copy.nav.home} onClick={handleHomeClick}>
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 font-serif text-[10px] italic text-white">bp</span>
          <span className="truncate font-serif text-lg italic tracking-[2px] sm:text-xl">b-plum</span>
        </Link>

        <div className="hidden items-center md:flex">
          <nav className="flex items-center gap-7 lg:gap-10" aria-label={copy.nav.primary}>
            {links.map((link) => (
              <Link key={link.href} to={link.href} className="text-[10px] font-medium uppercase tracking-[4px] text-neutral-400 transition-colors hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-neutral-900" onClick={(event) => handleSectionClick(event, link.id)}>
                {link.label}
              </Link>
            ))}
          </nav>
          <LanguageSwitcher />
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-neutral-100 text-neutral-900 transition-colors hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? copy.nav.closeMenu : copy.nav.openMenu}
          onClick={() => setOpen((current) => !current)}
        >
          <span className="relative h-4 w-5" aria-hidden="true">
            <span className={`absolute left-0 top-1/2 h-px w-5 bg-current transition-transform ${open ? "rotate-45" : "-translate-y-1.5"}`} />
            <span className={`absolute left-0 top-1/2 h-px w-5 bg-current transition-opacity ${open ? "opacity-0" : "opacity-100"}`} />
            <span className={`absolute left-0 top-1/2 h-px w-5 bg-current transition-transform ${open ? "-rotate-45" : "translate-y-1.5"}`} />
          </span>
        </button>
      </header>

      <nav id="mobile-navigation" className={`fixed inset-x-0 top-20 z-40 flex flex-col gap-1 border-b border-neutral-100 bg-white/95 px-4 py-4 shadow-lg backdrop-blur-md transition-[opacity,transform] md:hidden ${open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`} aria-label={copy.nav.primary}>
        {links.map((link) => (
          <Link key={link.href} to={link.href} className="rounded-md px-4 py-3 text-sm font-medium uppercase tracking-[3px] text-neutral-500 transition-colors hover:bg-[#fdfcfb] hover:text-neutral-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900" onClick={(event) => handleSectionClick(event, link.id)}>
            {link.label}
          </Link>
        ))}
        <LanguageSwitcher mobile onNavigate={() => setOpen(false)} />
      </nav>
    </>
  );
}
