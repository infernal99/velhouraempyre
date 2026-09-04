import { PricingCard } from "@/components/ui/PricingCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { plans } from "@/data/plans";

/**
 * The pivot into the second line of business. The heading names it plainly so
 * nobody mistakes this for the main act, then the three plans follow.
 */
export function ServicesSection() {
  return (
    <section id="services" className="band border-t border-line">
      <div className="shell">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-7">
            <SectionHeading
              label="04 — Web development"
              lines={["We build", "websites too."]}
            />
          </div>

          <div className="flex items-end md:col-span-5">
            <Reveal delay={180}>
              <p className="t-body max-w-[44ch]">
                Aunque nuestro foco principal es crear nuestros propios
                productos, también desarrollamos webs para empresas,
                profesionales y proyectos que necesitan una presencia digital de
                calidad.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid items-stretch gap-5 md:mt-24 lg:grid-cols-3">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 100} y={26} className="h-full">
              <PricingCard plan={plan} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="mt-8 text-center text-xs text-ink-mute">
            Todos los precios son orientativos. Cada proyecto se presupuesta
            según alcance y plazos.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
