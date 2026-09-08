// app/page.tsx
// Página principal (Home). Solo compone secciones: no contiene lógica propia.
// Mantener page.tsx "tonto" (sin estado ni fetch directo) facilita testear
// cada sección de forma aislada y reordenar el layout sin riesgo.

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Categories from "@/components/Categories";
import ProductCarousel from "@/components/ProductCarousel";
import Offers from "@/components/Offers";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Categories />
        <ProductCarousel />
        <Offers />
        <Testimonials />
      </main>

      <Footer />
    </>
  );
}
