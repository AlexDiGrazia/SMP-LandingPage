import { whoFor } from "@/lib/content";

export default function WhoItsFor() {
  return (
    <section className="section--bordered" aria-label="Who it's for">
      <div className="container who-for">
        <h2 className="h2 h2--sm">Who it&apos;s for · men &amp; women</h2>
        <div className="chips">
          {whoFor.map((w) => (
            <div className="chip" key={w}>
              {w}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
