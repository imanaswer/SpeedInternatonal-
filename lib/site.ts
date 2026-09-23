// Public URL: an explicit setting wins; on Vercel fall back to the deployment's own domain; locally use localhost.
// Empty strings are treated as unset, which is what an empty env var on Vercel looks like.
function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.startsWith("http") ? explicit : `https://${explicit}`;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}

export const site = {
  name: "Speed Shipping International",
  shortName: "Speed",
  tagline: "Freight that keeps its promises.",
  description:
    "International freight forwarding from Oman. Air, ocean and land freight, warehousing, customs clearance and documentation from one accountable team in Muscat.",
  url: siteUrl(),
  parent: {
    name: "Fast Shipping & Logistics",
    url: "https://www.fastshippingandlogistics.com/",
  },
  contact: {
    phone: "+968 9612 8466",
    phoneHref: "tel:+96896128466",
    whatsapp: "https://wa.me/96896128466",
    email: "info@speedshipping.example",
    address: "Muscat, Sultanate of Oman",
    hours: "Sunday to Thursday, 8:00 to 18:00 GST. Emergency line 24/7.",
  },
  nav: [
    { href: "/services", label: "Services" },
    { href: "/#process", label: "How it works" },
    { href: "/tracking", label: "Tracking" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  // Group-level figures published by Fast Shipping & Logistics.
  groupStats: [
    { value: "15+", label: "Years experience" },
    { value: "50+", label: "Countries served" },
    { value: "10k+", label: "Shipments moved" },
    { value: "24/7", label: "Support" },
  ],
};
