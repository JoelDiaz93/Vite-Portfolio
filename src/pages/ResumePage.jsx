import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";
import Icon from "../components/Icon";

export default function ResumePage() {
  const { language } = useSite();
  const content = useMemo(() => siteContent[language], [language]);
  const { resume } = content;
  const isSpanish = language === "es";

  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <main className="resume-page resume-access-page">
      <section className="resume-hero resume-access-hero">
        <div className="shell resume-access-shell">
          <Link className="case-back" to={`/${language}`}>{content.common.backToPortfolio}</Link>
          <p className="eyebrow">{isSpanish ? "CV PROFESIONAL" : "PROFESSIONAL RESUME"}</p>
          <h1>{isSpanish ? "Carlos Díaz · Ingeniero de Software" : "Carlos Díaz · Software Engineer"}</h1>
          <p className="resume-lead">
            {isSpanish
              ? "Accede al CV completo en PDF. Esta página funciona como respaldo para navegadores o enlaces guardados; los accesos CV del portafolio abren directamente el documento."
              : "Open the complete PDF resume. This page is a reliable fallback for browsers or saved links; Resume links across the portfolio open the document directly."}
          </p>

          <div className="resume-access-card">
            <div>
              <span>{isSpanish ? "VERSIÓN PRINCIPAL" : "PRIMARY VERSION"}</span>
              <strong>{isSpanish ? "CV en español" : "English resume"}</strong>
              <p>{isSpanish ? "Perfil profesional, experiencia, proyectos, educación y formación técnica." : "Professional profile, experience, projects, education and technical training."}</p>
            </div>
            <div className="resume-actions">
              <a className="button button-primary" href={resume.currentDownload} target="_blank" rel="noreferrer">
                {isSpanish ? "Abrir CV PDF" : "Open PDF resume"} <Icon name="external" />
              </a>
              <a className="button button-ghost" href={resume.currentDownload} download>
                {isSpanish ? "Descargar" : "Download"} <Icon name="download" />
              </a>
            </div>
          </div>

          <div className="resume-access-alt">
            <span>{isSpanish ? "También disponible" : "Also available"}</span>
            <a href={resume.alternateDownload} target="_blank" rel="noreferrer">
              {isSpanish ? "English resume" : "CV en español"} <Icon name="external" size={16} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
