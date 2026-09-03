import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import EventraCaseStudy from "./pages/EventraCaseStudy";
import ProjectCaseStudy from "./pages/ProjectCaseStudy";
import ResumePage from "./pages/ResumePage";
import { SiteProvider, useSite } from "./context/SiteContext";
import { siteContent } from "./data/portfolio";

function ScrollHash() {
  const location = useLocation();
  useEffect(() => {
    if (!location.hash) return;
    requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth" }));
  }, [location]);
  return null;
}

function LocaleSync({ children }) {
  const { lang } = useParams();
  const { setLanguage } = useSite();
  const valid = lang === "en" || lang === "es";

  useEffect(() => {
    if (valid) setLanguage(lang);
  }, [lang, setLanguage, valid]);

  if (!valid) return <Navigate to="/en" replace />;
  return children;
}

function RootRedirect() {
  const { language } = useSite();
  return <Navigate to={`/${language}`} replace />;
}

function LegacyEventraRedirect() {
  const { language } = useSite();
  return <Navigate to={`/${language}/projects/eventra`} replace />;
}

function upsertLink(rel, hreflang, href) {
  const selector = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]:not([hreflang])`;
  let node = document.head.querySelector(selector);
  if (!node) {
    node = document.createElement("link");
    node.rel = rel;
    if (hreflang) node.hreflang = hreflang;
    document.head.appendChild(node);
  }
  node.href = href;
}

function MetaManager() {
  const location = useLocation();
  const { language, theme } = useSite();

  useEffect(() => {
    const content = siteContent[language];
    document.documentElement.lang = language;
    const projectSlug = location.pathname.match(/\/projects\/([^/]+)/)?.[1];
    const isResume = /\/resume\/?$/.test(location.pathname);
    const projectContent = projectSlug === "eventra" ? content.eventra : content.projectCases?.[projectSlug];
    const pageContent = isResume ? content.resume : projectContent;
    document.title = pageContent?.pageTitle || content.meta.title;

    const descriptionText = pageContent?.metaDescription || content.meta.description;
    const description = document.querySelector('meta[name="description"]');
    if (description) description.setAttribute("content", descriptionText);

    const ogType = document.querySelector('meta[property="og:type"]');
    if (ogType) ogType.setAttribute("content", projectSlug || isResume ? "article" : "profile");
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", document.title);
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", descriptionText);
    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute("content", language === "es" ? "es_EC" : "en_US");
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute("content", window.location.href.split("#")[0]);

    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) twitterTitle.setAttribute("content", document.title);
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) twitterDescription.setAttribute("content", descriptionText);

    const imagePath = ["routefast", "eventra", "qrflow", "cerynt"].includes(projectSlug) ? `/og/${projectSlug}.png` : "/og/portfolio.png";
    const absoluteImage = `${window.location.origin}${imagePath}`;
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute("content", absoluteImage);
    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) twitterImage.setAttribute("content", absoluteImage);
    const ogImageAlt = document.querySelector('meta[property="og:image:alt"]');
    if (ogImageAlt) ogImageAlt.setAttribute("content", projectSlug ? `${pageContent?.title || "Carlos Díaz"} · Carlos Díaz portfolio` : "Carlos Díaz · Software Engineer · Backend · Cloud · Distributed Systems");

    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor) themeColor.setAttribute("content", theme === "dark" ? "#0E1411" : "#F2F3F0");

    const suffix = isResume ? "/resume" : projectSlug ? `/projects/${projectSlug}` : "";
    const origin = window.location.origin;
    upsertLink("canonical", null, `${origin}/${language}${suffix}`);
    upsertLink("alternate", "en", `${origin}/en${suffix}`);
    upsertLink("alternate", "es", `${origin}/es${suffix}`);
    upsertLink("alternate", "x-default", `${origin}/en${suffix}`);
  }, [location.pathname, language, theme]);

  return null;
}

function AppShell() {
  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Navbar />
      <div id="main-content">
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route path="/projects/eventra" element={<LegacyEventraRedirect />} />
          <Route path="/:lang" element={<LocaleSync><Home /></LocaleSync>} />
          <Route path="/:lang/resume" element={<LocaleSync><ResumePage /></LocaleSync>} />
          <Route path="/:lang/projects/eventra" element={<LocaleSync><EventraCaseStudy /></LocaleSync>} />
          <Route path="/:lang/projects/:projectSlug" element={<LocaleSync><ProjectCaseStudy /></LocaleSync>} />
          <Route path="*" element={<RootRedirect />} />
        </Routes>
      </div>
      <Footer />
      <ScrollHash />
      <MetaManager />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteProvider>
        <AppShell />
      </SiteProvider>
    </BrowserRouter>
  );
}
