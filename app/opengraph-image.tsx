import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name}: international freight forwarding from Oman`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #141C1B 0%, #0F4C45 140%)",
          color: "#F4F1EA",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 60, height: 60, borderRadius: 16, background: "#E8541E", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="30" height="24" viewBox="0 0 26 20" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 2l8 8-8 8" />
              <path d="M14 2l8 8-8 8" />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: -1 }}>SPEED</span>
            <span style={{ fontSize: 13, letterSpacing: 5, color: "#B7D1CC" }}>SHIPPING INTERNATIONAL</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ fontSize: 88, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>{site.tagline}</div>
          <div style={{ fontSize: 28, color: "#C9D3D1" }}>Air, ocean and land freight from Muscat, Oman.</div>
        </div>
      </div>
    ),
    size,
  );
}
