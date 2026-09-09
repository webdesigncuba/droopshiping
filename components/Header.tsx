"use client";

// components/Header.tsx
// Encabezado fijo del sitio. Es "use client" porque el buscador y el ícono
// del carrito son interactivos (estado local + contexto global).

import { useState } from "react";
import Link from "next/link";
import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Produtos", href: "#produtos" },
  { label: "Ofertas", href: "#ofertas" },
  { label: "Contato", href: "#contacto" },
];

export default function Header() {
  const { totalCount, toggleCart } = useCart();
  const [query, setQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    // En un proyecto real esto navegaría a /buscar?q=... o dispararía un fetch.
    // Se deja como placeholder para no simular una integración inexistente.
    console.log("Buscar:", query);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-navy-100 bg-navy-900 backdrop-blur">
      <div className="mx-auto flex max-w-[90rem] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="#inicio"
          className="font-display text-2xl font-bold tracking-tight text-navy-900"
        >
          <Image src="/image/logo.jpeg" alt="Logo" height="200" width="200"></Image>
        </Link>

        {/* Navegación desktop */}
        <nav className="ml-6 hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white transition-colors hover:text-teal-600"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Buscador (ocupa el espacio disponible) */}
        <form
          onSubmit={handleSearchSubmit}
          className="ml-auto hidden flex-1 items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2 sm:flex sm:max-w-xs lg:max-w-md"
          role="search"
        >
          <Search size={18} className="shrink-0 text-navy-900/40" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar productos..."
            aria-label="Buscar productos"
            className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-navy-900/40"
          />
        </form>

        {/* Carrito */}
        <div className="ml-auto flex items-center gap-2 sm:ml-4">
          <button
            type="button"
            onClick={toggleCart}
            aria-label={`Carrito de compras, ${totalCount} productos`}
            className="relative ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-navy-100 bg-white transition-colors hover:border-teal-500 sm:ml-0"
          >
            <ShoppingCart size={19} className="text-navy-900" />
            {totalCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 font-mono text-[11px] font-bold text-navy-900">
                {totalCount}
              </span>
            )}
          </button>

          {/* Botón de menú móvil */}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-navy-100 bg-white md:hidden"
            aria-label="Abrir menú de navegación"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div className="border-t border-navy-100 bg-cream px-4 py-4 md:hidden">
          <form
            onSubmit={handleSearchSubmit}
            className="mb-4 flex items-center gap-2 rounded-full border border-navy-100 bg-white px-4 py-2"
            role="search"
          >
            <Search size={18} className="text-navy-900/40" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar productos..."
              aria-label="Buscar productos"
              className="w-full bg-transparent text-sm outline-none placeholder:text-navy-900/40"
            />
          </form>
          <nav className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-navy-900/80 hover:bg-navy-50"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
