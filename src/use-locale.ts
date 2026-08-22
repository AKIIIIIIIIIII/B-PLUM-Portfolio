import { createContext, useContext } from "react";
import type { Locale, SiteCopy } from "./i18n";

interface LocaleContextValue {
  locale: Locale;
  copy: SiteCopy;
}

export const LocaleContext = createContext<LocaleContextValue | undefined>(undefined);

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) throw new Error("useLocale must be used within LocaleProvider");
  return context;
}
