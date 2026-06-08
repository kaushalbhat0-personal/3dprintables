import { ImageResponse } from "next/og"
import { siteUrl } from "@/lib/url"

export const alt = "3D Factory — Custom 3D Creations Studio"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow effects */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            right: "-10%",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-20%",
            left: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
            flex: 1,
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo + Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              marginBottom: "32px",
            }}
          >
            <img
              src={`${siteUrl()}/images/branding/logo.png`}
              width={60}
              height={60}
              style={{ borderRadius: "12px" }}
              alt=""
            />
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                color: "#fafafa",
                letterSpacing: "-0.02em",
              }}
            >
              3D Factory
            </span>
          </div>

          {/* Headline */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 800,
              color: "#fafafa",
              lineHeight: 1.1,
              marginBottom: "16px",
              maxWidth: "900px",
            }}
          >
            Custom 3D Creations
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              lineHeight: 1.5,
              maxWidth: "700px",
            }}
          >
            Personalized gifts, home decor, cosplay props, prototypes & more — brought to life
          </div>

          {/* CTA */}
          <div
            style={{
              fontSize: "16px",
              color: "#a78bfa",
              fontWeight: 600,
              marginTop: "28px",
              letterSpacing: "0.05em",
            }}
          >
            Order via WhatsApp — 3dfactory.in
          </div>

          {/* Footer */}
          <div
            style={{
              fontSize: "13px",
              color: "#52525b",
              marginTop: "40px",
              borderTop: "1px solid #27272a",
              paddingTop: "20px",
            }}
          >
            3D Factory — Premium Custom 3D Printing Studio
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
