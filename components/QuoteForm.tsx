"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { modes } from "@/lib/quote-schema";
import { ArrowRight, Check } from "./Icons";

type Status = { state: "idle" } | { state: "submitting" } | { state: "success"; reference: string } | { state: "error"; message: string; fields?: Record<string, string> };

export function QuoteForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus({ state: "submitting" });
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus({ state: "error", message: json.error ?? "Something went wrong. Please try again or WhatsApp us.", fields: json.fields });
        return;
      }
      setStatus({ state: "success", reference: json.reference });
      form.reset();
    } catch {
      setStatus({ state: "error", message: "We could not reach the server. Please check your connection and try again." });
    }
  }

  if (status.state === "success") {
    return (
      <div className="card animate-rise flex flex-col items-start gap-4 p-8" role="status">
        <span className="flex h-12 w-12 items-center justify-center  bg-navy text-white">
          <Check size={22} />
        </span>
        <h3 className="font-display text-2xl font-light tracking-[-0.02em]">Request received</h3>
        <p className="text-slate">
          Your reference is <strong className="tabular-nums text-ink">{status.reference}</strong>. A coordinator will reply within one business day with routing options and pricing.
        </p>
        <button type="button" className="text-sm font-semibold text-ink transition-colors hover:text-signal" onClick={() => setStatus({ state: "idle" })}>
          Send another request
        </button>
      </div>
    );
  }

  const fieldErr = status.state === "error" ? status.fields ?? {} : {};
  const busy = status.state === "submitting";

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="origin" label="Origin" error={fieldErr.origin}>
          <input id="origin" name="origin" className="field" placeholder="City or port" required autoComplete="off" />
        </Field>
        <Field id="destination" label="Destination" error={fieldErr.destination}>
          <input id="destination" name="destination" className="field" placeholder="City or port" required autoComplete="off" />
        </Field>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="mode" label="Mode" error={fieldErr.mode}>
          <select id="mode" name="mode" className="field" defaultValue={modes[0]}>
            {modes.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </Field>
        <Field id="weight" label="Approx. weight or volume" error={fieldErr.weight}>
          <input id="weight" name="weight" className="field" placeholder="e.g. 1,200 kg or 2 pallets" />
        </Field>
      </div>

      <Field id="cargo" label="What are you shipping?" error={fieldErr.cargo}>
        <textarea id="cargo" name="cargo" rows={compact ? 3 : 4} className="field h-auto resize-y py-3" placeholder="Cargo description, special handling, deadline" required />
      </Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Your name" error={fieldErr.name}>
          <input id="name" name="name" className="field" autoComplete="name" required />
        </Field>
        <Field id="company" label="Company (optional)" error={fieldErr.company}>
          <input id="company" name="company" className="field" autoComplete="organization" />
        </Field>
      </div>

      <Field id="contact" label="Email or WhatsApp" error={fieldErr.contact}>
        <input id="contact" name="contact" className="field" autoComplete="email" required />
      </Field>

      {/* Honeypot, hidden from people */}
      <div className="hidden" aria-hidden>
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {status.state === "error" && (
        <p className="animate-rise  bg-signal-tint px-4 py-3 text-sm text-signal-dark" role="alert">
          {status.message}
        </p>
      )}

      <button type="submit" disabled={busy} aria-busy={busy} className="btn btn-lg btn-ink mt-1 disabled:opacity-70">
        {busy ? (
          <>
            <span className="h-4 w-4 animate-spin  border-2 border-white/30 border-t-white [animation-duration:600ms]" aria-hidden />
            Sending
          </>
        ) : (
          <>
            Send quote request
            <span className="btn-icon">
              <ArrowRight size={16} />
            </span>
          </>
        )}
      </button>
      <p className="text-center text-xs text-muted">No commitment. We reply within one business day.</p>
    </form>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5" data-error={error ? "" : undefined}>
      <label htmlFor={id} className="label">
        {label}
      </label>
      {children}
      {error && (
        <span id={`${id}-error`} className="animate-rise text-xs text-signal-dark">
          {error}
        </span>
      )}
    </div>
  );
}
