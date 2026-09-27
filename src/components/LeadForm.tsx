"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { concernOptions, hairstyleOptions, business } from "@/lib/content";
import { getStoredUtmParams, track } from "@/lib/track";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PHOTOS = 5;
const MAX_PHOTO_MB = 10;

export default function LeadForm() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [concerns, setConcerns] = useState<string[]>([]);
  const [hairstyle, setHairstyle] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function toggleConcern(label: string) {
    setConcerns((prev) => (prev.includes(label) ? prev.filter((c) => c !== label) : [...prev, label]));
  }

  function onPhotosChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    const tooBig = files.find((f) => f.size > MAX_PHOTO_MB * 1024 * 1024);
    if (tooBig) {
      setError(`"${tooBig.name}" is over ${MAX_PHOTO_MB}MB — please choose a smaller photo.`);
      e.target.value = "";
      return;
    }
    setError(null);
    setPhotos(files.slice(0, MAX_PHOTOS));
  }

  function goToStep2() {
    if (concerns.length === 0) {
      setError("Please select at least one concern.");
      return;
    }
    setError(null);
    track("FormStep1", { concerns, hairstyle });
    setStep(2);
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) return setError("Please enter your name.");
    if (!phone.trim()) return setError("Please enter your phone number.");
    if (!EMAIL_RE.test(email.trim())) return setError("Please enter a valid email.");

    setError(null);
    setSubmitting(true);

    try {
      const eventId = crypto.randomUUID();
      const fd = new FormData();
      fd.set("name", name.trim());
      fd.set("phone", phone.trim());
      fd.set("email", email.trim());
      fd.set("comments", comments.trim());
      fd.set("concerns", JSON.stringify(concerns));
      fd.set("hairstyle", hairstyle ?? "");
      fd.set("utm", JSON.stringify(getStoredUtmParams()));
      fd.set("eventId", eventId);
      photos.forEach((file) => fd.append("photos", file));

      const res = await fetch("/api/lead", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Submission failed");

      // The actual "Lead" pixel/GA event fires on the /thank-you page view itself
      // (see ThankYouTracking), sharing this event id with the server-side CAPI
      // event above so Meta dedupes them into a single conversion.
      const firstName = name.trim().split(" ")[0] || "there";
      router.push(`/thank-you?name=${encodeURIComponent(firstName)}&eid=${eventId}`);
    } catch {
      setError("Something went wrong sending your request. Please call Karl directly, or try again.");
      setSubmitting(false);
    }
  }

  const twoStepDone = step === 2;

  return (
    <section id="consult" className="container section lead__grid" aria-label="Request your free consultation">
      <div className="lead__copy">
        <h2 className="h2">Request your free consultation</h2>
        <p className="body-lg">
          Tell me a little about your hair loss. I&apos;ll review it personally and call you, usually within one
          business day.
        </p>
        <p className="lead__phone-note">
          Prefer to talk now?{" "}
          <a href={business.phoneHref} data-track="CallClick">
            Call Karl · {business.phoneDisplay}
          </a>
        </p>
      </div>

      <form className="lead__panel" onSubmit={onSubmit}>
        <div className="progress">
          <div className="progress__bar progress__bar--filled" />
          <div className={`progress__bar ${twoStepDone ? "progress__bar--filled" : ""}`} />
          <div className="progress__label">Step {step} of 2</div>
        </div>

        {step === 1 && (
          <>
            <div className="field-group">
              <div className="field-group__label">What are you looking to improve?</div>
              <div className="option-grid">
                {concernOptions.map((label) => (
                  <button
                    type="button"
                    key={label}
                    className={`option-btn ${concerns.includes(label) ? "is-selected" : ""}`}
                    onClick={() => toggleConcern(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div className="field-group">
              <div className="field-group__label">Current hairstyle</div>
              <div className="option-grid option-grid--3">
                {hairstyleOptions.map((label) => (
                  <button
                    type="button"
                    key={label}
                    className={`option-btn ${hairstyle === label ? "is-selected" : ""}`}
                    onClick={() => setHairstyle(label)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div className="fields">
              <label className="field">
                Name
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </label>
              <label className="field">
                Phone
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </label>
            </div>
            <label className="field">
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </label>
            <label className="field">
              Photos of your scalp (front, top, crown) — optional
              <div className="dropzone" onClick={(e) => (e.currentTarget.querySelector("input") as HTMLInputElement)?.click()}>
                {photos.length ? `${photos.length} photo${photos.length > 1 ? "s" : ""} attached` : "+ Add photos"}
                <input type="file" accept="image/*" multiple onChange={onPhotosChange} />
              </div>
            </label>
            <label className="field">
              Anything else? — optional
              <textarea rows={3} value={comments} onChange={(e) => setComments(e.target.value)} />
            </label>
          </>
        )}

        {error && <div className="lead__error">{error}</div>}

        <div className="lead__actions">
          {step === 1 ? (
            <button type="button" className="btn btn-primary btn-full" onClick={goToStep2}>
              Continue →
            </button>
          ) : (
            <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
              {submitting ? "Sending…" : "Request My Free Consultation"}
            </button>
          )}
          {step === 2 && (
            <button type="button" className="btn-back" onClick={() => setStep(1)}>
              ← Back
            </button>
          )}
          <div className="lead__microcopy">Free, no obligation. Your photos stay private.</div>
        </div>
      </form>
    </section>
  );
}
