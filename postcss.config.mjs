/** @type {import('postcss-load-config').Config} */
// postcss.config.mjs
// Tailwind v4 mueve el plugin de PostCSS a un paquete separado:
// ya no se declara "tailwindcss" acá, sino "@tailwindcss/postcss".
// Tampoco hace falta "autoprefixer": v4 lo resuelve internamente (usa Lightning CSS).
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
