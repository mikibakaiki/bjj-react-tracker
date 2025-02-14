import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../bjj-tracker-server/client', // Adjust path based on your directory structure
    emptyOutDir: true
  }
})
