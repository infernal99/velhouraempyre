import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center">
      <div className="shell">
        <p className="t-label">Error 404</p>
        <h1 className="t-h1 mt-5 max-w-[16ch] text-balance">
          Esta página todavía no existe.
        </h1>
        <p className="t-lead mt-5 max-w-[42ch]">
          Puede que la hayamos movido, o que aún esté por construir.
        </p>
        <ButtonLink href="/" size="lg" arrow className="mt-9">
          Volver al inicio
        </ButtonLink>
      </div>
    </section>
  );
}
