import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const MetricCard = ({ metric }) => (
  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
    <p className="text-white text-lg font-bold">{metric.value}</p>
    <p className="mt-1 text-sm text-[#D7DEDC]/70">{metric.label}</p>
  </div>
);

const ArchitectureMap = ({ title, layers }) => (
  <div className="rounded-[24px] border border-white/10 bg-[#141210] p-5 sm:p-6">
    <div className="flex items-center justify-between gap-4 flex-wrap mb-5">
      <p className="text-white font-bold text-lg">{title}</p>
      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-[#21ABF5]">
        Architecture
      </span>
    </div>

    <div className="grid gap-3">
      {layers.map((layer, index) => (
        <div key={layer.layer} className="grid sm:grid-cols-[150px_1fr] gap-3 items-stretch">
          <div className="rounded-2xl border border-[#21ABF5]/20 bg-[#21ABF5]/10 px-4 py-4 flex items-center">
            <span className="text-[#21ABF5] font-semibold">{layer.layer}</span>
          </div>
          <div className="relative rounded-2xl border border-white/10 bg-white/5 px-4 py-4 flex flex-wrap gap-2 items-center">
            {layer.items.map((item) => (
              <span key={item} className="rounded-full border border-white/10 bg-[#1E1B18] px-3 py-1.5 text-sm text-[#D7DEDC]">
                {item}
              </span>
            ))}
            {index < layers.length - 1 && (
              <span className="absolute left-1/2 -bottom-4 -translate-x-1/2 z-10 w-[2px] h-5 bg-white/10" />
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CaseStudy = ({ study, labels }) => (
  <motion.div
    key={study.name}
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -24 }}
    transition={{ duration: 0.35 }}
    className="grid gap-6"
  >
    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8">
      <div className="flex items-start justify-between gap-6 flex-wrap">
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="rounded-full border border-white/10 bg-[#1E1B18] px-3 py-1 text-xs text-[#99C24D]">
              {study.status}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#D7DEDC]">
              {study.role}
            </span>
          </div>
          <h3 className="text-white text-3xl sm:text-4xl font-bold">{study.name}</h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto">
          {study.metrics.map((metric) => (
            <MetricCard key={`${metric.value}-${metric.label}`} metric={metric} />
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5 mt-8">
        <div className="rounded-[24px] border border-white/10 bg-[#141210] p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#FF4000]">{labels.challengeLabel}</p>
          <p className="mt-4 text-[#D7DEDC] leading-8 text-justify">{study.challenge}</p>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-[#141210] p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-[#21ABF5]">{labels.solutionLabel}</p>
          <p className="mt-4 text-[#D7DEDC] leading-8 text-justify">{study.solution}</p>
        </div>
      </div>
    </div>

    <div className="grid xl:grid-cols-[0.9fr_1.1fr] gap-6">
      <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8">
        <h4 className="text-white text-2xl font-bold">{labels.contributionLabel}</h4>
        <div className="mt-6 grid gap-4">
          {study.contribution.map((item, index) => (
            <div key={item} className="flex gap-4 items-start">
              <div className="shrink-0 w-8 h-8 rounded-full border border-[#99C24D]/30 bg-[#99C24D]/10 flex items-center justify-center text-[#99C24D] text-sm font-bold">
                {index + 1}
              </div>
              <p className="text-[#D7DEDC] leading-7">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <ArchitectureMap title={labels.architectureLabel} layers={study.architecture} />
    </div>

    <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8">
      <h4 className="text-white text-2xl font-bold">{labels.decisionsLabel}</h4>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 mt-6">
        {study.decisions.map((decision, index) => (
          <div key={decision.title} className="relative rounded-[22px] border border-white/10 bg-[#141210] p-5 overflow-hidden">
            <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-[#21ABF5] via-[#99C24D] to-[#FF4000] opacity-70" />
            <p className="text-[#21ABF5] text-xs font-bold uppercase tracking-[0.18em]">{labels.decisionLabel} {index + 1}</p>
            <h5 className="mt-3 text-white text-lg font-bold">{decision.title}</h5>
            <p className="mt-3 text-[#D7DEDC] leading-7 text-sm">{decision.text}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-[28px] border border-[#99C24D]/20 bg-[#99C24D]/5 p-6 sm:p-8">
      <h4 className="text-white text-2xl font-bold">{labels.proofLabel}</h4>
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {study.proof.map((item) => (
          <div key={item} className="rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="w-9 h-9 rounded-full bg-[#99C24D]/15 border border-[#99C24D]/30 flex items-center justify-center text-[#99C24D] font-bold">✓</div>
            <p className="mt-4 text-[#D7DEDC] leading-7">{item}</p>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const CaseStudies = ({ content }) => {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    setSelected(0);
  }, [content]);

  return (
    <div className="relative w-full min-h-screen mt-10 lg:mt-16 p-6 sm:p-10">
      <motion.div variants={textVariant()}>
        <span className="text-[#21ABF5] text-sm uppercase tracking-[0.22em] font-semibold">{content.caseStudies.eyebrow}</span>
        <h2 className="mt-3">{content.caseStudies.title}</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 max-w-6xl text-lg md:text-xl text-[#D7DEDC] leading-8 text-justify"
      >
        {content.caseStudies.subtitle}
      </motion.p>

      <div className="mt-8 inline-flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-2">
        {content.caseStudies.cases.map((study, index) => (
          <button
            key={study.name}
            type="button"
            onClick={() => setSelected(index)}
            className={`rounded-xl px-5 py-2.5 font-semibold transition ${
              selected === index
                ? "bg-[#21ABF5] text-white"
                : "bg-transparent text-[#D7DEDC] hover:bg-white/5"
            }`}
          >
            {study.name}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <AnimatePresence mode="wait">
          <CaseStudy study={content.caseStudies.cases[selected]} labels={content.caseStudies} />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SectionWrapper(CaseStudies, "case-studies");
