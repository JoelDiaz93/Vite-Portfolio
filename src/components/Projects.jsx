import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";
import petShop from "../assets/PetShop.png";
import Icon from "./Icon";
import EventraVisual from "./EventraVisual";
import ProjectMiniVisual from "./ProjectMiniVisual";
import SectionHeading from "./SectionHeading";

const images = { petshop: petShop };

function ProjectFacts({ project, labels }) {
  const facts = [
    [labels.problem, project.problem],
    [labels.role, project.role],
    [labels.demonstrates, project.demonstrates],
  ];

  return (
    <div className="project-facts project-facts-v36">
      {facts.map(([label, value]) => (
        <div key={label}><span>{label}</span><p>{value}</p></div>
      ))}
    </div>
  );
}

function FeaturedProject({ project, common, language, labels }) {
  return (
    <motion.article className="featured-project featured-project-v31" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}>
      <div className="project-copy">
        <div className="project-tier flagship"><span>{project.tier}</span><small>{project.category}</small></div>
        <h3>{project.name}</h3>
        <h4>{project.kicker}</h4>
        <p>{project.description}</p>
        <ProjectFacts project={project} labels={labels} />
        <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-actions">
          <Link className="button button-primary" to={`/${language}${project.detail}`}>{common.readCaseStudy} <Icon name="arrow" /></Link>
          {project.live && <a className="button button-ghost" href={project.live} target="_blank" rel="noreferrer">{common.livePlatform} <Icon name="external" /></a>}
        </div>
      </div>
      <div className="featured-project-visual"><EventraVisual compact /></div>
    </motion.article>
  );
}

function ProjectCard({ project, index, common, labels, language }) {
  return (
    <motion.article className={`project-card project-card-v31 project-tone-${index + 1} ${project.compact ? "project-card-wide-v36" : ""}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}>
      <div className={`project-image ${project.visual ? "project-image-visual" : ""}`}>
        {project.visual ? <ProjectMiniVisual type={project.visual} /> : <img src={images[project.image]} alt={`${project.name} interface`} loading="lazy" />}
      </div>
      <div className="project-card-body">
        <div className="project-tier-row">
          <div className="project-tier"><span>{project.tier}</span><small>{project.category}</small></div>
          {project.status && <span className={`project-status project-status-${project.visual || "default"}`}>{project.status}</span>}
        </div>
        <h3>{project.name}</h3>
        <p className="project-kicker">{project.kicker}</p>
        <p>{project.description}</p>
        <ProjectFacts project={project} labels={labels} />
        <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-links">
          {project.detail && <Link to={`/${language}${project.detail}`}>{common.readCaseStudy} <Icon name="arrow" size={16} /></Link>}
          {project.live && <a href={project.live} target="_blank" rel="noreferrer">{common.liveDemo} <Icon name="external" size={16} /></a>}
          {project.source && <a href={project.source} target="_blank" rel="noreferrer">{common.source} <Icon name="github" size={16} /></a>}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { language } = useSite();
  const { projects, common } = useMemo(() => siteContent[language], [language]);
  const [featured, ...selected] = projects.items;

  return (
    <section className="section" id="projects">
      <div className="shell">
        <SectionHeading {...projects.heading} />
        <div className="project-guide">
          <p>{projects.guide}</p>
          <div className="project-classification" aria-label="Project classification">
            {projects.classification.map((item, index) => <span key={item}><b>{String(index + 1).padStart(2, "0")}</b> {item}</span>)}
          </div>
        </div>
        <FeaturedProject project={featured} common={common} language={language} labels={projects.labels} />
        <div className="selected-projects">{selected.map((project, index) => <ProjectCard project={project} index={index} common={common} labels={projects.labels} language={language} key={project.name} />)}</div>
      </div>
    </section>
  );
}
