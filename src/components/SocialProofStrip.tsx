import { proofQuotes } from "@/lib/content";

export default function SocialProofStrip() {
  return (
    <section className="section--bordered-both" aria-label="Social proof">
      <div className="container proof-strip__grid">
        {proofQuotes.map((q, i) => (
          <div className="proof-item" key={i}>
            <div className="proof-item__text">&ldquo;{q.text}&rdquo;</div>
            <div className="proof-item__name">{q.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
