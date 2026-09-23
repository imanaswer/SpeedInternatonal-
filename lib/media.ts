// Photos and video used across the site. Swap the Unsplash placeholders for your own photography here;
// nothing else needs to change. Unsplash images are free for commercial use, no attribution required.
// The two video clips in public/video are public-domain USDA aerial footage of a container terminal.

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`;

export type Photo = { src: string; alt: string; caption?: string };

/** One hero photo per service, keyed by service slug. */
export const servicePhotos: Record<string, Photo> = {
  "air-freight": { src: unsplash("1542296332-2e4473faf563"), alt: "Wide-body aircraft on the apron at sunset with ground crew loading cargo" },
  "ocean-freight": { src: unsplash("1605745341112-85968b19335b"), alt: "Fully laden container ship under way at sea" },
  "land-transport": { src: unsplash("1601584115197-04ecc0da31d7"), alt: "Articulated truck on an open highway" },
  warehousing: { src: unsplash("1553413077-190dd305871c"), alt: "Racked warehouse aisle stacked with palletised stock" },
  "customs-clearance": { src: unsplash("1454165804606-c3d57bc86b40"), alt: "Two people reviewing shipping documents beside a laptop" },
  documentation: { src: unsplash("1450101499163-c8848c66ca85"), alt: "Hand signing a freight document with a pen" },
};

/** Home page gallery. */
export const galleryPhotos: Photo[] = [
  { src: unsplash("1494412574643-ff11b0a5c1c3"), alt: "Container terminal seen from the air", caption: "Sohar gateway. Weekly FCL and LCL sailings." },
  { src: unsplash("1578575437130-527eed3abbec"), alt: "Gantry cranes loading a container vessel", caption: "Port haulage, stuffing and lashing handled by our team." },
  { src: unsplash("1542296332-2e4473faf563"), alt: "Aircraft at the gate at sunset with cargo loaders", caption: "Daily uplift from Muscat International." },
  { src: unsplash("1591768793355-74d04bb6608f"), alt: "Heavy truck on a wet road at dawn", caption: "Daily road departures across the GCC." },
  { src: unsplash("1586528116311-ad8dd3c8310d"), alt: "Warehouse floor with sorted parcels", caption: "Pick, pack and export packing close to the port." },
  { src: unsplash("1566576721346-d4a3b4eaeb55"), alt: "Courier handing a parcel to a customer", caption: "Final mile and signed proof of delivery." },
  { src: unsplash("1580674285054-bed31e145f59"), alt: "Labelled cartons stacked ready for dispatch", caption: "Consolidations built to keep small loads affordable." },
  { src: unsplash("1436491865332-7a61a109cc05"), alt: "Aircraft wing above the clouds", caption: "Hand-carry and charter when the deadline is fixed." },
];

export const aboutPhotos: Photo[] = [
  { src: unsplash("1569098644584-210bcd375b59"), alt: "Small operations team working together at a shared desk" },
  { src: unsplash("1494412651409-8963ce7935a7"), alt: "Rows of shipping containers at a terminal seen from above" },
];

export const videos = {
  portDusk: { webm: "/video/port-dusk.webm", mov: "/video/port-dusk.mov", poster: "/video/port-dusk.jpg" },
  portCranes: { webm: "/video/port-cranes.webm", mov: "/video/port-cranes.mov", poster: "/video/port-cranes.jpg" },
};
