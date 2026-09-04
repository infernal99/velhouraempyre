import { ButtonLink } from "@/components/ui/Button";
import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/data/site";

/**
 * The close. One instruction, one address, three handles — nothing to fill in
 * on the page itself, so there is no form standing between an idea and an email.
 */
export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden border-t border-line band"
    >
      {/* Ground: faint grid fading upward, with one signal streak across it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_at_50%_120%,black,transparent_70%)]"
      >
        <div className="grain absolute inset-0" />
        <span className="streak absolute left-0 top-[64%] w-full" />
      </div>

      <div className="shell relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal y={12}>
            <p className="t-label">08 — Contact</p>
          </Reveal>

          <MaskedTitle
            lines= {["Have an idea?", "Let's build it."]}
            className="t-h1 mt-7 text-balance"
            stagger={100}
          />

          <Reveal delay={240}>
            <p className="t-lead mx-auto mt-7 max-w-[44ch] text-pretty">
              Ya sea nuestro próximo producto o tu próxima web, estamos
              preparados para construirlo.
            </p>
          </Reveal>

          <Reveal delay={340}>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <ButtonLink href={`mailto:${contact.email}`} size="lg" arrow>
                Start a project
              </ButtonLink>

              <a
                href={`mailto:${contact.email}`}
                className="font-mono text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
              >
                {contact.email}
              </a>
            </div>
          </Reveal>

          <Reveal delay={440}>
            <ul className="mt-14 flex items-center justify-center gap-8">
              {contact.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="group inline-flex flex-col items-center gap-1 text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
                  >
                    {s.label}
                    <span className="block h-px w-0 bg-ink transition-[width] duration-500 ease-[var(--ease-expo)] group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
