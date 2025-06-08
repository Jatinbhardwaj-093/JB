import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  base: "/JB/",
  build: {
    // Ensure the build outputs to the correct location
    outDir: "dist",
  },
});
