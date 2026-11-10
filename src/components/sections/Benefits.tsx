import Image from "next/image";
import { ReceiptIcon, RulerIcon, ShieldCheckIcon, SwatchesIcon, TruckIcon } from "@phosphor-icons/react/ssr";
import { benefits, finishes, images } from "@/lib/content";
import { Container, SectionHeader } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";

const icons = {
  ruler: RulerIcon,
  receipt: ReceiptIcon,
  truck: TruckIcon,
  shield: ShieldCheckIcon,
};

function IconBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid size-10 place-items-center rounded-full border border-line bg-ivory text-ink">{children}</span>
  );
}

export default function Benefits() {
  return (
    <section aria-labelledby="benefits-title" className="bg-paper py-16 md:py-24">
      <Container>
        <Reveal>
          <SectionHeader
            id="benefits-title"
            label="Why one studio"
            title="What changes when one team plans the whole room"
            description="You get one point of contact, one set of drawings and one finish, from the first sketch to the day your contractor hands over."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {/* Lead benefit with product photo */}
          <Reveal className="md:col-span-2 lg:col-span-2">
            <article className="grid h-full gap-2 rounded-2xl border border-line bg-ivory p-2 sm:grid-cols-2">
              <div className="flex flex-col p-4 md:p-6">
                <IconBadge>
                  <SwatchesIcon aria-hidden="true" size={20} />
                </IconBadge>
                <h3 className="mt-6 heading-6">One finish across the room</h3>
                <p className="mt-2 body-6 text-muted">
                  Mixers, shower set, towel rails and drain covers come from the same production batch, so the brass on
                  your tap matches the brass on your shower.
                </p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-6" aria-label="Available finishes">
                  {finishes.map((f) => (
                    <li
                      key={f.name}
                      className="flex items-center gap-2 rounded-full border border-line bg-paper py-1 pr-3 pl-1 caption-4 text-ink"
                    >
                      <span
                        aria-hidden="true"
                        className="size-4 rounded-full border border-ink/10"
                        style={{ backgroundColor: f.color }}
                      />
                      {f.name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative min-h-64 overflow-hidden rounded-lg bg-line">
                <Image
                  src={images.brass}
                  alt="Two brushed brass Linea mixers and brass framed mirrors on a marble wall"
                  fill
                  sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </article>
          </Reveal>

          {benefits.map((b, i) => {
            const Icon = icons[b.icon];
            return (
              <Reveal key={b.title} delay={(i + 1) * 60}>
                <article className="flex h-full flex-col rounded-2xl border border-line bg-ivory p-6">
                  <IconBadge>
                    <Icon aria-hidden="true" size={20} />
                  </IconBadge>
                  <h3 className="mt-6 heading-6">{b.title}</h3>
                  <p className="mt-2 body-6 text-muted">{b.body}</p>
                  {b.stat ? (
                    <p className="mt-6 w-fit rounded-full bg-brass/12 px-3 py-1 caption-4 text-brass-deep">{b.stat}</p>
                  ) : null}
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
