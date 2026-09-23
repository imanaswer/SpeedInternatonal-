import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

export default function NotFound() {
  return (
    <section className="hero-in container-site flex flex-col items-start gap-6 py-24 lg:py-32">
      <span className="eyebrow text-signal">404</span>
      <h1 className="display text-5xl sm:text-6xl">
        This page took a wrong turn.
      </h1>
      <p className="max-w-lg text-lg text-slate">The address does not exist or has moved. The shipment you are looking for is probably fine.</p>
      <div className="flex flex-wrap gap-3">
        <Link href="/" className="btn btn-lg btn-ink">
          Back to home
          <span className="btn-icon">
            <ArrowRight size={16} />
          </span>
        </Link>
        <Link href="/tracking" className="btn btn-lg btn-outline">
          Track a shipment
        </Link>
      </div>
    </section>
  );
}
