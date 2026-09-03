import { useEffect, useMemo } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";
import Icon from "../components/Icon";
import ProjectMiniVisual from "../components/ProjectMiniVisual";

function CaseSection({ number, eyebrow, title, intro, children, className = "" }) {
  return (
    <section className={`case-section generic-case-section ${className}`}>
      <div className="case-section-head">
        <span>{number}</span>
        <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
      </div>
      {intro && <p className="case-section-intro">{intro}</p>}
      {children}
    </section>
  );
}

function Overview({ data }) {
  return (
    <div className="generic-overview-grid">
      {data.cards.map((item, index) => (
        <motion.article key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}>
          <div className="generic-card-top"><span><Icon name={item.icon} size={22} /></span><small>0{index + 1}</small></div>
          <p className="eyebrow">{item.label}</p>
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </motion.article>
      ))}
    </div>
  );
}

function Architecture({ items }) {
  return (
    <div className="architecture-stack generic-architecture-stack">
      {items.map((item, index) => (
        <article key={item.name}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <div><strong>{item.name}</strong><small>{item.tech}</small></div>
          <p>{item.note}</p>
        </article>
      ))}
    </div>
  );
}

function Workflow({ items }) {
  return (
    <div className="generic-flow-card">
      <div className="generic-flow-line" aria-hidden="true"><span /></div>
      <div className="generic-flow-grid">
        {items.map((item, index) => (
          <article key={item.title}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <span><Icon name={item.icon} size={21} /></span>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function Decisions({ data, language }) {
  const labels = language === "es"
    ? { problem: "Problema", decision: "Decisión", result: "Resultado" }
    : { problem: "Problem", decision: "Decision", result: "Result" };

  return (
    <div className="generic-decisions-grid">
      {data.items.map((item, index) => (
        <motion.article key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .06 }}>
          <div className="generic-decision-index">{String(index + 1).padStart(2, "0")}</div>
          <h3>{item.title}</h3>
          <div className="generic-decision-triplet">
            <div><span>{labels.problem}</span><p>{item.problem}</p></div>
            <div><span>{labels.decision}</span><p>{item.decision}</p></div>
            <div><span>{labels.result}</span><p>{item.result}</p></div>
          </div>
        </motion.article>
      ))}
    </div>
  );
}

function Proof({ items }) {
  return (
    <div className="generic-proof-grid">
      {items.map((item, index) => (
        <motion.article key={item.title} initial={{ opacity: 0, scale: .98 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * .07 }}>
          <span><Icon name={item.icon} size={22} /></span>
          <div><small>{String(index + 1).padStart(2, "0")}</small><h3>{item.title}</h3><p>{item.text}</p></div>
        </motion.article>
      ))}
    </div>
  );
}

function Technologies({ groups }) {
  return (
    <div className="technology-matrix generic-technology-matrix">
      {Object.entries(groups).map(([group, techs]) => (
        <article key={group}><h3>{group}</h3><div>{techs.map((tech) => <span key={tech}>{tech}</span>)}</div></article>
      ))}
    </div>
  );
}

export default function ProjectCaseStudy() {
  const { projectSlug } = useParams();
  const { language } = useSite();
  const content = useMemo(() => siteContent[language], [language]);
  const data = content.projectCases?.[projectSlug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [projectSlug]);

  if (!data) return <Navigate to={`/${language}#projects`} replace />;

  const liveLabel = language === "es" ? "Abrir producto" : "Open product";
  const sourceLabel = language === "es" ? "Ver repositorio" : "View repository";

  return (
    <main className={`case-page generic-case-page generic-case-${data.visual}`}>
      <section className="case-hero generic-case-hero">
        <div className="shell">
          <Link className="case-back" to={`/${language}#projects`}>{content.common.backToPortfolio}</Link>
          <div className="case-hero-grid generic-case-hero-grid">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="project-tier-row generic-case-tier-row">
                <div className="project-tier"><span>{data.tier}</span><small>{data.category}</small></div>
                <span className={`project-status project-status-${data.visual}`}>{data.status}</span>
              </div>
              <h1>{data.title}</h1>
              <p className="case-subtitle">{data.subtitle}</p>
              <p className="case-lead">{data.lead}</p>
              <div className="tag-row case-hero-tags">{data.heroTags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              {(data.links?.live || data.links?.source) && (
                <div className="case-actions">
                  {data.links.live && <a className="button button-primary" href={data.links.live} target="_blank" rel="noreferrer">{liveLabel} <Icon name="external" /></a>}
                  {data.links.source && <a className="button button-ghost" href={data.links.source} target="_blank" rel="noreferrer">{sourceLabel} <Icon name="github" /></a>}
                </div>
              )}
              <div className="case-meta">{data.meta.map((meta) => <span key={meta}>{meta}</span>)}</div>
            </motion.div>
            <ProjectMiniVisual type={data.visual} expanded />
          </div>
        </div>
      </section>

      <div className="shell case-content">
        <CaseSection number={data.overview.number} eyebrow={data.overview.eyebrow} title={data.overview.title}>
          <Overview data={data.overview} />
        </CaseSection>

        <CaseSection number={data.architecture.number} eyebrow={data.architecture.eyebrow} title={data.architecture.title}>
          <Architecture items={data.architecture.items} />
        </CaseSection>

        <CaseSection number={data.workflow.number} eyebrow={data.workflow.eyebrow} title={data.workflow.title} intro={data.workflow.intro}>
          <Workflow items={data.workflow.items} />
        </CaseSection>

        <CaseSection number={data.decisions.number} eyebrow={data.decisions.eyebrow} title={data.decisions.title} intro={data.decisions.intro}>
          <Decisions data={data.decisions} language={language} />
        </CaseSection>

        <CaseSection number={data.proof.number} eyebrow={data.proof.eyebrow} title={data.proof.title}>
          <Proof items={data.proof.items} />
        </CaseSection>

        <CaseSection number={data.technologies.number} eyebrow={data.technologies.eyebrow} title={data.technologies.title}>
          <Technologies groups={data.technologies.groups} />
        </CaseSection>

        <section className="case-cta">
          <p className="eyebrow">{content.common.nextStep}</p>
          <h2>{data.cta.title}</h2>
          <div>
            <Link className="button button-primary" to={`/${language}#contact`}>{content.common.startConversation} <Icon name="arrow" /></Link>
            <Link className="button button-ghost" to={`/${language}#projects`}>{language === "es" ? "Ver otros proyectos" : "View other projects"}</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
