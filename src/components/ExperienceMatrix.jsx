import React from "react";
import { motion } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ExperienceMatrix = ({ content }) => {
  const matrix = content.experienceMatrix;

  return (
    <div className="relative w-full mt-10 lg:mt-16 p-6 sm:p-10">
      <motion.div variants={textVariant()}>
        <h2>{matrix.title}</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 max-w-6xl text-lg md:text-xl text-[#D7DEDC] leading-8 text-justify"
      >
        {matrix.subtitle}
      </motion.p>

      <motion.div
        variants={fadeIn("up", "spring", 0.15, 0.75)}
        className="mt-8 overflow-hidden rounded-[28px] border border-white/10 bg-white/5"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse">
            <thead>
              <tr className="bg-[#141210]">
                <th className="p-5 text-left text-sm uppercase tracking-[0.18em] text-[#D7DEDC]/70">{matrix.capabilityLabel}</th>
                {matrix.columns.map((column) => (
                  <th key={column} className="p-5 text-left text-white text-lg font-bold">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.rows.map((row, rowIndex) => (
                <tr key={row.skill} className={rowIndex % 2 === 0 ? "bg-black/10" : "bg-transparent"}>
                  <td className="p-5 border-t border-white/10 text-white font-semibold">{row.skill}</td>
                  {row.values.map((value, index) => (
                    <td key={`${row.skill}-${matrix.columns[index]}`} className="p-5 border-t border-white/10">
                      <span className="inline-flex rounded-full border border-[#21ABF5]/20 bg-[#21ABF5]/10 px-3 py-1.5 text-sm text-[#D7DEDC]">
                        {value}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(ExperienceMatrix, "capabilities");
