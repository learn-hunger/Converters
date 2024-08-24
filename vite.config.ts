import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "tailwindcss";
import { VitePWA } from "vite-plugin-pwa";
import { swConfig } from "./vite-config/sw-config";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA(swConfig)],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    target: "es2022",
  },
  esbuild: {
    target: "es2022",
  },
  optimizeDeps: {
    esbuildOptions: {
      target: "es2022",
    },
  },
});
