import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, services } from "@/lib/services";
import { PageHero } from "@/components/PageHero";
import { CheckItem, CtaBand } from "@/components/Sections";
import { ArrowRight, ServiceIcon } from "@/components/Icons";
import { QuoteForm } from "@/components/QuoteForm";
import { CbmCalculator } from "@/components/CbmCalculator";
import { servicePhotos } from "@/lib/media";
import Image from "next/image";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return { title: service.title, description: service.short };
}

export default function ServicePage({ params }: Params) {
  const service = getService(params.slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);
  const photo = servicePhotos[service.slug];
  const sized = service.slug === "air-freight" || service.slug === "ocean-freight";

  return (
    <>
      <PageHero eyebrow={`Service ${service.number}`} title={service.title} lede={service.intro} dark>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link href="#quote" className="btn btn-lg btn-signal">
            Get a quote
            <span className="btn-icon">
              <ArrowRight size={16} />
            </span>
          </Link>
          <Link href="/contact" className="btn btn-lg btn-outline-light">
            Talk to a coordinator
          </Link>
        </div>
      </PageHero>

      <section className="container-site -mt-10 lg:-mt-14">
        <figure className="shell hero-in">
          <div className="relative aspect-[16/9] overflow-clip bg-sand sm:aspect-[21/9]">
            <Image src={photo.src} alt={photo.alt} fill priority sizes="(min-width: 1280px) 1232px, 100vw" className="object-cover" />
          </div>
        </figure>
      </section>

      <section className="container-site grid gap-12 py-16 lg:grid-cols-[1.2fr_1fr] lg:gap-20 lg:py-24">
        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-6">
            <h2 className="font-display text-3xl font-light tracking-[-0.02em]">What is included</h2>
            <ul className="flex flex-col gap-3.5">
              {service.features.map((f) => (
                <CheckItem key={f}>{f}</CheckItem>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="font-display text-3xl font-light tracking-[-0.02em]">Ideal for</h2>
            <ul className="flex flex-wrap gap-2.5">
              {service.idealFor.map((t) => (
                <li key={t} className="  border border-sand bg-white px-4 py-2 text-sm font-medium">
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {sized && (
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-light tracking-[-0.02em]">Size your shipment</h2>
              <div className="  bg-white p-5 ring-1 ring-ink/[0.06] sm:p-7">
                <CbmCalculator compact />
              </div>
            </div>
          )}

          {service.faqs.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-light tracking-[-0.02em]">Common questions</h2>
              <div className="flex flex-col divide-y divide-sand border-y border-sand">
                {service.faqs.map((f) => (
                  <details key={f.q} className="group py-5">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">
                      {f.q}
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center  border border-sand text-xl leading-none transition-transform duration-300 ease-out group-open:rotate-45" aria-hidden>
                        +
                      </span>
                    </summary>
                    <p className="pt-3 leading-relaxed text-slate">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-6">
          <div id="quote" className="card p-6 sm:p-8">
            <div className="mb-6 flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center  bg-ink text-white">
                <ServiceIcon name={service.icon} size={24} />
              </span>
              <div>
                <h2 className="font-display text-xl font-light tracking-[-0.02em]">Quote for {service.title.toLowerCase()}</h2>
                <p className="text-sm text-slate">Reply within one business day</p>
              </div>
            </div>
            <QuoteForm compact />
          </div>

          <div className="  bg-navy p-6 text-ivory ring-1 ring-white/15 sm:p-8">
            <span className="eyebrow text-navy-tint">Other services</span>
            <ul className="mt-4 flex flex-col divide-y divide-petrol-light">
              {others.map((o) => (
                <li key={o.slug}>
                  <Link href={`/services/${o.slug}`} className="flex items-center justify-between py-3 font-semibold text-white hover:text-signal">
                    {o.title} <ArrowRight size={16} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </section>

      <CtaBand title="Not sure which service fits?" body="Describe the shipment and we will recommend the mode, route and paperwork. No jargon, no obligation." />
    </>
  );
}
