import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://yoldefteri.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Yol Defteri — Türkiye Gezi Rehberi",
    template: "%s | Yol Defteri",
  },
  description:
    "Türkiye'yi bölge bölge, şehir şehir, durak durak anlatan gezi rehberi. Nasıl gidilir, nerede kalınır, ne zaman gidilir — hepsi tek adreste.",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Yol Defteri",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
