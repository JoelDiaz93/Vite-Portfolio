import Icon from "./Icon";
import { useSite } from "../context/SiteContext";

export default function EventraVisual({ compact = false }) {
  const { language } = useSite();
  const text = language === "es" ? {
    title: "Mapa del sistema Eventra",
    agent: "Agente Windows",
    api: "API Go",
    data: "PostgreSQL",
    dashboard: "Dashboard",
    legend: ["sesiones explícitas", "metadatos seguros", "entrega HTTPS"],
  } : {
    title: "Eventra system map",
    agent: "Windows Agent",
    api: "Go API",
    data: "PostgreSQL",
    dashboard: "Dashboard",
    legend: ["explicit sessions", "privacy-safe metadata", "HTTPS delivery"],
  };

  return (
    <div className={`eventra-visual ${compact ? "is-compact" : ""}`}>
      <div className="eventra-windowbar"><span className="eventra-mark">EV</span><span>{text.title}</span><i /><i /><i /></div>
      <div className="eventra-map">
        <div className="map-node agent"><Icon name="shield"/><strong>{text.agent}</strong><small>C++20 · Win32 · DPAPI</small></div>
        <div className="map-line line-a" />
        <div className="map-node api"><Icon name="code"/><strong>{text.api}</strong><small>Render · REST · SSE</small></div>
        <div className="map-line line-b" />
        <div className="map-node data"><Icon name="layers"/><strong>{text.data}</strong><small>Neon</small></div>
        <div className="map-line line-c" />
        <div className="map-node ui"><Icon name="chart"/><strong>{text.dashboard}</strong><small>SvelteKit · Cloudflare</small></div>
        <div className="map-pulse pulse-one" />
        <div className="map-pulse pulse-two" />
      </div>
      <div className="eventra-legend">{text.legend.map((item) => <span key={item}><b />{item}</span>)}</div>
    </div>
  );
}
