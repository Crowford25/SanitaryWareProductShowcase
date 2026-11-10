import { images, ledger, withAurelia } from "@/lib/content";
import { Container, EditorialHeader } from "@/components/ui/Layout";
import Reveal from "@/components/ui/Reveal";
import BeforeAfter from "@/components/ui/BeforeAfter";

const cell = "border-t border-line-strong/70 py-3 pr-4 align-top";

export default function ProblemSolution() {
  return (
    <section aria-labelledby="why-title" className="py-16 md:py-24">
      <Container>
        <Reveal>
          <EditorialHeader
            index="01"
            label="The usual way"
            id="why-title"
            title="Most bathrooms are pieced together from five suppliers, and nobody owns the whole room."
          />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6 lg:col-start-4">
            <p className="caption-2 text-muted">A typical renovation, as one Shah Alam homeowner logged it before calling us.</p>
            <table className="mt-4 w-full border-separate border-spacing-0 text-left">
              <caption className="sr-only">Five pieces, five suppliers, five lead times, compared with ordering through Aurelia</caption>
              <thead>
                <tr className="caption-3 uppercase tracking-widest text-muted">
                  <th scope="col" className="pr-4 pb-3 font-semibold">Piece</th>
                  <th scope="col" className="pr-4 pb-3 font-semibold">Bought from</th>
                  <th scope="col" className="pr-4 pb-3 font-semibold">Lead time</th>
                  <th scope="col" className="hidden pb-3 font-semibold sm:table-cell">Finish</th>
                </tr>
              </thead>
              <tbody className="body-6 text-muted">
                {ledger.map((row) => (
                  <tr key={row.piece}>
                    <th scope="row" className={`${cell} title-4 text-ink`}>
                      {row.piece}
                    </th>
                    <td className={cell}>{row.from}</td>
                    <td className={`${cell} tabular-nums`}>{row.lead}</td>
                    <td className={`${cell} hidden sm:table-cell`}>{row.finish}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="body-5 text-ivory">
                <tr>
                  <th scope="row" className="rounded-l-lg bg-ink py-3 pr-4 pl-3 text-left title-4">
                    {withAurelia.piece}
                  </th>
                  <td className="bg-ink py-3 pr-4">{withAurelia.from}</td>
                  <td className="bg-ink py-3 pr-4 max-sm:rounded-r-lg">{withAurelia.lead}</td>
                  <td className="hidden rounded-r-lg bg-ink py-3 pr-3 sm:table-cell">{withAurelia.finish}</td>
                </tr>
              </tfoot>
            </table>
            <p className="mt-4 caption-2 text-muted">
              Five suppliers, five deliveries, and nine weeks of waiting for the slowest piece.
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-3 lg:col-start-10 lg:mt-24">
            <BeforeAfter
              before={{
                src: images.before,
                alt: "Dated bathroom with a pedestal basin, a plain mirror and mismatched fittings",
                label: "Pieced together",
              }}
              after={{
                src: images.after,
                alt: "Bright bathroom with a freestanding bath and vessel basin in one matched finish",
                label: "Planned as one",
              }}
            />
            <p className="mt-3 caption-5 text-muted">Drag to compare a room pieced together with one planned as a suite.</p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
