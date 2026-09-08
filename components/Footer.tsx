// components/Footer.tsx
// Pie de página. Server Component: enlaces e información estática de contacto.

import Link from "next/link";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

const QUICK_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Produtos", href: "#productos" },
  { label: "Ofertas", href: "#ofertas" },
  { label: "Contato", href: "#contacto" },
];

const HELP_LINKS = [
  { label: "Perguntas frequentes", href: "#" },
  { label: "Envios e entregas", href: "#" },
  { label: "Devoluções", href: "#" },
  { label: "Térmos e condições", href: "#" },
];

const SOCIAL_LINKS = [
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Twitter", href: "#", icon: Twitter },
];

export default function Footer() {
  return (
    <footer
      id="contacto"
      className="border-t border-navy-100 bg-navy-900 text-white/70"
    >
      <div className="mx-auto grid max-w-[90rem] grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        {/* Marca + contacto */}
        <div>
          <Link
            href="#inicio"
            className="font-display text-xl font-bold text-white"
          >
            KE<span className="text-amber-400">.</span>Store
          </Link>
          <p className="mt-3 text-sm">
            Tu plataforma de compras online: productos verificados, precios
            claros y envíos a todo el país.
          </p>

          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={15} className="shrink-0 text-amber-400" />
              <a href="mailto:hola@kestore.com" className="hover:text-white">
                hola@kestore.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone size={15} className="shrink-0 text-amber-400" />
              <a href="tel:+541100000000" className="hover:text-white">
                +54 11 0000-0000
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={15} className="shrink-0 text-amber-400" />
              Av. Siempre Viva 742, Buenos Aires
            </li>
          </ul>
        </div>

        {/* Links rápidos */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Navegación
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Ayuda */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Ayuda
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            {HELP_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-white">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Redes sociales */}
        <div>
          <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white">
            Seguinos
          </h3>
          <div className="mt-4 flex gap-3">
            {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition-colors hover:border-amber-400 hover:text-amber-400"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/40 sm:px-6 lg:px-8">
        © {new Date().getFullYear()} KE Store. Todos los derechos reservados.
      </div>
    </footer>
  );
}
