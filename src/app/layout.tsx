import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AURELIA BATH — Designed for Stillness",
  description:
    "Contemporary bathroom pieces shaped around simplicity, material, and everyday rituals.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
