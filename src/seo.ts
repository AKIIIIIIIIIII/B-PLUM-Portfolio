import { useEffect } from "react";
import { localeConfig, locales, localizePath, type Locale } from "./i18n";

interface MetadataOptions {
  locale: Locale;
  title: string;
  description: string;
  path?: string;
}

function ensureMeta(selector: string, attribute: "name" | "property", value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, value);
    document.head.append(element);
  }
  return element;
}

function ensureLink(selector: string, rel: string) {
  let element = document.head.querySelector<HTMLLinkElement>(selector);
  if (!element) {
    element = document.createElement("link");
    element.rel = rel;
    element.dataset.i18nSeo = "true";
    document.head.append(element);
  }
  return element;
}

export function usePageMetadata({ locale, title, description, path = window.location.pathname }: MetadataOptions) {
  useEffect(() => {
    const origin = window.location.origin;
    const localizedPath = localizePath(path, locale);
    document.title = title;
    ensureMeta('meta[name="description"]', "name", "description").content = description;
    ensureMeta('meta[property="og:title"]', "property", "og:title").content = title;
    ensureMeta('meta[property="og:description"]', "property", "og:description").content = description;
    ensureMeta('meta[property="og:locale"]', "property", "og:locale").content = localeConfig[locale].ogLocale;
    ensureMeta('meta[property="og:url"]', "property", "og:url").content = `${origin}${localizedPath}`;

    const canonical = ensureLink('link[rel="canonical"]', "canonical");
    canonical.href = `${origin}${localizedPath}`;

    document.head.querySelectorAll('link[rel="alternate"][data-i18n-seo="true"]').forEach((element) => element.remove());
    for (const alternateLocale of locales) {
      const alternate = ensureLink(`link[rel="alternate"][hreflang="${localeConfig[alternateLocale].htmlLang}"]`, "alternate");
      alternate.hreflang = localeConfig[alternateLocale].htmlLang;
      alternate.href = `${origin}${localizePath(path, alternateLocale)}`;
    }
    const fallback = ensureLink('link[rel="alternate"][hreflang="x-default"]', "alternate");
    fallback.hreflang = "x-default";
    fallback.href = `${origin}/`;
  }, [description, locale, path, title]);
}
