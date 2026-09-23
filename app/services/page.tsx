import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { CtaBand, ProcessSteps, SectionHeading, ServicesGrid } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Services",
  description: "Air freight, ocean freight, land transport, warehousing, customs clearance and documentation from Oman, handled by one accountable team.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need to move anything, anywhere."
        lede="Six services under one roof, so your shipment never changes hands between companies. Pick one, or let us combine them into a door-to-door solution."
      />
      <section className="bg-white">
        <div className="container-site py-16 lg:py-24">
          <ServicesGrid />
        </div>
      </section>
      <section className="container-site flex flex-col gap-14 py-20 lg:py-24">
        <SectionHeading eyebrow="How it works" title="The same four steps, whatever the mode." align="stack" />
        <ProcessSteps />
      </section>
      <CtaBand />
    </>
  );
}
