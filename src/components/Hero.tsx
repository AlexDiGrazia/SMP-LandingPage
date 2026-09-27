import { business } from "@/lib/content";
import BeforeAfterPair from "./BeforeAfterPair";

export default function Hero() {
  return (
    <section className="container hero grid-2" aria-label="Hero">
      <div className="hero__copy">
        <div className="eyebrow">
          Scalp Micropigmentation · {business.city}, {business.state}
        </div>
        <h1 className="h1">A hairline nobody questions.</h1>
        <p className="lede" style={{ maxWidth: 520 }}>
          Natural-looking SMP for receding hairlines, thinning and hair loss — performed personally by Karl, an
          experienced SMP artist. No salespeople. No call center.
        </p>
        <div className="btn-row" id="hero-cta">
          <a href="#consult" className="btn btn-primary">
            Get Your Free Consultation
          </a>
          <a href={business.phoneHref} data-track="CallClick" className="btn-outline">
            Call Karl
          </a>
        </div>
        <div className="hero__stars">
          <span className="stars">★★★★★</span>
          <span>
            [{business.rating}] on Google · [{business.reviewCount}] reviews
          </span>
        </div>
      </div>
      <BeforeAfterPair label="hero" className="hero__media" />
    </section>
  );
}
