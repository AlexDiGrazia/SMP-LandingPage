"use client";

import { useEffect, useState } from "react";
import { business } from "@/lib/content";

/**
 * Hidden until the hero's own CTA row (#hero-cta) scrolls out of view, so the
 * bar doesn't duplicate the hero buttons the moment the page loads on mobile.
 * CSS still gates this to <768px — the observer just controls .is-visible.
 */
export default function StickyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = document.getElementById("hero-cta");
    if (!target) return;

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting));
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`sticky-bar ${visible ? "is-visible" : ""}`}>
      <a href="#consult" className="btn btn-primary">
        Free Consultation
      </a>
      <a href={business.phoneHref} data-track="CallClick" className="btn-outline">
        Call Karl
      </a>
    </div>
  );
}
