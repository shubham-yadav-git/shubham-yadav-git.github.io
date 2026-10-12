export default function Section({ id, num, title, intro, children }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <header className="section__head">
        <span className="section__num" aria-hidden="true">§{num}</span>
        <h2 id={`${id}-title`} className="section__title">{title}</h2>
      </header>
      {intro && <p className="section__intro">{intro}</p>}
      {children}
    </section>
  );
}
