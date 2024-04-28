import { defineConfig } from 'vite';
import { resolve } from 'path'

export default defineConfig({
  root: 'src',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        Listas: resolve(__dirname, 'src/Listas.html'),
        Fluxo: resolve(__dirname, 'src/Fluxo.html'),
        Chamados: resolve(__dirname, 'src/Chamados.html'),
        Collection: resolve(__dirname, 'src/Collection.html'),
        Valores: resolve(__dirname, 'src/Valores.html'),
      },
    },
  },
  optimizeDeps: {
    include: ['jquery', 'jquery-ui-dist/jquery-ui'],
  },
});