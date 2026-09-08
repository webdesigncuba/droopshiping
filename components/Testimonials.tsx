// components/Testimonials.tsx
// Prueba social. Server Component: contenido estático, sin interactividad.

import Image from "next/image";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section
      aria-label="Testimonios de clientes"
      className="mx-auto max-w-[90rem] px-4 py-16 sm:px-6 lg:px-8"
    >
      <div className="mb-10 text-center">
        <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
          Lo que dicen nuestros clientes
        </h2>
        <p className="mt-1 text-sm text-navy-900/60">
          Opiniones reales de compradores verificados
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial) => (
          <figure
            key={testimonial.id}
            className="flex flex-col gap-4 rounded-2xl border border-navy-100 bg-white p-6"
          >
            <div
              className="flex gap-0.5"
              aria-label={`Calificación: ${testimonial.rating} de 5`}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  className={
                    i < testimonial.rating
                      ? "fill-amber-400 text-amber-400"
                      : "fill-navy-100 text-navy-100"
                  }
                />
              ))}
            </div>

            <blockquote className="flex-1 text-sm leading-relaxed text-navy-900/80">
              “{testimonial.quote}”
            </blockquote>

            <figcaption className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={testimonial.avatar}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-navy-900">
                  {testimonial.name}
                </p>
                <p className="text-xs text-navy-900/50">{testimonial.role}</p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
