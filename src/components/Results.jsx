import { motion } from "framer-motion";
import { useMemo } from "react";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";

export default function Results() {
  const { language } = useSite();
  const { results } = useMemo(() => siteContent[language], [language]);

  return (
    <section className="results-band" aria-labelledby="results-title">
      <div className="shell results-layout">
        <div className="results-intro">
          <p className="eyebrow">{results.eyebrow}</p>
          <h2 id="results-title">{results.title}</h2>
          <p>{results.copy}</p>
          <small>{results.note}</small>
        </div>
        <div className="results-grid">
          {results.items.map((item, index) => (
            <motion.article
              key={`${item.value}-${item.label}`}
              className="result-card"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.06 }}
            >
              <span>0{index + 1}</span>
              <strong>{item.value}</strong>
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
