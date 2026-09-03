import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, theme, toggleTheme } = useSite();
  const content = useMemo(() => siteContent[language], [language]);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1060) setOpen(false);
    };

    document.body.classList.toggle("nav-open", open);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const goSection = (id) => {
    setOpen(false);
    const homePath = `/${language}`;
    if (location.pathname !== homePath) {
      navigate(`${homePath}#${id}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const switchLanguage = () => {
    const next = language === "en" ? "es" : "en";
    setLanguage(next);
    const suffix = location.pathname.replace(/^\/(en|es)/, "") || "";
    navigate(`/${next}${suffix}${location.hash || ""}`);
    setOpen(false);
  };

  return (
    <header className={`site-nav ${compact ? "is-compact" : ""}`}>
      <div className="nav-inner">
        <Link className="brand" to={`/${language}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Carlos Díaz home">
          <span className="brand-mark">CD</span>
          <span className="brand-copy">
            <strong>Carlos Díaz</strong>
            <small>{language === "es" ? "Ingeniero de Software" : "Software Engineer"}</small>
          </span>
        </Link>

        <nav id="primary-navigation" className={`nav-links ${open ? "is-open" : ""}`} aria-label="Primary navigation">
          {content.navLinks.map((item) => (
            <button key={item.id} type="button" onClick={() => goSection(item.id)}>{item.title}</button>
          ))}
          <div className="nav-controls">
            <button type="button" className="pill-control language-control" onClick={switchLanguage} aria-label={content.common.language}>
              <span className={language === "en" ? "is-active" : ""}>EN</span>
              <i />
              <span className={language === "es" ? "is-active" : ""}>ES</span>
            </button>
            <button type="button" className="pill-control theme-control" onClick={toggleTheme} aria-label="Toggle theme">
              <span className="theme-symbol">{theme === "dark" ? "☾" : "☀"}</span>
              <span>{theme === "dark" ? content.common.themeDark : content.common.themeLight}</span>
            </button>
          </div>
          <button type="button" className="nav-cta" onClick={() => goSection("contact")}>{content.common.startConversation}</button>
        </nav>

        <button className={`menu-button ${open ? "is-open" : ""}`} type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls="primary-navigation" aria-label="Toggle navigation">
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
