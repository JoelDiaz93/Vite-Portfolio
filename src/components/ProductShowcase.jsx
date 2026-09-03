import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

const copy = {
  es: {
    eyebrow: "Product showcase",
    title: "Productos vistos como sistemas, no solo como pantallas",
    subtitle:
      "Una lectura visual de tres proyectos que representan distintos niveles de ingeniería: SaaS full stack, plataforma empresarial con IA y telemetría nativa orientada a privacidad.",
    signalTitle: "Señales técnicas",
    flowTitle: "Challenge → Decision → Outcome",
    timelineTitle: "Evolución del proyecto",
    interfaceLabel: "Vista conceptual del producto",
    architectureLabel: "Flujo de arquitectura",
    tabs: { QRFlow: "QRFlow", Cerynt: "Cerynt", Eventra: "Eventra" },
    projects: {
      QRFlow: {
        category: "Full-Stack SaaS",
        headline: "De generador QR a producto administrable y medible",
        description:
          "El valor técnico no está en dibujar el QR, sino en controlar su destino, propiedad, estado y analítica sin volver a generarlo.",
        signals: ["Clean Architecture", "JWT", "PostgreSQL", "Docker", "Azure"],
        flow: [
          { label: "Challenge", value: "QR estático y sin trazabilidad" },
          { label: "Decision", value: "Redirect dinámico controlado por API" },
          { label: "Outcome", value: "Destino editable + tracking + ownership" },
        ],
        timeline: [
          { step: "01", title: "Utility", text: "Generación básica y experiencia inicial." },
          { step: "02", title: "Platform", text: "Autenticación, persistencia y recursos por usuario." },
          { step: "03", title: "SaaS MVP", text: "QR dinámico, estados y analítica de redirección." },
          { step: "04", title: "Delivery", text: "Docker, validaciones y preparación/despliegue cloud." },
        ],
        architecture: ["Next.js", "REST / JWT", ".NET API", "Domain", "PostgreSQL", "Azure"],
      },
      Cerynt: {
        category: "Intelligent Trust Platform",
        headline: "Confianza digital como arquitectura de producto",
        description:
          "La plataforma organiza identidad, documentos, workflows, firmas, evidencia, verificación e IA dentro de límites de dominio explícitos.",
        signals: ["Spring Modulith", "Keycloak", "pgvector", "FastAPI", "RAG"],
        flow: [
          { label: "Challenge", value: "Procesos sensibles fragmentados" },
          { label: "Decision", value: "Monolito modular + identidad desacoplada" },
          { label: "Outcome", value: "Trazabilidad, evolución modular y base para IA" },
        ],
        timeline: [
          { step: "01", title: "Domain", text: "Definición de organizaciones, identidad, documentos y evidencia." },
          { step: "02", title: "Workflow", text: "Aprobaciones, participantes, firmas y estados." },
          { step: "03", title: "Trust", text: "Versionado, auditoría y verificación pública." },
          { step: "04", title: "Intelligence", text: "Extracción, análisis y RAG con provenance." },
        ],
        architecture: ["Angular", "Keycloak", "Spring Modulith", "PostgreSQL", "pgvector", "AI Services"],
      },
      Eventra: {
        category: "Privacy-First Telemetry",
        headline: "Telemetría útil sin capturar contenido sensible",
        description:
          "Eventra conecta un agente Windows nativo con una API Go y analítica web, preservando la privacidad desde el diseño de la señal.",
        signals: ["C++20", "Win32", "Go", "SvelteKit", "PostgreSQL"],
        flow: [
          { label: "Challenge", value: "Obtener actividad sin vigilar contenido" },
          { label: "Decision", value: "Sesiones explícitas + metadata mínima" },
          { label: "Outcome", value: "Telemetría analizable con enfoque privacy-first" },
        ],
        timeline: [
          { step: "01", title: "Agent", text: "Agente Windows, enrolamiento y sesiones visibles." },
          { step: "02", title: "Ingestion", text: "API Go, batching y persistencia PostgreSQL." },
          { step: "03", title: "Analytics", text: "Dashboard SvelteKit y métricas de actividad." },
          { step: "04", title: "Hardening", text: "DPAPI, HTTPS y separación de secretos del ejecutable." },
        ],
        architecture: ["C++ Agent", "HTTPS", "Go API", "PostgreSQL", "Analytics", "SvelteKit"],
      },
    },
  },
  en: {
    eyebrow: "Product showcase",
    title: "Products viewed as systems, not only as screens",
    subtitle:
      "A visual reading of three projects that represent different engineering layers: full-stack SaaS, an enterprise AI platform, and privacy-first native telemetry.",
    signalTitle: "Engineering signals",
    flowTitle: "Challenge → Decision → Outcome",
    timelineTitle: "Project evolution",
    interfaceLabel: "Conceptual product view",
    architectureLabel: "Architecture flow",
    tabs: { QRFlow: "QRFlow", Cerynt: "Cerynt", Eventra: "Eventra" },
    projects: {
      QRFlow: {
        category: "Full-Stack SaaS",
        headline: "From QR generator to manageable, measurable product",
        description:
          "The engineering value is not drawing the QR itself; it is controlling destination, ownership, lifecycle, and analytics without regenerating the code.",
        signals: ["Clean Architecture", "JWT", "PostgreSQL", "Docker", "Azure"],
        flow: [
          { label: "Challenge", value: "Static QR with no traceability" },
          { label: "Decision", value: "API-controlled dynamic redirect" },
          { label: "Outcome", value: "Editable target + tracking + ownership" },
        ],
        timeline: [
          { step: "01", title: "Utility", text: "Basic generation and initial experience." },
          { step: "02", title: "Platform", text: "Authentication, persistence, and user-owned resources." },
          { step: "03", title: "SaaS MVP", text: "Dynamic QR, lifecycle states, and redirect analytics." },
          { step: "04", title: "Delivery", text: "Docker, validation, and cloud preparation/deployment." },
        ],
        architecture: ["Next.js", "REST / JWT", ".NET API", "Domain", "PostgreSQL", "Azure"],
      },
      Cerynt: {
        category: "Intelligent Trust Platform",
        headline: "Digital trust treated as product architecture",
        description:
          "The platform organizes identity, documents, workflows, signatures, evidence, verification, and AI inside explicit domain boundaries.",
        signals: ["Spring Modulith", "Keycloak", "pgvector", "FastAPI", "RAG"],
        flow: [
          { label: "Challenge", value: "Fragmented sensitive processes" },
          { label: "Decision", value: "Modular monolith + decoupled identity" },
          { label: "Outcome", value: "Traceability, modular evolution, and an AI-ready base" },
        ],
        timeline: [
          { step: "01", title: "Domain", text: "Organizations, identity, documents, and evidence boundaries." },
          { step: "02", title: "Workflow", text: "Approvals, participants, signatures, and lifecycle states." },
          { step: "03", title: "Trust", text: "Versioning, auditability, and public verification." },
          { step: "04", title: "Intelligence", text: "Extraction, analysis, and provenance-aware RAG." },
        ],
        architecture: ["Angular", "Keycloak", "Spring Modulith", "PostgreSQL", "pgvector", "AI Services"],
      },
      Eventra: {
        category: "Privacy-First Telemetry",
        headline: "Useful telemetry without capturing sensitive content",
        description:
          "Eventra connects a native Windows agent with a Go API and web analytics while preserving privacy in the signal design itself.",
        signals: ["C++20", "Win32", "Go", "SvelteKit", "PostgreSQL"],
        flow: [
          { label: "Challenge", value: "Understand activity without watching content" },
          { label: "Decision", value: "Explicit sessions + minimum metadata" },
          { label: "Outcome", value: "Analyzable telemetry with a privacy-first model" },
        ],
        timeline: [
          { step: "01", title: "Agent", text: "Windows agent, enrollment, and visible sessions." },
          { step: "02", title: "Ingestion", text: "Go API, batching, and PostgreSQL persistence." },
          { step: "03", title: "Analytics", text: "SvelteKit dashboard and activity metrics." },
          { step: "04", title: "Hardening", text: "DPAPI, HTTPS, and secret separation from the executable." },
        ],
        architecture: ["C++ Agent", "HTTPS", "Go API", "PostgreSQL", "Analytics", "SvelteKit"],
      },
    },
  },
};

