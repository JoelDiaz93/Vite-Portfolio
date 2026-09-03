import { motion } from "framer-motion";
import { useMemo } from "react";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";
import Icon from "./Icon";
import SoftwareJourney from "./SoftwareJourney";

export default function Hero() {
  const { language } = useSite();
  const { hero, common } = useMemo(() => siteContent[language], [language]);

  return (
    <section className="hero" id="top">
      <div className="hero-noise" />
      <div className="hero-grid" />
      <div className="shell hero-layout hero-layout-v31">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
          <div className="availability"><span /> {hero.availability}</div>
          <p className="hero-overline">{hero.overline}</p>
          <h1 dangerouslySetInnerHTML={{ __html: hero.title }} />
          <p className="hero-lead">{hero.lead}</p>

          <div className="hero-actions">
            <a className="button button-primary" href="#projects">{common.exploreWork} <Icon name="arrow" /></a>
            <a className="button button-ghost" href="#contact">{common.discussProject}</a>
          </div>

          <div className="hero-metrics">
            {hero.metrics.map((item, index) => (
              <article key={item.label} className="hero-metric">
                <Icon name={["briefcase", "code", "user"][index]} size={21} />
                <div><strong>{item.value}</strong><span>{item.label}</span></div>
              </article>
            ))}
          </div>
        </motion.div>

        <motion.div className="hero-journey-wrap" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: .72, delay: .12 }}>
          <SoftwareJourney data={hero.journey} />
          <div className="hero-stack-row">
            <span>{hero.focusLabel}</span>
            <div className="hero-stack-chips">
              {hero.focus.map((item) => <b key={item}>{item}</b>)}
              <b className="hero-more">+ {hero.moreLabel}</b>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hero-lower shell">
        <div className="hero-meta">
          <a href="https://github.com/JoelDiaz93" target="_blank" rel="noreferrer"><Icon name="github" /> GitHub</a>
          <span>Quito · Remote / Hybrid</span>
        </div>
      </div>
      <div className="hero-marquee" aria-hidden="true"><div className="hero-marquee-track"><span>{hero.marquee}</span><span>{hero.marquee}</span><span>{hero.marquee}</span></div></div>
    </section>
  );
}
