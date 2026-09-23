"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { services } from "@/lib/services";
import { servicePhotos } from "@/lib/media";
import { ArrowRight } from "./Icons";

/**
 * INTERACTION MODEL: scroll-driven. The list on the left scrolls; the photo on the right is sticky and
 * cross-fades to whichever service is nearest the middle of the viewport (IntersectionObserver).
 */
export function ServicesScroller() {
  const [active, setActive] = useState(0);
  const items = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    items.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <ol className="flex flex-col">
        {services.map((s, i) => (
          <li
            key={s.slug}
            data-index={i}
            ref={(el) => {
              items.current[i] = el;
            }}
            className={`border-t border-sand py-7 transition-opacity duration-500 lg:py-9 ${i === active ? "opacity-100" : "lg:opacity-40"}`}
          >
            <div className="relative mb-4 aspect-[16/9] overflow-clip bg-sand lg:hidden">
              <Image src={servicePhotos[s.slug].src} alt={servicePhotos[s.slug].alt} fill sizes="100vw" className="object-cover" />
            </div>
            <div className="flex items-baseline justify-between gap-6">
              <h3 className="font-display text-2xl font-light tracking-[-0.02em] sm:text-[28px]">{s.title}</h3>
              <span className="font-mono text-[11px] text-muted">{s.number}</span>
            </div>
            <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out lg:grid-rows-[0fr] lg:opacity-0 ${i === active ? "lg:!grid-rows-[1fr] lg:!opacity-100" : ""}`}>
              <div className="overflow-hidden">
                <p className="max-w-md pt-3 text-[15px] leading-relaxed text-slate">{s.short}</p>
                <Link href={`/services/${s.slug}`} className="mt-4 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ink hover:text-signal">
                  Learn more <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ol>

      <div className="hidden lg:block">
        <div className="sticky top-32 aspect-[4/3] overflow-clip bg-navy">
          {services.map((s, i) => (
            <Image
              key={s.slug}
              src={servicePhotos[s.slug].src}
              alt={servicePhotos[s.slug].alt}
              fill
              sizes="(min-width: 1024px) 580px, 100vw"
              className={`object-cover transition-opacity duration-700 ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
              priority={i === 0}
            />
          ))}
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-navy/80 to-transparent p-5 font-mono text-[11px] uppercase tracking-[0.08em] text-white">
            <span>{services[active].title}</span>
            <span>
              {String(active + 1).padStart(2, "0")} / {String(services.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
