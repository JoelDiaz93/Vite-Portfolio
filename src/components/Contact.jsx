import { useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";

export default function Contact() {
  const { language } = useSite();
  const { contact, resume } = useMemo(() => siteContent[language], [language]);
  const [formData, setFormData] = useState({ name: "", email: "", intent: contact.labels.options[0], message: "" });
  const [state, setState] = useState("idle");

  useEffect(() => {
    setFormData((current) => ({ ...current, intent: contact.labels.options[0] }));
  }, [contact.labels.options]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setState("loading");
    const serviceId = import.meta.env.VITE_APP_SERVICE_ID;
    const templateId = import.meta.env.VITE_APP_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_APP_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      setState("config-error");
      return;
    }
    try {
      await emailjs.send(serviceId, templateId, formData, publicKey);
      setState("success");
      setFormData({ name: "", email: "", intent: contact.labels.options[0], message: "" });
    } catch (error) {
      console.error("Contact form error", error);
      setState("error");
    }
  };

  return (
    <section className="section contact-section" id="contact">
      <div className="shell">
        <SectionHeading {...contact.heading} />
        <div className="contact-grid">
          <div className="contact-aside">
            {contact.aside.map((item, index) => (
              <div key={item.title} className="contact-signal">
                <Icon name={["briefcase", "spark", "mail"][index]} size={28} />
                <div><strong>{item.title}</strong><p>{item.text}</p></div>
              </div>
            ))}
            <div className="contact-profile-links" aria-label={language === "es" ? "Perfiles profesionales" : "Professional profiles"}>
              <a href="https://www.linkedin.com/in/cjoeldiaz/" target="_blank" rel="noreferrer"><Icon name="linkedin" /> LinkedIn <Icon name="external" size={15} /></a>
              <a href="https://github.com/JoelDiaz93" target="_blank" rel="noreferrer"><Icon name="github" /> GitHub <Icon name="external" size={15} /></a>
              <a href={resume.currentDownload} target="_blank" rel="noreferrer"><Icon name="download" /> {language === "es" ? "CV" : "Resume"} <Icon name="external" size={15} /></a>
            </div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <label>{contact.labels.name}<input required name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder={contact.labels.namePlaceholder} /></label>
              <label>{contact.labels.email}<input required type="email" name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder={contact.labels.emailPlaceholder} /></label>
            </div>
            <label>{contact.labels.intent}
              <select name="intent" value={formData.intent} onChange={(e) => setFormData({ ...formData, intent: e.target.value })}>
                {contact.labels.options.map((option) => <option key={option}>{option}</option>)}
              </select>
            </label>
            <label>{contact.labels.message}<textarea required rows="6" name="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder={contact.labels.messagePlaceholder} /></label>
            <div className="form-footer">
              <button className="button button-primary" disabled={state === "loading"} type="submit">{state === "loading" ? contact.labels.sending : contact.labels.send} <Icon name="arrow" /></button>
              <div className="form-status" role="status" aria-live="polite">
                {state === "success" && contact.labels.success}
                {state === "error" && contact.labels.error}
                {state === "config-error" && contact.labels.config}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
