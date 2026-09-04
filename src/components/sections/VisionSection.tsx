import { MaskedTitle } from "@/components/ui/MaskedTitle";
import { Reveal } from "@/components/ui/Reveal";

/**
 * A held breath between the product half and the client half of the page.
 * Almost nothing on screen, on purpose.
 */
export function VisionSection() {
  return (
    <section className="relative isolate overflow-hidden border-t border-line bg-ink py-[clamp(120px,20vw,260px)] text-paper">
      {/* Faint signal wash + hairlines, mirroring the hero in negative. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
      >
        <div className="absolute left-1/2 top-1/2 h-[70vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] blur-[110px] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--signal)_38%,transparent),transparent_70%)]" />
        {[30, 50, 70].map((top) => (
          <span
            key={top}
            className="absolute left-0 h-px w-full"
            style={{
              top: `${top}%`,
              background:
                "linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)",
            }}
          />
        ))}
      </div>

      <div className="shell relative text-center">
        <Reveal y={10}>
          <p className="t-label !text-white/45">Vision</p>
        </Reveal>

        <MaskedTitle
          as="p"
          lines={["Today it's an idea.", "Tomorrow it's a product."]}
          className="t-h1 mx-auto mt-8 max-w-[18ch] text-balance text-paper"
          stagger={110}
        />

        <Reveal delay={340} className="mt-10">
          <p className="mx-auto max-w-[40ch] text-pretty text-[0.9375rem] leading-relaxed text-white/55">
            Todo lo que construimos empieza igual: una idea que merece existir
            fuera de nuestra cabeza.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
