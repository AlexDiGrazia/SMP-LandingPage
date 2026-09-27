import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/content";
import ThankYouTracking from "@/components/ThankYouTracking";

export const metadata: Metadata = {
  title: "Request received",
  robots: { index: false, follow: false },
};

export default async function ThankYouPage({
  searchParams,
}: {
  searchParams: Promise<{ name?: string; eid?: string }>;
}) {
  const { name, eid } = await searchParams;
  const firstName = name?.trim() || "there";

  return (
    <div className="thank-you">
      <ThankYouTracking eventId={eid} />
      <div className="thank-you__inner">
        <div className="eyebrow">Request received</div>
        <h1 className="h1--cta">Thanks, {firstName}. I&apos;ll be in touch personally.</h1>
        <p className="body-lg">
          I review every request myself — your photos, your goals, your hairstyle. Expect a call or text from me
          within one business day to set up your free consultation.
        </p>
        <p className="lead__phone-note">— Karl</p>
        <div className="btn-row">
          <a href={business.phoneHref} data-track="CallClick" className="btn btn-primary">
            Call Karl now · {business.phoneDisplay}
          </a>
          <Link href="/" className="btn-outline">
            Back to page
          </Link>
        </div>
      </div>
    </div>
  );
}
