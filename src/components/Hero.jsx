import { motion } from "framer-motion";
import { useMemo } from "react";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";
import Icon from "./Icon";
import SoftwareJourney from "./SoftwareJourney";

export default function Hero() {
  const { language } = useSite();
  const { hero, common, resume } = useMemo(() => siteContent[language], [language]);

  return (
    <section className="landing-hero" id="top">
      <div className="landing-hero-noise" />
      <div className="landing-hero-grid" />

      <div className="shell landing-hero-layout">
        <motion.div
          className="landing-hero-copy"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="landing-availability">
            <span aria-hidden="true" />
            <span>{hero.availability}</span>
          </div>

          <p className="landing-hero-overline">{hero.overline}</p>
          <h1 className="landing-hero-title" dangerouslySetInnerHTML={{ __html: hero.title }} />
          <p className="landing-hero-lead">{hero.lead}</p>

          <div className="landing-hero-actions">
            <a className="button button-primary" href="#projects">
              {common.exploreWork} <Icon name="arrow" />
            </a>
            <a className="button button-ghost" href="#contact">{common.discussProject}</a>
          </div>

          <div className="landing-hero-metrics" aria-label={language === "es" ? "Resumen profesional" : "Professional summary"}>
            {hero.metrics.map((item, index) => (
              <article key={item.label} className="landing-hero-metric">
                <Icon name={["briefcase", "code", "architecture"][index]} size={21} />
                <div>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="landing-hero-journey"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.72, delay: 0.12 }}
        >
          <SoftwareJourney data={hero.journey} />
          <div className="landing-hero-stack">
            <span>{hero.focusLabel}</span>
            <div className="landing-hero-chips">
              {hero.focus.map((item) => <b key={item}>{item}</b>)}
              <b className="landing-hero-more">+ {hero.moreLabel}</b>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="shell landing-hero-meta">
        <div className="landing-hero-socials" aria-label={language === "es" ? "Perfiles profesionales" : "Professional profiles"}>
          <a href="https://github.com/JoelDiaz93" target="_blank" rel="noreferrer">
            <Icon name="github" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/cjoeldiaz/" target="_blank" rel="noreferrer">
            <Icon name="linkedin" /> LinkedIn
          </a>
          <a href="#contact">
            <Icon name="mail" /> {language === "es" ? "Contacto" : "Contact"}
          </a>
          <a href={resume.currentDownload} target="_blank" rel="noreferrer">
            <Icon name="download" /> {common.resume}
          </a>
        </div>
        <span>Quito · Remote / Hybrid</span>
      </div>

      <div className="landing-hero-marquee" aria-hidden="true">
        <div className="landing-hero-marquee-track">
          <span>{hero.marquee}</span>
          <span>{hero.marquee}</span>
          <span>{hero.marquee}</span>
        </div>
      </div>
    </section>
  );
}
