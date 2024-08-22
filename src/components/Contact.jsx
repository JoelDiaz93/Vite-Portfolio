import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import { log } from "three/examples/jsm/nodes/Nodes.js";

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .send(
        import.meta.env.VITE_APP_SERVICE_ID,
        import.meta.env.VITE_APP_TEMPLATE_ID,
        formData,
        import.meta.env.VITE_APP_PUBLIC_KEY
      )
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
    setLoading(false);
  };

  return (
    <div className="relative w-full min-h-screen mt-14 lg:mt-28 p-10">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] w-full mx-auto bg-black-100 p-8 rounded-2xl"
      >
        <h2 className="">Contact</h2>

        <form
          ref={form}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className="py-4 px-6 text-black rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className="py-4 px-6 text-black rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-white font-medium mb-4">Your Message</span>
            <textarea
              rows={7}
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="What you want to say?"
              className="py-4 px-6 text-black rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className={`${loading ? "bg-[#1E1B18]" : "bg-[#99C24D]" } py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary`}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
