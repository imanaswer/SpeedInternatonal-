import type { Metadata } from "next";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { CheckItem } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Get a quote",
  description: "Request a freight quote from Speed Shipping International. Routing options and pricing within one business day.",
};

export default function QuotePage() {
  return (
    <>
      <PageHero eyebrow="Get a quote" title="Ready to ship? Tell us where." lede="Share the basics and a coordinator will come back with routing options and pricing within one business day." />
      <section className="container-site grid gap-12 py-16 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:py-24">
        <aside className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="font-display text-2xl font-light tracking-[-0.02em]">What happens next</h2>
            <ul className="flex flex-col gap-3.5">
              <CheckItem>A coordinator reviews the request and calls or emails if anything is unclear</CheckItem>
              <CheckItem>You receive routing options with itemised pricing, usually within one business day</CheckItem>
              <CheckItem>Accept by reply, and we book, collect and keep you updated to delivery</CheckItem>
            </ul>
          </div>
          <div className="  bg-white p-6 text-sm text-slate ring-1 ring-ink/[0.06]">
            <p className="font-semibold text-ink">Prefer to talk?</p>
            <p className="mt-1">
              Call <a href={site.contact.phoneHref} className="font-semibold text-ink">{site.contact.phone}</a> or message us on{" "}
              <a href={site.contact.whatsapp} target="_blank" rel="noreferrer" className="font-semibold text-ink">
                WhatsApp
              </a>
              . {site.contact.hours}
            </p>
          </div>
        </aside>
        <div className="card  p-6 sm:p-10">
          <QuoteForm />
        </div>
      </section>
    </>
  );
}
