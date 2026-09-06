import { Arrow } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { team } from "@/data/team";

export function AboutSection() {
  return (
    <section id="about" className="band border-t border-line bg-paper-off">
      <div className="shell">
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-6">
            <SectionHeading
              label="07 — About"
              lines={["Two people.", "Big ideas."]}
            />
          </div>

          <div className="flex items-end md:col-span-6">
            <Reveal delay={160}>
              <p className="t-body max-w-[44ch]">
                Velhoura ha sido creada por dos socios con pasión por la
                tecnología, el diseño y la creación de productos digitales. Un
                equipo pequeño, sin capas intermedias: quien diseña y quien
                construye son las mismas dos personas que responden al correo.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 grid gap-5 md:mt-20 md:grid-cols-2">
          {team.map((member, i) => (
            <Reveal key={member.id} delay={i * 110} y={26}>
              <article className="group h-full rounded-2xl border border-line bg-paper p-8 transition-[transform,border-color,box-shadow] duration-500 ease-[var(--ease-expo)] hover:-translate-y-1 hover:border-line-strong hover:shadow-[0_24px_54px_-32px_rgba(8,9,10,0.22)] sm:p-10">
                {/* Monogram stands in until there is a portrait to use. */}
                <div className="flex size-16 items-center justify-center rounded-full border border-line bg-paper-sunk">
                  <span className="font-mono text-lg font-medium tracking-tight text-ink-soft">
                    {member.monogram}
                  </span>
                </div>

                <h3 className="t-h3 mt-7">{member.name}</h3>
                <p className="mt-1.5 text-sm text-signal">{member.role}</p>
                <p className="t-body mt-4 max-w-[38ch] text-[0.9375rem]">
                  {member.bio}
                </p>

                <span
                  aria-hidden="true"
                  className="mt-8 block h-px w-10 bg-line-strong transition-[width] duration-700 ease-[var(--ease-expo)] group-hover:w-24"
                />

                {member.href && (
                  <a
                    href={member.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors duration-300 hover:text-signal"
                  >
                    Ver portfolio
                    <Arrow />
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
