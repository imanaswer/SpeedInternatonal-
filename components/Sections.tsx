import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { services, type Service } from "@/lib/services";
import { site } from "@/lib/site";
import { aboutPhotos, galleryPhotos, servicePhotos } from "@/lib/media";
import { ArrowRight, Check, ServiceIcon } from "./Icons";
import { Counter } from "./Counter";

/* ---------- Building blocks ---------- */

/** Flexport-style section head: hairline, mono eyebrow in the left column, heading and lede in the right. */
export function SectionHeading({ eyebrow, title, lede, light = false, align = "split", children }: { eyebrow: string; title: string; lede?: string; light?: boolean; align?: "split" | "stack"; children?: ReactNode }) {
  return (
    <div className={`reveal section-rule ${light ? "border-white/15" : ""} ${align === "split" ? "grid gap-6 lg:grid-cols-2 lg:gap-10" : "flex flex-col gap-6"}`}>
      <span className={`eyebrow ${light ? "text-navy-tint" : ""}`}>{eyebrow}</span>
      <div className="flex max-w-2xl flex-col gap-5">
        <h2 className={`display text-4xl sm:text-5xl lg:text-[52px] ${light ? "text-white" : "text-ink"}`}>{title}</h2>
        {lede && <p className={`max-w-lg text-[16px] leading-relaxed ${light ? "text-cloud" : "text-slate"}`}>{lede}</p>}
        {children}
      </div>
    </div>
  );
}

export function CheckItem({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <li className="flex items-start gap-3.5">
      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center bg-signal text-white">
        <Check size={12} strokeWidth={3} />
      </span>
      <span className={`text-[15px] leading-relaxed ${light ? "text-cloud" : "text-ink"}`}>{children}</span>
    </li>
  );
}

export function ArrowLink({ href, children, light = false }: { href: string; children: ReactNode; light?: boolean }) {
  return (
    <Link href={href} className={`group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] transition-colors ${light ? "text-white hover:text-signal" : "text-ink hover:text-signal"}`}>
      {children} <ArrowRight size={14} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
    </Link>
  );
}

/* ---------- Services ---------- */

export function ServiceCard({ service }: { service: Service; featured?: boolean }) {
  const photo = servicePhotos[service.slug];
  return (
    <Link href={`/services/${service.slug}`} className="group flex flex-col gap-5 bg-white p-1 ring-1 ring-sand focus:outline-none focus-visible:ring-2 focus-visible:ring-signal">
      <div className="relative aspect-[16/10] w-full overflow-clip bg-sand">
        <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      </div>
      <div className="flex flex-1 flex-col gap-3 px-4 pb-5">
        <div className="flex items-center justify-between">
          <span className="flex h-9 w-9 items-center justify-center bg-ink text-white">
            <ServiceIcon name={service.icon} size={18} />
          </span>
          <span className="font-mono text-[11px] text-muted">{service.number}</span>
        </div>
        <h3 className="font-display text-2xl font-light tracking-[-0.02em]">{service.title}</h3>
        <p className="text-[14px] leading-relaxed text-slate">{service.short}</p>
        <span className="mt-auto inline-flex items-center gap-2 pt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink group-hover:text-signal">
          Learn more <ArrowRight size={13} className="transition-transform duration-300 ease-out group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ServicesGrid() {
  return (
    <div className="stagger grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s) => (
        <ServiceCard key={s.slug} service={s} />
      ))}
    </div>
  );
}

/* ---------- Process ---------- */

const steps = [
  { n: "01", title: "Tell us what is moving", body: "Origin, destination, cargo details and deadline. A quote comes back within one business day." },
  { n: "02", title: "We plan the route", body: "Mode, carrier and schedule chosen for your priorities, with paperwork and customs prepared in advance." },
  { n: "03", title: "Cargo moves, you watch", body: "Milestone updates at pickup, departure, arrival and clearance, plus one coordinator who answers the phone." },
  { n: "04", title: "Delivered and documented", body: "Final-mile delivery, signed proof of delivery and a complete document pack for your records." },
];

