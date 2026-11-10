import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Aurelia Bath: your whole bathroom, planned as one suite";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const photo = await readFile(join(process.cwd(), "public/images/hero-bathroom.jpg"));
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#f6f4ef" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 640,
            padding: 64,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 22, letterSpacing: 4, color: "#1b1a17" }}>
            <div style={{ width: 12, height: 12, borderRadius: 12, background: "#a78652" }} />
            AURELIA BATH
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ fontSize: 60, lineHeight: 1.05, fontWeight: 600, color: "#1b1a17", letterSpacing: -1.5 }}>
              Your whole bathroom, planned as one suite
            </div>
            <div style={{ display: "flex", flexDirection: "column", fontSize: 24, lineHeight: 1.4, color: "#5f5b53" }}>
              <span>Book a free consultation</span>
              <span>in Kuala Lumpur or on video.</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, padding: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoSrc} alt="" width={512} height={582} style={{ objectFit: "cover", borderRadius: 24, width: "100%", height: "100%" }} />
        </div>
      </div>
    ),
    size,
  );
}
