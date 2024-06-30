import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.gltf', '**/*.bin', '**/*.jpeg', '**/*.jpg', '**/*.png'],
  build: {
    assetsInlineLimit: 0,
  },
  server: {
    fs: {
      strict: false
    }
  }
})