"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, site } from "@/lib/content";

/** Section links point at the landing page you are on, or the home page from anywhere else. */
export default function FooterExploreLinks({ className }: { className: string }) {
  const pathname = usePathname().replace(/\/+$/, "") || "/";
  const base = pathname === "/motion" ? "/motion" : "/";
  return (
    <ul className="mt-4 flex flex-col gap-3">
      {navLinks.map(({ id, label }) => (
        <li key={id}>
          <Link href={`${base}#${id}`} className={className}>
            {label}
          </Link>
        </li>
      ))}
      <li>
        <Link href={`${base}#book`} className={className}>
          {site.ctaShort}
        </Link>
      </li>
    </ul>
  );
}
