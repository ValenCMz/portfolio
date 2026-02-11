import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/portfolio/",

  server: {
    host: "::",
    port: 8080,
    allowedHosts: true as const,
    hmr: {
      overlay: false,
    },
  },

  plugins: [react(), tailwindcss()],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
