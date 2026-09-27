import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_PHOTOS = 5;
const MAX_PHOTO_BYTES = 10 * 1024 * 1024;

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export async function POST(request: Request) {
  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form submission." }, { status: 400 });
  }

  const name = String(form.get("name") ?? "").trim();
  const phone = String(form.get("phone") ?? "").trim();
  const email = String(form.get("email") ?? "").trim();
  const comments = String(form.get("comments") ?? "").trim();
  const hairstyle = String(form.get("hairstyle") ?? "").trim();
  const eventId = String(form.get("eventId") ?? "").trim();
  const concerns = safeParseArray(form.get("concerns"));
  const utm = safeParseObject(form.get("utm"));

  if (!name || !phone || !email) {
    return NextResponse.json({ error: "Name, phone and email are required." }, { status: 400 });
  }

  const photos = form.getAll("photos").filter((p): p is File => p instanceof File && p.size > 0).slice(0, MAX_PHOTOS);
  const oversized = photos.find((p) => p.size > MAX_PHOTO_BYTES);
  if (oversized) {
    return NextResponse.json({ error: `"${oversized.name}" is too large.` }, { status: 400 });
  }

  const lead = { name, phone, email, comments, hairstyle, concerns, utm, eventId, submittedAt: new Date().toISOString() };

  // TODO(Karl setup): set RESEND_API_KEY + LEAD_NOTIFICATION_EMAIL in .env.local
  // to get an email the moment a lead comes in (photos attached, up to Resend's
  // 40MB total). Without a key configured this just logs so local dev works.
  const emailSent = await sendLeadEmail(lead, photos);

  // TODO(Karl setup): once a Meta Conversions API access token is generated in
  // Events Manager, POST a server-side "Lead" event here using `eventId` as the
  // event_id — it matches the client-side fbq('track','Lead', ..., {eventID})
  // call fired from /thank-you, so Meta dedupes them into one conversion.

  console.log("[lead]", { ...lead, photoCount: photos.length, emailSent });

  return NextResponse.json({ ok: true });
}

async function sendLeadEmail(
  lead: {
    name: string;
    phone: string;
    email: string;
    comments: string;
    hairstyle: string;
    concerns: string[];
    utm: Record<string, string>;
    submittedAt: string;
  },
  photos: File[]
) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  const from = process.env.LEAD_FROM_EMAIL ?? "leads@yourdomain.com";
  if (!apiKey || !to) return false;

  const attachments = await Promise.all(
    photos.map(async (file) => ({
      filename: file.name,
      content: Buffer.from(await file.arrayBuffer()).toString("base64"),
    }))
  );

  const html = `
    <h2>New consultation request</h2>
    <p><strong>Name:</strong> ${escapeHtml(lead.name)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(lead.phone)}</p>
    <p><strong>Email:</strong> ${escapeHtml(lead.email)}</p>
    <p><strong>Concerns:</strong> ${escapeHtml(lead.concerns.join(", ") || "—")}</p>
    <p><strong>Hairstyle:</strong> ${escapeHtml(lead.hairstyle || "—")}</p>
    <p><strong>Comments:</strong> ${escapeHtml(lead.comments || "—")}</p>
    <p><strong>UTM:</strong> ${escapeHtml(JSON.stringify(lead.utm))}</p>
    <p><strong>Submitted:</strong> ${escapeHtml(lead.submittedAt)}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to,
      subject: `New SMP consultation request — ${lead.name}`,
      html,
      attachments,
    }),
  });

  return res.ok;
}

function safeParseArray(v: FormDataEntryValue | null): string[] {
  try {
    const parsed = JSON.parse(String(v ?? "[]"));
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function safeParseObject(v: FormDataEntryValue | null): Record<string, string> {
  try {
    const parsed = JSON.parse(String(v ?? "{}"));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}
