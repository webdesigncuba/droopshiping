"use client";

// components/CartDrawer.tsx
// Painel lateral do carrinho ("drawer"). É montado uma única vez no layout
// raiz e exibido/ocultado conforme o estado global (isOpen do CartContext),
// assim qualquer componente (ícone do header, "Adicionar ao carrinho") pode
// abri-lo sem precisar passar props manualmente por toda a árvore.

import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export default function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, setQuantity, removeItem } =
    useCart();

  return (
    <>
      {/* Fundo escuro: clicável para fechar. aria-hidden porque é puramente decorativo/funcional */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        className={`fixed inset-0 z-[60] bg-navy-900/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Painel deslizante */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrinho de compras"
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cabeçalho do painel */}
        <div className="flex items-center justify-between border-b border-navy-100 px-5 py-4">
          <h2 className="flex items-center gap-2 font-display text-lg font-bold text-navy-900">
            <ShoppingBag size={19} />
            Seu carrinho
          </h2>
          <button
            type="button"
            onClick={closeCart}
            aria-label="Fechar carrinho"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-navy-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Corpo: lista de produtos ou estado vazio */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
            <ShoppingBag size={32} className="text-navy-900/20" />
            <p className="font-display text-sm font-semibold text-navy-900">
              Seu carrinho está vazio
            </p>
            <p className="text-sm text-navy-900/50">
              Adicione produtos para vê-los aqui
            </p>
          </div>
        ) : (
          <ul className="flex-1 divide-y divide-navy-100 overflow-y-auto px-5">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3 py-4">
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-navy-50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-1">
                  <p className="line-clamp-2 text-sm font-medium text-navy-900">
                    {item.name}
                  </p>
                  <p className="font-mono text-sm font-bold text-navy-900">
                    {currencyFormatter.format(item.price)}
                  </p>

                  <div className="mt-1 flex items-center justify-between">
                    {/* Stepper de quantidade */}
                    <div className="flex items-center gap-2 rounded-full border border-navy-100 px-1">
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(item.id, item.quantity - 1)
                        }
                        aria-label={`Remover uma unidade de ${item.name}`}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-navy-50"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="w-4 text-center font-mono text-xs font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setQuantity(item.id, item.quantity + 1)
                        }
                        aria-label={`Adicionar uma unidade de ${item.name}`}
                        className="flex h-6 w-6 items-center justify-center rounded-full text-navy-900 transition-colors hover:bg-navy-50"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remover ${item.name} do carrinho`}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-navy-900/40 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Rodapé: subtotal + ação de checkout, só se houver produtos */}
        {items.length > 0 && (
          <div className="border-t border-navy-100 px-5 py-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-navy-900/60">Subtotal</span>
              <span className="font-mono text-lg font-bold text-navy-900">
                {currencyFormatter.format(subtotal)}
              </span>
            </div>
            <p className="mb-3 text-xs text-navy-900/50">
              Frete e impostos serão calculados no próximo passo.
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full rounded-full bg-amber-400 py-3 text-center text-sm font-semibold text-navy-900 transition-colors hover:bg-amber-500"
            >
              Finalizar compra
            </Link>
          </div>
        )}
      </aside>
    </>
  );
}
