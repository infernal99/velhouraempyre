"use client";

import { useEffect, useRef, useState } from "react";
import { ButtonAction } from "@/components/ui/Button";
import { onOpenContactModal } from "@/lib/contactModal";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "sent" | "error";

const PROJECT_TYPES = ["Producto propio", "Web para mi negocio", "Otro"] as const;

/**
 * The site's single contact surface, mounted once in the root layout.
 * Anything that wants to open it calls `openContactModal()` — see
 * `lib/contactModal.ts` — rather than holding its own open/closed state.
 *
 * Submission goes to `/api/contact`, which sends a real email via Resend.
 */
export function ContactModal() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  useEffect(() => onOpenContactModal(() => setOpen(true)), []);

  useEffect(() => {
    if (!open) return;

    lastFocused.current = document.activeElement as HTMLElement | null;
    firstFieldRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }

      // Basic focus trap: keep Tab cycling inside the dialog.
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
    // Reset for next time, after the close animation would have run.
    setTimeout(() => {
      setStatus("idle");
      setErrorMessage(null);
    }, 300);
    lastFocused.current?.focus();
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      projectType: String(form.get("projectType") ?? ""),
      message: String(form.get("message") ?? ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error ?? "No se pudo enviar el mensaje.");
      }

      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "No se pudo enviar el mensaje.",
      );
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      aria-hidden={false}
    >
      {/* Backdrop */}
      <button
        type="button"
        aria-label="Cerrar"
        onClick={close}
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm anim-rise"
        style={{ "--d": "0ms" } as React.CSSProperties}
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className="anim-rise relative w-full max-w-[540px] max-h-[90svh] overflow-y-auto rounded-3xl border border-line bg-paper p-7 shadow-[0_60px_120px_-40px_rgba(8,9,10,0.5)] sm:p-10"
        style={{ "--d": "40ms" } as React.CSSProperties}
      >
        <button
          type="button"
          aria-label="Cerrar"
          onClick={close}
          className="absolute right-6 top-6 flex size-9 items-center justify-center rounded-full text-ink-mute transition-colors duration-300 hover:bg-paper-sunk hover:text-ink"
        >
          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="size-4">
            <path
              d="M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {status === "sent" ? (
          <div className="py-6">
            <p className="t-label text-signal">Enviado</p>
            <h2 className="t-h3 mt-3">Mensaje recibido.</h2>
            <p className="t-body mt-3 max-w-[38ch]">
              Gracias por escribirnos. Te responderemos lo antes posible al
              correo que nos has dejado.
            </p>
            <ButtonAction onClick={close} className="mt-8">
              Cerrar
            </ButtonAction>
          </div>
        ) : (
          <>
            <p className="t-label">Start a project</p>
            <h2 id="contact-modal-title" className="t-h3 mt-3">
              Cuéntanos tu idea.
            </h2>
            <p className="t-body mt-3 max-w-[40ch] text-[0.9375rem]">
              Ya sea nuestro próximo producto o tu próxima web, respondemos a
              todos los mensajes personalmente.
            </p>

            <form onSubmit={onSubmit} className="mt-7 space-y-4">
              <Field label="Nombre">
                <input
                  ref={firstFieldRef}
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={inputClass}
                />
              </Field>

              <Field label="Email">
                <input
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </Field>

              <Field label="Tipo de proyecto">
                <select name="projectType" defaultValue={PROJECT_TYPES[0]} className={inputClass}>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Mensaje">
                <textarea
                  name="message"
                  required
                  rows={4}
                  className={cn(inputClass, "resize-none")}
                />
              </Field>

              {status === "error" && (
                <p role="alert" className="text-sm text-red-600">
                  {errorMessage}
                </p>
              )}

              <ButtonAction
                type="submit"
                arrow
                disabled={status === "submitting"}
                className="mt-2 w-full disabled:opacity-60"
              >
                {status === "submitting" ? "Enviando…" : "Enviar mensaje"}
              </ButtonAction>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="t-label">{label}</span>
      <div className="mt-2">{children}</div>
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-line bg-paper-off px-4 py-3 text-[0.9375rem] text-ink " +
  "outline-none transition-colors duration-300 placeholder:text-ink-faint " +
  "focus:border-ink-soft focus:bg-paper";
