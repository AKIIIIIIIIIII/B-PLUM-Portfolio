import { useLayoutEffect, type ReactNode } from "react";
import { localeConfig, siteCopy, type Locale } from "./i18n";
import { LocaleContext } from "./use-locale";

export function LocaleProvider({ locale, children }: { locale: Locale; children: ReactNode }) {
  useLayoutEffect(() => {
    document.documentElement.lang = localeConfig[locale].htmlLang;
    document.documentElement.dataset.locale = locale;
  }, [locale]);

  return <LocaleContext.Provider value={{ locale, copy: siteCopy[locale] }}>{children}</LocaleContext.Provider>;
}
