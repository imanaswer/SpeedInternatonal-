"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { Logo } from "./Logo";
import { ArrowRight, Phone } from "./Icons";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-ink text-white">
      {/* Announcement strip */}
      <div className="hidden border-b border-white/10 md:block">
        <div className="container-site flex h-9 items-center justify-between font-mono text-[11px] uppercase tracking-[0.08em] text-navy-tint">
          <Link href="/tracking" className="flex items-center gap-2.5 transition-colors hover:text-white">
            <span className="h-1.5 w-1.5 bg-signal" /> Track any shipment by AWB, B/L or Speed reference
          </Link>
          <div className="flex items-center gap-6">
            <a href={site.contact.phoneHref} className="flex items-center gap-1.5 transition-colors hover:text-white">
              <Phone size={12} /> {site.contact.phone}
            </a>
            <a href={`mailto:${site.contact.email}`} className="transition-colors hover:text-white">
              {site.contact.email}
            </a>
          </div>
        </div>
      </div>

      <div className="container-site flex h-16 items-center justify-between lg:h-[68px]">
        <Logo light />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {site.nav.map((item) => {
            const active = item.href !== "/" && !item.href.includes("#") && pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`font-mono text-[12px] uppercase tracking-[0.08em] transition-colors duration-200 ${active ? "text-white" : "text-navy-tint hover:text-white"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a href={site.contact.whatsapp} target="_blank" rel="noreferrer" className="font-mono text-[12px] uppercase tracking-[0.08em] text-navy-tint transition-colors hover:text-white">
            WhatsApp
          </a>
          <Link href="/quote" className="btn btn-signal">
            Get a quote
            <span className="btn-icon">
              <ArrowRight size={15} />
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/quote" className="btn btn-signal h-10 px-4">
            Quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-10 w-10 items-center justify-center border border-white/30 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          >
            <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ease-out ${open ? "rotate-45" : "-translate-y-[3.5px]"}`} />
            <span className={`absolute h-px w-5 bg-current transition-transform duration-300 ease-out ${open ? "-rotate-45" : "translate-y-[3.5px]"}`} />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        className={`fixed inset-x-0 bottom-0 top-16 z-10 bg-ink transition-[opacity,visibility] duration-300 ease-out lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <nav className="container-site flex h-full flex-col overflow-y-auto pb-10 pt-6" aria-label="Mobile">
          {[...site.nav, { href: "/tracking", label: "Tracking" }].map((item, i) => (
            <Link
              key={item.href + i}
              href={item.href}
              tabIndex={open ? 0 : -1}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
              className={`border-b border-white/10 py-4 font-display text-3xl font-extralight tracking-tight text-white transition-[opacity,transform] duration-500 ease-out ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              {item.label}
            </Link>
          ))}
          <div className={`mt-8 flex flex-col gap-3 transition-[opacity,transform] duration-500 ease-out ${open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
            <Link href="/quote" tabIndex={open ? 0 : -1} className="btn btn-signal">
              Get a quote
              <span className="btn-icon">
                <ArrowRight size={15} />
              </span>
            </Link>
            <a href={site.contact.whatsapp} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1} className="btn btn-outline-light">
              WhatsApp us
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
