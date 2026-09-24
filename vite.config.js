import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

/* base must match the repository name for GitHub Pages project sites:
   https://bbm-mbr.github.io/viksit_bharat-dashboard/ */
export default defineConfig({
  base: "/viksit_bharat-dashboard/",
  plugins: [react()],
  server: { port: 5173 },
  build: { outDir: "dist", chunkSizeWarningLimit: 900 },
});
