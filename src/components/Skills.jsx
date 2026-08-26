import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";

const icons = ["code", "cloud", "layers", "database", "check", "spark"];

export default function Skills() {
  const { language } = useSite();
  const { skills } = useMemo(() => siteContent[language], [language]);
  const [activeKey, setActiveKey] = useState(skills.groups[0].key);

  useEffect(() => {
    setActiveKey(skills.groups[0].key);
  }, [skills]);

  const active = skills.groups.find((item) => item.key === activeKey) ?? skills.groups[0];

  return (
    <section className="section section-tonal" id="skills">
      <div className="shell">
        <SectionHeading {...skills.heading} />
        <div className="skill-console skill-console-v31">
          <div className="skill-nav" role="tablist" aria-label="Skill domains">
            {skills.groups.map((group, index) => (
              <button key={group.key} className={active.key === group.key ? "is-active" : ""} onClick={() => setActiveKey(group.key)} role="tab" aria-selected={active.key === group.key}>
                <span className="skill-tab-icon"><Icon name={icons[index]} size={17} /></span>
                <div><small>{String(index + 1).padStart(2, "0")}</small><strong>{group.label}</strong></div>
              </button>
            ))}
          </div>

          <div className="skill-stage">
            <AnimatePresence mode="wait">
              <motion.div key={active.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: .22 }} className="skill-detail">
                <p className="eyebrow">{active.eyebrow}</p>
                <h3>{active.label}</h3>
                <p>{active.description}</p>
                <div className="skill-clusters">
                  {active.clusters.map((cluster) => (
                    <article key={cluster.label}>
                      <div className="skill-cluster-title"><span />{cluster.label}</div>
                      <div className="skill-cloud">{cluster.items.map((skill) => <span key={skill}>{skill}</span>)}</div>
                    </article>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
