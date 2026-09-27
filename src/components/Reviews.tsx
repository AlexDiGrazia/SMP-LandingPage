import { reviews } from "@/lib/content";

export default function Reviews() {
  return (
    <section className="section--light" aria-label="Reviews">
      <div className="container section" style={{ display: "flex", flexDirection: "column", gap: 32 }}>
        <h2 className="h2">What clients say</h2>
        <div className="reviews__grid">
          {reviews.map((r, i) => (
            <div className="review-card" key={i}>
              <div className="review-card__stars">★★★★★</div>
              <p className="review-card__text">&ldquo;{r.text}&rdquo;</p>
              <div className="review-card__name">
                {r.name} <span>· {r.src}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
