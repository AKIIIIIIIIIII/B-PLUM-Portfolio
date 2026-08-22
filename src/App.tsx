import { BrowserRouter, Navigate, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom";
import { detectLocale, isLocale } from "./i18n";
import { LocaleProvider } from "./locale-context";
import { HomePage } from "./pages/HomePage";
import { NotFoundPage, ProjectPage } from "./pages/ProjectPage";

function RootRedirect() {
  const location = useLocation();
  const locale = detectLocale();
  return <Navigate replace to={`/${locale}${location.search}${location.hash}`} />;
}

function LegacyProjectRedirect() {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const locale = detectLocale();
  return <Navigate replace to={`/${locale}/projects/${slug ?? ""}${location.search}${location.hash}`} />;
}

function LocaleLayout() {
  const { locale } = useParams<{ locale: string }>();
  if (!isLocale(locale)) return <RootRedirect />;
  return <LocaleProvider locale={locale}><Outlet /></LocaleProvider>;
}

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRedirect />} />
        <Route path="/projects/:slug" element={<LegacyProjectRedirect />} />
        <Route path="/:locale" element={<LocaleLayout />}>
          <Route index element={<HomePage />} />
          <Route path="projects/:slug" element={<ProjectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        <Route path="*" element={<RootRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}
