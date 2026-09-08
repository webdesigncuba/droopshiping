import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";
import "./globals.css";

// app/layout.tsx
// Layout raíz de Next.js (App Router). Aquí se cargan las 3 fuentes de la marca:
// - Space Grotesk: titulares (personalidad geométrica, moderna)
// - Inter: cuerpo de texto (alta legibilidad en pantalla)
// - JetBrains Mono: precios y badges (da a los números un aire de "etiqueta de precio")
// Nota: las variables se llaman "-src" a propósito. En Tailwind v4 los nombres
// --font-display / --font-body / --font-mono ya están tomados por el bloque
// @theme de globals.css (ahí es donde se generan las clases font-display, etc).
// Estas variables "-src" son la fuente física que ese @theme referencia.
const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-src",
  weight: ["500", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body-src",
  weight: ["400", "500", "600"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-src",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "NEXTDROOP",
  description:
    "Plataforma de venta online con electrónica, moda, hogar, deportes y más. Envíos rápidos y ofertas reales.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} font-body antialiased`}
      >
        {/* CartProvider envuelve toda la app para que el Header y las tarjetas
            de producto compartan el mismo estado de carrito.
            CartDrawer se monta una única vez acá: se muestra/oculta según
            el estado global, sin importar desde qué sección se abrió. */}
        <CartProvider>
          {children}
          <CartDrawer />
        </CartProvider>
      </body>
    </html>
  );
}
