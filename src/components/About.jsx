import React from "react";
import { motion } from "framer-motion";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const ServiceCard = ({ index, title, icon }) => (
  <div
    // tiltMaxAngleX={45}
    // tiltMaxAngleY={45}
    // scale={1}
    // transitionSpeed={450}
    className="p-5 rounded-2xl sm:w-[160px] w-full"
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className="w-full p-[1px] rounded-[20px] shadow-card"
    >
      <div
        options={{
          max: 45,
          scale: 1,
          speed: 450,
        }}
        className="rounded-[20px] py-5 px-4 min-h-[280px] flex justify-evenly items-center flex-col"
      >
        <img
          src={icon}
          alt="web-development"
          className="w-16 h-16 object-contain"
        />

        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  </div>
);

const About = () => {
  return (
    <div className="relative z-0 h-screen mt-28 p-10">
      <motion.div variants={textVariant()}>
        <h2 className="">Overview</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-4xl max-w-6xl text-justify"
        >
          I'm a skilled software developer with experience in frameworks like
          React, Node.js, and Three.js. I'm a quick learner and collaborate
          closely with clients to create efficient, scalable, and user-friendly
          solutions that solve real-world problems. Let's work together to bring
          your ideas to life!
        </motion.p>
      </div>
      <div className="mt-20 flex justify-between flex-wrap gap-7">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
