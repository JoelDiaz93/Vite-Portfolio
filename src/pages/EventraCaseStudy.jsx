import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSite } from "../context/SiteContext";
import { siteContent } from "../data/portfolio";
import EventraVisual from "../components/EventraVisual";
import Icon from "../components/Icon";

const objectiveIcons = ["monitor", "eyeOff", "link", "upload", "clock", "architecture"];
const flowIcons = ["link", "lock", "check", "chart", "database", "upload", "chart"];
const challengeIcons = ["lock", "eyeOff", "cloud", "clock"];
const principleIcons = ["shield", "lock", "user", "chart"];
const principleNodeIcons = ["user", "monitor", "database", "chart"];

function CaseSection({ number, eyebrow, title, children, className = "" }) {
  return (
    <section className={`case-section ${className}`}>
      <div className="case-section-head">
        <span>{number}</span>
        <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
      </div>
      {children}
    </section>
  );
}

function PrincipleShowcase({ why, language }) {
  const [active, setActive] = useState(0);
  const es = language === "es";
  const summaries = es
    ? [
        "Eventra limita la captura desde el origen: sesiones explícitas, visibles y basadas únicamente en metadatos de actividad.",
        "Las credenciales permanecen protegidas en Windows y la telemetría viaja por HTTPS, reduciendo secretos expuestos.",
        "El usuario inicia cada sesión, define su duración y puede revisar claramente qué señales fueron registradas.",
        "Los metadatos seguros se convierten en historial y analítica útil sin almacenar contenido sensible.",
      ]
    : [
        "Eventra limits collection at the source: explicit, visible sessions based only on activity metadata.",
        "Credentials stay protected on Windows and telemetry travels through HTTPS, reducing exposed secrets.",
        "The user starts each session, defines its duration and can clearly review what signals were recorded.",
        "Safe metadata becomes useful history and analytics without storing sensitive content.",
      ];

  return (
    <div className="principle-showcase-v34">
      <div className="principle-copy-v34">
        <p className="case-big-copy case-big-copy-v34">{why.origin}</p>

        <div className="principle-cards-v34">
          {why.principles.map((item, index) => (
            <motion.button
              key={item.title}
              type="button"
              className={`principle-card-v34 ${active === index ? "is-active" : ""} ${index === 3 ? "is-copper" : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
              whileHover={{ y: -4 }}
            >
              <span className="principle-card-icon-v34"><Icon name={principleIcons[index]} size={22} /></span>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
              <span className="principle-card-arrow-v34">→</span>
            </motion.button>
          ))}
        </div>
      </div>

      <div className="principle-wheel-column-v34">
        <div className="principle-wheel-v34" role="group" aria-label={es ? "Principios de Eventra" : "Eventra principles"}>
          <svg className="principle-wheel-lines-v34" viewBox="0 0 560 430" aria-hidden="true">
            <circle cx="280" cy="215" r="138" />
            <circle cx="280" cy="215" r="102" />
            {[
              [230, 66],
              [430, 110],
              [436, 306],
              [130, 298],
            ].map(([x, y], index) => (
              <line key={index} x1="280" y1="215" x2={x} y2={y} className={active === index ? "is-active" : ""} />
            ))}
          </svg>

          <div className="principle-wheel-core-v34">
            <span><Icon name="shield" size={42} /></span>
            <strong>Eventra</strong>
            <small>Privacy-first</small>
          </div>

          {why.principles.map((item, index) => (
            <button
              key={item.title}
              type="button"
              className={`principle-wheel-node-v34 principle-wheel-node-${index + 1}-v34 ${active === index ? "is-active" : ""} ${index === 3 ? "is-copper" : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              onClick={() => setActive(index)}
            >
              <span><Icon name={principleNodeIcons[index]} size={22} /></span>
              <i>{String(index + 1).padStart(2, "0")}</i>
              <strong>{item.title}</strong>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="principle-summary-v34"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: .2 }}
          >
            <span>{es ? "En una frase" : "In one sentence"}</span>
            <p>{summaries[active]}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ObjectiveMiniFlow({ index, language }) {
  const es = language === "es";
  const flows = [
    {
      nodes: [
        { icon: "user", label: "Start" },
        { icon: "monitor", label: es ? "Visible" : "Visible" },
        { icon: "check", label: "Stop", copper: true },
      ],
    },
    {
      nodes: [
        { icon: "code", label: es ? "Texto" : "Text", blocked: true },
        { icon: "lock", label: es ? "Claves" : "Passwords", blocked: true },
        { icon: "eyeOff", label: es ? "Capturas" : "Screens", blocked: true },
      ],
    },
    {
      nodes: [
        { icon: "monitor", label: "Dashboard" },
        { icon: "link", label: es ? "Código" : "Code" },
        { icon: "lock", label: es ? "Dispositivo" : "Device" },
      ],
    },
    {
      nodes: [
        { icon: "monitor", label: "Agent" },
        { icon: "lock", label: "HTTPS" },
        { icon: "cloud", label: "API" },
      ],
    },
    {
      nodes: [
        { icon: "clock", label: es ? "Sesión" : "Session" },
        { icon: "database", label: es ? "Eventos" : "Events", copper: true },
        { icon: "chart", label: "Dashboard" },
      ],
    },
    {
      nodes: [
        { icon: "code", label: es ? "Código" : "Code" },
        { icon: "architecture", label: "CI / CD", copper: true },
        { icon: "cloud", label: "R2" },
      ],
    },
  ];

  return (
    <div className="objective-mini-flow-v34" aria-hidden="true">
      {flows[index].nodes.map((node, nodeIndex) => (
        <div className="objective-mini-step-v34" key={`${node.label}-${nodeIndex}`}>
          <div className={`objective-mini-node-v34 ${node.copper ? "is-copper" : ""} ${node.blocked ? "is-blocked" : ""}`}>
            <span><Icon name={node.icon} size={21} /></span>
            <small>{node.label}</small>
          </div>
          {nodeIndex < flows[index].nodes.length - 1 && <span className="objective-mini-connector-v34">→</span>}
        </div>
      ))}
    </div>
  );
}

function ObjectiveGrid({ items, language }) {
  const [active, setActive] = useState(0);
  const es = language === "es";
  const categories = es
    ? ["Control", "Privacidad", "Pairing", "Transporte", "Visibilidad", "Entrega"]
    : ["Control", "Privacy", "Pairing", "Transport", "Visibility", "Delivery"];

  const descriptions = es
    ? [
        "El usuario inicia y detiene sesiones de forma visible, con una duración definida.",
        "No capturamos lo que no debe existir en el sistema: nos enfocamos solo en metadatos de actividad.",
        "La vinculación entre dashboard y dispositivo se realiza con un código de un solo uso.",
        "La telemetría viaja por HTTPS y se procesa en lotes para reducir riesgos y fallos.",
        "El dashboard muestra duración, actividad e historial de eventos de manera fácil de revisar.",
        "El agente se compila y distribuye mediante CI/CD y artefactos públicos en R2.",
      ]
    : [
        "The user starts and stops sessions visibly, with a defined duration.",
        "We do not collect data that should not exist in the system; only activity metadata is retained.",
        "Dashboard and device are linked through a one-time pairing code.",
        "Telemetry travels through HTTPS and is processed in batches to reduce risk and failures.",
        "The dashboard shows duration, activity and event history in a form that is easy to review.",
        "The agent is built and distributed through CI/CD and public artifacts in R2.",
      ];

  const impacts = es
    ? [
        { agent: "Aplica reglas de captura y protege credenciales con DPAPI.", api: "Valida, procesa y almacena metadatos seguros.", dashboard: "Presenta historial, actividad y analítica útil." },
        { agent: "Filtra cualquier contenido sensible antes de construir eventos.", api: "Acepta únicamente tipos de evento permitidos por contrato.", dashboard: "Nunca necesita mostrar texto escrito ni capturas." },
        { agent: "Guarda una credencial propia protegida en Windows.", api: "Consume el código una sola vez y crea la identidad del dispositivo.", dashboard: "Permite generar códigos y administrar dispositivos vinculados." },
        { agent: "Agrupa y envía eventos por HTTPS.", api: "Procesa batches y reduce round trips a PostgreSQL.", dashboard: "Refleja sesiones confirmadas y consistentes." },
        { agent: "Produce señales mínimas pero estructuradas.", api: "Persiste sesiones y eventos para consulta.", dashboard: "Convierte datos técnicos en una lectura rápida de actividad." },
        { agent: "Se genera como ejecutable portable.", api: "Expone la versión latest para comprobación.", dashboard: "Ofrece la descarga vigente sin revelar el repositorio privado." },
      ]
    : [
        { agent: "Applies collection rules and protects credentials with DPAPI.", api: "Validates, processes and stores safe metadata.", dashboard: "Presents history, activity and useful analytics." },
        { agent: "Filters sensitive content before events are created.", api: "Accepts only event types allowed by contract.", dashboard: "Never needs to show typed text or screenshots." },
        { agent: "Stores its own Windows-protected credential.", api: "Consumes the code once and creates the device identity.", dashboard: "Creates pairing codes and manages linked devices." },
        { agent: "Batches and sends events over HTTPS.", api: "Processes batches and reduces PostgreSQL round trips.", dashboard: "Shows confirmed, consistent sessions." },
        { agent: "Produces minimal but structured signals.", api: "Persists sessions and events for inspection.", dashboard: "Turns technical data into a quick activity view." },
        { agent: "Is generated as a portable executable.", api: "Exposes the latest version for checks.", dashboard: "Offers the current download without exposing the private repository." },
      ];

  return (
    <div className="objective-system-v34">
      <div className="objective-grid-v34">
        {items.map((item, index) => (
          <motion.button
            type="button"
            key={item.title}
            className={`objective-card-v34 ${active === index ? "is-active" : ""} ${index >= 4 ? "is-copper" : ""}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onClick={() => setActive(index)}
            whileHover={{ y: -4 }}
          >
            <div className="objective-card-head-v34">
              <span className="objective-card-icon-v34"><Icon name={objectiveIcons[index]} size={23} /></span>
              <span className="objective-card-number-v34">{String(index + 1).padStart(2, "0")}</span>
              <strong>{item.title}</strong>
            </div>

            <ObjectiveMiniFlow index={index} language={language} />

            <p>{descriptions[index]}</p>
            <span className="objective-tag-v34">{categories[index]}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          className="objective-impact-v34"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: .2 }}
        >
          <div className="objective-impact-title-v34">
            <span>{es ? "Cómo este objetivo impacta el sistema" : "How this objective impacts the system"}</span>
            <strong>{items[active].title}</strong>
          </div>
          <div className="objective-impact-flow-v34">
            <article>
              <span><Icon name="monitor" size={22} /></span>
              <div><strong>{es ? "En el agente (Windows)" : "In the Windows agent"}</strong><p>{impacts[active].agent}</p></div>
            </article>
            <i>→</i>
            <article>
              <span><Icon name="database" size={22} /></span>
              <div><strong>{es ? "En la API" : "In the API"}</strong><p>{impacts[active].api}</p></div>
            </article>
            <i>→</i>
            <article>
              <span className="is-copper"><Icon name="chart" size={22} /></span>
              <div><strong>{es ? "En el dashboard" : "In the dashboard"}</strong><p>{impacts[active].dashboard}</p></div>
            </article>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function EventraFlow({ data }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setActive((value) => (value + 1) % data.items.length), 2300);
    return () => window.clearInterval(timer);
  }, [data.items.length]);

  return (
    <div className="eventra-flow-card">
      <div className="eventra-flow-route" aria-hidden="true"><span /></div>
      <div className="eventra-flow-steps">
        {data.items.map((item, index) => (
          <button key={item.title} type="button" className={active === index ? "is-active" : ""} onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)}>
            <small>{String(index + 1).padStart(2, "0")}</small>
            <span><Icon name={flowIcons[index]} size={21} /></span>
            <strong>{item.title}</strong>
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={active} className="eventra-flow-detail" initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: .2 }}>
          <div><span>{String(active + 1).padStart(2, "0")}</span><strong>{data.items[active].title}</strong></div>
          <p>{data.items[active].text}</p>
        </motion.div>
      </AnimatePresence>
      <div className="eventra-flow-signals">{data.signals.map((signal) => <span key={signal}><Icon name="shield" size={13} />{signal}</span>)}</div>
    </div>
  );
}

function ChallengeSketch({ index }) {
  if (index === 0) return <div className="challenge-sketch"><Icon name="monitor" /><span>→</span><Icon name="lock" /><span>→</span><Icon name="database" /></div>;
  if (index === 1) return <div className="challenge-sketch"><Icon name="eyeOff" /><span>+</span><Icon name="shield" /><span>→</span><Icon name="user" /></div>;
  if (index === 2) return <div className="challenge-sketch"><Icon name="cloud" /><span>→</span><Icon name="lock" /><span>→</span><Icon name="database" /></div>;
  return <div className="challenge-sketch"><Icon name="clock" /><span>→</span><Icon name="database" /><span>→</span><Icon name="check" /></div>;
}

function ChallengeSlider({ data, language }) {
  const [active, setActive] = useState(0);
  const item = data.items[active];
  const prev = () => setActive((value) => (value - 1 + data.items.length) % data.items.length);
  const next = () => setActive((value) => (value + 1) % data.items.length);

  return (
    <div className="challenge-slider">
      <div className="challenge-slider-controls">
        <div className="challenge-dots">{data.items.map((challenge, index) => <button key={challenge.title} type="button" className={index === active ? "is-active" : ""} onClick={() => setActive(index)} aria-label={challenge.title} />)}</div>
        <div><button type="button" onClick={prev}>←</button><span>{active + 1} / {data.items.length}</span><button type="button" onClick={next}>→</button></div>
      </div>
      <AnimatePresence mode="wait">
        <motion.article key={item.title} className="challenge-slide" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} transition={{ duration: .25 }}>
          <div className="challenge-slide-visual">
            <span className="challenge-slide-icon"><Icon name={challengeIcons[active]} size={28} /></span>
            <ChallengeSketch index={active} />
            <div className="challenge-slide-index">0{active + 1}</div>
          </div>
          <div className="challenge-slide-content">
            <h3>{item.title}</h3>
            <div className="challenge-triplet">
              <div><span>{language === "es" ? "Problema" : "Problem"}</span><p>{item.problem}</p></div>
              <div><span>{language === "es" ? "Decisión" : "Decision"}</span><p>{item.decision}</p></div>
              <div><span>{language === "es" ? "Resultado" : "Result"}</span><p>{item.result}</p></div>
            </div>
          </div>
        </motion.article>
      </AnimatePresence>
      <div className="challenge-peek-row">
        {data.items.map((challenge, index) => (
          <button key={challenge.title} type="button" className={active === index ? "is-active" : ""} onClick={() => setActive(index)}>
            <Icon name={challengeIcons[index]} size={16} /><span>{challenge.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function EventraCaseStudy() {
  const { language } = useSite();
  const { eventra, common } = useMemo(() => siteContent[language], [language]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="case-page">
      <section className="case-hero">
        <div className="shell">
          <Link className="case-back" to={`/${language}`}>{common.backToPortfolio}</Link>
          <div className="case-hero-grid">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="project-tier flagship"><span>{eventra.tier}</span><small>{eventra.category}</small></div>
              <h1>Eventra</h1>
              <p className="case-subtitle">{eventra.subtitle}</p>
              <p className="case-lead">{eventra.lead}</p>
              <div className="tag-row case-hero-tags">{eventra.heroTags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <div className="case-actions"><a className="button button-primary" href="https://eventra.pages.dev/" target="_blank" rel="noreferrer">{common.openLivePlatform} <Icon name="external" /></a><a className="button button-ghost" href="https://eventra.pages.dev/download" target="_blank" rel="noreferrer">{common.downloadAgent}</a></div>
              <div className="case-meta">{eventra.meta.map((meta) => <span key={meta}>{meta}</span>)}</div>
            </motion.div>
            <EventraVisual />
          </div>
        </div>
      </section>

      <div className="shell case-content">
        <CaseSection number={eventra.why.number} eyebrow={eventra.why.eyebrow} title={eventra.why.title} className="case-why-v35 case-viewport-section-v35">
          <PrincipleShowcase why={eventra.why} language={language} />
        </CaseSection>

        <CaseSection number={eventra.objectives.number} eyebrow={eventra.objectives.eyebrow} title={eventra.objectives.title} className="case-objectives-v35 case-viewport-section-v35">
          <p className="case-section-intro">{eventra.objectives.intro}</p>
          <ObjectiveGrid items={eventra.objectives.items} language={language} />
        </CaseSection>

        <CaseSection number={eventra.architecture.number} eyebrow={eventra.architecture.eyebrow} title={eventra.architecture.title}>
          <div className="architecture-stack">{eventra.architecture.items.map((item, index) => <article key={item.name}><span>{String(index + 1).padStart(2, "0")}</span><div><strong>{item.name}</strong><small>{item.tech}</small></div><p>{item.note}</p></article>)}</div>
        </CaseSection>

        <CaseSection number={eventra.workflow.number} eyebrow={eventra.workflow.eyebrow} title={eventra.workflow.title}>
          <p className="case-section-intro">{eventra.workflow.intro}</p>
          <EventraFlow data={eventra.workflow} />
        </CaseSection>

        <CaseSection number={eventra.challenges.number} eyebrow={eventra.challenges.eyebrow} title={eventra.challenges.title}>
          <p className="case-section-intro">{eventra.challenges.intro}</p>
          <ChallengeSlider data={eventra.challenges} language={language} />
        </CaseSection>

        <CaseSection number={eventra.technologies.number} eyebrow={eventra.technologies.eyebrow} title={eventra.technologies.title}>
          <div className="technology-matrix">{Object.entries(eventra.technologies.groups).map(([group, techs]) => <article key={group}><h3>{group}</h3><div>{techs.map((tech) => <span key={tech}>{tech}</span>)}</div></article>)}</div>
        </CaseSection>

        <section className="case-cta"><p className="eyebrow">{common.nextStep}</p><h2>{eventra.cta.title}</h2><div><Link className="button button-primary" to={`/${language}#contact`}>{common.startConversation} <Icon name="arrow" /></Link><a className="button button-ghost" href="https://eventra.pages.dev/" target="_blank" rel="noreferrer">{language === "es" ? "Explorar Eventra" : "Explore Eventra"}</a></div></section>
      </div>
    </main>
  );
}
