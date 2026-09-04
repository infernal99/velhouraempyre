import { Hero } from "@/components/sections/Hero";
import { IntroSection } from "@/components/sections/IntroSection";
import { ProductsSection } from "@/components/sections/ProductsSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { VisionSection } from "@/components/sections/VisionSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import { DifferentiationSection } from "@/components/sections/DifferentiationSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";

/**
 * The narrative order matters: who we are → what we build → how we build it →
 * the pause → what we also do for you → proof → why us → who we are, literally
 * → how to reach us.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <IntroSection />
      <ProductsSection />
      <ProcessSection />
      <VisionSection />
      <ServicesSection />
      <ShowcaseSection />
      <DifferentiationSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
