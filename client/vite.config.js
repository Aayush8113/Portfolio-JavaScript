import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: 'dist', 
    emptyOutDir: true, 
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-router')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion') || id.includes('lucide') || id.includes('react-icons')) {
              return 'vendor-ui';
            }
            if (id.includes('axios') || id.includes('react-qr-code')) {
              return 'vendor-utils';
            }
            return 'vendor'; 
          }
        }
      },
    },
    modulePreload: {
      polyfill: true,
    },
  },
});