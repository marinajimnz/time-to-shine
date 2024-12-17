import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/time-to-shine/",
  resolve: {
    alias: {
      events: 'events', // Alias para el módulo events
      global: 'global', // Alias para el módulo global
      process: 'process/browser', // Alias para el módulo process
      buffer: 'buffer', // Alias para el módulo buffer
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'window', // Definir global como window en el navegador
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
          global: true, // Polyfill para global
          events: true,  // Polyfill para events
        }),
      ],
    },
  },
});
