import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),svgr()],
  server: {
    headers: {
      // Allow Google Identity popups and postMessage communication
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
    },
  }
})
