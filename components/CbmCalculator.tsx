"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Copy, Plane, Ship, Truck } from "./Icons";

/**
 * Shipment sizing tool: cubic metres, volumetric and chargeable weight, and which mode or container fits.
 * ponytail: industry rules of thumb, not a tariff. Air volumetric at 1:6000, ocean LCL charged per W/M (1 cbm or 1 tonne).
 */
const USABLE = { "20' standard": 28, "40' standard": 58, "40' high-cube": 68 } as const;

export function calc(l: number, w: number, h: number, qty: number, kgEach: number) {
  const cm3 = l * w * h * qty;
  const cbm = cm3 / 1_000_000;
  const gross = kgEach * qty;
  const airVolumetric = cm3 / 6000;
  const airChargeable = Math.max(gross, airVolumetric);
  const lclUnits = Math.max(cbm, gross / 1000);
  let container: keyof typeof USABLE | null = null;
  if (cbm > 15) container = cbm <= USABLE["20' standard"] ? "20' standard" : cbm <= USABLE["40' standard"] ? "40' standard" : "40' high-cube";
  const fill = container ? Math.min(100, (cbm / USABLE[container]) * 100) : 0;
  const pallets = Math.ceil(cbm / 1.2); // roughly one standard pallet stacked to 1 m
  return { cbm, gross, airVolumetric, airChargeable, lclUnits, container, fill, pallets };
}

const fmt = (n: number, d = 2) => n.toLocaleString("en", { maximumFractionDigits: d });

export function CbmCalculator({ compact = false }: { compact?: boolean }) {
  const [v, setV] = useState({ l: 120, w: 80, h: 100, qty: 4, kg: 180 });
  const [copied, setCopied] = useState(false);
  const r = calc(v.l, v.w, v.h, v.qty, v.kg);
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) => setV({ ...v, [k]: Math.max(0, Number(e.target.value) || 0) });

  const summary = `${v.qty} × ${v.l}×${v.w}×${v.h} cm, ${v.kg} kg each. Total ${fmt(r.cbm)} cbm, ${fmt(r.gross, 0)} kg gross. Air chargeable ${fmt(r.airChargeable, 0)} kg. ${r.container ? `Suggested ${r.container} container.` : `LCL ${fmt(r.lclUnits)} W/M.`}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked; the text is still visible on screen */
    }
  };

  const fields: { k: keyof typeof v; label: string; unit: string }[] = [
    { k: "l", label: "Length", unit: "cm" },
    { k: "w", label: "Width", unit: "cm" },
    { k: "h", label: "Height", unit: "cm" },
    { k: "qty", label: "Pieces", unit: "" },
    { k: "kg", label: "Weight per piece", unit: "kg" },
  ];

  return (
    <div className={`grid gap-8 ${compact ? "" : "lg:grid-cols-[1fr_1.2fr] lg:gap-12"}`}>
      <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()} aria-label="Shipment dimensions">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {fields.map((f) => (
            <label key={f.k} className="flex flex-col gap-1.5">
              <span className="label">{f.label}</span>
              <span className="relative">
                <input type="number" inputMode="decimal" min={0} value={v[f.k]} onChange={set(f.k)} className="field pr-10 tabular-nums" />
                {f.unit && <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-sm text-ash">{f.unit}</span>}
              </span>
            </label>
          ))}
        </div>
        <p className="text-sm leading-relaxed text-muted">Enter one carton, crate or pallet and how many of them. Figures update as you type. Chargeable weight is the greater of gross and volumetric weight.</p>
      </form>

      <div className="flex flex-col gap-4">
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Stat label="Volume" value={fmt(r.cbm)} unit="cbm" />
          <Stat label="Gross weight" value={fmt(r.gross, 0)} unit="kg" />
          <Stat label="Air chargeable" value={fmt(r.airChargeable, 0)} unit="kg" accent />
          <Stat label="Ocean LCL" value={fmt(r.lclUnits)} unit="W/M" />
        </dl>

        <div className="grid gap-3 sm:grid-cols-3" aria-live="polite">
          <Mode icon={<Plane size={20} />} title="Air" note={r.airChargeable <= 500 ? "Good fit. Small, urgent loads." : r.airChargeable <= 2000 ? "Workable for urgent cargo." : "Costly at this size. Compare ocean."} good={r.airChargeable <= 500} />
          <Mode
            icon={<Ship size={20} />}
            title={r.container ? `Ocean FCL · ${r.container}` : "Ocean LCL"}
            note={r.container ? `About ${fmt(r.fill, 0)}% of the container. Room to add cargo.` : r.cbm < 1 ? "Minimum 1 cbm applies on most lanes." : "Weekly consolidations. Cheapest per cbm."}
            good={r.cbm >= 1}
          >
            {r.container && (
              <span className="mt-2 block h-2 overflow-clip  bg-ink/10" aria-hidden>
                <span className="block h-full  bg-ink transition-[width] duration-500 ease-out" style={{ width: `${r.fill}%` }} />
              </span>
            )}
          </Mode>
          <Mode icon={<Truck size={20} />} title="Road (GCC)" note={`About ${r.pallets} pallet ${r.pallets === 1 ? "space" : "spaces"} on a trailer. Next-day to the UAE.`} good={r.pallets <= 26} />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <button type="button" onClick={copy} className="btn btn-outline">
            <Copy size={16} /> {copied ? "Copied" : "Copy summary"}
          </button>
          <Link href="/quote" className="btn btn-ink">
            Get a quote for this
            <span className="btn-icon">
              <ArrowRight size={16} />
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, unit, accent = false }: { label: string; value: string; unit: string; accent?: boolean }) {
  return (
    <div className={`flex flex-col gap-1  p-4 ring-1 ${accent ? "bg-signal text-white ring-signal" : "bg-white ring-ink/[0.06]"}`}>
      <dt className={`text-[11px] font-semibold uppercase tracking-[0.12em] ${accent ? "text-signal-tint" : "text-muted"}`}>{label}</dt>
      <dd className="font-display text-2xl font-extrabold tabular-nums tracking-tight">
        {value} <span className={`text-sm font-semibold ${accent ? "text-signal-tint" : "text-ash"}`}>{unit}</span>
      </dd>
    </div>
  );
}

function Mode({ icon, title, note, good, children }: { icon: React.ReactNode; title: string; note: string; good: boolean; children?: React.ReactNode }) {
  return (
    <div className={`flex flex-col gap-2  p-4 ring-1 transition-colors duration-300 ${good ? "bg-sand/60 ring-ink/10" : "bg-white ring-ink/[0.06]"}`}>
      <div className="flex items-center gap-2.5">
        <span className={`flex h-9 w-9 items-center justify-center  ${good ? "bg-ink text-white" : "bg-ink/[0.06] text-slate"}`}>{icon}</span>
        <span className="font-display text-[15px] font-extrabold tracking-tight">{title}</span>
      </div>
      <p className="text-[13px] leading-snug text-slate">{note}</p>
      {children}
    </div>
  );
}
