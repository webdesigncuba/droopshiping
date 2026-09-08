"use client";

// components/ProductCard.tsx
// Cartão de produto reutilizável. É "use client" porque o botão
// "Adicionar ao carrinho" dispara uma ação sobre o contexto global.

import Image from "next/image";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "@/types";
import { useCart } from "@/context/CartContext";

// Formatador de moeda centralizado: evita repetir Intl.NumberFormat
// em cada componente e garante o mesmo formato em todo o site.
const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

interface ProductCardProps {
  product: Product;
  /** Largura fixa opcional, usada pelo carrossel para que os cartões não colapsem */
  fixedWidth?: boolean;
}

export default function ProductCard({
  product,
  fixedWidth = false,
}: ProductCardProps) {
  const { addItem } = useCart();
  const hasDiscount = Boolean(product.oldPrice);
  const discountPercent = hasDiscount
    ? Math.round(100 - (product.price / product.oldPrice!) * 100)
    : 0;

  return (
    <article
      className={`group flex flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white ${
        fixedWidth ? "w-64 shrink-0 snap-start sm:w-72" : "w-full"
      }`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-navy-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="288px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {hasDiscount && (
          <span className="absolute left-3 top-3 rounded-full bg-amber-400 px-2.5 py-1 font-mono text-xs font-bold text-navy-900">
            -{discountPercent}%
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-teal-600">
          {product.category}
        </p>
        <h3 className="line-clamp-2 font-display text-sm font-semibold text-navy-900">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 text-xs text-navy-900/60">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          {product.rating.toFixed(1)}
        </div>

        {/* Preço em fonte mono: é o elemento "etiqueta de preço" distintivo do site */}
        <div className="mt-1 flex items-baseline gap-2 font-mono">
          <span className="text-lg font-bold text-navy-900">
            {currencyFormatter.format(product.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-navy-900/40 line-through">
              {currencyFormatter.format(product.oldPrice!)}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => addItem(product)}
          className="mt-2 flex items-center justify-center gap-2 rounded-full bg-navy-900 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
        >
          <ShoppingCart size={16} />
          Adicionar ao carrinho
        </button>
      </div>
    </article>
  );
}
