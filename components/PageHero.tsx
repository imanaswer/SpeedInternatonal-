import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, lede, children, dark = false }: { eyebrow: string; title: string; lede?: string; children?: ReactNode; dark?: boolean }) {
  return (
    <section className={`relative overflow-clip ${dark ? "dot-grid bg-navy text-white" : "bg-white"}`}>
      <div className="hero-in container-site relative grid gap-6 py-16 lg:grid-cols-[1fr_2fr] lg:gap-10 lg:py-24">
        <span className={`eyebrow ${dark ? "text-navy-tint" : ""}`}>{eyebrow}</span>
        <div className="flex flex-col gap-6">
          <h1 className={`display max-w-4xl text-[42px] sm:text-6xl lg:text-[64px] ${dark ? "text-white" : ""}`}>{title}</h1>
          {lede && <p className={`max-w-2xl text-lg leading-relaxed ${dark ? "text-cloud" : "text-slate"}`}>{lede}</p>}
          {children}
        </div>
      </div>
    </section>
  );
}
