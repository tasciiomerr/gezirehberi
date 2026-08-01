import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: "6px",
          color: "#fdf6ec",
          fontSize: 22,
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
