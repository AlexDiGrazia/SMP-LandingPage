import { business } from "@/lib/content";

export default function FinalCtaAndFooter() {
  return (
    <section className="section--bordered" aria-label="Final call to action">
      <div className="container-narrow final-cta">
        <h2 className="h1--cta">Ready to see what&apos;s possible?</h2>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <a href="#consult" className="btn btn-primary">
            Get My Free Consultation
          </a>
          <a href={business.phoneHref} data-track="CallClick" className="btn-outline">
            Call Karl
          </a>
        </div>
      </div>
      <footer className="container site-footer">
        <div>
          {business.brandName} · {business.address}
        </div>
        <div>Privacy · Results vary by individual</div>
      </footer>
    </section>
  );
}
