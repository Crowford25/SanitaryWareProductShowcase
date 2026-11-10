import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import SiteNav from "@/components/layout/SiteNav";
import SiteFooter from "@/components/layout/SiteFooter";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const title = "Aurelia Bath | Matching bathroom suites, planned and fitted";
const description =
  "Basins, mixers, baths, WCs and showers designed to match. Book a free 45 minute consultation and get a fitted plan and itemised quote in 3 working days.";

// Lives in /public rather than as app/opengraph-image.png: on a project site Next would
// add the repo path twice to a file based image, while metadata URLs resolve correctly.
const shareImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Aurelia Bath: your whole bathroom, planned as one suite",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s | Aurelia Bath" },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Aurelia Bath",
    title,
    description,
    locale: "en_MY",
    url: "/",
    images: [shareImage],
  },
  twitter: { card: "summary_large_image", title, description, images: [shareImage] },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ef",
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={manrope.variable}>
      <body id="top">
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-ink px-3 py-2 button-sm text-ivory focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <SiteNav />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
