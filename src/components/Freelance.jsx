import { useMemo } from "react";
import { motion } from "framer-motion";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";
import Icon from "./Icon";

const serviceIcons = ["code", "layers", "cloud"];

export default function Freelance() {
  const { language } = useSite();
  const { services, common } = useMemo(() => siteContent[language], [language]);

  return (
    <section className="client-section" id="services">
      <div className="shell client-layout client-layout-v31">
        <div className="client-intro">
          <p className="eyebrow">{services.eyebrow}</p>
          <h2>{services.title}</h2>
          <p>{services.lead}</p>
          <a className="button button-ghost" href="#contact">{common.discussProject}<Icon name="arrow" size={16} /></a>
        </div>
        <div className="service-list">
          {services.list.map((service, index) => (
            <motion.article key={service.title} className={`service-card service-card-${index + 1}`} whileHover={{ y: -5 }}>
              <div className="service-card-top">
                <span className="service-icon"><Icon name={serviceIcons[index]} size={23} /></span>
                <div><small>{String(index + 1).padStart(2, "0")}</small><h3>{service.title}</h3></div>
              </div>
              <p>{service.description}</p>
              <ul>{service.outcomes.map((item) => <li key={item}><Icon name="check" size={14} />{item}</li>)}</ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
