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
  },
  twitter: { card: "summary_large_image", title, description },
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
