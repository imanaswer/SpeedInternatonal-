import { WORLD_H, WORLD_W, project, worldDots } from "@/lib/worldDots";

type Kind = "hub" | "port" | "partner";
// label: where the map label sits relative to the pin; "none" hides it (the place is still in the list below).
const places: { name: string; lat: number; lon: number; kind: Kind; note: string; label?: "left" | "above" | "none" }[] = [
  { name: "Muscat", lat: 23.6, lon: 58.5, kind: "hub", note: "Head office and Muscat International (MCT)" },
  { name: "Sohar", lat: 24.3, lon: 56.7, kind: "port", note: "Deep-water port, FCL and LCL sailings" },
  { name: "Salalah", lat: 17.0, lon: 54.1, kind: "port", note: "Transhipment hub for Africa and Asia" },
  { name: "Jebel Ali", lat: 25.0, lon: 55.1, kind: "partner", note: "Daily road and feeder" },
  { name: "Doha", lat: 25.3, lon: 51.5, kind: "partner", note: "Road, 2 days" },
  { name: "Riyadh", lat: 24.7, lon: 46.7, kind: "partner", note: "Road, 3 days" },
  { name: "Kuwait", lat: 29.4, lon: 48.0, kind: "partner", note: "Road groupage weekly" },
  { name: "Jeddah", lat: 21.5, lon: 39.2, kind: "partner", note: "Ocean via Salalah" },
  { name: "Karachi", lat: 24.9, lon: 67.0, kind: "partner", note: "Ocean, 4 days", label: "above" },
  { name: "Mumbai", lat: 19.1, lon: 72.9, kind: "partner", note: "Ocean, 5 to 7 days" },
  { name: "Colombo", lat: 6.9, lon: 79.9, kind: "partner", note: "Ocean, 7 days" },
  { name: "Singapore", lat: 1.3, lon: 103.8, kind: "partner", note: "Ocean, 12 to 14 days" },
  { name: "Shanghai", lat: 31.2, lon: 121.5, kind: "partner", note: "Ocean, 18 to 20 days" },
  { name: "Nairobi", lat: -1.3, lon: 36.8, kind: "partner", note: "Ocean via Mombasa" },
  { name: "Dar es Salaam", lat: -6.8, lon: 39.3, kind: "partner", note: "Ocean, 10 to 12 days" },
  { name: "Rotterdam", lat: 51.9, lon: 4.5, kind: "partner", note: "Ocean, 24 days" },
  { name: "Frankfurt", lat: 50.1, lon: 8.7, kind: "partner", note: "Air, daily uplift", label: "none" },
  { name: "London", lat: 51.5, lon: -0.1, kind: "partner", note: "Air, 2 to 3 days", label: "left" },
];

const legend: Record<Kind, string> = { hub: "Speed hub", port: "Oman gateway port", partner: "Partner agent" };

/** Dotted world map in the Flexport style. Pure SVG, no map library. */
export function NetworkMap() {
  const hub = project(23.6, 58.5);
  return (
    <div className="flex flex-col gap-6">
      <div className="dot-grid relative overflow-clip bg-navy">
        <svg viewBox={`0 60 ${WORLD_W} ${WORLD_H - 140}`} className="block w-full" role="img" aria-label="World map showing Speed's hubs in Oman and partner agents across the Gulf, Asia, Africa and Europe">
          <path d={worldDots} stroke="#476A82" strokeWidth="5.5" strokeLinecap="round" fill="none" />
          {places
            .filter((p) => p.kind === "partner")
            .map((p) => {
              const t = project(p.lat, p.lon);
              return <path key={p.name} d={`M${hub.x} ${hub.y} Q ${(hub.x + t.x) / 2} ${Math.min(hub.y, t.y) - 60} ${t.x} ${t.y}`} stroke="#E8541E" strokeOpacity="0.55" strokeWidth="1.8" fill="none" />;
            })}
          {places.map((p) => {
            const { x, y } = project(p.lat, p.lon);
            const c = p.kind === "hub" ? "#E8541E" : p.kind === "port" ? "#FFFFFF" : "#8FA6B6";
            return (
              <g key={p.name}>
                {p.kind === "hub" && <circle cx={x} cy={y} r="14" fill="#E8541E" className="pin-pulse" />}
                {p.kind === "partner" ? <rect x={x - 6} y={y - 6} width="12" height="12" fill={c} /> : <circle cx={x} cy={y} r={p.kind === "hub" ? 10 : 8} fill={c} />}
                {p.label !== "none" && (p.kind !== "partner" || p.lon < 45 || p.lon > 65 || p.label) && (
                  <text
                    x={p.label === "left" ? x - 16 : p.label === "above" ? x : x + 16}
                    y={p.label === "above" ? y - 16 : y + 7}
                    textAnchor={p.label === "left" ? "end" : p.label === "above" ? "middle" : "start"}
                    fill={p.kind === "partner" ? "#B9C9D3" : "#FFFFFF"}
                    fontSize="22"
                    fontFamily="var(--font-mono)"
                  >
                    {p.name.toUpperCase()}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
        <div className="absolute right-4 top-4 hidden border border-white/20 bg-navy/80 px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-white sm:block">Our network</div>
        <ul className="absolute bottom-4 left-4 flex flex-col gap-1 bg-navy/80 px-3 py-2 font-mono text-[10px] uppercase tracking-[0.08em] text-navy-tint sm:text-[11px]">
          {(Object.keys(legend) as Kind[]).map((k) => (
            <li key={k} className="flex items-center gap-2">
              <span className={k === "partner" ? "h-2 w-2 bg-navy-tint" : `h-2 w-2 rounded-full ${k === "hub" ? "bg-signal" : "bg-white"}`} /> {legend[k]}
            </li>
          ))}
        </ul>
      </div>

      <ul className="stagger grid grid-cols-2 gap-px border border-sand bg-sand sm:grid-cols-3 lg:grid-cols-6">
        {places.map((p) => (
          <li key={p.name} className="flex flex-col gap-1 bg-white p-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted">{legend[p.kind]}</span>
            <span className="font-display text-lg font-normal tracking-tight">{p.name}</span>
            <span className="text-[12px] leading-snug text-slate">{p.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
