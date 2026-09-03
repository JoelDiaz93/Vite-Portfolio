import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const BlueprintCard = ({ index, name, status, summary, nodes, bullets }) => {
  return (
    <motion.div
      variants={fadeIn(index % 2 === 0 ? "right" : "left", "spring", index * 0.12, 0.7)}
      className="rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8"
    >
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-white text-2xl sm:text-3xl font-bold">{name}</h3>
          <p className="mt-3 text-[#D7DEDC] leading-7 max-w-3xl">{summary}</p>
        </div>
        <span className="rounded-full border border-white/10 bg-[#1E1B18] px-4 py-2 text-sm font-semibold text-[#99C24D]">
          {status}
        </span>
      </div>

      <div className="mt-8 rounded-[24px] border border-white/10 bg-[#141210] p-5 sm:p-6">
        <div className="flex flex-wrap items-center gap-3">
          {nodes.map((node, nodeIndex) => (
            <React.Fragment key={node}>
              <div className="min-w-[130px] flex-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-center text-sm sm:text-base text-white font-medium">
                {node}
              </div>
              {nodeIndex < nodes.length - 1 && (
                <div className="text-[#21ABF5] text-2xl font-bold hidden sm:block">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mt-6">
        {bullets.map((bullet) => (
          <div key={bullet} className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <div className="w-10 h-[2px] bg-gradient-to-r from-[#21ABF5] to-[#FF4000] mb-4" />
            <p className="text-[#D7DEDC] leading-7">{bullet}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const Blueprints = ({ content }) => {
  return (
    <div className="relative w-full min-h-screen mt-10 lg:mt-16 p-6 sm:p-10">
      <motion.div variants={textVariant()}>
        <h2>{content.blueprints.title}</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 max-w-6xl text-lg md:text-xl text-[#D7DEDC] leading-8 text-justify"
      >
        {content.blueprints.subtitle}
      </motion.p>

      <div className="mt-10 grid gap-8">
        {content.blueprints.cards.map((card, index) => (
          <BlueprintCard key={card.name} index={index} {...card} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Blueprints, "blueprints");
