// components/Hero.tsx
// Sección de apertura: la promesa de valor del sitio en una sola vista.
// Es un Server Component (no necesita "use client") porque no tiene interactividad propia.

import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-navy-900"
      aria-label="Presentación principal"
    >
      {/* Textura de fondo sutil: círculo grande difuminado en tono ámbar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-amber-400/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-[90rem] items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        {/* Columna de texto */}
        <div className="relative z-10 text-center md:text-left">
          <span className="inline-flex items-center rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-wide text-amber-400">
            Frete grátis para pedidos acima de R$ 99.90
          </span>

          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Encontre o que você 
            <span className="text-amber-400"> procura</span>, hoje
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base text-white/70 md:mx-0">
            Milhares de produtos de eletrônicos, moda, casa e muito mais — com
            preços transparentes, entrega rápida e devoluções sem complicações.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
            <a
              href="#productos"
              className="group inline-flex items-center gap-2 rounded-full bg-amber-400 px-6 py-3 font-semibold text-navy-900 transition-transform hover:-translate-y-0.5 hover:bg-amber-500"
            >
              Comprar agora
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>
            <a
              href="#ofertas"
              className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver ofertas
            </a>
          </div>
        </div>

        {/* Columna de imagen */}
        <div className="relative z-10 mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl md:max-w-none">
          <Image
            src="https://images.unsplash.com/photo-1607082350899-7e105aa886ae?q=80&w=1200&auto=format&fit=crop"
            alt="Persona abriendo una caja de pedido recién entregada"
            fill
            sizes="(min-width: 768px) 50vw, 90vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
