import { motion } from "framer-motion";
import { useMemo } from "react";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";
import Icon from "./Icon";

const pillarIcons = ["architecture", "cloud", "monitor", "spark"];

export default function Results() {
  const { language } = useSite();
  const { results } = useMemo(() => siteContent[language], [language]);

  return (
    <section className="professional-value-band" id="value" aria-labelledby="professional-value-title">
      <div className="shell professional-value-layout">
        <div className="professional-value-intro">
          <p className="eyebrow">{results.eyebrow}</p>
          <h2 id="professional-value-title">{results.title}</h2>
          <p className="professional-value-copy">{results.copy}</p>

          <div className="professional-value-signals" aria-label={results.signalsLabel}>
            {results.signals.map((signal) => (
              <div className="professional-value-signal" key={`${signal.value}-${signal.label}`}>
                <strong>{signal.value}</strong>
                <span>{signal.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="professional-value-grid">
          {results.items.map((item, index) => (
            <motion.article
              key={item.key}
              className="professional-value-card"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ delay: index * 0.06 }}
            >
              <div className="professional-value-card-top">
                <span className="professional-value-number">0{index + 1}</span>
                <span className="professional-value-icon"><Icon name={pillarIcons[index]} size={24} /></span>
              </div>
              <p className="professional-value-kicker">{item.eyebrow}</p>
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
              <div className="professional-value-tags" aria-label={item.label}>
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
