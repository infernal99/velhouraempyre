import { HeroBackdrop } from "@/components/visual/HeroBackdrop";
import { ButtonLink } from "@/components/ui/Button";

/**
 * First screen.
 *
 * The entrance is pure CSS on purpose. Everything above the fold paints from
 * the server HTML and resolves on its own timeline — no hydration, no rAF, no
 * blank hero if JavaScript is slow, throttled in a background tab, or absent.
 * The only client-side piece here is the backdrop's pointer parallax, which is
 * decoration and can afford to arrive late.
 */
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-28 pb-20 sm:pt-32">
      <HeroBackdrop />

      <div className="shell relative">
        {/* Wordmark */}
        <p
          className="anim-rise font-mono text-[0.6875rem] font-medium tracking-[0.42em] text-ink-mute uppercase sm:text-xs"
          style={{ "--d": "80ms" } as React.CSSProperties}
        >
          Velhoura
        </p>

        <div
          className="anim-rise mt-5 h-px w-full max-w-[220px] bg-line-strong sm:mt-6"
          style={{ "--d": "160ms" } as React.CSSProperties}
        />

        {/* Display line — each line rises from behind its own mask. */}
        <h1 className="t-display mt-8 max-w-[15ch] text-balance sm:mt-10">
          <span className="sr-only">We build what&rsquo;s next.</span>
          <span aria-hidden="true" className="block">
            <span className="block overflow-hidden pb-[0.09em]">
              <span
                className="anim-unmask block"
                style={{ "--d": "220ms" } as React.CSSProperties}
              >
                We build
              </span>
            </span>
            <span className="block overflow-hidden pb-[0.09em]">
              <span
                className="anim-unmask block"
                style={{ "--d": "320ms" } as React.CSSProperties}
              >
                what&rsquo;s next<span className="text-signal">.</span>
              </span>
            </span>
          </span>
        </h1>

        <p
          className="anim-rise t-lead mt-8 max-w-[46ch] text-pretty sm:mt-10"
          style={{ "--d": "560ms" } as React.CSSProperties}
        >
          Creamos productos digitales propios, desde la primera idea hasta una
          startup real.
        </p>

        <div
          className="anim-rise mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          style={{ "--d": "660ms" } as React.CSSProperties}
        >
          <ButtonLink href="#products" size="lg" arrow>
            Explorar nuestros productos
          </ButtonLink>
          <ButtonLink href="#services" variant="outline" size="lg" arrow>
            Crear mi web
          </ButtonLink>
        </div>
      </div>

      {/* Scroll cue — desktop only; on a phone the thumb already knows. */}
      <div
        className="anim-rise shell absolute inset-x-0 bottom-8 hidden items-end justify-between md:flex"
        style={{ "--d": "1100ms" } as React.CSSProperties}
      >
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="relative block h-10 w-px overflow-hidden bg-line-strong"
          >
            <span className="anim-cue absolute inset-x-0 top-0 block h-4 bg-ink" />
          </span>
          <span className="t-label">Scroll</span>
        </div>

        <p className="t-label max-w-[24ch] text-right leading-relaxed">
          Product studio
          <br />
          Small team. Big products.
        </p>
      </div>
    </section>
  );
}
