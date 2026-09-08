// components/Offers.tsx
// Seção de ofertas. O elemento distintivo ("marca visual" do site) é o
// badge tipo "ticket perfurado": duas muescas circulares que simulam o recorte
// de um cupom físico, reforçando a ideia de "desconto" de forma não genérica.

import { Zap } from "lucide-react";
import ProductCard from "./ProductCard";
import { offerProducts } from "@/lib/data";

export default function Offers() {
  return (
    <section
      id="ofertas"
      aria-label="Ofertas especiais"
      className="bg-navy-900 py-16"
    >
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {/* Badge "ticket": fundo âmbar com dois círculos cor navy que
                perfuram as bordas, como o talão de um cupom de desconto */}
            <div className="relative inline-flex items-center gap-2 rounded-full bg-amber-400 px-4 py-1.5">
              <span
                aria-hidden="true"
                className="absolute -left-1.5 h-3 w-3 rounded-full bg-navy-900"
              />
              <Zap size={14} className="fill-navy-900 text-navy-900" />
              <span className="font-mono text-xs font-bold uppercase tracking-wide text-navy-900">
                Tempo limitado
              </span>
              <span
                aria-hidden="true"
                className="absolute -right-1.5 h-3 w-3 rounded-full bg-navy-900"
              />
            </div>

            <h2 className="mt-4 font-display text-2xl font-bold text-white sm:text-3xl">
              Ofertas especiais
            </h2>
            <p className="mt-1 text-sm text-white/60">
              Descontos reais, calculados sobre o preço de lista
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

