import { NextResponse } from "next/server";
import { lookupShipment } from "@/lib/tracking";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const ref = (searchParams.get("ref") ?? "").trim();

  if (ref.length < 4 || ref.length > 40 || !/^[A-Za-z0-9\-/ ]+$/.test(ref)) {
    return NextResponse.json({ error: "Enter a valid tracking, AWB or B/L number." }, { status: 400 });
  }

  const shipment = await lookupShipment(ref);
  if (!shipment) {
    return NextResponse.json({ error: "We could not find that reference. Check the number or contact your coordinator." }, { status: 404 });
  }
  return NextResponse.json({ shipment });
}
