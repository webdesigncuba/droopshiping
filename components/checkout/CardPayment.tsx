"use client";

// components/checkout/CardPayment.tsx
// Formulário de pagamento com cartão de crédito ou débito. Formata número e
// vencimento conforme o usuário digita, valida os campos mínimos
// e simula o envio para uma operadora de pagamento.

import { FormEvent, useState } from "react";
import { CreditCard, Lock } from "lucide-react";

interface CardPaymentProps {
  amountLabel: string;
  onConfirmed: () => void;
}

type CardType = "credito" | "debito";

// Insere um espaço a cada 4 dígitos: 1234 5678 9012 3456
function formatCardNumber(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(.{4})/g, "$1 ").trim();
}

// Insere a barra de vencimento: MM/AA
function formatExpiry(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
}

export default function CardPayment({
  amountLabel,
  onConfirmed,
}: CardPaymentProps) {
  const [cardType, setCardType] = useState<CardType>("credito");
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [installments, setInstallments] = useState("1");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const isValid =
    number.replace(/\s/g, "").length >= 13 &&
    name.trim().length > 2 &&
    /^\d{2}\/\d{2}$/.test(expiry) &&
    cvv.length >= 3;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!isValid) {
      setError("Revise os dados do cartão antes de continuar.");
      return;
    }
    setError("");
    setSubmitting(true);
    // Simula a validação contra uma operadora de pagamento real.
    setTimeout(() => {
      setSubmitting(false);
      onConfirmed();
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-2xl border border-navy-100 bg-white p-6"
    >
      <div className="text-center">
        <p className="text-sm text-navy-900/60">Total a pagar</p>
        <p className="font-mono text-2xl font-bold text-navy-900">
          {amountLabel}
        </p>
      </div>

      {/* Seletor crédito / débito */}
      <div className="flex rounded-full border border-navy-100 p-1">
        {(["credito", "debito"] as CardType[]).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setCardType(type)}
            className={`flex-1 rounded-full py-2 text-sm font-medium capitalize transition-colors ${
              cardType === type
                ? "bg-navy-900 text-white"
                : "text-navy-900/60 hover:text-navy-900"
            }`}
          >
            {type === "credito" ? "Crédito" : "Débito"}
          </button>
        ))}
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-navy-900/60">
          Número do cartão
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-navy-100 px-3 py-2.5">
          <CreditCard size={16} className="text-navy-900/40" />
          <input
            inputMode="numeric"
            placeholder="1234 5678 9012 3456"
            value={number}
            onChange={(e) => setNumber(formatCardNumber(e.target.value))}
            className="w-full font-mono text-sm text-navy-900 outline-none placeholder:text-navy-900/30"
          />
        </div>
      </div>

      <div>
        <label className="mb-1 block text-xs font-medium text-navy-900/60">
          Nome no cartão
        </label>
        <input
          placeholder="Como aparece no cartão"
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
          className="w-full rounded-xl border border-navy-100 px-3 py-2.5 text-sm text-navy-900 outline-none placeholder:text-navy-900/30"
        />
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <label className="mb-1 block text-xs font-medium text-navy-900/60">
            Vencimento
          </label>
          <input
            inputMode="numeric"
            placeholder="MM/AA"
            value={expiry}
            onChange={(e) => setExpiry(formatExpiry(e.target.value))}
            className="w-full rounded-xl border border-navy-100 px-3 py-2.5 font-mono text-sm text-navy-900 outline-none placeholder:text-navy-900/30"
          />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-xs font-medium text-navy-900/60">
            CVV
          </label>
          <div className="flex items-center gap-2 rounded-xl border border-navy-100 px-3 py-2.5">
            <Lock size={14} className="text-navy-900/40" />
            <input
              inputMode="numeric"
              placeholder="123"
              value={cvv}
              onChange={(e) =>
                setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))
              }
              className="w-full font-mono text-sm text-navy-900 outline-none placeholder:text-navy-900/30"
            />
          </div>
        </div>
      </div>

      {cardType === "credito" && (
        <div>
          <label className="mb-1 block text-xs font-medium text-navy-900/60">
            Parcelas
          </label>
          <select
            value={installments}
            onChange={(e) => setInstallments(e.target.value)}
            className="w-full rounded-xl border border-navy-100 px-3 py-2.5 text-sm text-navy-900 outline-none"
          >
            <option value="1">1 parcela sem juros</option>
            <option value="3">3 parcelas</option>
            <option value="6">6 parcelas</option>
            <option value="12">12 parcelas</option>
          </select>
        </div>
      )}

      {error && <p className="text-xs font-medium text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-amber-400 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {submitting ? "Processando pagamento..." : "Confirmar pagamento"}
      </button>

      <p className="flex items-center justify-center gap-1 text-center text-xs text-navy-900/40">
        <Lock size={11} />
        Dados de demonstração, não são processados pagamentos reais.
      </p>
    </form>
  );
}

