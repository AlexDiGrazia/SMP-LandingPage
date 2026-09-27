"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * Fires the "Lead" conversion event tied to the actual /thank-you page view
 * (not the moment of submission) — this is what Meta Pixel and GA4 conversions
 * should be attributed to. eventId is shared with the server-side CAPI event
 * fired from /api/lead so Meta can dedupe the two into a single conversion.
 */
export default function ThankYouTracking({ eventId }: { eventId?: string }) {
  useEffect(() => {
    track("Lead", {}, eventId);
  }, [eventId]);

  return null;
}
