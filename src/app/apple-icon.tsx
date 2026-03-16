import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          borderRadius: "36px",
          border: "4px solid #e5e7eb",
          boxSizing: "border-box",
          position: "relative",
          overflow: "hidden",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "14px",
            borderRadius: "28px",
            background: "linear-gradient(135deg, #eb1c24 0%, #eb1c24 48%, #08a7ea 52%, #08a7ea 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            color: "#ffffff",
            fontSize: 96,
            fontWeight: 900,
            lineHeight: 1,
            textShadow: "0 6px 18px rgba(0,0,0,0.25)",
          }}
        >
          T
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
