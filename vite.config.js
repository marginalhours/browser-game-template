import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/browser-game-template/",
  build: {
    assetsInlineLimit: 0, // don't inline stuff! breaks the build
  },
});
