import React, { useState } from "react";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import EarthCanvas from "./canvas/Earth";

const Hero = () => {
  const [replay, setReplay] = useState(true);

  const placeholderText = [
    {
      type: "heading1",
      text: "Turning ideas into exceptional software solutions.",
    },
  ];

  const container = {
    visible: {
      transition: {
        staggerChildren: 0.025,
      },
    },
  };

  const handleReplay = () => {
    setReplay(!replay);
    setTimeout(() => {
      setReplay(true);
    }, 600);
  };

  return (
    <section className="relative w-full h-screen">
      <div
        className="absolute inset-0 top-[120px] lg:max-w-7xl mx-auto flex flex-row items-center gap-5"
      >
        <div className="container w-full mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="flex-1 p-4 h-60 w-[300px] lg:h-80">
              <EarthCanvas />
            </div>
            <div className="flex-2 lg:flex-1 w-full p-8 sm:my-10">
              <motion.div
                className="App"
                initial="hidden"
                // animate="visible"
                animate={replay ? "visible" : "hidden"}
              >
                <div
                  className="flex flex-col"
                  onClick={handleReplay}
                >
                  {placeholderText.map((item, index) => {
                    return <AnimatedText {...item} key={index} />;
                  })}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute xs:bottom-8 bottom-12 w-full flex justify-center items-center">
        <a href="">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-[#D7DEDC] flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-[#D7DEDC] mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
