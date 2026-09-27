// Thin wrapper around Meta Pixel + GA4 client-side events.
// Both scripts are loaded conditionally in layout.tsx (only if the env ID is set),
// so guard every call in case neither is present (local dev, or IDs not configured yet).

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

export type TrackEvent = "CallClick" | "FormStep1" | "Lead";

const GA_EVENT_NAME: Record<TrackEvent, string> = {
  CallClick: "click_call",
  FormStep1: "form_step_1",
  Lead: "generate_lead",
};

export function track(event: TrackEvent, data?: Record<string, unknown>, eventId?: string) {
  if (typeof window === "undefined") return;

  if (window.fbq) {
    // "Lead" maps to Meta's standard event; everything else is a custom event.
    // eventId lets the client fbq call dedupe against the server-side CAPI event in /api/lead.
    const options = eventId ? { eventID: eventId } : undefined;
    if (event === "Lead") window.fbq("track", "Lead", data, options);
    else window.fbq("trackCustom", event, data, options);
  }

  if (window.gtag) {
    window.gtag("event", GA_EVENT_NAME[event], data);
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[track]", event, data ?? "");
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"] as const;

/** Reads UTM params and fbclid from the current URL and persists them for the session. */
export function captureUtmParams() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const found: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const v = params.get(key);
    if (v) found[key] = v;
  }
  if (Object.keys(found).length) {
    sessionStorage.setItem("smp_utm", JSON.stringify(found));
  }
}

export function getStoredUtmParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem("smp_utm") ?? "{}");
  } catch {
    return {};
  }
}
