"use client";

// components/ProductCarousel.tsx
// Carrossel de produtos populares. É implementado com scroll nativo (CSS scroll-snap)
// em vez de uma biblioteca externa: é mais leve e funciona sem JS para o gesto de toque.
// O JS só é usado para os botões de seta no desktop.

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { popularProducts } from "@/lib/data";

export default function ProductCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: "left" | "right") {
    const container = scrollRef.current;
    if (!container) return;
    const cardWidth = container.firstElementChild?.clientWidth ?? 280;
    container.scrollBy({
      left: direction === "left" ? -cardWidth - 16 : cardWidth + 16,
      behavior: "smooth",
    });
  }

  return (
    <section
      id="produtos"
      aria-label="Produtos populares"
      className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
            Produtos populares
          </h2>
          <p className="mt-1 text-sm text-navy-900/60">
            O que a comunidade mais está comprando nesta semana
          </p>
        </div>

        {/* Controles do carrossel: ocultos no mobile, onde o gesto de toque é natural */}
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard("left")}
            aria-label="Ver produtos anteriores"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 bg-white transition-colors hover:border-teal-500"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard("right")}
            aria-label="Ver mais produtos"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 bg-white transition-colors hover:border-teal-500"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {popularProducts.map((product) => (
          <ProductCard key={product.id} product={product} fixedWidth />
        ))}
      </div>
    </section>
  );
}
