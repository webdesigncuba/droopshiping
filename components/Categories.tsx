// components/Categories.tsx
// Grid de categorías destacadas. Server Component: solo renderiza datos estáticos.

import Image from "next/image";
import { categories } from "@/lib/data";

export default function Categories() {
  return (
    <section
      aria-label="Categorías destacadas"
      className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
            Categorias em destaque
          </h2>
          <p className="mt-1 text-sm text-navy-900/60">
            Navegue por categoria e encontre exatamente o que você precisa.
          </p>
        </div>
      </div>

      {/* Grid responsive: 2 columnas en móvil, hasta 6 en desktop */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`#productos`}
            className="group relative overflow-hidden rounded-2xl border border-navy-100 bg-white"
          >
            <div className="relative aspect-square w-full">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(min-width: 1024px) 16vw, 45vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Degradado inferior para que el texto siempre sea legible sobre la foto */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-navy-900/10 to-transparent" />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-3">
              <p className="font-display text-sm font-semibold text-white sm:text-base">
                {category.name}
              </p>
              <p className="font-mono text-[11px] text-white/70">
                {category.productCount} produtos
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
