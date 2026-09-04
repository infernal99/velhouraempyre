/**
 * The two founders.
 * ⚠ PLACEHOLDER identities — no names or roles have been provided yet.
 * Replace `name`, `role` and `bio`; the layout takes any two entries.
 */

export type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Two-letter monogram used in place of a photo until one exists. */
  monogram: string;
};

export const team: Member[] = [
  {
    id: "founder-01",
    name: "Founder 01", // PLACEHOLDER
    role: "Product & Design", // PLACEHOLDER
    bio: "Perfil pendiente. Sustituye este texto por una descripción breve: enfoque, experiencia y qué aporta a cada producto de Velhoura.",
    monogram: "V",
  },
  {
    id: "founder-02",
    name: "Founder 02", // PLACEHOLDER
    role: "Engineering", // PLACEHOLDER
    bio: "Perfil pendiente. Sustituye este texto por una descripción breve: enfoque, experiencia y qué aporta a cada producto de Velhoura.",
    monogram: "H",
  },
];
