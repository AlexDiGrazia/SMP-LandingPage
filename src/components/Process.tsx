import { processSteps } from "@/lib/content";

export default function Process() {
  return (
    <section className="section--alt" aria-label="How it works">
      <div className="container section process">
        <h2 className="h2">How it works</h2>
        <div className="process__grid">
          {processSteps.map((s) => (
            <div className="process-card" key={s.n}>
              <div className="process-card__n">{s.n}</div>
              <div className="process-card__t">{s.t}</div>
              <div className="process-card__s">{s.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
