import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { Logo } from "./Logo";
import { ArrowRight } from "./Icons";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="contact" className="relative overflow-clip text-cloud">
      {/* Quote band: white fades into the accent, then the navy link block. */}
      <div className="relative bg-[linear-gradient(180deg,#FFFFFF_0%,#FFF1EA_35%,#E8541E_100%)]">
        <div className="container-site grid gap-10 border-t border-ink/10 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <h2 className="display text-4xl text-ink sm:text-5xl lg:text-[56px]">Get a routed, priced answer for your next shipment.</h2>
          <form action="/quote" method="get" className="flex flex-col gap-4 self-end">
            <label htmlFor="footer-email" className="label text-ink/70">
              Work email
            </label>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input id="footer-email" name="contact" type="email" placeholder="Enter your work email" className="field flex-1 border-ink/20" />
              <button type="submit" className="btn btn-ink">
                Request a quote
                <span className="btn-icon">
                  <ArrowRight size={15} />
                </span>
              </button>
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink/60">Reply within one business day. No obligation.</p>
          </form>
        </div>
      </div>

      <div className="dot-grid bg-navy">
        <div className="container-site relative py-16 lg:py-20">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr]">
            <div className="flex flex-col gap-5">
              <Logo light />
              <p className="max-w-xs text-[14px] leading-relaxed text-navy-tint">International freight forwarding from the Sultanate of Oman.</p>
              <address className="flex flex-col gap-1.5 font-mono text-[12px] not-italic text-navy-tint">
                <span>{site.contact.address}</span>
                <a href={site.contact.phoneHref} className="transition-colors hover:text-white">
                  {site.contact.phone}
                </a>
                <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-white">
                  {site.contact.email}
                </a>
              </address>
            </div>

            <FooterCol title="Services">
              {services.map((s) => (
                <Link key={s.slug} href={`/services/${s.slug}`} className="transition-colors hover:text-white">
                  {s.title}
                </Link>
              ))}
            </FooterCol>

            <FooterCol title="Tools">
              <Link href="/tracking" className="transition-colors hover:text-white">
                Shipment tracking
              </Link>
              <Link href="/#calculator" className="transition-colors hover:text-white">
                CBM and chargeable weight
              </Link>
              <Link href="/#network" className="transition-colors hover:text-white">
                Lane finder
              </Link>
              <Link href="/#lanes" className="transition-colors hover:text-white">
                Sailing schedule
              </Link>
              <Link href="/quote" className="transition-colors hover:text-white">
                Request a quote
              </Link>
            </FooterCol>

            <FooterCol title="Company">
              <Link href="/about" className="transition-colors hover:text-white">
                About Speed
              </Link>
              <Link href="/#network" className="transition-colors hover:text-white">
                Global network
              </Link>
              <Link href="/#process" className="transition-colors hover:text-white">
                How it works
              </Link>
              <a href={site.parent.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                {site.parent.name}
              </a>
              <Link href="/contact" className="transition-colors hover:text-white">
                Contact
              </Link>
            </FooterCol>

            <FooterCol title="Support">
              <a href={site.contact.whatsapp} target="_blank" rel="noreferrer" className="transition-colors hover:text-white">
                WhatsApp
              </a>
              <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-white">
                Email
              </a>
              <Link href="/contact#terms" className="transition-colors hover:text-white">
                Shipping terms
              </Link>
              <Link href="/contact#privacy" className="transition-colors hover:text-white">
                Privacy policy
              </Link>
            </FooterCol>
          </div>

          <div className="mt-14 flex flex-col gap-2 border-t border-white/10 pt-6 font-mono text-[11px] uppercase tracking-[0.08em] text-navy-tint sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {year} {site.name}
            </span>
            <span>Muscat · Sohar · Salalah</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="eyebrow text-white">{title}</h3>
      <div className="flex flex-col gap-2 text-[14px] text-navy-tint">{children}</div>
    </div>
  );
}
