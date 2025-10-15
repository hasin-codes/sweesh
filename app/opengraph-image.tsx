import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(90deg, #dc2626, #ea580c)",
          color: "white",
          position: "relative",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 48,
            left: 60,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 9999,
              background: "radial-gradient(circle at 30% 30%, #dc2626, #ea580c)",
              boxShadow: "0 0 24px rgba(220, 38, 38, 0.45)",
            }}
          />
          <div style={{ fontSize: 40, fontWeight: 700 }}>Sweesh</div>
        </div>

        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
            Speak it. See it. Send it.
          </div>
          <div style={{ marginTop: 16, fontSize: 28, opacity: 0.9 }}>
            The fastest way to capture thoughts and transcribe speech.
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 48,
            right: 60,
            fontSize: 24,
            opacity: 0.9,
          }}
        >
          sweesh.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
