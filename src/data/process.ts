/** The five steps from idea to product. Rendered as a scroll-linked track. */

export type ProcessStep = {
  index: string;
  title: string;
  body: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Idea",
    body: "Encontramos una oportunidad o tenemos una idea.",
  },
  {
    index: "02",
    title: "Design",
    body: "Diseñamos la experiencia y la identidad del producto.",
  },
  {
    index: "03",
    title: "Build",
    body: "Desarrollamos la aplicación, web o plataforma.",
  },
  {
    index: "04",
    title: "Launch",
    body: "Lanzamos el producto al público.",
  },
  {
    index: "05",
    title: "Grow",
    body: "Analizamos, mejoramos y hacemos crecer el producto.",
  },
];
