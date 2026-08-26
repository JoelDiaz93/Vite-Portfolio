import { motion } from "framer-motion";
import { useMemo } from "react";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";

export default function About() {
  const { language } = useSite();
  const { about } = useMemo(() => siteContent[language], [language]);

  return (
    <section className="section" id="about">
      <div className="shell">
        <SectionHeading {...about.heading} />
        <div className="capability-grid">
          {about.cards.map((item, index) => (
            <motion.article key={item.key} className="capability-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: index * 0.08 }}>
              <div className="capability-number">0{index + 1}</div>
              <Icon name={["code", "cloud", "layers", "chart"][index]} size={25} />
              <p>{item.eyebrow}</p>
              <h3>{item.label}</h3>
              <span>{item.description}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
