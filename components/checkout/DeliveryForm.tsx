"use client";

// components/checkout/DeliveryForm.tsx
// Formulário com os dados de contato e o endereço de entrega. É exibido
// como o primeiro passo do checkout, antes de escolher o método de
// pagamento. Valida os campos obrigatórios e, ao ser enviado, passa os
// dados para o componente pai via onSubmit.

import { FormEvent, useState } from "react";
import { MapPin, User } from "lucide-react";

export interface DeliveryData {
  fullName: string;
  phone: string;
  email: string;
  street: string;
  number: string;
  apartment: string;
  city: string;
  province: string;
  postalCode: string;
  notes: string;
}

interface DeliveryFormProps {
  initialData?: DeliveryData;
  onSubmit: (data: DeliveryData) => void;
}

const EMPTY_DATA: DeliveryData = {
  fullName: "",
  phone: "",
  email: "",
  street: "",
  number: "",
  apartment: "",
  city: "",
  province: "",
  postalCode: "",
  notes: "",
};

// Campos obrigatórios para continuar ao passo de pagamento.
const REQUIRED_FIELDS: (keyof DeliveryData)[] = [
  "fullName",
  "phone",
  "email",
  "street",
  "number",
  "city",
  "province",
  "postalCode",
];

export default function DeliveryForm({
  initialData,
  onSubmit,
}: DeliveryFormProps) {
  const [data, setData] = useState<DeliveryData>(initialData ?? EMPTY_DATA);
  const [error, setError] = useState("");

  const update = (field: keyof DeliveryData) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const missing = REQUIRED_FIELDS.some((field) => !data[field].trim());
    if (missing) {
      setError("Preencha todos os campos obrigatórios para continuar.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(data.email)) {
      setError("Insira um e-mail válido.");
      return;
    }
    setError("");
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-navy-100 bg-white p-6"
    >
      {/* Dados de contato */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy-900">
          <User size={16} className="text-navy-900/50" />
          Dados de contato
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-navy-900/60">
              Nome completo *
            </label>
            <input
              value={data.fullName}
              onChange={update("fullName")}
              placeholder="Como consta no documento"
              className="w-full rounded-xl border border-navy-100 px-3 py-2.5 text-sm text-navy-900 outline-none placeholder:text-navy-900/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-navy-900/60">
              Telefone *
            </label>
            <input
              inputMode="tel"
              value={data.phone}
              onChange={update("phone")}
              placeholder="11 1234 5678"
              className="w-full rounded-xl border border-navy-100 px-3 py-2.5 text-sm text-navy-900 outline-none placeholder:text-navy-900/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-navy-900/60">
              E-mail *
            </label>
            <input
              type="email"
              value={data.email}
              onChange={update("email")}
              placeholder="nome@exemplo.com"
              className="w-full rounded-xl border border-navy-100 px-3 py-2.5 text-sm text-navy-900 outline-none placeholder:text-navy-900/30"
            />
          </div>
        </div>
      </div>

      {/* Endereço de entrega */}
      <div>
        <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-navy-900">
          <MapPin size={16} className="text-navy-900/50" />
          Endereço de entrega
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-navy-900/60">
              Rua *
            </label>
            <input
              value={data.street}
              onChange={update("street")}
              placeholder="Av. Exemplo"
              className="w-full rounded-xl border border-navy-100 px-3 py-2.5 text-sm text-navy-900 outline-none placeholder:text-navy-900/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-navy-900/60">
              Número *
            </label>
            <input
              value={data.number}
              onChange={update("number")}
              placeholder="742"
              className="w-full rounded-xl border border-navy-100 px-3 py-2.5 text-sm text-navy-900 outline-none placeholder:text-navy-900/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-navy-900/60">
              Apartamento / bloco (opcional)
            </label>
            <input
              value={data.apartment}
              onChange={update("apartment")}
              placeholder="3B"
              className="w-full rounded-xl border border-navy-100 px-3 py-2.5 text-sm text-navy-900 outline-none placeholder:text-navy-900/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-navy-900/60">
              Cidade *
            </label>
            <input
              value={data.city}
              onChange={update("city")}
              placeholder="São Paulo"
              className="w-full rounded-xl border border-navy-100 px-3 py-2.5 text-sm text-navy-900 outline-none placeholder:text-navy-900/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-navy-900/60">
              Estado *
            </label>
            <input
              value={data.province}
              onChange={update("province")}
              placeholder="SP"
              className="w-full rounded-xl border border-navy-100 px-3 py-2.5 text-sm text-navy-900 outline-none placeholder:text-navy-900/30"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-navy-900/60">
              CEP *
            </label>
            <input
              value={data.postalCode}
              onChange={update("postalCode")}
              placeholder="01001-000"
              className="w-full rounded-xl border border-navy-100 px-3 py-2.5 text-sm text-navy-900 outline-none placeholder:text-navy-900/30"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-navy-900/60">
              Observações de entrega (opcional)
            </label>
            <textarea
              value={data.notes}
              onChange={update("notes")}
              placeholder="Referências, horário preferido, portaria, etc."
              rows={2}
              className="w-full resize-none rounded-xl border border-navy-100 px-3 py-2.5 text-sm text-navy-900 outline-none placeholder:text-navy-900/30"
            />
          </div>
        </div>
      </div>

      {error && <p className="text-xs font-medium text-red-500">{error}</p>}

      <button
        type="submit"
        className="w-full rounded-full bg-amber-400 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-amber-500"
      >
        Continuar para o pagamento
      </button>
    </form>
  );
}

