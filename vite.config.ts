import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://file-wallet.com/',
  build: {
    minify: false, // Disable minification in production build for easier code review
  },
});
