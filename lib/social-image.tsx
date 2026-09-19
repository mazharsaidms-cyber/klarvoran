import { ImageResponse } from "next/og";

export const socialImageSize = {
  width: 1200,
  height: 630,
};

export function createSocialImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#1b222e",
          color: "#ffffff",
          padding: "70px 78px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 420,
            height: 420,
            borderRadius: 999,
            background: "#ec1c23",
            right: -165,
            top: -165,
            opacity: 0.95,
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 58,
              height: 58,
              borderRadius: 14,
              background: "#ec1c23",
              fontSize: 34,
              fontWeight: 800,
            }}
          >
            K
          </div>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 800, letterSpacing: -1 }}>KlarVoran</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 880 }}>
          <div style={{ display: "flex", fontSize: 60, lineHeight: 1.08, fontWeight: 800, letterSpacing: -2 }}>
            Klar sehen. Selbstständig handeln. Beruflich vorankommen.
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 27, lineHeight: 1.35, color: "#d7dbe2" }}>
            AVGS-Coaching, privates Jobcoaching und Workshops in Frankfurt und im Rhein-Main-Gebiet
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, color: "#ffffff" }}>
          <div style={{ width: 54, height: 5, borderRadius: 99, background: "#ec1c23" }} />
          Verstanden werden · System verstehen · Selbst handeln · Dranbleiben
        </div>
      </div>
    ),
    socialImageSize,
  );
}
