import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { copyFileSync, mkdirSync } from "fs";
import { resolve } from "path";

function copyIndexForRoutes() {
  return {
    name: "copy-index-for-routes",
    closeBundle() {
      const dist = resolve(__dirname, "dist");
      const src = resolve(dist, "index.html");
      for (const lang of ["ar", "en"]) {
        mkdirSync(resolve(dist, lang), { recursive: true });
        copyFileSync(src, resolve(dist, lang, "index.html"));
      }
      mkdirSync(resolve(dist, "bisher"), { recursive: true });
      copyFileSync(src, resolve(dist, "bisher", "index.html"));
      for (const lang of ["ar", "en"]) {
        mkdirSync(resolve(dist, "bisher", lang), { recursive: true });
        copyFileSync(src, resolve(dist, "bisher", lang, "index.html"));
      }
    },
  };
}

export default defineConfig({
  plugins: [tailwindcss(), react(), copyIndexForRoutes()],
  base: "/wedding/",
});
