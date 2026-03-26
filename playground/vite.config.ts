import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  plugins: [vue(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "../src"),
    },
  },
  server: {
    port: 3000,
  },
});
