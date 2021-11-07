import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// @ts-ignore
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/scss/variables.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@App": path.resolve(__dirname, "/src"),
    },
  },
});
