import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { QuoteForm } from "@/components/QuoteForm";
import { ArrowRight, Clock, Mail, Phone, Pin } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Contact",
  description: `Call, WhatsApp or email ${site.name} in Muscat, Oman, or send a quote request online.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to a coordinator." lede="For a price, send the quote form. For anything else, call, WhatsApp or email and a person will answer." />

      <section className="container-site grid gap-12 py-16 lg:grid-cols-[1fr_1.3fr] lg:gap-16 lg:py-24">
        <div className="stagger flex flex-col gap-4">
          <ContactCard icon={<Phone size={22} />} label="Phone" value={site.contact.phone} href={site.contact.phoneHref} />
          <ContactCard icon={<Mail size={22} />} label="Email" value={site.contact.email} href={`mailto:${site.contact.email}`} />
          <ContactCard icon={<ArrowRight size={22} />} label="WhatsApp" value="Message us on WhatsApp" href={site.contact.whatsapp} external />
          <ContactCard icon={<Pin size={22} />} label="Office" value={site.contact.address} />
          <ContactCard icon={<Clock size={22} />} label="Hours" value={site.contact.hours} />
          <div className="mt-2  bg-navy p-6 text-ivory ring-1 ring-white/15">
            <span className="eyebrow text-navy-tint">Already shipping with us?</span>
            <p className="mt-2 text-sm text-ink-mist">Check your shipment status online any time.</p>
            <Link href="/tracking" className="btn btn-white mt-4 text-ink">
              Track a shipment
            </Link>
          </div>
        </div>

        <div className="card  p-6 sm:p-10">
          <div className="mb-8 flex flex-col gap-2">
            <span className="eyebrow text-signal">Quote request</span>
            <h2 className="display text-3xl sm:text-4xl">
              Tell us what is moving.
            </h2>
          </div>
          <QuoteForm />
        </div>
      </section>

      <section className="border-t border-sand bg-white">
        <div className="container-site grid gap-10 py-16 text-sm leading-relaxed text-slate lg:grid-cols-2 lg:gap-16">
          <div id="terms" className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-light tracking-[-0.02em] text-ink">Shipping terms</h2>
            <p>[Insert your standard trading conditions here, or link to the PDF. Typical points: quotes valid for 14 days, charges subject to carrier surcharges at time of shipment, liability limited per applicable conventions unless insurance is purchased.]</p>
          </div>
          <div id="privacy" className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-light tracking-[-0.02em] text-ink">Privacy policy</h2>
            <p>[Insert your privacy policy. The quote form collects the details you enter and sends them by email to our team so we can respond. We do not sell or share them with third parties beyond the carriers and agents needed to move your shipment.]</p>
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({ icon, label, value, href, external = false }: { icon: ReactNode; label: string; value: string; href?: string; external?: boolean }) {
  const inner = (
    <>
      <span className="flex h-12 w-12 shrink-0 items-center justify-center  bg-ink text-white">{icon}</span>
      <span className="flex flex-col gap-0.5">
        <span className="text-[11px] uppercase tracking-[0.12em] text-muted">{label}</span>
        <span className="font-semibold text-ink">{value}</span>
      </span>
    </>
  );
  const cls = "card flex items-center gap-4 p-5";
  if (href) {
    return (
      <a href={href} className={`${cls} lift hover:ring-petrol/40`} {...(external ? { target: "_blank", rel: "noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return <div className={cls}>{inner}</div>;
}
