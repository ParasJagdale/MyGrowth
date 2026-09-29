const cardSymbols = ["✓", "↗", "◆"];

function SummaryCards({ cards }) {
  return (
    <section className="summary" aria-label="Learning summary">
      {cards.map((card, index) => (
        <article className="summary-card" key={card.label}>
          <div className="summary-card-top">
            <span className="summary-icon" aria-hidden="true">
              {cardSymbols[index]}
            </span>
            <span className="summary-trend">Live</span>
          </div>
          <strong>{card.value}</strong>
          <p>{card.label}</p>
          <span className="summary-accent" />
        </article>
      ))}
    </section>
  );
}

export default SummaryCards;
