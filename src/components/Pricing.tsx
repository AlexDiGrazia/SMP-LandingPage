// Client's job listing summary said $1,500–$3,500, but the pricing copy said
// $1,800–$3,500 — confirm the correct range with Karl before launch.
export default function Pricing() {
  return (
    <section className="container-narrow pricing" aria-label="Pricing">
      <div className="eyebrow">Investment</div>
      <p className="pricing__amount">
        Most treatments range from approximately <strong style={{ fontWeight: 600 }}>$1,800–$3,500</strong>,
        depending on the amount of work required.
      </p>
      <p className="pricing__note">
        Exact pricing is set after Karl reviews your scalp and goals during your free consultation. No pressure, no
        obligation.
      </p>
    </section>
  );
}
