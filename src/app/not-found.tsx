import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/Layout";
import ButtonLink from "@/components/ui/ButtonLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-svh items-center pt-24 pb-16">
      <Container>
        <p className="caption-3 uppercase tracking-widest text-muted">Error 404</p>
        <h1 className="mt-3 max-w-[680px] heading-3 text-ink md:heading-1">
          This room is not
          <br />
          on the plan
        </h1>
        <p className="mt-4 max-w-[680px] body-3 text-muted md:body-7">
          The page you were looking for has moved or never existed. The rest of the house is still open.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <ButtonLink href="/">
            <ArrowLeftIcon aria-hidden="true" size={18} />
            Back to the home page
          </ButtonLink>
          <Link
            href="/#faq"
            className="rounded-full px-3 py-2 button-md text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-300 ease-soft hover:decoration-ink"
          >
            Read the FAQ
          </Link>
        </div>
      </Container>
    </main>
  );
}
