import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
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
          background: "#b33a25",
          color: "#fdf6ec",
          fontSize: 110,
          fontStyle: "italic",
          fontWeight: 700,
          fontFamily: "serif",
        }}
      >
        Y
      </div>
    ),
    { ...size }
  );
}
