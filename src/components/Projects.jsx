import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";
import petShop from "../assets/PetShop.png";
import qrCode from "../assets/qrCode.png";
import Icon from "./Icon";
import EventraVisual from "./EventraVisual";
import SectionHeading from "./SectionHeading";

const images = { petshop: petShop, qrcode: qrCode };

function ProjectFacts({ project, labels }) {
  return (
    <div className="project-facts">
      <div><span>{labels.problem}</span><p>{project.problem}</p></div>
      <div><span>{labels.demonstrates}</span><p>{project.demonstrates}</p></div>
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
          <a className="button button-ghost" href={project.live} target="_blank" rel="noreferrer">{common.livePlatform} <Icon name="external" /></a>
        </div>
      </div>
      <div className="featured-project-visual"><EventraVisual compact /></div>
    </motion.article>
  );
}

function ProjectCard({ project, index, common, labels }) {
  return (
    <motion.article className={`project-card project-card-v31 project-tone-${index + 1}`} initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * .08 }}>
      <div className="project-image"><img src={images[project.image]} alt={`${project.name} interface`} loading="lazy" /></div>
      <div className="project-card-body">
        <div className="project-tier"><span>{project.tier}</span><small>{project.category}</small></div>
        <h3>{project.name}</h3>
        <p className="project-kicker">{project.kicker}</p>
        <p>{project.description}</p>
        <ProjectFacts project={project} labels={labels} />
        <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <div className="project-links">
          <a href={project.live} target="_blank" rel="noreferrer">{common.liveDemo} <Icon name="external" size={16} /></a>
          <a href={project.source} target="_blank" rel="noreferrer">{common.source} <Icon name="github" size={16} /></a>
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
        <div className="selected-projects">{selected.map((project, index) => <ProjectCard project={project} index={index} common={common} labels={projects.labels} key={project.name} />)}</div>
      </div>
    </section>
  );
}
