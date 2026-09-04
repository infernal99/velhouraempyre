import Link from "next/link";
import { contact, legalLinks, nav } from "@/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-paper-off">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="font-mono text-sm font-semibold tracking-[0.24em] text-ink uppercase">
              Velhoura
            </p>
            <p className="t-body mt-4 max-w-[34ch] text-sm">
              Product studio. Construimos productos digitales propios — y webs
              para quien quiere construir el suyo.
            </p>
          </div>

          <nav className="md:col-span-3" aria-label="Secciones">
            <p className="t-label">Navegación</p>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-2">
            <p className="t-label">Social</p>
            <ul className="mt-5 space-y-3">
              {contact.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <p className="t-label">Contacto</p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-5 block text-sm text-ink-soft transition-colors duration-300 hover:text-ink"
            >
              {contact.email}
            </a>
          </div>
        </div>

        <div className="rule mt-14" />

        <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-ink-mute">
            © {year} Velhoura. All rights reserved.
          </p>

          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-xs text-ink-mute transition-colors duration-300 hover:text-ink"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
