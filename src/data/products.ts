/**
 * Velhoura's own products.
 *
 * This array is the single source of truth for the Products section and for
 * the /products/[slug] pages. Adding a product = appending an entry here.
 * Nothing in the layout is hardcoded to a fixed number of products.
 *
 * ⚠ The three entries below are STRUCTURED PLACEHOLDERS. No real product
 * information has been provided yet — replace name/summary/description/links
 * with the real projects. Keep the shape intact.
 */

export type ProductCategory = "APP" | "SAAS" | "PLATFORM" | "WEB";
export type ProductStatus = "BUILDING" | "LIVE" | "COMING SOON";

export type Product = {
  /** URL segment for /products/[slug] */
  slug: string;
  /** Display name */
  name: string;
  /** One line, shown on the card */
  summary: string;
  /** Two or three sentences, shown on the product page */
  description: string;
  category: ProductCategory;
  status: ProductStatus;
  /** Year the build started */
  year: string;
  /** Short capability list for the product page */
  highlights: string[];
  /** External product site, once it exists */
  href?: string;
  /**
   * Visual identity for the card's generated artwork. Any CSS color.
   * Kept subtle — the cards are paper, not posters.
   */
  accent: string;
};

export const products: Product[] = [
  {
    slug: "product-01",
    name: "Product 01", // PLACEHOLDER
    summary: "Descripción breve del producto pendiente de definir.",
    description:
      "Ficha pendiente. Sustituye este texto por la descripción real del producto: qué problema resuelve, para quién y en qué punto de su desarrollo se encuentra.",
    category: "APP",
    status: "BUILDING",
    year: "2026",
    highlights: [
      "Placeholder — capacidad principal",
      "Placeholder — capacidad secundaria",
      "Placeholder — capacidad terciaria",
    ],
    accent: "#0b46ff",
  },
  {
    slug: "product-02",
    name: "Product 02", // PLACEHOLDER
    summary: "Descripción breve del producto pendiente de definir.",
    description:
      "Ficha pendiente. Sustituye este texto por la descripción real del producto: qué problema resuelve, para quién y en qué punto de su desarrollo se encuentra.",
    category: "SAAS",
    status: "BUILDING",
    year: "2026",
    highlights: [
      "Placeholder — capacidad principal",
      "Placeholder — capacidad secundaria",
      "Placeholder — capacidad terciaria",
    ],
    accent: "#12121a",
  },
  {
    slug: "product-03",
    name: "Product 03", // PLACEHOLDER
    summary: "Descripción breve del producto pendiente de definir.",
    description:
      "Ficha pendiente. Sustituye este texto por la descripción real del producto: qué problema resuelve, para quién y en qué punto de su desarrollo se encuentra.",
    category: "PLATFORM",
    status: "COMING SOON",
    year: "2026",
    highlights: [
      "Placeholder — capacidad principal",
      "Placeholder — capacidad secundaria",
      "Placeholder — capacidad terciaria",
    ],
    accent: "#5b4bff",
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
