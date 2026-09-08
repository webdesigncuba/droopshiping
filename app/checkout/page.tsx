"use client";

// app/checkout/page.tsx
// Página de checkout em 3 etapas: 1) dados de entrega, 2) forma de
// pagamento (Pix ou Cartão), 3) confirmação. Pega os produtos do
// carrinho a partir do CartContext e mantém os dados de entrega em
// memória para exibi-los no resumo e na tela final.

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Check, CreditCard, MapPin, QrCode } from "lucide-react";
import { useCart } from "@/context/CartContext";
import DeliveryForm, { DeliveryData } from "@/components/checkout/DeliveryForm";
import PixPayment from "@/components/checkout/PixPayment";
import CardPayment from "@/components/checkout/CardPayment";

type Step = "entrega" | "pagamento" | "confirmado";
type PaymentMethod = "pix" | "cartao" | null;

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const STEP_LABELS: { key: Step; label: string }[] = [
  { key: "entrega", label: "Entrega" },
  { key: "pagamento", label: "Pagamento" },
  { key: "confirmado", label: "Concluído" },
];

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [step, setStep] = useState<Step>("entrega");
  const [method, setMethod] = useState<PaymentMethod>(null);
  const [delivery, setDelivery] = useState<DeliveryData | null>(null);

  const stepIndex = STEP_LABELS.findIndex((s) => s.key === step);

  const handleDeliverySubmit = (data: DeliveryData) => {
    setDelivery(data);
    setStep("pagamento");
  };

  const handlePaymentConfirmed = () => {
    setStep("confirmado");
  };

  // Tela de sucesso, com recapitulação de para onde o pedido é enviado
  if (step === "confirmado" && delivery) {
    return (
      <main className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center gap-4 px-6 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <Check size={28} className="text-green-600" />
        </div>
        <h1 className="font-display text-2xl font-bold text-navy-900">
          Pagamento confirmado!
        </h1>
        <p className="text-sm text-navy-900/60">
          Enviamos um comprovante para {delivery.email}.
        </p>

        <div className="mt-2 w-full rounded-2xl border border-navy-100 p-4 text-left">
          <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-navy-900/60">
            <MapPin size={12} />
            Entregar em
          </p>
          <p className="text-sm text-navy-900">
            {delivery.fullName}
            <br />
            {delivery.street} {delivery.number}
            {delivery.apartment && `, ${delivery.apartment}`}
            <br />
            {delivery.city}, {delivery.province} ({delivery.postalCode})
          </p>
        </div>

        <Link
          href="/"
          className="mt-4 rounded-full bg-amber-400 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-amber-500"
        >
          Voltar para a loja
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-8 px-6 py-10 lg:flex-row lg:py-16">
      {/* Coluna principal: etapas do checkout */}
      <section className="flex-1">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-sm text-navy-900/60 hover:text-navy-900"
        >
          <ArrowLeft size={16} />
          Voltar para a loja
        </Link>

        {/* Indicador de etapas */}
        <div className="mb-6 flex items-center gap-2">
          {STEP_LABELS.map((s, i) => (
            <div key={s.key} className="flex flex-1 items-center gap-2">
              <div
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                  i <= stepIndex
                    ? "bg-navy-900 text-white"
                    : "bg-navy-50 text-navy-900/40"
                }`}
              >
                {i + 1}
              </div>
              <span
                className={`text-xs font-medium ${
                  i <= stepIndex ? "text-navy-900" : "text-navy-900/40"
                }`}
              >
                {s.label}
              </span>
              {i < STEP_LABELS.length - 1 && (
                <div
                  className={`h-px flex-1 ${
                    i < stepIndex ? "bg-navy-900" : "bg-navy-100"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Etapa 1: dados de entrega */}
        {step === "entrega" && (
          <>
            <h1 className="mb-1 font-display text-2xl font-bold text-navy-900">
              Dados de entrega
            </h1>
            <p className="mb-6 text-sm text-navy-900/60">
              Para onde enviamos seu pedido?
            </p>
            <DeliveryForm
              initialData={delivery ?? undefined}
              onSubmit={handleDeliverySubmit}
            />
          </>
        )}

        {/* Etapa 2: forma de pagamento */}
        {step === "pagamento" && (
          <>
            <button
              type="button"
              onClick={() => setStep("entrega")}
              className="mb-4 text-xs font-medium text-navy-900/50 hover:text-navy-900"
            >
              ← Editar dados de entrega
            </button>
            <h1 className="mb-1 font-display text-2xl font-bold text-navy-900">
              Forma de pagamento
            </h1>
            <p className="mb-6 text-sm text-navy-900/60">
              Escolha como você quer pagar
            </p>

            <div className="mb-6 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setMethod("pix")}
                aria-pressed={method === "pix"}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-5 transition-colors ${
                  method === "pix"
                    ? "border-navy-900 bg-navy-50"
                    : "border-navy-100 hover:border-navy-900/30"
                }`}
              >
                <QrCode size={22} className="text-navy-900" />
                <span className="text-sm font-semibold text-navy-900">
                  Pix
                </span>
                <span className="text-xs text-navy-900/50">Pague com QR Code</span>
              </button>

              <button
                type="button"
                onClick={() => setMethod("cartao")}
                aria-pressed={method === "cartao"}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-5 transition-colors ${
                  method === "cartao"
                    ? "border-navy-900 bg-navy-50"
                    : "border-navy-100 hover:border-navy-900/30"
                }`}
              >
                <CreditCard size={22} className="text-navy-900" />
                <span className="text-sm font-semibold text-navy-900">
                  Cartão
                </span>
                <span className="text-xs text-navy-900/50">
                  Crédito ou débito
                </span>
              </button>
            </div>

            {method === "pix" && (
              <PixPayment
                amountLabel={currencyFormatter.format(subtotal)}
                onConfirmed={handlePaymentConfirmed}
              />
            )}
            {method === "cartao" && (
              <CardPayment
                amountLabel={currencyFormatter.format(subtotal)}
                onConfirmed={handlePaymentConfirmed}
              />
            )}
          </>
        )}
      </section>

      {/* Coluna lateral: resumo do pedido (sempre visível) */}
      <aside className="w-full shrink-0 lg:w-80">
        <div className="rounded-2xl border border-navy-100 p-5">
          <h2 className="mb-4 font-display text-sm font-bold text-navy-900">
            Resumo do pedido
          </h2>
          <ul className="mb-4 flex flex-col gap-3">
            {items.map((item) => (
              <li key={item.id} className="flex gap-3">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-navy-50">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <p className="line-clamp-1 text-xs font-medium text-navy-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-navy-900/50">x{item.quantity}</p>
                </div>
                <p className="self-center font-mono text-xs font-semibold text-navy-900">
                  {currencyFormatter.format(item.price * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between border-t border-navy-100 pt-4">
            <span className="text-sm text-navy-900/60">Total</span>
            <span className="font-mono text-lg font-bold text-navy-900">
              {currencyFormatter.format(subtotal)}
            </span>
          </div>

          {/* Depois que o endereço é preenchido, ele também aparece aqui */}
          {delivery && (
            <div className="mt-4 border-t border-navy-100 pt-4">
              <p className="mb-1 flex items-center gap-1 text-xs font-semibold text-navy-900/60">
                <MapPin size={12} />
                Entrega
              </p>
              <p className="text-xs text-navy-900/70">
                {delivery.street} {delivery.number}
                {delivery.apartment && `, ${delivery.apartment}`},{" "}
                {delivery.city}
              </p>
            </div>
          )}
        </div>
      </aside>
    </main>
  );
}
