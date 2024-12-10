import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default {
  server: {
    proxy: {
      '/generate': {
        target: 'https://2c66-34-142-177-236.ngrok-free.app',  // Your ngrok URL
        changeOrigin: true,  // This allows cross-origin requests
        secure: false,
      },
    },
  },
};
