import Link from "next/link";
import { Chevrons } from "./Icons";

export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" className={`group flex items-center gap-2.5 ${className}`} aria-label="Speed Shipping International, home">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-signal text-white transition-transform duration-300 ease-out group-hover:-rotate-3">
        <Chevrons size={18} />
      </span>
      <span className="flex items-baseline gap-2 leading-none">
        <span className={`font-display text-[22px] font-medium tracking-[-0.03em] ${light ? "text-white" : "text-ink"}`}>speed</span>
        <span className={`hidden font-mono text-[10px] uppercase tracking-[0.14em] sm:block ${light ? "text-navy-tint" : "text-muted"}`}>Shipping International</span>
      </span>
    </Link>
  );
}
