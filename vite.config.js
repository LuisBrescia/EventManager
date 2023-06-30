import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "./index.html"),
                listas: resolve(__dirname, "./HTML/Listas.html"),
                fluco: resolve(__dirname, "./HTML/Fluxo.html"),
            },
        },
    },
});