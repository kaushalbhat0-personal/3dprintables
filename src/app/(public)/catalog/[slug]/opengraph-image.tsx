import { ImageResponse } from "next/og"
import { getProductBySlug } from "@/data/products"

export const alt = "3D Factory Product"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  const title = product?.title ?? "3D Factory"
  const description =
    product?.shortDescription ?? "Premium custom 3D printed creations"
  const category = product?.category?.replace("-", " ") ?? ""
  const price = product?.priceRange ?? ""

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)",
          }}
        />

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
          {category && (
            <div
              style={{
                fontSize: "16px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#a1a1aa",
                marginBottom: "12px",
              }}
            >
              {category}
            </div>
          )}

          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "#fafafa",
              lineHeight: 1.1,
              marginBottom: "16px",
              maxWidth: "800px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {title}
          </div>

          <div
            style={{
              fontSize: "22px",
              color: "#a1a1aa",
              lineHeight: 1.4,
              maxWidth: "650px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {description}
          </div>

          {price && (
            <div
              style={{
                fontSize: "20px",
                fontWeight: 600,
                color: "#a78bfa",
                marginTop: "24px",
              }}
            >
              Starting {price}
            </div>
          )}

          <div
            style={{
              fontSize: "14px",
              color: "#52525b",
              marginTop: "32px",
              borderTop: "1px solid #27272a",
              paddingTop: "20px",
            }}
          >
            3D Factory — Premium Custom 3D Printing
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
