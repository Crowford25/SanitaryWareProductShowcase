import { PlusIcon } from "@phosphor-icons/react/ssr";
import { faqs, site } from "@/lib/content";
import { Container, SectionHeader } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";

export default function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-paper py-16 md:py-24">
      <Container className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-24 lg:self-start">
          <SectionHeader
            id="faq-title"
            label="FAQ"
            title="Questions before you book"
            description="The answers our showroom team gives most often. Anything else, ask us during your free consultation."
          />
          <p className="mt-6 body-6 text-muted">
            Prefer email? Write to{" "}
            <a
              href={`mailto:${site.email}`}
              className="rounded-sm text-ink underline decoration-line-strong underline-offset-4 transition-colors duration-300 ease-soft hover:decoration-ink"
            >
              {site.email}
            </a>{" "}
            and we reply within one working day.
          </p>
        </Reveal>

        <Reveal className="flex flex-col gap-2">
          {faqs.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-line bg-ivory transition-colors duration-300 ease-soft open:bg-white">
              <summary className="flex cursor-pointer items-center justify-between gap-4 rounded-2xl px-6 py-4 title-3 text-ink transition-colors duration-300 ease-soft hover:bg-ink/3">
                <h3>{item.q}</h3>
                <span
                  aria-hidden="true"
                  className="motion-move grid size-8 shrink-0 place-items-center rounded-full border border-line bg-paper transition-transform duration-500 ease-soft group-open:rotate-45"
                >
                  <PlusIcon size={14} weight="bold" />
                </span>
              </summary>
              <div className="faq-answer px-6 pb-6">
                <p className="max-w-[680px] body-6 text-muted">{item.a}</p>
              </div>
            </details>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}
