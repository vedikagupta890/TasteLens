import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  esbuild: {
    legalComments: "none",
  },
  build: {
    sourcemap: false,
  },
  define: {
    'process.env': {},
  },
  server: {
    hmr: {
      overlay: true,
    },
    headers: {
      // ✅ Allow inline + eval for dev (safe for localhost only)
      "Content-Security-Policy":
        "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; " +
        "connect-src *; " +
        "img-src 'self' data: blob:; " +
        "style-src 'self' 'unsafe-inline';",
    },
    port: 5173, // optional, default port
  },
})

