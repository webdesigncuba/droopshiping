// types/index.ts
// Tipos centralizados del dominio "e-commerce".
// Mantenerlos en un solo lugar evita duplicar formas de datos entre componentes.

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number; // Si existe, el producto tiene descuento
  image: string;
  category: string;
  rating: number; // 0 a 5
}

export interface Category {
  id: string;
  name: string;
  image: string;
  productCount: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface CartItem extends Product {
  quantity: number;
}
