import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "The Wedding Times — Shefali & Raj · Goa · 1–2 February 2027";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const ganeshaBytes = await readFile(
    join(process.cwd(), "public", "images", "ganesha.jpg"),
  );
  const ganeshaSrc = `data:image/jpeg;base64,${ganeshaBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#fbf6ec",
          padding: "60px 80px",
          fontFamily: "Georgia, serif",
          color: "#102844",
          position: "relative",
        }}
      >
        {/* top hairlines */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            letterSpacing: "0.28em",
            fontSize: 18,
            textTransform: "uppercase",
            color: "#28466b",
          }}
        >
          <span>Goa, India</span>
          <span style={{ color: "#b46637", fontStyle: "italic", letterSpacing: 1 }}>
            #RajWaliShefali
          </span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "28px 0 18px",
          }}
        >
          <img src={ganeshaSrc} width={120} height={120} alt="" />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontWeight: 900,
            fontSize: 96,
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          THE WEDDING TIMES
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 18,
            fontSize: 22,
            letterSpacing: "0.34em",
            textTransform: "uppercase",
            color: "#b46637",
          }}
        >
          Love · Adventure · Celebration · Forever
        </div>

        {/* divider */}
        <div
          style={{
            display: "flex",
            height: 2,
            background: "#102844",
            opacity: 0.18,
            margin: "32px 0",
          }}
        />

        {/* headline */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            fontSize: 72,
            fontWeight: 800,
            letterSpacing: "0.01em",
            textAlign: "center",
          }}
        >
          Shefali &amp; Raj
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 12,
            fontSize: 28,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#7a1c1c",
          }}
        >
          To Tie The Knot In Goa
        </div>

        {/* footer info bar */}
        <div
          style={{
            position: "absolute",
            bottom: 60,
            left: 80,
            right: 80,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 22,
            borderTop: "1px solid rgba(16,40,68,0.18)",
            fontSize: 22,
            color: "#28466b",
            fontStyle: "italic",
          }}
        >
          <span>Kenilworth Resort &amp; Spa</span>
          <span>1–2 February 2027</span>
        </div>
      </div>
    ),
    size,
  );
}
