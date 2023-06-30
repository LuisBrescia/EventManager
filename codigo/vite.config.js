import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "./index.html"),
                listas: resolve(__dirname, "./HTML/Listas.html"),
                fluxo: resolve(__dirname, "./HTML/Fluxo.html"),
            },
        },
    },
    base: "/HTML",
});