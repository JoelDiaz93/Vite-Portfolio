import Icon from "./Icon";

const qrPattern = [
  1,1,1,1,1,0,1,1,1,1,1,
  1,0,0,0,1,0,1,0,0,0,1,
  1,0,1,0,1,1,1,0,1,0,1,
  1,0,0,0,1,0,1,0,0,0,1,
  1,1,1,1,1,0,1,1,1,1,1,
  0,0,1,0,0,1,0,1,0,1,0,
  1,1,0,1,1,0,1,0,1,1,1,
  1,0,1,0,1,1,0,1,0,0,1,
  1,1,1,1,1,0,1,1,1,0,1,
  1,0,0,0,1,1,0,0,1,1,0,
  1,1,1,1,1,0,1,1,0,1,1,
];

function WindowBar({ mark, label, badge }) {
  return (
    <div className="product-mini-windowbar">
      <span className="product-mini-mark">{mark}</span>
      <strong>{label}</strong>
      <small>{badge}</small>
      <i /><i /><i />
    </div>
  );
}

function QRFlowVisual({ expanded = false }) {
  return (
    <div className={`product-mini-visual qrflow-mini ${expanded ? "is-expanded" : ""}`}>
      <WindowBar mark="Q" label="QRFlow" badge="SaaS workspace" />
      <div className="qrflow-mini-body">
        <div className="qrflow-mini-sidebar">
          <span className="is-active"><Icon name="layers" size={15} /> Dashboard</span>
          <span><Icon name="link" size={15} /> QR codes</span>
          <span><Icon name="chart" size={15} /> Analytics</span>
          <span><Icon name="user" size={15} /> Account</span>
        </div>
        <div className="qrflow-mini-main">
          <div className="qrflow-mini-stats">
            <article><small>ACTIVE QR</small><strong>12</strong><span>owner scoped</span></article>
            <article><small>SCANS</small><strong>284</strong><span>tracked events</span></article>
            <article><small>STATUS</small><strong>Live</strong><span>editable target</span></article>
          </div>
          <div className="qrflow-mini-lower">
            <div className="qrflow-qr-card">
              <div className="qrflow-qr-grid">{qrPattern.map((cell, index) => <i key={index} className={cell ? "on" : ""} />)}</div>
              <div><strong>Campaign QR</strong><small>/r/summer-26</small><span>Destination can change without regenerating the QR.</span></div>
            </div>
            <div className="qrflow-chart-card">
              <div><strong>Scan activity</strong><small>LAST 7 DAYS</small></div>
              <div className="qrflow-bars">{[42,68,52,82,64,92,74].map((height, index) => <i key={index} style={{ height: `${height}%` }} />)}</div>
              <div className="qrflow-chart-legend"><span>redirect</span><span>analytics</span><span>lifecycle</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CeryntVisual({ expanded = false }) {
  return (
    <div className={`product-mini-visual cerynt-mini ${expanded ? "is-expanded" : ""}`}>
      <WindowBar mark="C" label="Cerynt" badge="Trust workspace" />
      <div className="cerynt-mini-body">
        <div className="cerynt-flow-head">
          <div><small>WORKSPACE</small><strong>Vendor agreement · v03</strong></div>
          <span><Icon name="shield" size={15} /> Evidence ready</span>
        </div>
        <div className="cerynt-pipeline">
          {[
            ["Document", "database"],
            ["Review", "eyeOff"],
            ["Approval", "check"],
            ["Evidence", "shield"],
            ["AI", "spark"],
          ].map(([label, icon], index) => (
            <div className="cerynt-pipeline-step" key={label}>
              <span className={index === 3 ? "is-copper" : ""}><Icon name={icon} size={17} /></span>
              <small>{String(index + 1).padStart(2, "0")}</small>
              <strong>{label}</strong>
              {index < 4 && <i>→</i>}
            </div>
          ))}
        </div>
        <div className="cerynt-mini-grid">
          <article className="cerynt-document-card">
            <div className="cerynt-doc-lines"><i /><i /><i /><i /><i /></div>
            <div><small>IMMUTABLE VERSION</small><strong>Agreement_v03</strong><span>Hash · author · timestamp · lifecycle state</span></div>
          </article>
          <article className="cerynt-audit-card">
            <small>TRUST SIGNALS</small>
            <div><span><Icon name="lock" size={14} /> Identity boundary</span><b>OIDC</b></div>
            <div><span><Icon name="clock" size={14} /> Audit trail</span><b>Event</b></div>
            <div><span><Icon name="spark" size={14} /> AI grounding</span><b>RAG</b></div>
          </article>
          <article className="cerynt-ai-card">
            <div><span><Icon name="spark" size={16} /></span><strong>Document intelligence</strong></div>
            <p>Extraction, risk signals and grounded answers designed around traceable sources.</p>
            <div className="cerynt-source-line"><i /><span>source chunks</span><i /></div>
          </article>
        </div>
      </div>
    </div>
  );
}

export default function ProjectMiniVisual({ type, expanded = false }) {
  if (type === "qrflow") return <QRFlowVisual expanded={expanded} />;
  if (type === "cerynt") return <CeryntVisual expanded={expanded} />;
  return null;
}
