import { ButtonLink } from "@/components/ui/Button";
import type { Plan } from "@/data/plans";
import { cn } from "@/lib/utils";

/**
 * A plan, presented as a spec sheet rather than a pricing table. The featured
 * plan inverts to ink instead of shouting with colour.
 */
export function PricingCard({ plan }: { plan: Plan }) {
  const featured = Boolean(plan.featured);

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col rounded-2xl border p-7 transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-expo)] sm:p-8",
        featured
          ? "border-ink bg-ink text-paper shadow-[0_30px_70px_-32px_rgba(8,9,10,0.55)] hover:-translate-y-1.5"
          : "border-line bg-paper hover:-translate-y-1.5 hover:border-line-strong hover:shadow-[0_24px_54px_-30px_rgba(8,9,10,0.24)]",
      )}
    >
      {featured && (
        <span className="absolute -top-3 left-7 rounded-full bg-signal px-3 py-1 font-mono text-[0.625rem] tracking-[0.14em] text-white uppercase">
          Recomendado
        </span>
      )}

      <p className={cn("t-label", featured && "!text-white/50")}>{plan.index}</p>

      <h3
        className={cn(
          "mt-3 text-2xl font-semibold tracking-tight",
          featured ? "text-paper" : "text-ink",
        )}
      >
        {plan.name}
      </h3>

      <p
        className={cn(
          "mt-3 text-[0.9375rem] leading-relaxed",
          featured ? "text-white/65" : "text-ink-soft",
        )}
      >
        {plan.pitch}
      </p>

      <div
        className={cn(
          "my-7 h-px",
          featured ? "bg-white/15" : "bg-line",
        )}
      />

      <ul className="flex-1 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Check featured={featured} />
            <span
              className={cn(
                "text-[0.9375rem] leading-snug",
                featured ? "text-white/80" : "text-ink-soft",
              )}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-8">
        <p
          className={cn(
            "text-xl font-semibold tracking-tight",
            featured ? "text-paper" : "text-ink",
          )}
        >
          {plan.price}
        </p>
        {plan.priceNote && (
          <p
            className={cn(
              "mt-1 text-xs",
              featured ? "text-white/45" : "text-ink-mute",
            )}
          >
            {plan.priceNote}
          </p>
        )}

        <ButtonLink
          href="#contact"
          arrow
          size="lg"
          variant={featured ? "outline" : "solid"}
          className={cn(
            "mt-6 w-full",
            featured &&
              "border-white/25 bg-white/5 text-paper backdrop-blur-none hover:border-white hover:bg-paper hover:text-ink",
          )}
        >
          {plan.cta}
        </ButtonLink>
      </div>
    </div>
  );
}

function Check({ featured }: { featured: boolean }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={cn(
        "mt-[3px] size-3.5 shrink-0",
        featured ? "text-white/45" : "text-signal",
      )}
    >
      <path
        d="M3 8.5 6.2 11.7 13 4.9"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
