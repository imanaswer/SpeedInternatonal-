"use client";

import { useEffect, useState } from "react";
import { Check } from "./Icons";

type Lane = { id: string; city: string; x: number; y: number; path: string; kicker: string; transit: string; note: string; alt: string };

// Positions are schematic, not geographic. Hub (Muscat) sits at 300,300.
const lanes: Lane[] = [
  { id: "jebel-ali", city: "Jebel Ali", x: 215, y: 225, path: "M300 300 C 275 270, 245 250, 215 225", kicker: "Road · FTL", transit: "Next day", note: "Daily departures, border cleared", alt: "Ocean feeder 2 days" },
  { id: "frankfurt", city: "Frankfurt", x: 95, y: 110, path: "M300 300 C 250 190, 160 140, 95 110", kicker: "Air · Express", transit: "2 to 3 days", note: "Daily uplift from Muscat", alt: "Ocean via Rotterdam 24 days" },
  { id: "shanghai", city: "Shanghai", x: 530, y: 105, path: "M300 300 C 370 220, 450 150, 530 105", kicker: "Ocean · FCL", transit: "18 to 20 days", note: "Weekly from Sohar", alt: "Air 3 to 4 days" },
  { id: "mumbai", city: "Mumbai", x: 490, y: 330, path: "M300 300 C 360 290, 430 300, 490 330", kicker: "Ocean · FCL", transit: "5 to 7 days", note: "Twice weekly from Sohar", alt: "Air next day" },
  { id: "singapore", city: "Singapore", x: 555, y: 440, path: "M300 300 C 380 340, 470 380, 555 440", kicker: "Ocean · LCL", transit: "12 to 14 days", note: "Weekly consolidation", alt: "Air 2 days" },
  { id: "nairobi", city: "Nairobi", x: 120, y: 470, path: "M300 300 C 250 360, 180 410, 120 470", kicker: "Ocean · LCL", transit: "10 to 12 days", note: "Weekly via Salalah", alt: "Air 2 to 3 days" },
];

/** Hero map. Pick a destination to see how we would route it; cycles on its own until you do. */
export function RouteMap({ flat = false }: { flat?: boolean }) {
  const [i, setI] = useState(2);
  const [auto, setAuto] = useState(true);
  const lane = lanes[i];

  useEffect(() => {
    if (!auto || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setI((n) => (n + 1) % lanes.length), 4500);
    return () => clearInterval(t);
  }, [auto]);

  const pick = (n: number) => {
    setAuto(false);
    setI(n);
  };

  return (
    <div className={flat ? "relative" : "shell relative"}>
      <div className={`relative flex flex-col justify-between overflow-clip bg-navy-light p-4 sm:p-6 ${flat ? "h-[380px] sm:h-[460px]" : "h-[440px] sm:h-[580px]"}`}>
        <div className="absolute inset-x-0 top-0 bottom-[118px] sm:bottom-[104px]">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 616 560" preserveAspectRatio="xMidYMid slice" fill="none" aria-hidden>
          <g stroke="#1C3A50" strokeWidth="1">
            {[70, 140, 210, 280, 350, 420, 490].map((y) => (
              <path key={y} d={`M0 ${y}H616`} />
            ))}
            {[77, 154, 231, 308, 385, 462, 539].map((x) => (
              <path key={x} d={`M${x} 0V560`} />
            ))}
          </g>
          <g className="dash-flow" stroke="#F4F1EA" strokeWidth="2" opacity="0.45">
            {lanes.map((l) => l.id !== lane.id && <path key={l.id} d={l.path} />)}
          </g>
          {/* Active route draws in from the hub each time the selection changes. */}
          <path key={lane.id} d={lane.path} pathLength={1} className="route-draw" stroke="#E8541E" strokeWidth="3" strokeLinecap="round" />
          <g className="route-dot" style={{ offsetPath: `path("${lane.path}")` }} key={`dot-${lane.id}`}>
            <circle r="5" fill="#FFFFFF" />
            <circle r="10" fill="#FFFFFF" opacity="0.25" />
          </g>
          <circle cx="300" cy="300" r="26" fill="#E8541E" opacity="0.25" className="animate-ping origin-center [animation-duration:2.4s] [transform-box:fill-box]" />
          <circle cx="300" cy="300" r="14" fill="#E8541E" opacity="0.5" />
          <circle cx="300" cy="300" r="7" fill="#FFFFFF" />
        </svg>

        {/* Pins are real buttons layered over the SVG so they are keyboard reachable. */}
        {lanes.map((l, n) => (
          <button
            key={l.id}
            type="button"
            onClick={() => pick(n)}
            aria-pressed={n === i}
            aria-label={`Show route to ${l.city}`}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 focus:outline-none"
            style={{ left: `${(l.x / 616) * 100}%`, top: `${(l.y / 560) * 100}%` }}
          >
            <span className={`block h-3 w-3 ring-4 transition-all duration-300 group-focus-visible:ring-signal ${n === i ? "scale-125 bg-signal ring-signal/30" : "bg-white ring-white/10 group-hover:ring-white/30"}`} />
            <span className={`pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.06em] transition-opacity duration-300 ${n === i ? "bg-white text-ink opacity-100" : "text-navy-tint opacity-80 group-hover:opacity-100"}`}>{l.city}</span>
          </button>
        ))}
        </div>

        <div className="relative flex items-start justify-between">
          <span className="flex items-center gap-2 bg-white px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
            </span>
            {auto ? "LIVE LANES" : "YOUR ROUTE"}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-navy-tint">Hub: Muscat (MCT)</span>
        </div>

        <div className="relative grid gap-3 sm:grid-cols-2" aria-live="polite">
          <LaneTile kicker={lane.kicker} title={`Muscat to ${lane.city}`} note={`${lane.transit} · ${lane.note}`} />
          <LaneTile kicker="Alternative" title={lane.alt} note="Ask your coordinator to price both" className="hidden sm:flex" />
        </div>
      </div>

      {!flat && (
      <div className="card absolute -left-4 top-[38%] hidden items-center gap-3 p-3.5 pr-5 shadow-soft lg:flex" aria-hidden>
        <span className="flex h-9 w-9 items-center justify-center bg-ink text-white">
          <Check size={16} strokeWidth={3} />
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-[13px] font-semibold">Export customs cleared</span>
          <span className="text-xs text-muted">Sohar Port · 11:00</span>
        </span>
      </div>
      )}
    </div>
  );
}

function LaneTile({ kicker, title, note, className = "" }: { kicker: string; title: string; note: string; className?: string }) {
  return (
    <div className={`flex flex-col gap-1 bg-white px-4 py-3.5 ${className}`}>
      <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">{kicker}</span>
      <span key={title} className="animate-rise font-display text-lg font-medium tracking-tight text-ink">{title}</span>
      <span className="text-[12px] text-slate">{note}</span>
    </div>
  );
}
