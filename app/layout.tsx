import type { Metadata } from "next";
import { Alfa_Slab_One, Caveat, DM_Sans } from "next/font/google";
import "./globals.css";
import { BUSINESS } from "@/lib/constants";

const display = Alfa_Slab_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const script = Caveat({
  weight: ["500", "700"],
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${BUSINESS.domain}`),
  title: {
    default: `${BUSINESS.name} — Pressure, House, Roof & Window Washing in LA & OC`,
    template: `%s | ${BUSINESS.name}`,
  },
  description:
    "Coastal-tough exterior cleaning for LA County and Orange County homes. Pressure washing, house washing, roof washing, and streak-free window cleaning — done right the first time.",
  keywords: [
    "pressure washing",
    "house washing",
    "roof washing",
    "soft washing",
    "window cleaning",
    "gutter cleaning",
    "solar panel cleaning",
    "LA County",
    "Orange County",
    "exterior cleaning",
  ],
  openGraph: {
    title: "True Coastal Exterior",
    description: "Exterior Cleaning in LA & Orange County",
    url: `https://${BUSINESS.domain}`,
    siteName: BUSINESS.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "True Coastal Exterior",
    description: "Exterior Cleaning in LA & Orange County",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${script.variable} ${body.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
