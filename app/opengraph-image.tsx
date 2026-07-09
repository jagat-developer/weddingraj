import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { shareImageAlt } from "@/lib/seo";

export const alt = shareImageAlt;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const coupleBytes = await readFile(
    join(process.cwd(), "public", "images", "clone-assets", "front-couple-img-0909.jpg"),
  );
  const coupleSrc = `data:image/jpeg;base64,${coupleBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          background: "#fbf6ec",
          padding: "44px 52px",
          fontFamily: "Georgia, serif",
          color: "#102844",
          position: "relative",
          gap: 36,
        }}
      >
        <div
          style={{
            width: 650,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 14,
              borderBottom: "2px solid #102844",
              color: "#102844",
              letterSpacing: "0.18em",
              fontSize: 18,
              textTransform: "uppercase",
            }}
          >
            <span>Goa, India</span>
            <span style={{ color: "#9b1f19", fontStyle: "italic", letterSpacing: 1 }}>
              #RajWaliShefali
            </span>
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 26,
              color: "#9b1f19",
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: "0.38em",
              textTransform: "uppercase",
            }}
          >
            Special Wedding Edition
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 8,
              fontSize: 66,
              fontWeight: 900,
              lineHeight: 0.92,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            The Wedding Times
          </div>

          <div
            style={{
              display: "flex",
              width: 160,
              height: 4,
              marginTop: 24,
              background: "#9b1f19",
            }}
          />

          <div
            style={{
              display: "flex",
              marginTop: 28,
              color: "#9b1f19",
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "0.34em",
              textTransform: "uppercase",
            }}
          >
            Breaking News
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 8,
              fontSize: 82,
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: "-0.015em",
            }}
          >
            Shefali &amp; Raj
          </div>

          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 30,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#9b1f19",
            }}
          >
            To Tie The Knot In Goa
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 18,
              marginTop: 34,
            }}
          >
            {["1-2 February 2027", "Kenilworth Resort & Spa"].map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  minWidth: 0,
                  padding: "14px 18px",
                  border: "2px solid rgba(155,31,25,0.28)",
                  borderRadius: 16,
                  color: "#102844",
                  fontSize: 21,
                  fontWeight: 800,
                  textAlign: "center",
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            width: 410,
            height: "100%",
            borderRadius: 28,
            overflow: "hidden",
            border: "3px solid rgba(155,31,25,0.22)",
            boxShadow: "0 24px 48px rgba(16, 40, 68, 0.14)",
          }}
        >
          <img
            src={coupleSrc}
            alt=""
            width={410}
            height={542}
            style={{
              width: 410,
              height: 542,
              objectFit: "cover",
              objectPosition: "57% center",
            }}
          />
        </div>
      </div>
    ),
    size,
  );
}
