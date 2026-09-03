export default function SectionHeading({ index, eyebrow, title, copy }) {
  return (
    <div className="section-heading">
      <div className="section-index">{index}</div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {copy && <p className="section-copy">{copy}</p>}
      </div>
    </div>
  );
}
