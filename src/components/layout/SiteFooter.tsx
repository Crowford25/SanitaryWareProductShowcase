import Link from "next/link";
import { ArrowUpIcon } from "@phosphor-icons/react/ssr";
import { navLinks, site } from "@/lib/content";
import { Container } from "@/components/ui/Layout";

const linkClass =
  "rounded-sm body-6 text-on-night-muted transition-colors duration-300 ease-soft hover:text-on-night";

export default function SiteFooter() {
  return (
    <footer className="bg-night text-on-night">
      <Container>
        <div aria-hidden="true" className="h-px w-full bg-night-4" />
        <div className="grid gap-12 py-16 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-8">
          <div className="max-w-sm">
            <p className="flex items-center gap-2 body-4 uppercase tracking-widest">
              <span aria-hidden="true" className="size-2 rounded-full bg-brass" />
              Aurelia Bath
            </p>
            <p className="mt-4 body-6 text-on-night-muted">
              Matching bathroom suites, planned around your floor plan and fitted in Malaysia, Singapore and Brunei.
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="caption-3 uppercase tracking-widest text-on-night-muted">Explore</p>
            <ul className="mt-4 flex flex-col gap-3">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <Link href={`/#${id}`} className={linkClass}>
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/#book" className={linkClass}>
                  {site.ctaShort}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="caption-3 uppercase tracking-widest text-on-night-muted">Visit</p>
            <address className="mt-4 flex flex-col gap-3 not-italic">
              <span className="body-6 text-on-night-muted">{site.showroom}</span>
              <span className="body-6 text-on-night-muted">{site.hours}</span>
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </address>
          </div>

          <div>
            <p className="caption-3 uppercase tracking-widest text-on-night-muted">Legal</p>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <Link href="/privacy" className={linkClass}>
                  Privacy policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className={linkClass}>
                  Terms of use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="caption-5 text-on-night-muted">© 2026 Aurelia Bath Sdn Bhd. All rights reserved.</p>
          <a href="#top" className={`inline-flex items-center gap-2 ${linkClass}`}>
            Back to top
            <ArrowUpIcon aria-hidden="true" size={14} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
