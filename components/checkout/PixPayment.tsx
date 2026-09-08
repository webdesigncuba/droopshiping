"use client";

// components/checkout/PixPayment.tsx
// Tela de pagamento com Pix: gera um código "copia e cola" fictício e seu
// QR correspondente (FakeQRCode), e permite simular a confirmação do
// pagamento com um botão, já que não há uma operadora real conectada.

import { useMemo, useState } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import FakeQRCode from "./FakeQRCode";

interface PixPaymentProps {
  amountLabel: string;
  onConfirmed: () => void;
}

// Gera uma string com aparência de código Pix real (formato EMV),
// mas criada com dados aleatórios: serve apenas para a demo visual.
function generateFakePixCode() {
  const randomBlock = (length: number) =>
    Array.from({ length }, () =>
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".charAt(
        Math.floor(Math.random() * 36)
      )
    ).join("");

  return (
    "00020126580014BR.GOV.BCB.PIX0136" +
    `${randomBlock(8)}-${randomBlock(4)}-${randomBlock(4)}-` +
    `${randomBlock(4)}-${randomBlock(12)}` +
    "5204000053039865802BR5913LOJA FICTICIA6009SAO PAULO" +
    `6304${randomBlock(4)}`
  );
}

export default function PixPayment({
  amountLabel,
  onConfirmed,
}: PixPaymentProps) {
  // useMemo com array vazio: o código é gerado uma única vez ao montar,
  // não em cada renderização.
  const pixCode = useMemo(() => generateFakePixCode(), []);
  const [copied, setCopied] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(pixCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Se o navegador bloquear o acesso ao clipboard, não quebramos o fluxo:
      // o usuário ainda pode selecionar o texto manualmente.
    }
  };

  const handleSimulateConfirmation = () => {
    setChecking(true);
    // Simula a demora real de uma confirmação de Pix contra o banco.
    setTimeout(() => {
      setChecking(false);
      onConfirmed();
      
    }, 1800);
  };

  return (
    <div className="flex flex-col items-center gap-5 rounded-2xl border border-navy-100 bg-white p-6">
      <div className="text-center">
        <p className="text-sm text-navy-900/60">Valor a pagar</p>
        <p className="font-mono text-2xl font-bold text-navy-900">
          {amountLabel}
        </p>
      </div>

      <div className="rounded-xl border border-navy-100 p-3">
        <FakeQRCode value={pixCode} size={192} />
      </div>

      <p className="max-w-xs text-center text-xs text-navy-900/50">
        Escaneie o código QR com o app do seu banco ou copie o código Pix
        &ldquo;copia e cola&rdquo; abaixo.
      </p>

      <div className="w-full">
        <label className="mb-1 block text-xs font-medium text-navy-900/60">
          Código Pix
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-navy-100 bg-navy-50 px-3 py-2">
          <span className="flex-1 truncate font-mono text-xs text-navy-900">
            {pixCode}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copiar código Pix"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-navy-900/60 transition-colors hover:bg-white"
          >
            {copied ? (
              <Check size={14} className="text-green-600" />
            ) : (
              <Copy size={14} />
            )}
          </button>
        </div>
        {copied && (
          <p className="mt-1 text-xs font-medium text-green-600">
            Código copiado
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={handleSimulateConfirmation}
        disabled={checking}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-400 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {checking ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Verificando pagamento...
          </>
        ) : (
          "Já paguei / Simular confirmação"
        )}
      </button>
    </div>
  );
}
