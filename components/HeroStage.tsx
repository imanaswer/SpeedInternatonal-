import Link from "next/link";
import { site } from "@/lib/site";
import { videos } from "@/lib/media";
import { ArrowRight, Ship, Shield, Truck } from "./Icons";
import { RouteMap } from "./RouteMap";

/** Flexport-style opener: centred light headline, then a product facade. The port video fades in behind as you scroll. */
export function HeroStage() {
  return (
    <section className="relative overflow-clip bg-white">
      <div aria-hidden className="hero-fade pointer-events-none absolute inset-0">
        <video className="h-full w-full object-cover" poster={videos.portDusk.poster} autoPlay muted loop playsInline preload="metadata">
          <source src={videos.portDusk.webm} type="video/webm" />
          <source src={videos.portDusk.mov} type="video/quicktime" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/40 to-white" />
      </div>

      <div className="container-site relative flex flex-col items-center gap-10 pt-16 lg:pt-24">
        <div className="hero-in flex max-w-3xl flex-col items-center gap-6 text-center">
          <h1 className="display text-[44px] sm:text-6xl lg:text-[72px]">{site.tagline}</h1>
          <p className="max-w-xl text-[17px] leading-relaxed text-slate sm:text-lg">
            Save time and landed cost on every consignment with air, ocean and road freight, customs brokerage and warehousing from one accountable team in Muscat.
          </p>
          <form action="/quote" method="get" className="flex w-full max-w-lg flex-col gap-3 sm:flex-row">
            <label htmlFor="hero-email" className="sr-only">
              Work email
            </label>
            <input id="hero-email" name="contact" type="email" placeholder="Enter your email" className="field flex-1" />
            <button type="submit" className="btn btn-signal">
              Request a quote
              <span className="btn-icon">
                <ArrowRight size={15} />
              </span>
            </button>
          </form>
        </div>

        <AppFacade />
        <p className="-mt-4 pb-10 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          Click a destination to explore, or{" "}
          <Link href="/tracking" className="underline underline-offset-4 hover:text-ink">
            track a shipment
          </Link>
        </p>
      </div>
    </section>
  );
}

const counters = [
  { icon: <Ship size={14} />, label: "Shipments", value: "38", note: "2 with exceptions", sub: ["Map", "Milestones", "Exceptions", "Quotes & bookings"] },
  { icon: <Shield size={14} />, label: "Customs declarations", value: "12", note: "1 under inspection", sub: ["Release status", "Duty estimates"] },
  { icon: <Truck size={14} />, label: "Deliveries this week", value: "9", note: "All on schedule", sub: ["Proof of delivery"] },
];

/** A mock of the shipment dashboard. The map inside is live: pick a destination and the route redraws. */
function AppFacade() {
  return (
    <div className="hero-in w-full max-w-5xl">
      <div className="overflow-clip border border-sand bg-white shadow-[0_40px_120px_-40px_rgba(11,26,36,0.35)]">
        {/* App bar */}
        <div className="flex items-center gap-4 border-b border-sand bg-ink px-4 py-2.5 text-white">
          <span className="font-display text-[15px] font-medium tracking-[-0.03em]">speed</span>
          <span className="hidden h-7 flex-1 items-center gap-2 border border-white/15 bg-white/5 px-3 font-mono text-[11px] text-navy-tint sm:flex md:max-w-xs">Search or ask</span>
          <nav className="hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.08em] text-navy-tint md:flex" aria-hidden>
            <span className="bg-white/10 px-2 py-1 text-white">Overview</span>
            <span>Freight</span>
            <span>Customs</span>
            <span>Billing</span>
            <span>Insights</span>
            <span>Tasks</span>
          </nav>
          <span className="ml-auto flex h-7 w-7 items-center justify-center bg-signal font-mono text-[10px]">SS</span>
        </div>

        <div className="grid gap-4 p-4 sm:p-5 lg:grid-cols-[220px_1fr]">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1 lg:hidden">
              <span className="font-display text-xl font-medium tracking-tight">Hello, Thomas</span>
              <span className="text-[12px] text-muted">
                There are <span className="text-signal">2 exceptions</span> and <span className="text-signal">1 task due today</span>
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-3">
              {counters.map((c) => (
                <div key={c.label} className="flex flex-col gap-1 border border-sand p-3">
                  <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-muted">
                    {c.icon} {c.label}
                  </span>
                  <span className="font-display text-3xl font-light tracking-tight">{c.value}</span>
                  <span className="text-[11px] text-signal">{c.note}</span>
                  <ul className="mt-1 hidden flex-col gap-1 text-[11px] text-muted lg:flex">
                    {c.sub.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="hidden items-start justify-between lg:flex">
              <div className="flex flex-col gap-1">
                <span className="font-display text-2xl font-medium tracking-tight">Hello, Thomas</span>
                <span className="text-[12px] text-muted">
                  There are <span className="text-signal">2 exceptions</span> and <span className="text-signal">1 task due today</span>
                </span>
              </div>
              <div className="flex gap-2">
                <Link href="/quote" className="btn h-8 border border-sand px-3 text-[10px] text-ink hover:bg-sand">
                  Get a quote
                </Link>
                <Link href="/quote" className="btn btn-ink h-8 px-3 text-[10px]">
                  Book a shipment
                </Link>
              </div>
            </div>
            <RouteMap flat />
          </div>
        </div>
      </div>
    </div>
  );
}

