import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { TrackForm } from "@/components/TrackForm";
import { demoReferences } from "@/lib/tracking";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Track a shipment",
  description: "Track your Speed Shipping International consignment by reference, airway bill or bill of lading number.",
};

export default function TrackingPage({ searchParams }: { searchParams: { ref?: string } }) {
  return (
    <>
      <PageHero eyebrow="Tracking" title="Where is my shipment?" lede="Enter the Speed reference from your booking confirmation, or the airway bill or bill of lading number." />
      <section className="container-site grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr] lg:gap-16 lg:py-24">
        <TrackForm variant="page" initialRef={searchParams.ref ?? ""} />
        <aside className="flex flex-col gap-6">
          <div className="card p-6">
            <h2 className="font-display text-xl font-light tracking-[-0.02em]">Try the demo</h2>
            <p className="mt-2 text-sm text-slate">Live tracking connects to our operations system. Until your shipment is booked, these sample references show how it works:</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {demoReferences.map((r) => (
                <li key={r}>
                  <a href={`/tracking?ref=${r}`} className="  bg-white px-3.5 py-1.5 font-mono text-sm text-ink hover:bg-sand">
                    {r}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="  bg-ink p-6 text-cloud ring-1 ring-white/15">
            <h2 className="font-display text-xl font-light tracking-[-0.02em] text-white">Need an update now?</h2>
            <p className="mt-2 text-sm">Your coordinator can give you the latest position, customs status and delivery slot.</p>
            <div className="mt-4 flex flex-col gap-1.5 text-sm">
              <a href={site.contact.phoneHref} className="hover:text-white">
                {site.contact.phone}
              </a>
              <a href={site.contact.whatsapp} target="_blank" rel="noreferrer" className="hover:text-white">
                WhatsApp us
              </a>
              <a href={`mailto:${site.contact.email}`} className="hover:text-white">
                {site.contact.email}
              </a>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
