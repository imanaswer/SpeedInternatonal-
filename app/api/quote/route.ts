import { NextResponse } from "next/server";
import { Resend } from "resend";
import { quoteSchema } from "@/lib/quote-schema";
import { site } from "@/lib/site";

export const runtime = "nodejs";

function makeReference() {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SSI-${ymd}-${rand}`;
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = quoteSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!fields[key]) fields[key] = issue.message;
    }
    return NextResponse.json({ error: "Please check the highlighted fields.", fields }, { status: 400 });
  }

  const q = parsed.data;

  // Honeypot filled in: pretend success, send nothing.
  if (q.website) {
    return NextResponse.json({ ok: true, reference: makeReference() });
  }

  const reference = makeReference();
  const rows: [string, string][] = [
    ["Reference", reference],
    ["Origin", q.origin],
    ["Destination", q.destination],
    ["Mode", q.mode],
    ["Weight / volume", q.weight || "Not given"],
    ["Cargo", q.cargo],
    ["Name", q.name],
    ["Company", q.company || "Not given"],
    ["Contact", q.contact],
  ];

  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:600px">
      <h2 style="margin:0 0 16px">New quote request</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([k, v]) =>
              `<tr><td style="padding:8px 12px 8px 0;color:#6B7573;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
          )
          .join("")}
      </table>
    </div>`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.QUOTE_TO_EMAIL;
  const from = process.env.QUOTE_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    // Not configured yet: log so development still works end to end.
    console.log("[quote] Email not configured. Request received:\n" + text);
    return NextResponse.json({ ok: true, reference, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(q.contact);
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      replyTo: looksLikeEmail ? q.contact : undefined,
      subject: `Quote request ${reference}: ${q.origin} to ${q.destination} (${q.mode})`,
      html,
      text,
    });
    if (error) {
      console.error("[quote] Resend error", error);
      return NextResponse.json({ error: "We could not send your request. Please WhatsApp or call us." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, reference, delivered: true });
  } catch (err) {
    console.error("[quote] Unexpected error", err);
    return NextResponse.json({ error: `We could not send your request. Please contact ${site.contact.email}.` }, { status: 500 });
  }
}
