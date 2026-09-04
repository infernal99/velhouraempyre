import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const disciplines = [
  "UX",
  "Rendimiento",
  "Conversión",
  "Escalabilidad",
  "Producto",
  "Marca",
  "Tecnología",
];

/**
 * The argument. Two panels set side by side — the difference is legible before
 * a word is read, because one of them keeps going.
 */
export function DifferentiationSection() {
  return (
    <section className="band border-t border-line">
      <div className="shell">
        <SectionHeading
          label="06 — Difference"
          lines={["We don't just", "build websites."]}
        />

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:mt-20 md:grid-cols-2">
          {/* Them */}
          <Reveal className="bg-paper-off">
            <div className="flex h-full flex-col p-8 sm:p-10">
              <p className="t-label">Agencias</p>
              <p className="t-h2 mt-6 text-ink-mute">Construyen para otros.</p>
              <div className="mt-auto pt-10">
                <p className="text-sm text-ink-faint">
                  El proyecto termina el día de la entrega.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Us */}
          <Reveal delay={120} className="relative bg-paper">
            {/* A single signal hairline down the shared edge. */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 hidden w-px bg-gradient-to-b from-transparent via-signal to-transparent md:block"
            />
            <div className="flex h-full flex-col p-8 sm:p-10">
              <p className="t-label !text-signal">Velhoura</p>
              <p className="t-h2 mt-6 text-balance">
                Construimos para otros.{" "}
                <span className="text-ink-mute">
                  Pero sobre todo, construimos para nosotros.
                </span>
              </p>

              <p className="t-body mt-8 max-w-[44ch]">
                Cuando el producto es tuyo, no puedes esconderte detrás de una
                web bonita. O funciona, o no funciona. Esa exigencia es la que
                aplicamos a todo lo que construimos.
              </p>

              <ul className="mt-8 flex flex-wrap gap-2 pt-2">
                {disciplines.map((d, i) => (
                  <li
                    key={d}
                    style={{ transitionDelay: `${i * 40}ms` }}
                    className="rounded-full border border-line bg-paper-off px-3.5 py-1.5 text-[0.8125rem] text-ink-soft"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
