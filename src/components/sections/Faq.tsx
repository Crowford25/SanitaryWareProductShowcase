import { PlusIcon } from "@phosphor-icons/react/ssr";
import { faqs, site } from "@/lib/content";
import { Container, Rule } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";

const themes = {
  light: {
    section: "bg-paper",
    muted: "text-muted",
    accent: "text-brass-deep",
    link: "text-ink decoration-line-strong hover:decoration-ink",
    summary: "text-ink hover:text-brass-deep",
  },
  dark: {
    section: "bg-coal text-on-night",
    muted: "text-on-night-muted",
    accent: "text-brass",
    link: "text-on-night decoration-night-4 hover:decoration-on-night",
    summary: "text-on-night hover:text-brass",
  },
};

/** Questions as a ruled list, the way a printed FAQ reads, rather than a stack of boxes. */
export default function Faq({ tone = "light", index }: { tone?: "light" | "dark"; index?: string }) {
  const t = themes[tone];
  const ruleTone = tone === "dark" ? "dark" : "light";
  return (
    <section id="faq" aria-labelledby="faq-title" className={`py-16 md:py-24 ${t.section}`}>
      <Container className="grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
          <p className={`caption-3 uppercase tracking-widest ${t.muted}`}>
            {index ? (
              <>
                <span className={t.accent}>{index}</span>
                <span aria-hidden="true"> · </span>
              </>
            ) : null}
            FAQ
          </p>
          <h2 id="faq-title" className="mt-4 heading-4 md:heading-3">
            Questions before you book
          </h2>
          <p className={`mt-4 max-w-[400px] body-3 ${t.muted}`}>
            The answers our showroom team gives most often. Prefer email? Write to{" "}
            <a
              href={`mailto:${site.email}`}
              className={`rounded-sm underline underline-offset-4 transition-colors duration-300 ease-soft ${t.link}`}
            >
              {site.email}
            </a>{" "}
            and we reply within one working day.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7 lg:col-start-6">
          {faqs.map((item) => (
            <div key={item.q}>
              <Rule tone={ruleTone} />
              <details className="group">
                <summary
                  className={`flex cursor-pointer items-start justify-between gap-6 rounded-sm py-6 title-2 transition-colors duration-300 ease-soft ${t.summary}`}
                >
                  <h3>{item.q}</h3>
                  <PlusIcon
                    aria-hidden="true"
                    size={18}
                    className="motion-move mt-1 shrink-0 transition-transform duration-500 ease-soft group-open:rotate-45"
                  />
                </summary>
                <div className="faq-answer pr-12 pb-6">
                  <p className={`max-w-[600px] body-3 ${t.muted}`}>{item.a}</p>
                </div>
              </details>
            </div>
          ))}
          <Rule tone={ruleTone} />
        </Reveal>
      </Container>
    </section>
  );
}
