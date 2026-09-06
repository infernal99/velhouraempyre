/**
 * The two founders.
 * ⚠ founder-02 is still a PLACEHOLDER — the user said they'll pass those
 * details later. Replace `name`, `role` and `bio` there when they do.
 */

export type Member = {
  id: string;
  name: string;
  role: string;
  bio: string;
  /** Two-letter monogram used in place of a photo until one exists. */
  monogram: string;
  /** Personal site/portfolio, if there is one. */
  href?: string;
};

export const team: Member[] = [
  {
    id: "founder-01",
    name: "Oriol Gallart",
    role: "Full Stack Developer",
    bio: "Desarrollo full stack de principio a fin — frontend y backend, diseño de interfaz y la arquitectura que lo sostiene. Actualmente ampliando formación con un Máster en IA y Big Data.",
    monogram: "OG",
    href: "https://oriolgallart.vercel.app/",
  },
  {
    id: "founder-02",
    name: "Founder 02", // PLACEHOLDER
    role: "Engineering", // PLACEHOLDER
    bio: "Perfil pendiente. Sustituye este texto por una descripción breve: enfoque, experiencia y qué aporta a cada producto de Velhoura.",
    monogram: "H",
  },
];
