import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { Reveal } from "@/components/ui/Reveal";

/** The brand statement. Deliberately spacious — one idea, a lot of air. */
export function IntroSection() {
  return (
    <section id="studio" className="band border-t border-line">
      <div className="shell">
        <div className="grid gap-y-12 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-4">
            <Reveal y={12}>
              <p className="t-label flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
                01 — Studio
              </p>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <MaskedTitle
              as="h2"
              lines={[
                "No solo desarrollamos",
                "productos. Los construimos",
                "desde cero.",
              ]}
              className="t-h1 text-balance"
              stagger={80}
            />

            <div className="mt-10 grid gap-6 sm:grid-cols-2 md:mt-14">
              <Reveal delay={120}>
                <p className="t-body max-w-[42ch]">
                  Velhoura nace para convertir ideas en productos digitales
                  reales. Creamos nuestras propias aplicaciones, plataformas y
                  webs, desarrollando cada proyecto desde la idea inicial hasta
                  su lanzamiento y crecimiento.
                </p>
              </Reveal>

              <Reveal delay={220}>
                <p className="t-body max-w-[42ch]">
                  Queremos construir productos que puedan convertirse en pequeñas
                  startups independientes. Cada decisión —diseño, tecnología,
                  marca— se toma pensando en ese destino.
                </p>
              </Reveal>
            </div>

            {/* Quiet stat row: the studio's operating shape. */}
            <Reveal delay={320} className="mt-14 md:mt-20">
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
                {[
                  { k: "Equipo", v: "2" },
                  { k: "Enfoque", v: "Producto propio" },
                  { k: "Método", v: "Idea → Startup" },
                ].map((item) => (
                  <div key={item.k} className="bg-paper px-5 py-6">
                    <dt className="t-label">{item.k}</dt>
                    <dd className="mt-2 text-lg font-medium tracking-tight text-ink">
                      {item.v}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
