/// <reference types="node" />

import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { componentTagger } from "lovable-tagger"

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "::",
    port: 8080,
    allowedHosts: ["c71b0e31-3c74-4beb-8ccf-1005903cddbc.lovableproject.com"]
  }
}))
