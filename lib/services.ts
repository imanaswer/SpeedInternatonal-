export type IconName = "plane" | "ship" | "truck" | "warehouse" | "shield" | "document";

export type Service = {
  slug: string;
  number: string;
  title: string;
  icon: IconName;
  short: string;
  intro: string;
  features: string[];
  idealFor: string[];
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "air-freight",
    number: "01",
    title: "Air freight",
    icon: "plane",
    short: "Consolidated and dedicated air cargo for time-critical shipments, with door pickup and airport-to-door options.",
    intro:
      "When the deadline is fixed, air is the answer. We book space on scheduled passenger and freighter services out of Muscat International, consolidate smaller loads to keep costs sensible, and handle export clearance before the aircraft leaves.",
    features: [
      "Consolidated and direct airport-to-airport service",
      "Door-to-door with pickup across Oman",
      "Dangerous goods and temperature-sensitive handling on request",
      "Export clearance and airway bill preparation included",
      "Charter and hand-carry options for emergencies",
    ],
    idealFor: ["Spare parts and AOG", "Samples and documents", "Perishables and pharma", "High-value electronics"],
    faqs: [
      { q: "How fast can air freight move?", a: "Direct services typically land within one to three days of uplift. Consolidations add a few days while the load builds. We quote a realistic door-to-door window, not just flight time." },
      { q: "Is there a minimum weight?", a: "No. Small shipments are consolidated with others heading the same way. Chargeable weight is the greater of actual and volumetric weight." },
    ],
  },
  {
    slug: "ocean-freight",
    number: "02",
    title: "Ocean freight",
    icon: "ship",
    short: "FCL and LCL sailings from Sohar and Salalah with optimised routings that balance transit time against cost.",
    intro:
      "Oman's two deep-water ports give us direct access to the main east-west trade lanes. We book full containers and less-than-container loads, arrange haulage to and from the port, and keep you informed at every sailing milestone.",
    features: [
      "FCL in 20', 40' and 40' high-cube, plus reefer and open-top",
      "LCL consolidation with weekly departures",
      "Port haulage, stuffing and lashing",
      "Bill of lading, certificate of origin and insurance documentation",
      "Break-bulk and project cargo by arrangement",
    ],
    idealFor: ["Machinery and equipment", "Building materials", "Retail and FMCG stock", "Vehicles"],
    faqs: [
      { q: "FCL or LCL, which should I choose?", a: "As a rule of thumb, once your cargo passes roughly 13 to 15 cubic metres a full container is usually cheaper and faster than LCL. Send us the dimensions and we will price both." },
      { q: "Do you handle marine insurance?", a: "Yes. We can arrange all-risk cover for the declared value of the goods and include it in your quote." },
    ],
  },
  {
    slug: "land-transport",
    number: "03",
    title: "Land transport",
    icon: "truck",
    short: "Road freight across the GCC, from single pallets to full trailers, with border formalities handled for you.",
    intro:
      "Daily departures connect Oman with the UAE, Saudi Arabia, Qatar, Kuwait and Bahrain. Our team prepares the cross-border paperwork in advance so trucks are not held at the frontier.",
    features: [
      "Full truckload and groupage across the GCC",
      "Flatbed, curtain-side, box and refrigerated trailers",
      "Border clearance and transit documents prepared in advance",
      "Domestic distribution within Oman",
      "GPS tracked vehicles with milestone updates",
    ],
    idealFor: ["Regional distribution", "Oversize and heavy loads", "Cold chain within the Gulf", "Express intra-GCC deliveries"],
    faqs: [
      { q: "How long does Muscat to Dubai take?", a: "A direct truck normally delivers next day, subject to border processing. Groupage shipments follow a fixed weekly schedule." },
    ],
  },
  {
    slug: "warehousing",
    number: "04",
    title: "Warehousing",
    icon: "warehouse",
    short: "Secure storage, pick and pack, palletising and professional export packing close to Muscat's port and airport.",
    intro:
      "Hold stock close to the market, or stage cargo before it ships. Our facility offers racked and bulk storage, inventory reporting, and packing built for international transit.",
    features: [
      "Short and long-term racked and bulk storage",
      "Pick, pack and order fulfilment",
      "Export packing, crating and palletising",
      "Inventory reports and stock visibility",
      "24-hour security and CCTV",
    ],
    idealFor: ["E-commerce fulfilment", "Project cargo staging", "Seasonal stock", "Spare parts hubs"],
    faqs: [
      { q: "Can you receive goods when I am not in Oman?", a: "Yes. We receive, inspect and report on inbound goods on your behalf and hold them until you are ready to ship or distribute." },
    ],
  },
  {
    slug: "customs-clearance",
    number: "05",
    title: "Customs clearance",
    icon: "shield",
    short: "Licensed brokerage for import and export, HS classification, duty planning and compliance checks before cargo moves.",
    intro:
      "Clearance is handled by our own licensed brokers, not a third party, so paperwork problems are caught before the cargo arrives rather than after it is stuck.",
    features: [
      "Import and export clearance at Oman's ports, airports and land borders",
      "HS code classification and duty estimation",
      "Permits, certificates and conformity documentation",
      "Temporary import and re-export handling",
      "Compliance review before booking",
    ],
    idealFor: ["First-time importers", "Regulated goods", "Project and oil and gas cargo", "Re-exports through Oman"],
    faqs: [
      { q: "What documents do I need to clear a shipment?", a: "Typically a commercial invoice, packing list, transport document and certificate of origin. Regulated goods may need permits. Send us what you have and we will tell you what is missing." },
    ],
  },
  {
    slug: "documentation",
    number: "06",
    title: "Documentation",
    icon: "document",
    short: "Bills of lading, airway bills, certificates of origin and insurance paperwork prepared and checked for you.",
    intro:
      "Most delays in international freight are paperwork delays. We prepare and check every document against the destination's requirements before the shipment moves.",
    features: [
      "Bills of lading and airway bills",
      "Certificates of origin and chamber attestation",
      "Commercial invoices and packing lists formatted to destination rules",
      "Cargo insurance certificates",
      "Letter of credit document sets",
    ],
    idealFor: ["Exporters new to a market", "Letter of credit shipments", "Multi-leg consignments", "Consignees with strict document rules"],
    faqs: [
      { q: "Can you handle letter of credit documents?", a: "Yes. We prepare the document set to the letter of credit's exact wording and timing so the bank accepts it first time." },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
