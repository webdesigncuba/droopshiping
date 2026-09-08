"use client";

// components/checkout/FakeQRCode.tsx
// Desenha um código QR *fictício* em SVG a partir de um texto ("value").
// Não codifica informação real (não é um QR decodificável): é apenas um
// padrão visual determinístico – mesmo texto, mesmo desenho – para simular
// o QR de um pagamento Pix no checkout de demonstração.

interface FakeQRCodeProps {
  value: string;
  size?: number;
}

const GRID_SIZE = 25;
const FINDER_SIZE = 7;

// Gerador pseudoaleatório determinístico (mulberry32) a partir de uma seed.
function seededRandom(seed: number) {
  let state = seed;
  return function random() {
    state |= 0;
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Hash simples de string -> número, usado como seed.
function hashString(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return hash || 1;
}

// Os 3 "olhos" de um QR real sempre ficam nesses cantos.
const FINDER_ZONES: [number, number][] = [
  [0, 0],
  [0, GRID_SIZE - FINDER_SIZE],
  [GRID_SIZE - FINDER_SIZE, 0],
];

function isInFinderZone(row: number, col: number) {
  return FINDER_ZONES.some(
    ([zr, zc]) =>
      row >= zr &&
      row < zr + FINDER_SIZE &&
      col >= zc &&
      col < zc + FINDER_SIZE
  );
}

function Finder({
  row,
  col,
  cell,
}: {
  row: number;
  col: number;
  cell: number;
}) {
  return (
    <g>
      <rect
        x={col * cell}
        y={row * cell}
        width={FINDER_SIZE * cell}
        height={FINDER_SIZE * cell}
        fill="#0f1b3d"
      />
      <rect
        x={(col + 1) * cell}
        y={(row + 1) * cell}
        width={(FINDER_SIZE - 2) * cell}
        height={(FINDER_SIZE - 2) * cell}
        fill="#ffffff"
      />
      <rect
        x={(col + 2) * cell}
        y={(row + 2) * cell}
        width={(FINDER_SIZE - 4) * cell}
        height={(FINDER_SIZE - 4) * cell}
        fill="#0f1b3d"
      />
    </g>
  );
}

export default function FakeQRCode({ value, size = 176 }: FakeQRCodeProps) {
  const cell = size / GRID_SIZE;
  const random = seededRandom(hashString(value));

  const modules: JSX.Element[] = [];
  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      if (isInFinderZone(row, col)) continue;
      if (random() > 0.56) {
        modules.push(
          <rect
            key={`m-${row}-${col}`}
            x={col * cell}
            y={row * cell}
            width={cell}
            height={cell}
            fill="#0f1b3d"
          />
        );
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      role="img"
      aria-label="Código QR ilustrativo para pagamento com Pix"
      className="rounded-lg"
    >
      <rect x={0} y={0} width={size} height={size} fill="#ffffff" />
      {modules}
      <Finder row={0} col={0} cell={cell} />
      <Finder row={0} col={GRID_SIZE - FINDER_SIZE} cell={cell} />
      <Finder row={GRID_SIZE - FINDER_SIZE} col={0} cell={cell} />
    </svg>
  );
}

