import { ReceiptIcon, RulerIcon, ShieldCheckIcon, SwatchesIcon, TruckIcon } from "@phosphor-icons/react/ssr";
import { benefits, finishes, images, leadBenefit } from "@/lib/content";
import { Container, SectionHeader } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";
import TiltCard from "@/components/motion/TiltCard";
import CurtainImage from "@/components/motion/CurtainImage";

const icons = { ruler: RulerIcon, receipt: ReceiptIcon, truck: TruckIcon, shield: ShieldCheckIcon };

function IconChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="motion-move grid size-10 place-items-center rounded-full border border-night-4 bg-night-3 text-on-night transition-transform duration-500 ease-soft group-hover:-translate-y-1 group-hover:rotate-6">
      {children}
    </span>
  );
}

export default function MotionBenefits() {
  return (
    <section aria-labelledby="m-benefits-title" className="bg-night py-16 text-on-night md:py-24">
      <Container>
        <Reveal>
          <SectionHeader
            id="m-benefits-title"
            tone="dark"
            label="Why one studio"
            title="What changes when one team plans the whole room"
            description="One point of contact, one set of drawings and one finish, from the first sketch to the day your contractor hands over."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          <Reveal className="md:col-span-2 lg:col-span-1 lg:row-span-2">
            <TiltCard strength={5}>
              <article className="flex h-full flex-col rounded-3xl border border-night-4 bg-night-2 p-2">
                <CurtainImage
                  src={images.brass}
                  alt="Two brushed brass Linea mixers and brass framed mirrors on a marble wall"
                  sizes="(min-width: 1024px) 400px, (min-width: 768px) 700px, 100vw"
                  className="aspect-[4/3] rounded-2xl lg:aspect-auto lg:min-h-64 lg:flex-1"
                />
                <div className="p-4 md:p-6">
                  <IconChip>
                    <SwatchesIcon aria-hidden="true" size={20} />
                  </IconChip>
                  <h3 className="mt-6 heading-6">{leadBenefit.title}</h3>
                  <p className="mt-2 body-6 text-on-night-muted">{leadBenefit.body}</p>
                  <ul className="mt-6 flex flex-wrap gap-2" aria-label="Available finishes">
                    {finishes.map((f) => (
                      <li
                        key={f.name}
                        className="flex items-center gap-2 rounded-full border border-night-4 bg-night-3 py-1 pr-3 pl-1 caption-4 text-on-night"
                      >
                        <span aria-hidden="true" className="size-4 rounded-full" style={{ backgroundColor: f.color }} />
                        {f.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </TiltCard>
          </Reveal>

          {benefits.map((b, i) => {
            const Icon = icons[b.icon];
            return (
              <Reveal key={b.title} delay={(i + 1) * 70}>
                <TiltCard>
                  <article className="flex h-full flex-col rounded-3xl border border-night-4 bg-night-2 p-6 transition-colors duration-300 ease-soft hover:border-on-night-muted/40">
                    <div className="flex items-center justify-between">
                      <IconChip>
                        <Icon aria-hidden="true" size={20} />
                      </IconChip>
                      <span className="caption-3 tracking-widest text-on-night-muted">{String(i + 2).padStart(2, "0")}</span>
                    </div>
                    <h3 className="mt-8 heading-6">{b.title}</h3>
                    <p className="mt-2 body-6 text-on-night-muted">{b.body}</p>
                    {b.stat ? (
                      <p className="mt-auto w-fit pt-6">
                        <span className="block rounded-full bg-brass/15 px-3 py-1 caption-4 text-brass">{b.stat}</span>
                      </p>
                    ) : null}
                  </article>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
