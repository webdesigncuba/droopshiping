// lib/data.ts
// Datos de ejemplo. En producción esto vendría de una API / CMS / base de datos.
// Se mantiene separado de los componentes para que sea trivial reemplazarlo
// por un fetch real sin tocar la UI.

import { Category, Product, Testimonial } from "@/types";

export const categories: Category[] = [
  {
    id: "electronica",
    name: "Electrónica",
    image:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=600&auto=format&fit=crop",
    productCount: 128,
  },
  {
    id: "moda",
    name: "Moda",
    image:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=600&auto=format&fit=crop",
    productCount: 342,
  },
  {
    id: "hogar",
    name: "Casa",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop",
    productCount: 96,
  },
  {
    id: "deportes",
    name: "Esportes",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=600&auto=format&fit=crop",
    productCount: 74,
  },
  {
    id: "belleza",
    name: "Beleza",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=600&auto=format&fit=crop",
    productCount: 58,
  },
  {
    id: "juguetes",
    name: "Brinquedos",
    image:
      "https://images.unsplash.com/photo-1558060370-d644479cb6f7?q=80&w=600&auto=format&fit=crop",
    productCount: 41,
  },
];

export const popularProducts: Product[] = [
  {
    id: "p1",
    name: "Fones de Ouvido Sem Fio Pulse X",
    price: 129,
    oldPrice: 159,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
    category: "Electrónica",
    rating: 4.7,
  },
  {
    id: "p2",
    name: "Smartwatch Orbit 2",
    price: 249,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop",
    category: "Electrónica",
    rating: 4.5,
  },
  {
    id: "p3",
    name: "Tênis Urbanos Nova",
    price: 189,
    oldPrice: 229,
    image:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=800&auto=format&fit=crop",
    category: "Moda",
    rating: 4.8,
  },
  {
    id: "p4",
    name: "Mochila de Viagem Trek 40L",
    price: 159,
    image:
      "https://images.unsplash.com/photo-1547949003-9792a18a2601?q=80&w=800&auto=format&fit=crop",
    category: "Deportes",
    rating: 4.6,
  },
  {
    id: "p5",
    name: "Cafeteira Automática Brew Pro",
    price: 349,
    oldPrice: 399,
    image:
      "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?q=80&w=800&auto=format&fit=crop",
    category: "Hogar",
    rating: 4.4,
  },
  {
    id: "p6",
    name: "Luminária de Mesa LED Flux",
    price: 79,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop",
    category: "Hogar",
    rating: 4.3,
  },
];

export const offerProducts: Product[] = [
  {
    id: "o1",
    name: "Caixa de Som Bluetooth BoomBox Mini",
    price: 89,
    oldPrice: 149,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=800&auto=format&fit=crop",
    category: "Electrónica",
    rating: 4.5,
  },
  {
    id: "o2",
    name: "Jaqueta Impermeável Storm",
    price: 119,
    oldPrice: 219,
    image:
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=800&auto=format&fit=crop",
    category: "Moda",
    rating: 4.6,
  },
  {
    id: "o3",
    name: "Conjunto de Frigideiras Antiaderentes",
    price: 999,
    oldPrice: 1799,
    image:
      "https://images.unsplash.com/photo-1584990347449-a5d9f800a783?q=80&w=800&auto=format&fit=crop",
    category: "Hogar",
    rating: 4.2,
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Marina Torres",
    role: "Novo cliente",
    avatar:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop",
    quote:
      "A encomenda chegou antes do esperado e o produto era exatamente como aparecia nas fotos. Esta se tornou a minha loja de preferência.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Diego Fernández",
    role: "Cliente frequente",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop",
    quote:
      "O atendimento ao cliente respondeu à minha pergunta pelo chat em questão de minutos. Dá para perceber que existe uma equipe de verdade por trás disso.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Laura Gómez",
    role: "Cliente frequente",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
    quote:
      "Os preços na seção de ofertas são reais — não inflacionados para criar a ilusão de um desconto. Isso me conquistou como cliente.",
    rating: 4,
  },
];
