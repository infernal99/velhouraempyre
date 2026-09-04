import { cn } from "@/lib/utils";

/**
 * Three fictional site previews — one per plan tier.
 *
 * Built from real DOM at reduced scale rather than screenshots: they weigh
 * nothing, stay sharp at any density, and can be edited like any component.
 * The brands are invented to demonstrate range; none of them is a real client.
 */

/* ── Tier 01 · Landing ─────────────────────────────────────────────
   MERIDIA — fictional botanical skincare brand. One page, one product,
   editorial type, a lot of air. */
export function PreviewLanding() {
  return (
    <div className="flex h-full flex-col bg-[#faf8f4] text-[#1b1a17]">
      <div className="flex items-center justify-between border-b border-[#e6e1d8] px-5 py-3">
        <span className="text-[10px] font-semibold tracking-[0.3em] uppercase">
          Meridia
        </span>
        <div className="hidden gap-4 sm:flex">
          {["Ritual", "Ingredientes", "Tienda"].map((l) => (
            <span key={l} className="text-[8px] tracking-wide text-[#7c7568]">
              {l}
            </span>
          ))}
        </div>
        <span className="rounded-full bg-[#1b1a17] px-2.5 py-1 text-[7px] tracking-wide text-[#faf8f4]">
          Comprar
        </span>
      </div>

      <div className="grid flex-1 grid-cols-5">
        <div className="col-span-3 flex flex-col justify-center px-5 py-4 sm:px-7">
          <span className="text-[7px] tracking-[0.24em] text-[#9a9184] uppercase">
            Nueva colección
          </span>
          <p className="mt-2 text-[clamp(15px,3.1vw,26px)] leading-[0.98] tracking-[-0.03em]">
            Cuidado de la piel,
            <br />
            <span className="italic">reducido a lo esencial.</span>
          </p>
          <p className="mt-2.5 max-w-[26ch] text-[7.5px] leading-relaxed text-[#6d675c]">
            Seis ingredientes. Cero relleno. Formulado en pequeños lotes.
          </p>
          <div className="mt-3.5 flex items-center gap-2">
            <span className="rounded-full bg-[#1b1a17] px-3 py-1.5 text-[7px] text-[#faf8f4]">
              Descubrir el ritual
            </span>
            <span className="text-[7px] text-[#6d675c] underline underline-offset-2">
              Ver ingredientes
            </span>
          </div>
        </div>

        <div className="relative col-span-2 overflow-hidden bg-[#ece6dc]">
          <div className="absolute left-1/2 top-1/2 h-[62%] w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-[6px] bg-gradient-to-b from-[#dcd3c4] to-[#c9bda9] shadow-[0_10px_20px_-8px_rgba(0,0,0,0.25)]">
            <div className="absolute inset-x-[22%] top-[26%] h-[1.5px] bg-[#1b1a17]/70" />
            <div className="absolute inset-x-[30%] top-[34%] h-px bg-[#1b1a17]/25" />
          </div>
          <span className="absolute bottom-2 right-2 text-[6px] tracking-widest text-[#8b8274] uppercase">
            01 / Sérum
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 border-t border-[#e6e1d8] text-[6.5px] text-[#6d675c]">
        {["Envío en 24 h", "Vegano certificado", "Hecho en España"].map((t) => (
          <span
            key={t}
            className="border-r border-[#e6e1d8] px-3 py-2 last:border-r-0"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Tier 02 · Business ────────────────────────────────────────────
   NORDVIK — fictional engineering consultancy. Multi-section corporate
   site: nav, hero, metrics, service grid. */
export function PreviewBusiness() {
  return (
    <div className="flex h-full flex-col bg-white text-[#0d1117]">
      <div className="flex items-center justify-between border-b border-[#e8eaed] px-5 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-[2px] bg-[#0f3d63]" />
          <span className="text-[9px] font-semibold tracking-tight">Nordvik</span>
        </div>
        <div className="hidden gap-3.5 sm:flex">
          {["Servicios", "Sectores", "Proyectos", "Equipo"].map((l) => (
            <span key={l} className="text-[7.5px] text-[#5b6470]">
              {l}
            </span>
          ))}
        </div>
        <span className="rounded bg-[#0f3d63] px-2.5 py-1 text-[7px] text-white">
          Solicitar propuesta
        </span>
      </div>

      <div className="relative flex-1 overflow-hidden bg-[#f6f8fa] px-5 py-4">
        <div className="absolute inset-y-0 right-0 w-[42%] bg-[linear-gradient(135deg,#0f3d63,#1b6ea8)]">
          <div className="absolute inset-0 opacity-25 [background-image:repeating-linear-gradient(90deg,transparent,transparent_11px,rgba(255,255,255,0.5)_11px,rgba(255,255,255,0.5)_12px)]" />
        </div>

        <div className="relative max-w-[58%]">
          <span className="text-[6.5px] tracking-[0.2em] text-[#1b6ea8] uppercase">
            Ingeniería industrial
          </span>
          <p className="mt-1.5 text-[clamp(12px,2.5vw,20px)] leading-[1.05] font-semibold tracking-[-0.03em]">
            Infraestructura que resiste treinta años.
          </p>
          <p className="mt-2 max-w-[32ch] text-[7px] leading-relaxed text-[#5b6470]">
            Diseño, cálculo y dirección de obra para plantas industriales y
            proyectos energéticos.
          </p>
          <div className="mt-3 flex gap-4">
            {[
              ["180+", "Proyectos"],
              ["12", "Países"],
              ["1998", "Fundada"],
            ].map(([v, k]) => (
              <div key={k}>
                <p className="text-[11px] font-semibold tracking-tight text-[#0f3d63]">
                  {v}
                </p>
                <p className="text-[6px] text-[#7b838d]">{k}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-px border-t border-[#e8eaed] bg-[#e8eaed]">
        {[
          ["Consultoría", "Viabilidad y auditoría técnica"],
          ["Proyecto", "Cálculo estructural y BIM"],
          ["Dirección", "Ejecución y control de obra"],
        ].map(([t, d]) => (
          <div key={t} className="bg-white px-3.5 py-2.5">
            <p className="text-[7.5px] font-semibold">{t}</p>
            <p className="mt-1 text-[6.5px] leading-snug text-[#7b838d]">{d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Tier 03 · Custom ──────────────────────────────────────────────
   CADENCE — fictional logistics SaaS. Application shell: sidebar,
   metrics, chart and a live table. */
export function PreviewCustom() {
  const bars = [38, 52, 44, 67, 58, 79, 71, 88, 74, 93, 85, 100];

  return (
    <div className="flex h-full bg-[#0b0d12] text-[#e8eaf0]">
      <div className="hidden w-[19%] shrink-0 flex-col gap-2.5 border-r border-white/10 px-3 py-3 sm:flex">
        <div className="flex items-center gap-1.5">
          <span className="size-2 rounded-full bg-[#5b7cff]" />
          <span className="text-[8px] font-semibold tracking-tight">Cadence</span>
        </div>
        <div className="mt-1 space-y-1.5">
          {["Overview", "Envíos", "Rutas", "Flota", "Informes"].map((l, i) => (
            <div
              key={l}
              className={cn(
                "rounded px-1.5 py-1 text-[6.5px]",
                i === 0 ? "bg-white/10 text-white" : "text-white/45",
              )}
            >
              {l}
            </div>
          ))}
        </div>
        <div className="mt-auto rounded border border-white/10 px-1.5 py-1.5">
          <p className="text-[6px] text-white/40">Plan</p>
          <p className="text-[6.5px] text-white/85">Enterprise</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-3.5 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold tracking-tight">Overview</p>
            <p className="text-[6px] text-white/40">Últimos 30 días</p>
          </div>
          <span className="rounded bg-[#5b7cff] px-2 py-1 text-[6.5px] font-medium text-white">
            Nuevo envío
          </span>
        </div>

        <div className="mt-2.5 grid grid-cols-3 gap-1.5">
          {[
            ["Envíos", "4.812", "+12%"],
            ["En tránsito", "318", "+4%"],
            ["Incidencias", "0,7%", "−2%"],
          ].map(([k, v, d]) => (
            <div
              key={k}
              className="rounded border border-white/10 bg-white/[0.03] px-2 py-1.5"
            >
              <p className="text-[5.5px] tracking-wide text-white/40 uppercase">
                {k}
              </p>
              <p className="mt-0.5 text-[10px] font-semibold tracking-tight">
                {v}
              </p>
              <p className="text-[5.5px] text-[#6ee7a8]">{d}</p>
            </div>
          ))}
        </div>

        <div className="mt-2 flex-1 rounded border border-white/10 bg-white/[0.03] px-2 py-2">
          <div className="flex h-full items-end gap-[3px]">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-[1px]"
                style={{
                  height: `${h}%`,
                  background:
                    i > 8
                      ? "linear-gradient(180deg,#5b7cff,rgba(91,124,255,0.25))"
                      : "rgba(255,255,255,0.16)",
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-2 space-y-[3px]">
          {[
            ["#48192", "Madrid → Lyon", "En ruta"],
            ["#48193", "Valencia → Porto", "Entregado"],
          ].map(([id, route, state]) => (
            <div
              key={id}
              className="flex items-center justify-between rounded border border-white/10 px-2 py-1 text-[6px]"
            >
              <span className="text-white/45">{id}</span>
              <span className="text-white/80">{route}</span>
              <span
                className={
                  state === "Entregado" ? "text-[#6ee7a8]" : "text-[#8aa0ff]"
                }
              >
                {state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
