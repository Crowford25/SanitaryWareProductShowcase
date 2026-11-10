import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeftIcon } from "@phosphor-icons/react/ssr";
import { Container } from "@/components/ui/Layout";

type Section = { heading: string; body: ReactNode };

export default function LegalPage({ title, updated, intro, sections }: { title: string; updated: string; intro: string; sections: Section[] }) {
  return (
    <main id="main" className="pt-24 pb-16 md:pb-24">
      <Container className="pt-8 md:pt-16">
        <article className="max-w-[680px]">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full caption-1 text-muted transition-colors duration-300 ease-soft hover:text-ink"
          >
            <ArrowLeftIcon aria-hidden="true" size={14} />
            Back to the home page
          </Link>
          <h1 className="mt-6 heading-4 md:heading-2">{title}</h1>
          <p className="mt-3 caption-2 text-muted">Last updated {updated}</p>
          <p className="mt-6 body-7 text-muted">{intro}</p>
          {sections.map((s) => (
            <section key={s.heading} className="mt-12">
              <h2 className="heading-6">{s.heading}</h2>
              <div className="mt-3 flex flex-col gap-3 body-3 text-muted">{s.body}</div>
            </section>
          ))}
        </article>
      </Container>
    </main>
  );
}
