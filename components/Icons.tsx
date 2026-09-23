import type { SVGProps } from "react";
import type { IconName } from "@/lib/services";

type Props = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 24, ...rest }: Props) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...rest,
  };
}

export const Plane = (p: Props) => (
  <svg {...base(p)}>
    <path d="M2 16l20-6" />
    <path d="M10 13l-3 5 3 1 4-4" />
    <path d="M8 12L5 6l3 0 5 5" />
    <path d="M22 10l-2 2" />
  </svg>
);

export const Ship = (p: Props) => (
  <svg {...base(p)}>
    <path d="M3 17l2 3h14l2-3" />
    <path d="M4 17l-1-5 9-3 9 3-1 5" />
    <path d="M12 9V4" />
    <path d="M8 9V6h8v3" />
  </svg>
);

export const Truck = (p: Props) => (
  <svg {...base(p)}>
    <path d="M1 7h13v10H1z" />
    <path d="M14 10h5l3 3v4h-8" />
    <circle cx="6" cy="18" r="2" />
    <circle cx="18" cy="18" r="2" />
  </svg>
);

export const Warehouse = (p: Props) => (
  <svg {...base(p)}>
    <path d="M3 21V9l9-5 9 5v12" />
    <path d="M7 21v-7h10v7" />
    <path d="M10 14v7" />
    <path d="M14 14v7" />
  </svg>
);

export const Shield = (p: Props) => (
  <svg {...base(p)}>
    <path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

export const Document = (p: Props) => (
  <svg {...base(p)}>
    <path d="M6 2h9l5 5v15H6z" />
    <path d="M15 2v5h5" />
    <path d="M9 13h6" />
    <path d="M9 17h6" />
  </svg>
);

export const ArrowRight = (p: Props) => (
  <svg {...base({ strokeWidth: 2.2, ...p })}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export const Check = (p: Props) => (
  <svg {...base({ strokeWidth: 2.5, ...p })}>
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const Clock = (p: Props) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const Phone = (p: Props) => (
  <svg {...base(p)}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.6a2 2 0 0 1-.5 2.1L8.1 9.7a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.8.3 1.7.6 2.6.7a2 2 0 0 1 1.7 2z" />
  </svg>
);

export const Mail = (p: Props) => (
  <svg {...base(p)}>
    <path d="M4 4h16v16H4z" />
    <path d="M4 7l8 6 8-6" />
  </svg>
);

export const Pin = (p: Props) => (
  <svg {...base(p)}>
    <path d="M12 22s7-7 7-12a7 7 0 1 0-14 0c0 5 7 12 7 12z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
);

export const Menu = (p: Props) => (
  <svg {...base({ strokeWidth: 2.2, ...p })}>
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
);

export const Close = (p: Props) => (
  <svg {...base({ strokeWidth: 2.2, ...p })}>
    <path d="M6 6l12 12" />
    <path d="M18 6L6 18" />
  </svg>
);

export const Chevrons = (p: Props) => (
  <svg width={p.size ?? 26} height={((p.size ?? 26) * 20) / 26} viewBox="0 0 26 20" fill="none" stroke="currentColor" strokeWidth={3.2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M3 2l8 8-8 8" />
    <path d="M14 2l8 8-8 8" />
  </svg>
);

export const Play = (p: Props) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
);

export const Pause = (p: Props) => (
  <svg {...base({ ...p, fill: "currentColor", stroke: "none" })}>
    <rect x="6" y="5" width="4" height="14" rx="1" />
    <rect x="14" y="5" width="4" height="14" rx="1" />
  </svg>
);

export const Sound = (p: Props) => (
  <svg {...base(p)}>
    <path d="M4 10v4h3l5 4V6L7 10z" />
    <path d="M15.5 9.5a3.5 3.5 0 010 5" />
    <path d="M18 7a7 7 0 010 10" />
  </svg>
);

export const Mute = (p: Props) => (
  <svg {...base(p)}>
    <path d="M4 10v4h3l5 4V6L7 10z" />
    <path d="M16 9.5l5 5M21 9.5l-5 5" />
  </svg>
);

export const ChevronLeft = (p: Props) => (
  <svg {...base({ strokeWidth: 2.2, ...p })}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

export const ChevronRight = (p: Props) => (
  <svg {...base({ strokeWidth: 2.2, ...p })}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export const Copy = (p: Props) => (
  <svg {...base(p)}>
    <rect x="9" y="9" width="11" height="11" rx="2" />
    <path d="M5 15V6a2 2 0 012-2h9" />
  </svg>
);

const map = { plane: Plane, ship: Ship, truck: Truck, warehouse: Warehouse, shield: Shield, document: Document };

export function ServiceIcon({ name, ...rest }: Props & { name: IconName }) {
  const Cmp = map[name];
  return <Cmp {...rest} />;
}
