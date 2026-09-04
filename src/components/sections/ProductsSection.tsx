import { ProductCard } from "@/components/ui/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { products } from "@/data/products";

/**
 * The core section. Renders whatever `products` contains — the grid is
 * intentionally uniform so going from three products to ten needs no redesign.
 */
export function ProductsSection() {
  return (
    <section id="products" className="band border-t border-line bg-paper-off">
      <div className="shell">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            label="02 — Products"
            lines={["Built by Velhoura."]}
            subtitle="Productos digitales que estamos construyendo."
          />

          <Reveal delay={200} y={12}>
            <p className="t-label md:text-right">
              {String(products.length).padStart(2, "0")} en curso
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 sm:gap-6 md:mt-20 lg:grid-cols-2">
          {products.map((product, i) => (
            <Reveal key={product.slug} delay={i * 90} y={28}>
              <ProductCard product={product} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
