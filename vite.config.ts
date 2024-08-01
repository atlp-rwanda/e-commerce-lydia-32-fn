/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [
        'src/stories/**/*.tsx',
        'src/stories/**/*.ts',
        'src/utils/**/*.ts',
        'src/utils/**/*.tsx',
        'src/pages/**/*.tsx',
        'src/Components/seller/**/*.tsx',
        'src/hooks.ts',
        'src/main.tsx',
        'src/Components/Button.tsx',
        'src/Components/ForgotPassword.tsx',
        'src/Components/NotificationIcon.tsx',
        'src/Components/ResetPassword.tsx',
        'src/layouts/SellerLayout.tsx',
        'src/slices/productSlice/singleApiSlice.tsx',
        'src/slices/sellerSlice/editSlice.ts',
        'src/slices/sellerSlice/sellerProductsApiSlice.tsx'
      ]
    },
  },
  server: {
    host: "0.0.0.0",
    port: parseInt(process.env.PORT || "5173", 10),
    proxy: {
      "/api": {
        target: process.env.VITE_BACKEND_URL,
        changeOrigin: true,
      },
    },
  },
});