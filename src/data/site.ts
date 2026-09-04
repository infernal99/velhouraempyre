/**
 * Global site configuration: identity, navigation and contact channels.
 * Contact details are PLACEHOLDERS — replace with Velhoura's real handles.
 */

export const site = {
  name: "Velhoura",
  tagline: "We build what's next.",
  description:
    "Velhoura es un product studio. Creamos nuestras propias aplicaciones, plataformas y webs, desde la primera idea hasta una startup real.",
  url: "https://velhoura.com", // PLACEHOLDER — real domain
} as const;

export const nav = [
  { label: "Products", href: "/#products" },
  { label: "Webs", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
] as const;

/** PLACEHOLDER contact channels — swap for the real ones. */
export const contact = {
  email: "hello@velhoura.com",
  socials: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "GitHub", href: "#" },
  ],
} as const;

export const legalLinks = [
  { label: "Privacy Policy", href: "/legal/privacy" },
  { label: "Cookie Policy", href: "/legal/cookies" },
  { label: "Legal Notice", href: "/legal/notice" },
  { label: "Terms & Conditions", href: "/legal/terms" },
] as const;
