import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/Icons";
import { TrackForm } from "@/components/TrackForm";
import { CheckItem, CtaBand, LaneSchedule, LaneTicker, ProcessSteps, SectionHeading, SuccessBento, ArrowLink } from "@/components/Sections";
import { HeroStage } from "@/components/HeroStage";
import { ServicesScroller } from "@/components/ServicesScroller";
import { NetworkMap } from "@/components/NetworkMap";
import { Gallery } from "@/components/Gallery";
import { CbmCalculator } from "@/components/CbmCalculator";
import { galleryPhotos } from "@/lib/media";

export default function HomePage() {
  return (
    <>
      <HeroStage />

      {/* Services, scroll-driven */}
      <section id="services" className="container-site flex flex-col gap-12 py-20 lg:py-28">
        <SectionHeading eyebrow="Services" title="Freight forwarding grounded in the real world." lede="Six services under one roof, so a shipment never changes hands between companies." />
        <ServicesScroller />
      </section>

      {/* Trusted / tickers */}
      <section className="container-site flex flex-col gap-10 pb-20 lg:pb-28">
        <SectionHeading eyebrow="Our customers" title="Trusted across the Gulf and beyond." lede="Importers, exporters and project teams rely on Speed for freight forwarding, customs brokerage and warehousing between Oman and the world." />
        <LaneTicker />
      </section>

      {/* Operations split */}
      <section id="process" className="container-site flex flex-col gap-12 py-20 lg:py-28">
        <div className="reveal section-rule grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/3] overflow-clip bg-sand">
            <Image src={galleryPhotos[1].src} alt={galleryPhotos[1].alt} fill sizes="(min-width: 1024px) 580px, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-col gap-6 lg:py-6">
            <span className="eyebrow">Operations built for scale</span>
            <h2 className="display text-4xl sm:text-5xl lg:text-[52px]">Better on-time, in-full performance.</h2>
            <p className="max-w-lg text-[16px] leading-relaxed text-slate">
              We own execution as your forwarder. Customs brokerage is in-house, documents are checked before cargo moves, and one coordinator follows the shipment from booking to proof of delivery.
            </p>
            <ul className="flex flex-col gap-3">
              <CheckItem>One coordinator per shipment, reachable on WhatsApp and phone</CheckItem>
              <CheckItem>Clearance never waits on a third party</CheckItem>
              <CheckItem>Transparent quotes with no hidden surcharges at destination</CheckItem>
            </ul>
            <div className="flex flex-col gap-3 pt-2 sm:flex-row">
              <Link href="/quote" className="btn btn-signal">
                Request a quote
                <span className="btn-icon">
                  <ArrowRight size={15} />
                </span>
              </Link>
              <Link href="/about" className="btn btn-outline">
                How we work
              </Link>
            </div>
          </div>
        </div>
        <ProcessSteps />
      </section>

      {/* Global network */}
      <section id="network" className="container-site flex flex-col gap-10 pb-20 lg:pb-28">
        <SectionHeading eyebrow="Global network" title="We ship everywhere, so you can sell anywhere." lede="Two deep-water ports, one international airport and five land borders, connected to vetted partner agents on every major lane." />
        <NetworkMap />
      </section>

      {/* Customer success */}
      <section id="about" className="container-site flex flex-col gap-10 pb-20 lg:pb-28">
        <SectionHeading eyebrow="Customer success" title="Why shippers move with Speed." />
        <SuccessBento />
        <div className="flex justify-center">
          <Link href="/about" className="btn btn-signal">
            Read about the group
            <span className="btn-icon">
              <ArrowRight size={15} />
            </span>
          </Link>
        </div>
      </section>

      {/* Tools */}
      <section id="calculator" className="container-site flex flex-col gap-10 pb-20 lg:pb-28">
        <SectionHeading eyebrow="Tools" title="Air, LCL or a full container? Find out in ten seconds." lede="Type in one carton or pallet and the quantity. We work out the volume, chargeable weight and which mode makes sense." />
        <div className="border border-sand p-5 sm:p-8">
          <CbmCalculator />
        </div>
        <div className="grid gap-6 border-t border-sand pt-8 lg:grid-cols-2">
          <span className="eyebrow">Track a shipment</span>
          <TrackForm variant="bar" />
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="container-site flex flex-col gap-10 pb-20 lg:pb-28">
        <SectionHeading eyebrow="On the ground" title="What your cargo sees on the way." lede="Ports, aprons, warehouses and the last mile." />
        <Gallery photos={galleryPhotos} />
      </section>

      {/* Schedule */}
      <section id="lanes" className="container-site flex flex-col gap-10 pb-24 lg:pb-32">
        <SectionHeading eyebrow="Schedule" title="Regular departures from Oman." lede="Indicative departures and transit times. Your coordinator confirms the exact sailing or flight when you book.">
          <ArrowLink href="/quote">Get a lane priced</ArrowLink>
        </SectionHeading>
        <LaneSchedule />
      </section>

      <CtaBand />
    </>
  );
}
