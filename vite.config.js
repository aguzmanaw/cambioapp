/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
//const { pathname } = new URL("./src", import.meta.url);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  resolve: {
    //alias: {
    /*"@": path.resolve(__dirname, "./src"),*/
    /*"@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),*/
    //},
    //alias: [{ find: "@", replacement: pathname }],
    //alias: { "@": new URL("./src", import.meta.url).pathname },
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      components: `${path.resolve(__dirname, "./src/components/")}`,
      public: `${path.resolve(__dirname, "./public/")}`,
      pages: path.resolve(__dirname, "./src/pages"),
      types: `${path.resolve(__dirname, "./src/@types")}`,
      hook: `${path.resolve(__dirname, "./src/hooks")}`,
      store: `${path.resolve(__dirname, "./src/store")}`,
      assets: `${path.resolve(__dirname, "./src/store")}`,
    },
  },
  plugins: [react()],
});
