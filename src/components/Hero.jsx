import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import EarthCanvas from "./canvas/Earth";

const Hero = () => {
  const [replay, setReplay] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

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
      <div className="absolute inset-0 top-[90px] lg:max-w-7xl mx-auto flex flex-row items-center gap-5">
        <div className="container w-full mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="flex-1 p-1 h-40 w-[300px] lg:h-80">
              <EarthCanvas />
            </div>
            <div className="flex-2 lg:flex-1 w-full p-8 sm:my-10">
              <motion.div
                className="App"
                initial="hidden"
                // animate="visible"
                animate={replay ? "visible" : "hidden"}
              >
                <div className="flex flex-col" onClick={handleReplay}>
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
          <div className="w-[28px] h-[50px] md:w-[35px] md:h-[64px] rounded-3xl border-2 md:border-4 border-[#D7DEDC] flex justify-center items-start p-2">
            <motion.div
              animate={{
                y: isMobile ? [0, 10, 0] : [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-1 h-1 md:w-3 md:h-3 rounded-full bg-[#D7DEDC]"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
