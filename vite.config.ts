import { reactRouter } from "@react-router/dev/vite";
import autoprefixer from "autoprefixer";
import * as path from "node:path";
import tailwindcss from "tailwindcss";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
  plugins: [reactRouter(), tsconfigPaths()],
  resolve: {
    alias: {
      "@/prisma": path.resolve(__dirname, "./prisma"),
      "@": path.resolve(__dirname, "./app"),
    },
  },
});
