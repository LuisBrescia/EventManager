import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  build: {
    target: 'ES2022',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        Listas: resolve(__dirname, 'src/HTML/Listas.html'),
        Fluxo: resolve(__dirname, 'src/HTML/Fluxo.html'),
        Chamados: resolve(__dirname, 'src/HTML/Chamados.html'),
        Collection: resolve(__dirname, 'src/HTML/Collection.html'),
      },
    },
  },
  optimizeDeps: {
    include: ['jquery', 'bootstrap', '@popperjs/core', 'jquery-ui-bundle'],
  },
});