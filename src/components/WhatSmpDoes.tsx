import { whatSmpDoes } from "@/lib/content";

export default function WhatSmpDoes() {
  return (
    <section className="container section does__grid" aria-label="What SMP does">
      <div className="does__intro">
        <h2 className="h2">What SMP does</h2>
        <p className="body-lg">
          Scalp micropigmentation places thousands of tiny, layered impressions in the scalp to recreate the look of
          hair follicles. The result reads as a fresh buzz cut or fuller hair, up close and in daylight.
        </p>
      </div>
      <div className="does__list">
        {whatSmpDoes.map((d) => (
          <div className="does__row" key={d.n}>
            <div className="does__row-n">{d.n}</div>
            <div className="does__row-copy">
              <div className="does__row-title">{d.t}</div>
              <div className="does__row-desc">{d.s}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