export function ProcessSteps() {
  return (
    <ol className="stagger grid gap-px border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((s) => (
        <li key={s.n} className="group flex flex-col gap-5 bg-white p-6 transition-colors duration-500 hover:bg-navy hover:text-white lg:p-7">
          <span className="font-mono text-[11px] text-muted group-hover:text-navy-tint">{s.n}</span>
          <h3 className="font-display text-2xl font-light tracking-[-0.02em]">{s.title}</h3>
          <p className="text-[14px] leading-relaxed text-slate group-hover:text-cloud">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/* ---------- Stats ---------- */

export function GroupStats({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex flex-col gap-5">
      <span className="eyebrow text-navy-tint">The {site.parent.name} group</span>
      <dl className="stagger grid grid-cols-2 gap-px bg-white/10">
        {site.groupStats.map((s) => (
          <div key={s.label} className={`flex flex-col gap-2 bg-navy ${compact ? "p-5" : "p-6 lg:p-8"}`}>
            <dd className={`display-wide text-white ${compact ? "text-4xl" : "text-5xl lg:text-[64px]"}`}>
              <Counter value={s.value} />
            </dd>
            <dt className="font-mono text-[11px] uppercase tracking-[0.08em] text-navy-tint">{s.label}</dt>
          </div>
        ))}
      </dl>
    </div>
  );
}

/* ---------- Customer success bento ---------- */

export function SuccessBento() {
  const stat = (v: string, l: string) => (
    <div className="flex flex-col justify-between gap-8 border border-sand bg-white p-6">
      <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{l}</span>
      <span className="display-wide text-[72px] sm:text-[96px]">
        <Counter value={v} />
      </span>
    </div>
  );
  return (
    <div className="stagger grid gap-4 lg:grid-cols-[1fr_1fr]">
      <div className="grid grid-cols-2 gap-4">
        <div className="relative aspect-[3/4] overflow-clip bg-sand">
          <Image src={galleryPhotos[4].src} alt={galleryPhotos[4].alt} fill sizes="(min-width: 1024px) 290px, 50vw" className="object-cover" />
        </div>
        {stat(site.groupStats[2].value, `${site.groupStats[2].label} across the group`)}
      </div>
      <div className="relative min-h-[320px] overflow-clip bg-sand">
        <Image src={galleryPhotos[1].src} alt={galleryPhotos[1].alt} fill sizes="(min-width: 1024px) 580px, 100vw" className="object-cover" />
      </div>
      <figure className="flex flex-col justify-between gap-8 border border-sand bg-white p-6 sm:p-8">
        <blockquote className="font-display text-2xl font-light leading-snug tracking-[-0.02em] sm:text-[28px]">
          “[Customer quote goes here. Two or three sentences about what changed after moving freight to Speed.]”
        </blockquote>
        <figcaption className="flex items-center justify-between gap-4 border-l-2 border-sand pl-4 font-mono text-[11px] uppercase tracking-[0.08em] text-muted">
          <span>
            [Name]
            <br />
            [Title, company]
          </span>
          <span className="font-display text-base font-medium normal-case tracking-tight text-ink">[Logo]</span>
        </figcaption>
      </figure>
      <div className="grid grid-cols-2 gap-4">
        <div className="relative aspect-[3/4] overflow-clip bg-sand">
          <Image src={aboutPhotos[0].src} alt={aboutPhotos[0].alt} fill sizes="(min-width: 1024px) 290px, 50vw" className="object-cover" />
        </div>
        {stat(site.groupStats[1].value, site.groupStats[1].label)}
      </div>
    </div>
  );
}

/* ---------- Coverage ---------- */

const lanes = [
  { mode: "Road", title: "GCC region", body: "UAE, Saudi Arabia, Qatar, Kuwait and Bahrain by trailer, with border clearance included." },
  { mode: "Ocean", title: "Sohar & Salalah gateways", body: "FCL and LCL sailings to major ports worldwide through Oman's two deep-water hubs." },
  { mode: "Air", title: "Muscat International", body: "Scheduled uplift on passenger and freighter services to hubs across Asia, Europe and Africa." },
  { mode: "Network", title: "Worldwide partners", body: "Vetted agents at destination handle final delivery and local formalities under our instruction.", dark: true },
];

export function CoverageGrid() {
  return (
    <div className="stagger grid gap-px border border-sand bg-sand sm:grid-cols-2 lg:grid-cols-4">
      {lanes.map((l) => (
        <div key={l.title} className={`flex flex-col gap-3 p-6 ${l.dark ? "bg-navy text-white" : "bg-white"}`}>
          <span className={`eyebrow ${l.dark ? "text-navy-tint" : ""}`}>{l.mode}</span>
          <h3 className="font-display text-[22px] font-light tracking-[-0.02em]">{l.title}</h3>
          <p className={`text-[14px] leading-relaxed ${l.dark ? "text-cloud" : "text-slate"}`}>{l.body}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------- Schedule rows (Flexport's news list layout) ---------- */

const schedule = [
  { lane: "Sohar to Jebel Ali", mode: "Ocean FCL", when: "Weekly, Sunday", transit: "2 days" },
  { lane: "Sohar to Mumbai (Nhava Sheva)", mode: "Ocean FCL", when: "Twice weekly", transit: "5 to 7 days" },
  { lane: "Salalah to Singapore", mode: "Ocean LCL", when: "Weekly, Thursday", transit: "12 to 14 days" },
  { lane: "Salalah to Mombasa and Dar es Salaam", mode: "Ocean LCL", when: "Weekly", transit: "10 to 12 days" },
  { lane: "Muscat to Frankfurt", mode: "Air", when: "Daily uplift", transit: "2 to 3 days" },
  { lane: "Muscat to Dubai", mode: "Road FTL", when: "Daily, 18:00", transit: "Next day" },
];

export function LaneSchedule() {
  return (
    <ul className="stagger flex flex-col border-t border-sand">
      {schedule.map((s) => (
        <li key={s.lane} className="grid gap-2 border-b border-sand py-5 sm:grid-cols-[1.4fr_1fr_1fr_auto] sm:items-center sm:gap-6">
          <span className="font-display text-xl font-light tracking-[-0.02em] sm:text-2xl">{s.lane}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{s.when}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">Transit {s.transit}</span>
          <span className="justify-self-start border border-sand px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em]">{s.mode}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Tickers ---------- */

const destinations = ["Jebel Ali", "Jeddah", "Doha", "Kuwait", "Manama", "Mumbai", "Karachi", "Colombo", "Singapore", "Shanghai", "Rotterdam", "Frankfurt", "London", "Nairobi", "Dar es Salaam"];
const industries = ["Oil and gas", "Construction", "Retail and FMCG", "Automotive", "Pharma and cold chain", "E-commerce", "Machinery", "Project cargo", "Electronics", "Food and beverage"];

function TickerRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-clip border-b border-sand py-6 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]" aria-hidden>
      <div className={`flex w-max items-center gap-14 whitespace-nowrap ${reverse ? "marquee-reverse" : "marquee"}`}>
        {row.map((d, i) => (
          <span key={i} className="font-display text-2xl font-light tracking-[-0.02em] text-ink/70 sm:text-[28px]">
            {d}
          </span>
        ))}
      </div>
    </div>
  );
}

export function LaneTicker() {
  return (
    <div className="flex flex-col border-t border-sand">
      <TickerRow items={destinations} />
      <TickerRow items={industries} reverse />
      <span className="sr-only">Regular lanes: {destinations.join(", ")}. Industries: {industries.join(", ")}.</span>
    </div>
  );
}

/* ---------- Contact promo ---------- */

export function CtaBand({ title = "Put us to work as your freight partner.", body = "Share the basics and a coordinator will come back with routing options and pricing within one business day." }: { title?: string; body?: string }) {
  return (
    <section className="relative overflow-clip bg-[linear-gradient(180deg,#FFFFFF_0%,#D9E2E8_100%)]">
      <div className="container-site reveal flex flex-col items-center gap-6 py-24 text-center lg:py-32">
        <span className="eyebrow">Contact</span>
        <h2 className="display max-w-2xl text-4xl sm:text-5xl lg:text-[52px]">{title}</h2>
        <p className="max-w-lg text-[16px] leading-relaxed text-slate">{body}</p>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Link href="/quote" className="btn btn-signal">
            Ship with us
            <span className="btn-icon">
              <ArrowRight size={15} />
            </span>
          </Link>
          <a href={site.contact.whatsapp} target="_blank" rel="noreferrer" className="btn btn-outline">
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
