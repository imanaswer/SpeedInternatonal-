import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { CheckItem, CtaBand, GroupStats, SectionHeading } from "@/components/Sections";
import { ArrowRight } from "@/components/Icons";
import { VideoBand } from "@/components/VideoBand";
import { aboutPhotos, videos } from "@/lib/media";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About",
  description: `Speed Shipping International is the freight forwarding arm of ${site.parent.name}, based in Muscat, Oman.`,
};

const values = [
  { title: "One owner per shipment", body: "A named coordinator follows your cargo from booking to delivery. No call centre, no ticket queue." },
  { title: "Paperwork first", body: "Most delays are document delays. We check everything against destination rules before the cargo moves." },
  { title: "Honest quotes", body: "Every charge is itemised up front. If a surcharge appears at destination, we tell you before it is incurred, not after." },
  { title: "Built on the group", body: `Carrier contracts, agent network and systems come from ${site.parent.name}. You get the reach without the bureaucracy.` },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Speed"
        title="A focused Muscat team, backed by a group that moves the world."
        lede={`Speed Shipping International is the international freight forwarding company of the ${site.parent.name} group. We move air, ocean and land cargo from the Sultanate of Oman to destinations worldwide, and back.`}
      />

      <section className="container-site grid gap-14 py-16 lg:grid-cols-2 lg:gap-20 lg:py-24">
        <div className="flex flex-col gap-6">
          <span className="eyebrow text-signal">Our story</span>
          <h2 className="display text-4xl sm:text-5xl">
            Why a second company?
          </h2>
          <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-slate">
            <p>
              {site.parent.name} built its reputation on personal service across air, sea and land freight from Oman. As the group grew, so did the need for a dedicated international forwarding team that could stay small, responsive and specialised while still drawing on the group&apos;s network.
            </p>
            <p>
              Speed Shipping International is that team. We handle the full forwarding chain in-house, from customs brokerage and documentation to warehousing and final delivery, so a shipment never has to pass between companies to get where it is going.
            </p>
            <p className="text-ink">[Add founding year, leadership and licences here.]</p>
          </div>
          <a href={site.parent.url} target="_blank" rel="noreferrer" className="flex items-center gap-2 font-semibold text-ink hover:text-signal">
            Visit {site.parent.name} <ArrowRight size={16} />
          </a>
        </div>
        <div className="dot-grid bg-navy p-8 sm:p-10">
          <GroupStats />
        </div>
      </section>

      <section className="container-site reveal grid gap-4 pb-16 sm:grid-cols-[1.4fr_1fr] lg:pb-24">
        {aboutPhotos.map((p, i) => (
          <figure key={p.src} className={`relative overflow-clip  bg-sand ring-1 ring-ink/[0.06] ${i === 0 ? "aspect-[4/3] sm:aspect-auto sm:min-h-[420px]" : "aspect-[4/3] sm:aspect-auto"}`}>
            <Image src={p.src} alt={p.alt} fill sizes={i === 0 ? "(min-width: 1280px) 700px, 60vw" : "(min-width: 1280px) 500px, 40vw"} className="object-cover" />
          </figure>
        ))}
      </section>

      <VideoBand
        video={videos.portCranes}
        eyebrow="Where we work"
        title="Two deep-water ports, one international airport, five land borders."
        body="Oman sits on the main east-west lanes. We use that position every day for cargo in and out of the Gulf."
        cta={{ href: "/services", label: "See the services" }}
      />

      <section className="border-y border-sand bg-white">
        <div className="container-site flex flex-col gap-12 py-20 lg:py-24">
          <SectionHeading eyebrow="How we work" title="Four commitments on every shipment." align="stack" />
          <div className="stagger grid gap-5 sm:grid-cols-2">
            {values.map((v, i) => (
              <div key={v.title} className="lift flex flex-col gap-3  bg-white p-7 ring-1 ring-ink/[0.06]">
                <span className="font-display text-sm font-light text-ash">0{i + 1}</span>
                <h3 className="font-display text-2xl font-light tracking-[-0.02em]">{v.title}</h3>
                <p className="text-[15px] leading-relaxed text-slate">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-site grid gap-12 py-20 lg:grid-cols-2 lg:gap-20 lg:py-24">
        <div className="flex flex-col gap-6">
          <span className="eyebrow text-signal">Compliance</span>
          <h2 className="display text-4xl sm:text-5xl">
            Licensed, insured, accountable.
          </h2>
          <p className="text-[17px] leading-relaxed text-slate">Replace the placeholders below with your registrations and memberships once confirmed.</p>
        </div>
        <ul className="flex flex-col gap-3.5">
          <CheckItem>Licensed customs broker, Sultanate of Oman [licence number]</CheckItem>
          <CheckItem>Commercial registration [CR number]</CheckItem>
          <CheckItem>Freight forwarder liability insurance [insurer]</CheckItem>
          <CheckItem>Association memberships [e.g. FIATA, IATA cargo agent]</CheckItem>
        </ul>
      </section>

      <CtaBand title="Want to work with us?" body="Send the details of your next shipment and see how the process feels from the first email." />
    </>
  );
}
