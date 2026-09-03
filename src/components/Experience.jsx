import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";

function CareerTimeline({ data, language }) {
  const [active, setActive] = useState(data.cards.length - 1);
  const current = data.cards[active];

  return (
    <div className="career-showcase career-showcase-v31">
      <div className="career-title-row">
        <div className="career-label"><Icon name="briefcase" size={21} /><div><strong>{data.title}</strong><span>{data.subtitle}</span></div></div>
      </div>

      <div className="career-years" role="tablist" aria-label={data.yearsLabel}>
        {data.cards.map((item, index) => (
          <button key={item.year} className={active === index ? "is-active" : ""} onClick={() => setActive(index)} role="tab" aria-selected={active === index}>
            <i className="career-dot" />
            <span>{item.year}</span>
            <strong>{item.short}</strong>
            <small>{item.stageSummary}</small>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.article key={current.year} className="career-detail-card career-detail-v31" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .24 }}>
          <div className="career-role-block">
            <p className="eyebrow">{active === data.cards.length - 1 ? data.currentLabel : current.year}</p>
            <h3>{current.role}</h3>
            <p className="career-period">{current.year}</p>
            <p className="career-company">{current.company}</p>
            <p className="career-summary">{current.summary}</p>
          </div>

          <div className="career-work-block">
            <h4>{language === "es" ? "Qué hice" : "What I did"}</h4>
            <ul>{current.highlights.map((highlight) => <li key={highlight}><Icon name="check" size={15} />{highlight}</li>)}</ul>
          </div>

          <div className="career-impact-block">
            <h4>{language === "es" ? "Impacto y contexto" : "Impact & context"}</h4>
            <div className="impact-list">
              {(current.impact ?? []).map((item, index) => <div key={item}><Icon name={["chart", "shield", "layers"][index % 3]} size={18} /><span>{item}</span></div>)}
            </div>
          </div>

          <div className="career-stack-block">
            <h4>{language === "es" ? "Tecnologías" : "Technologies"}</h4>
            <div className="tag-row">{current.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}

function EducationPath({ data }) {
  return (
    <div className="education-path education-path-v31">
      <div className="education-title">
        <div className="education-title-icon"><Icon name="graduation" size={23} /></div>
        <p className="eyebrow">{data.educationEyebrow}</p>
        <h3>{data.educationTitle}</h3>
        <p>{data.educationSubtitle}</p>
      </div>
      <div className="education-steps">
        {data.education.map((item, index) => (
          <motion.article key={item.title} className="education-step" whileHover={{ y: -4 }}>
            <div className="education-index">{String(index + 1).padStart(2, "0")}</div>
            <span className="education-period">{item.period}</span>
            <h4>{item.title}</h4>
            <strong>{item.institution}</strong>
            <p>{item.description}</p>
          </motion.article>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  const { language } = useSite();
  const { experience } = useMemo(() => siteContent[language], [language]);

  return (
    <section className="section section-tonal" id="experience">
      <div className="shell">
        <SectionHeading {...experience.heading} />
        <CareerTimeline data={experience} language={language} />
        <EducationPath data={experience} />
      </div>
    </section>
  );
}
