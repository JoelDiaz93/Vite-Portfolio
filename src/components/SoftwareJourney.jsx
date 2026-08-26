import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Icon from "./Icon";

const iconNames = ["message", "search", "architecture", "pencil", "code", "check", "upload", "headset"];

export default function SoftwareJourney({ data }) {
  const [active, setActive] = useState(0);
  const stages = useMemo(() => data.stages ?? [], [data.stages]);

  useEffect(() => {
    if (!stages.length) return undefined;
    const timer = window.setInterval(() => setActive((value) => (value + 1) % stages.length), 2200);
    return () => window.clearInterval(timer);
  }, [stages]);

  return (
    <div className="software-journey" aria-label={data.title}>
      <div className="journey-header">
        <div>
          <p className="eyebrow">{data.eyebrow}</p>
          <h2>{data.title}</h2>
        </div>
        <div className="journey-loop-badge">{data.badge}</div>
      </div>

      <div className="journey-canvas">
        <svg className="journey-route" viewBox="0 0 1000 440" preserveAspectRatio="none" aria-hidden="true">
          <path className="journey-route-base" d="M110 115 H860 Q930 115 930 190 V275 Q930 340 860 340 H110" />
          <path className="journey-route-active" d="M110 115 H860 Q930 115 930 190 V275 Q930 340 860 340 H110" />
          <circle r="6" className="journey-runner">
            <animateMotion dur="13s" repeatCount="indefinite" path="M110 115 H860 Q930 115 930 190 V275 Q930 340 860 340 H110" />
          </circle>
        </svg>

        <div className="journey-nodes">
          {stages.map((stage, index) => (
            <button
              key={stage.title}
              type="button"
              className={`journey-node journey-node-${index + 1} ${active === index ? "is-active" : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span className="journey-step">{String(index + 1).padStart(2, "0")}</span>
              <span className="journey-icon"><Icon name={iconNames[index]} size={24} /></span>
              <strong>{stage.title}</strong>
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={active} className="journey-detail" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: .22 }}>
          <div><span>{String(active + 1).padStart(2, "0")}</span><strong>{stages[active]?.title}</strong></div>
          <p>{stages[active]?.text}</p>
        </motion.div>
      </AnimatePresence>
      <p className="journey-footnote"><Icon name="spark" size={14} /> {data.footer}</p>
    </div>
  );
}