const BrowserShell = ({ children, title, badge }) => (
  <div className="overflow-hidden rounded-[26px] border border-white/10 bg-[#0f0e0d] shadow-2xl shadow-black/20">
    <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#171513] px-4 py-3">
      <div className="flex gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF4000]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#99C24D]/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#21ABF5]/70" />
      </div>
      <div className="hidden sm:flex min-w-0 flex-1 justify-center">
        <div className="max-w-[360px] flex-1 truncate rounded-lg border border-white/10 bg-white/5 px-4 py-1.5 text-center text-xs text-[#D7DEDC]/60">
          {title}
        </div>
      </div>
      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-[#99C24D]">
        {badge}
      </span>
    </div>
    {children}
  </div>
);

const QrFlowMockup = () => (
  <BrowserShell title="app.qrflow / dashboard" badge="MVP">
    <div className="grid min-h-[410px] md:grid-cols-[150px_1fr]">
      <aside className="hidden border-r border-white/10 bg-white/[0.025] p-4 md:block">
        <div className="mb-6 h-7 w-24 rounded-lg bg-[#21ABF5]/20" />
        {["Overview", "QR Codes", "Analytics", "Settings"].map((item, index) => (
          <div key={item} className={`mb-2 rounded-xl px-3 py-2 text-xs ${index === 0 ? "bg-[#21ABF5]/15 text-[#21ABF5]" : "text-[#D7DEDC]/60"}`}>
            {item}
          </div>
        ))}
      </aside>
      <main className="p-4 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="h-3 w-20 rounded bg-white/10" />
            <div className="mt-3 h-7 w-44 rounded-lg bg-white/15" />
          </div>
          <div className="rounded-xl bg-[#99C24D] px-4 py-2 text-xs font-bold text-white">+ New QR</div>
        </div>
        <div className="mt-6 grid grid-cols-3 gap-3">
          {["Active", "Paused", "Scans"].map((label, index) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] uppercase tracking-[0.15em] text-[#D7DEDC]/50">{label}</p>
              <div className={`mt-3 h-6 rounded ${index === 2 ? "w-20 bg-[#21ABF5]/25" : "w-12 bg-white/15"}`} />
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <div className="h-4 w-28 rounded bg-white/15" />
              <div className="h-3 w-14 rounded bg-white/10" />
            </div>
            <div className="mt-6 flex h-32 items-end gap-2">
              {[30, 48, 42, 68, 58, 88, 76, 96, 70, 100, 84, 92].map((height, index) => (
                <div key={index} className="flex-1 rounded-t bg-gradient-to-t from-[#21ABF5]/25 to-[#21ABF5]/80" style={{ height: `${height}%` }} />
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="mx-auto grid h-28 w-28 grid-cols-5 gap-1 rounded-xl bg-white p-2">
              {Array.from({ length: 25 }).map((_, index) => (
                <span key={index} className={`${[0,1,2,5,7,10,11,12,4,9,14,16,18,20,21,22,24].includes(index) ? "bg-[#151311]" : "bg-white"}`} />
              ))}
            </div>
            <div className="mx-auto mt-4 h-3 w-24 rounded bg-white/10" />
            <div className="mx-auto mt-2 h-2 w-32 rounded bg-white/5" />
          </div>
        </div>
      </main>
    </div>
  </BrowserShell>
);

const CeryntMockup = () => (
  <BrowserShell title="cerynt / trust workspace" badge="Design">
    <div className="min-h-[410px] p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="h-3 w-24 rounded bg-[#99C24D]/20" />
          <div className="mt-3 h-7 w-52 rounded-lg bg-white/15" />
        </div>
        <div className="flex gap-2">
          <span className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-[#D7DEDC]">Verify</span>
          <span className="rounded-xl bg-[#21ABF5] px-3 py-2 text-xs font-bold text-white">New workflow</span>
        </div>
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="h-4 w-32 rounded bg-white/15" />
            <span className="rounded-full bg-[#99C24D]/10 px-3 py-1 text-[10px] text-[#99C24D]">AUDITABLE</span>
          </div>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ["Draft", "2"],
              ["Review", "3"],
              ["Signed", "1"],
            ].map(([title, count], columnIndex) => (
              <div key={title} className="rounded-xl border border-white/10 bg-[#141210] p-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-[#D7DEDC]">{title}</p>
                  <span className="text-[10px] text-[#D7DEDC]/40">{count}</span>
                </div>
                {[0, 1, ...(columnIndex === 1 ? [2] : [])].map((item) => (
                  <div key={item} className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
                    <div className="h-3 w-4/5 rounded bg-white/10" />
                    <div className="mt-2 h-2 w-2/3 rounded bg-white/5" />
                    <div className="mt-3 flex gap-1">
                      <span className="h-5 w-5 rounded-full bg-[#21ABF5]/20" />
                      <span className="h-5 w-5 rounded-full bg-[#99C24D]/20" />
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          <div className="rounded-2xl border border-[#21ABF5]/20 bg-[#21ABF5]/5 p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.15em] text-[#21ABF5]">AI insight</p>
              <span className="rounded-full bg-[#21ABF5]/10 px-2 py-1 text-[9px] text-[#21ABF5]">RAG</span>
            </div>
            <div className="mt-4 h-3 w-5/6 rounded bg-white/10" />
            <div className="mt-2 h-3 w-full rounded bg-white/10" />
            <div className="mt-2 h-3 w-3/4 rounded bg-white/10" />
            <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-3">
              <div className="h-2 w-2/3 rounded bg-[#99C24D]/20" />
              <div className="mt-2 h-2 w-1/2 rounded bg-white/5" />
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-[#D7DEDC]/50">Evidence chain</p>
            <div className="mt-4 flex items-center gap-2">
              {["ID", "DOC", "SIGN", "HASH"].map((item, index) => (
                <React.Fragment key={item}>
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#141210] text-[9px] font-bold text-[#D7DEDC]">{item}</span>
                  {index < 3 && <span className="h-[2px] flex-1 bg-white/10" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </BrowserShell>
);

const EventraMockup = () => (
  <BrowserShell title="eventra / analytics" badge="Prototype">
    <div className="grid min-h-[410px] md:grid-cols-[160px_1fr]">
      <aside className="hidden border-r border-white/10 bg-white/[0.025] p-4 md:block">
        <div className="mb-6 flex items-center gap-2">
          <span className="h-8 w-8 rounded-xl bg-[#99C24D]/20" />
          <div className="h-4 w-20 rounded bg-white/10" />
        </div>
        {["Sessions", "Activity", "Devices", "Privacy"].map((item, index) => (
          <div key={item} className={`mb-2 rounded-xl px-3 py-2 text-xs ${index === 1 ? "bg-[#99C24D]/10 text-[#99C24D]" : "text-[#D7DEDC]/55"}`}>
            {item}
          </div>
        ))}
      </aside>
      <main className="p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#99C24D]">Privacy-first telemetry</p>
            <div className="mt-3 h-7 w-44 rounded-lg bg-white/15" />
          </div>
          <span className="rounded-full border border-[#99C24D]/20 bg-[#99C24D]/10 px-3 py-1.5 text-xs text-[#99C24D]">Live session</span>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ["108", "Events"],
            ["2", "Active sessions"],
            ["Metadata", "Capture model"],
            ["DPAPI", "Credential protection"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-lg font-bold text-white">{value}</p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.14em] text-[#D7DEDC]/45">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex justify-between gap-3">
              <div className="h-4 w-28 rounded bg-white/10" />
              <div className="h-3 w-14 rounded bg-[#99C24D]/20" />
            </div>
            <svg viewBox="0 0 420 130" className="mt-5 h-32 w-full" role="img" aria-label="telemetry trend">
              <defs>
                <linearGradient id="eventraArea" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#99C24D" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="#99C24D" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0 105 L38 93 L76 99 L114 72 L152 78 L190 52 L228 61 L266 34 L304 42 L342 22 L380 31 L420 12 L420 130 L0 130 Z" fill="url(#eventraArea)" />
              <polyline points="0,105 38,93 76,99 114,72 152,78 190,52 228,61 266,34 304,42 342,22 380,31 420,12" fill="none" stroke="#99C24D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-semibold text-white">Signal policy</p>
            {[
              ["Window metadata", true],
              ["Session timestamps", true],
              ["Keystroke content", false],
              ["Screen content", false],
            ].map(([label, enabled]) => (
              <div key={label} className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-black/20 px-3 py-2">
                <span className="text-[11px] text-[#D7DEDC]/70">{label}</span>
                <span className={`h-2.5 w-2.5 rounded-full ${enabled ? "bg-[#99C24D]" : "bg-[#FF4000]/50"}`} />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  </BrowserShell>
);

const mockups = {
  QRFlow: QrFlowMockup,
  Cerynt: CeryntMockup,
  Eventra: EventraMockup,
};

const ArchitectureFlow = ({ nodes }) => (
  <div className="overflow-x-auto pb-2">
    <div className="flex min-w-[760px] items-center gap-2">
      {nodes.map((node, index) => (
        <React.Fragment key={node}>
          <div className="flex-1 rounded-2xl border border-white/10 bg-[#141210] px-4 py-4 text-center text-sm font-semibold text-[#D7DEDC]">
            {node}
          </div>
          {index < nodes.length - 1 && (
            <div className="flex items-center gap-1 text-[#21ABF5]">
              <span className="h-[2px] w-5 bg-[#21ABF5]/35" />
              <span>›</span>
            </div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

const ProductShowcase = ({ content }) => {
  const locale = content.brand.name && content.navbar.about === "Perfil" ? "es" : "en";
  const t = copy[locale];
  const projectNames = useMemo(() => ["QRFlow", "Cerynt", "Eventra"], []);
  const [selected, setSelected] = useState("QRFlow");
  const project = t.projects[selected];
  const Mockup = mockups[selected];

  return (
    <div className="relative w-full min-h-screen mt-10 lg:mt-16 p-6 sm:p-10">
      <motion.div variants={textVariant()}>
        <span className="text-[#99C24D] text-sm uppercase tracking-[0.22em] font-semibold">{t.eyebrow}</span>
        <h2 className="mt-3">{t.title}</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-6 max-w-6xl text-lg md:text-xl text-[#D7DEDC] leading-8 text-justify"
      >
        {t.subtitle}
      </motion.p>

      <div className="mt-8 flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 w-fit">
        {projectNames.map((name) => (
          <button
            key={name}
            type="button"
            onClick={() => setSelected(name)}
            className={`rounded-xl px-5 py-2.5 font-semibold transition ${
              selected === name ? "bg-[#99C24D] text-white" : "text-[#D7DEDC] hover:bg-white/5"
            }`}
          >
            {t.tabs[name]}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.3 }}
          className="mt-8 grid gap-6"
        >
          <div className="grid gap-6 xl:grid-cols-[0.72fr_1.28fr]">
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8">
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-white/10 bg-[#141210] px-3 py-1 text-xs text-[#99C24D]">{project.category}</span>
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-[#D7DEDC]">{selected}</span>
              </div>
              <h3 className="mt-6 text-3xl font-bold leading-tight text-white sm:text-4xl">{project.headline}</h3>
              <p className="mt-5 text-base leading-8 text-[#D7DEDC] sm:text-lg">{project.description}</p>

              <p className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-[#21ABF5]">{t.signalTitle}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.signals.map((signal) => (
                  <span key={signal} className="rounded-full border border-[#21ABF5]/20 bg-[#21ABF5]/10 px-3 py-2 text-sm text-[#D7DEDC]">
                    {signal}
                  </span>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-[#141210] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#D7DEDC]/50">{t.flowTitle}</p>
                <div className="mt-4 grid gap-3">
                  {project.flow.map((item, index) => (
                    <div key={item.label} className="grid grid-cols-[92px_1fr] gap-3 items-start">
                      <div className={`rounded-xl px-3 py-2 text-center text-[10px] font-bold uppercase tracking-[0.14em] ${index === 0 ? "bg-[#FF4000]/10 text-[#FF4000]" : index === 1 ? "bg-[#21ABF5]/10 text-[#21ABF5]" : "bg-[#99C24D]/10 text-[#99C24D]"}`}>
                        {item.label}
                      </div>
                      <p className="text-sm leading-6 text-[#D7DEDC]">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent p-3 sm:p-4">
              <p className="mb-3 px-2 text-xs font-bold uppercase tracking-[0.2em] text-[#D7DEDC]/45">{t.interfaceLabel}</p>
              <Mockup />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/5 p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h4 className="text-2xl font-bold text-white">{t.architectureLabel}</h4>
              <span className="rounded-full border border-white/10 bg-[#141210] px-3 py-1 text-xs uppercase tracking-[0.16em] text-[#21ABF5]">System flow</span>
            </div>
            <div className="mt-6">
              <ArchitectureFlow nodes={project.architecture} />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-[#141210] p-6 sm:p-8">
            <h4 className="text-2xl font-bold text-white">{t.timelineTitle}</h4>
            <div className="mt-7 grid gap-4 lg:grid-cols-4">
              {project.timeline.map((item, index) => (
                <div key={item.step} className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
                  {index < project.timeline.length - 1 && (
                    <div className="absolute left-[calc(100%-1px)] top-9 hidden h-[2px] w-5 bg-white/10 lg:block" />
                  )}
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#99C24D]/20 bg-[#99C24D]/10 text-xs font-bold text-[#99C24D]">{item.step}</div>
                  <h5 className="mt-4 text-lg font-bold text-white">{item.title}</h5>
                  <p className="mt-3 text-sm leading-7 text-[#D7DEDC]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SectionWrapper(ProductShowcase, "showcase");
