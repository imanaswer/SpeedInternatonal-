"use client";

import { useState, type FormEvent } from "react";
import type { Shipment } from "@/lib/tracking";
import { Check, Clock } from "./Icons";

type Status = { state: "idle" } | { state: "loading" } | { state: "error"; message: string } | { state: "found"; shipment: Shipment };

export function TrackForm({ variant = "bar", initialRef = "" }: { variant?: "bar" | "page"; initialRef?: string }) {
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [ref, setRef] = useState(initialRef);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!ref.trim()) return;
    setStatus({ state: "loading" });
    try {
      const res = await fetch(`/api/track?ref=${encodeURIComponent(ref.trim())}`);
      const json = await res.json();
      if (!res.ok) {
        setStatus({ state: "error", message: json.error ?? "Lookup failed." });
        return;
      }
      setStatus({ state: "found", shipment: json.shipment });
    } catch {
      setStatus({ state: "error", message: "We could not reach the server. Please try again." });
    }
  }

  const loading = status.state === "loading";
  const input = (
    <input
      id={`track-${variant}`}
      name="ref"
      value={ref}
      onChange={(e) => setRef(e.target.value)}
      placeholder="Enter tracking, AWB or B/L number"
      className={variant === "bar" ? "h-12 flex-1 bg-transparent px-2 text-base text-ink placeholder:text-ash focus:outline-none" : "field h-14 text-base"}
      autoComplete="off"
      spellCheck={false}
    />
  );

  return (
    <div className="flex flex-col gap-6">
      {variant === "bar" ? (
        <form onSubmit={onSubmit} className="card flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:  sm:py-3 sm:pl-7 sm:pr-3">
          <label htmlFor="track-bar" className="flex items-center gap-3 whitespace-nowrap text-[15px] font-semibold">
            <Clock size={22} className="text-ink" /> Track a shipment
          </label>
          {input}
          <button type="submit" className="btn btn-petrol" disabled={loading} aria-busy={loading}>
            {loading ? "Checking…" : "Track"}
          </button>
        </form>
      ) : (
        <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="track-page" className="sr-only">
            Tracking number
          </label>
          {input}
          <button type="submit" className="btn btn-lg btn-petrol" disabled={loading} aria-busy={loading}>
            {loading ? "Checking…" : "Track"}
          </button>
        </form>
      )}

      {status.state === "error" && (
        <p className="animate-rise  bg-signal-tint px-4 py-3 text-sm text-signal-dark" role="alert">
          {status.message}
        </p>
      )}

      {status.state === "found" && <ShipmentCard shipment={status.shipment} />}
    </div>
  );
}

function ShipmentCard({ shipment }: { shipment: Shipment }) {
  return (
    <div className="card animate-rise overflow-clip" role="status">
      <div className="grid gap-4 border-b border-sand bg-white p-6 sm:grid-cols-4">
        <Meta k="Reference" v={shipment.reference} />
        <Meta k="Route" v={`${shipment.origin} → ${shipment.destination}`} />
        <Meta k="Mode" v={shipment.mode} />
        <Meta k="Status" v={shipment.status} accent />
      </div>
      <ol className="flex flex-col p-6">
        {shipment.events.map((ev, i) => {
          const last = i === shipment.events.length - 1;
          return (
            <li key={i} className="animate-rise relative flex gap-4 pb-6 last:pb-0" style={{ animationDelay: `${120 + i * 60}ms` }}>
              {!last && <span className={`absolute left-[11px] top-6 h-full w-0.5 ${ev.done ? "bg-navy" : "bg-sand"}`} aria-hidden />}
              <span className={`relative z-10 mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center  ${ev.done ? "bg-navy text-white" : "border-2 border-sand bg-white"}`}>
                {ev.done && <Check size={12} strokeWidth={3} />}
              </span>
              <div className="flex flex-col">
                <span className={`font-semibold ${ev.done ? "text-ink" : "text-ash"}`}>{ev.status}</span>
                <span className="text-sm tabular-nums text-muted">
                  {ev.place} · {ev.at}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
      <div className="border-t border-sand px-6 py-4 text-sm text-slate">
        Estimated arrival: <strong className="text-ink">{shipment.eta}</strong>
      </div>
    </div>
  );
}

function Meta({ k, v, accent = false }: { k: string; v: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[11px] uppercase tracking-[0.12em] text-muted">{k}</span>
      <span className={`font-semibold tabular-nums ${accent ? "text-signal-dark" : "text-ink"}`}>{v}</span>
    </div>
  );
}
