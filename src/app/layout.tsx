import type { Metadata } from "next";
import localFont from "next/font/local";
import { Playfair_Display, Libre_Baskerville } from "next/font/google";
import "./globals.css";

// Loaded via next/font/local so the @font-face URLs are emitted with the
// correct asset prefix / basePath (fixes 404s on GitHub Pages project sites).
const skyrim = localFont({
  src: [
    {
      path: "../../public/fonts/futura-condensed-light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/fonts/futura-condensed-medium.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/futura-condensed-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-skyrim",
  display: "swap",
});

const newspaperDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-newspaper-display",
  display: "swap",
});

const newspaperBody = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-newspaper-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sena | Dragonborn Developer",
  description: "A Skyrim-themed interactive web portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${skyrim.variable} ${newspaperDisplay.variable} ${newspaperBody.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
