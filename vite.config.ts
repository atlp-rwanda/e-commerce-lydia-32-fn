// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import dotenv from "dotenv";

// dotenv.config();

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     sourcemap: true,
//   },
//   server: {
//     proxy: {
//       "/api": {
//         target: process.env.VITE_BACKEND_URL,
//         changeOrigin: true,
//       },
//     },
//   },
// });

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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