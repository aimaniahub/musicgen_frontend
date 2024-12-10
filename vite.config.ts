import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/generate': {
        target: 'https://65f9-34-142-177-236.ngrok-free.app', // Your Flask API URL here
        changeOrigin: true, // Ensures that the origin is changed to match the target server
        secure: false, // If you're using a self-signed certificate, set to false
        rewrite: (path) => path.replace(/^\/generate/, ''), // Optionally rewrite the path if needed
      },
    },
  },
});
