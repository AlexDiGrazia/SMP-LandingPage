import { results } from "@/lib/content";
import BeforeAfterPair from "./BeforeAfterPair";

export default function ResultsGallery() {
  return (
    <section className="container section" id="results" aria-label="Results">
      <div className="results__head">
        <h2 className="h2">Real results</h2>
        <p className="results__note">Real Karl clients, no filters or retouching.</p>
      </div>
      <div className="results__grid">
        {results.map((caption, i) => (
          <figure className="result-card" key={i}>
            <BeforeAfterPair small className="result-card__media" />
            <figcaption>{caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
