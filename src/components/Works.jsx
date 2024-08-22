import React from "react";
import ParallaxTilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
  public_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <ParallaxTilt
        tiltMaxAngleX={45}
        tiltMaxAngleY={45}
        scale={1}
        transitionSpeed={450}
        className="p-4 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[180px] lg:h-[240px]">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-fill lg:object-cover rounded-2xl"
          />

          <div className="absolute inset-0 flex justify-end m-1">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="black-gradient w-16 h-16 rounded-full flex justify-center items-center cursor-pointer"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between">
            <h3 className="text-white font-bold text-xl lg:text-4xl">{name}</h3>
            <button
              className="bg-[#99C24D] hover:bg-black lg:py-2 px-4 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
              onClick={() => window.open(public_link, "_blank")}
            >
              Go
            </button>
          </div>

          <p className="mt-1 lg:mt-2 text-lg text-justify">{description}</p>
        </div>

        <div className="mt-2 lg:mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p key={`${name}-${tag.name}`} className={`text-md ${tag.color}`}>
              #{tag.name}
            </p>
          ))}
        </div>
      </ParallaxTilt>
    </motion.div>
  );
};

const Works = () => {
  return (
    <div className="relative w-full min-h-screen mt-14 lg:mt-28 p-10">
      <motion.div variants={textVariant()}>
        <h2 className="">Projects</h2>
      </motion.div>

      <div className="w-full flex">
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-2xl lg:text-4xl max-w-6xl text-justify"
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos in it. It reflects my
          ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className="mt-5 lg:mt-20 flex flex-wrap gap-7">
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Works, "works");
