import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contact } from "@/data/site";

/**
 * Sends the contact modal's submission to `contact.email` (see
 * `data/site.ts`) via Resend.
 *
 * Requires `RESEND_API_KEY` as an environment variable — get one free at
 * resend.com, add it in Vercel under Project Settings → Environment
 * Variables (and in `.env.local` for local dev). Without it this route
 * returns a clear 500 rather than failing silently.
 *
 * Sends from Resend's shared `onboarding@resend.dev` address, which works
 * immediately with no setup. Once `contact.email`'s domain is verified in
 * Resend, switch `from` below to something like `Velhoura <hello@velhoura.com>`
 * for a branded sender.
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "El envío de correo no está configurado todavía." },
      { status: 500 },
    );
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const projectType =
    typeof body?.projectType === "string" ? body.projectType.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Faltan campos obligatorios o el email no es válido." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from: "Velhoura <onboarding@resend.dev>",
    to: contact.email,
    replyTo: email,
    subject: `Nuevo mensaje — ${name}${projectType ? ` (${projectType})` : ""}`,
    text: [
      `Nombre: ${name}`,
      `Email: ${email}`,
      projectType && `Tipo de proyecto: ${projectType}`,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje. Inténtalo de nuevo." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
