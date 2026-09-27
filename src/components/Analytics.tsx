"use client";

import { useEffect } from "react";
import { captureUtmParams, track, type TrackEvent } from "@/lib/track";

/**
 * Mounted once in the root layout. Captures UTM params and fbclid on first
 * load, then delegates clicks on any element with data-track="CallClick"
 * (tel: links in the header, hero, form, final CTA, sticky bar, thank-you) so
 * those don't each need their own 'use client' wrapper.
 */
export default function Analytics() {
  useEffect(() => {
    captureUtmParams();

    function onClick(e: MouseEvent) {
      const el = (e.target as HTMLElement)?.closest<HTMLElement>("[data-track]");
      if (!el) return;
      track(el.dataset.track as TrackEvent);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
