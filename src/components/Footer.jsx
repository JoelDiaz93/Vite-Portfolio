import { useMemo } from "react";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";

export default function Footer() {
  const { language } = useSite();
  const { footer } = useMemo(() => siteContent[language], [language]);

  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <div><strong>{footer.title}</strong><span>{footer.subtitle}</span></div>
        <div><a href="https://github.com/JoelDiaz93" target="_blank" rel="noreferrer">GitHub</a><a href="#top">{footer.backToTop}</a></div>
      </div>
    </footer>
  );
}
