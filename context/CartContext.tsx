"use client";

// context/CartContext.tsx
// Estado global del carrito: items, cantidades, subtotal y si el panel
// lateral está abierto o cerrado. Se usa Context + useReducer en vez de
// una librería externa porque el alcance (agregar, ver, editar cantidad)
// no lo justifica. Si sumara checkout real o persistencia, migraría a
// Zustand o guardaría en localStorage.

import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  ReactNode,
} from "react";
import { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; product: Product }
  | { type: "REMOVE_ITEM"; productId: string }
  | { type: "SET_QUANTITY"; productId: string; quantity: number }
  | { type: "OPEN_CART" }
  | { type: "CLOSE_CART" }
  | { type: "TOGGLE_CART" };

interface CartContextValue {
  items: CartItem[];
  totalCount: number;
  subtotal: number;
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (item) => item.id === action.product.id
      );
      const items = existing
        ? // Si el producto ya está en el carrito, solo incrementamos la cantidad
          state.items.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { ...action.product, quantity: 1 }];

      // Agregar un producto abre el panel automáticamente: le confirma
      // al usuario que la acción tuvo efecto, sin necesitar un toast aparte.
      return { items, isOpen: true };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.productId),
      };

    case "SET_QUANTITY": {
      // Cantidad 0 o menor equivale a eliminar el producto del carrito
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.productId),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.productId
            ? { ...item, quantity: action.quantity }
            : item
        ),
      };
    }

    case "OPEN_CART":
      return { ...state, isOpen: true };
    case "CLOSE_CART":
      return { ...state, isOpen: false };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    isOpen: false,
  });

  // useMemo evita recalcular estos derivados en cada render si el estado no cambió
  const totalCount = useMemo(
    () => state.items.reduce((sum, item) => sum + item.quantity, 0),
    [state.items]
  );

  const subtotal = useMemo(
    () =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [state.items]
  );

  const value: CartContextValue = {
    items: state.items,
    totalCount,
    subtotal,
    isOpen: state.isOpen,
    addItem: (product) => dispatch({ type: "ADD_ITEM", product }),
    removeItem: (productId) => dispatch({ type: "REMOVE_ITEM", productId }),
    setQuantity: (productId, quantity) =>
      dispatch({ type: "SET_QUANTITY", productId, quantity }),
    openCart: () => dispatch({ type: "OPEN_CART" }),
    closeCart: () => dispatch({ type: "CLOSE_CART" }),
    toggleCart: () => dispatch({ type: "TOGGLE_CART" }),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Hook de acceso: centraliza el chequeo de "provider ausente" para dar
// un error claro en desarrollo en vez de un undefined silencioso.
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un <CartProvider>");
  }
  return context;
}
