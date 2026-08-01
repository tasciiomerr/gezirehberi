import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Yol Defteri",
    short_name: "Yol Defteri",
    description: "Türkiye'yi bölge bölge anlatan gezi rehberi.",
    start_url: "/tr",
    display: "standalone",
    background_color: "#fdf6ec",
    theme_color: "#b33a25",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
