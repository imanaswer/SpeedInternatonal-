export type TrackingEvent = { at: string; place: string; status: string; done: boolean };

export type Shipment = {
  reference: string;
  mode: "Air" | "Ocean" | "Land";
  origin: string;
  destination: string;
  eta: string;
  status: string;
  events: TrackingEvent[];
};

/**
 * Demo data so the tracking page works before the real system is connected.
 * Replace `lookupShipment` with a call to your TMS or carrier API.
 */
const demo: Record<string, Shipment> = {
  "SSI-DEMO-001": {
    reference: "SSI-DEMO-001",
    mode: "Ocean",
    origin: "Sohar, Oman",
    destination: "Jebel Ali, UAE",
    eta: "2 days",
    status: "In transit",
    events: [
      { at: "Day 1, 09:10", place: "Muscat", status: "Booking confirmed", done: true },
      { at: "Day 1, 15:40", place: "Muscat", status: "Cargo collected", done: true },
      { at: "Day 2, 11:00", place: "Sohar Port", status: "Export customs cleared", done: true },
      { at: "Day 3, 06:30", place: "Sohar Port", status: "Vessel departed", done: true },
      { at: "Day 5", place: "Jebel Ali", status: "Vessel arrival", done: false },
      { at: "Day 6", place: "Dubai", status: "Delivered", done: false },
    ],
  },
  "SSI-DEMO-002": {
    reference: "SSI-DEMO-002",
    mode: "Air",
    origin: "Muscat, Oman",
    destination: "Frankfurt, Germany",
    eta: "Delivered",
    status: "Delivered",
    events: [
      { at: "Day 1, 08:00", place: "Muscat", status: "Cargo collected", done: true },
      { at: "Day 1, 19:20", place: "MCT", status: "Departed Muscat International", done: true },
      { at: "Day 2, 06:45", place: "FRA", status: "Arrived Frankfurt", done: true },
      { at: "Day 2, 13:10", place: "FRA", status: "Import customs cleared", done: true },
      { at: "Day 3, 10:05", place: "Frankfurt", status: "Delivered, signed by consignee", done: true },
    ],
  },
};

export const demoReferences = Object.keys(demo);

export async function lookupShipment(reference: string): Promise<Shipment | null> {
  const key = reference.trim().toUpperCase();
  return demo[key] ?? null;
}
