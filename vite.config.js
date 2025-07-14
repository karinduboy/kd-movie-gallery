/// <reference types="./src/vite-env.d.ts" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [react(), svgr({
    svgrOptions: {
      //svgr options
      icon: true, // Enable SVG as React components
      svgo: false, // Disable SVGO optimization
    }
  })],
  css: {
    preprocessorOptions: {
      scss: {}
    }
  }
});
