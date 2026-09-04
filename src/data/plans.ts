/**
 * Web development plans (second line of business).
 * Edit here — PricingCard renders whatever this array contains.
 */

export type Plan = {
  id: string;
  index: string;
  name: string;
  pitch: string;
  features: string[];
  price: string;
  priceNote?: string;
  cta: string;
  /** Exactly one plan should carry this. */
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "landing",
    index: "PLAN 01",
    name: "Landing",
    pitch:
      "Para profesionales, proyectos y negocios que necesitan una presencia digital sencilla y potente.",
    features: [
      "Diseño personalizado",
      "Responsive",
      "Animaciones",
      "SEO básico",
      "Formulario de contacto",
      "Optimización de velocidad",
    ],
    price: "Desde 499 €",
    priceNote: "Precio orientativo",
    cta: "Quiero mi web",
  },
  {
    id: "business",
    index: "PLAN 02",
    name: "Business",
    pitch: "Para empresas que necesitan una web más completa.",
    features: [
      "Diseño personalizado",
      "Varias páginas",
      "Responsive",
      "Animaciones avanzadas",
      "SEO",
      "Formularios",
      "Integraciones",
      "Panel / gestión de contenido",
    ],
    price: "Desde 999 €",
    priceNote: "Precio orientativo",
    cta: "Quiero mi web",
    featured: true,
  },
  {
    id: "custom",
    index: "PLAN 03",
    name: "Custom",
    pitch: "Para proyectos que necesitan algo completamente personalizado.",
    features: [
      "Aplicaciones web",
      "Plataformas",
      "SaaS",
      "E-commerce",
      "Sistemas personalizados",
      "Integraciones API",
      "Bases de datos",
      "Funcionalidades específicas",
    ],
    price: "Hablemos",
    cta: "Contactar",
  },
];
