import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/skillset-octagon/',
  plugins: [
    react({
      plugins: [
        ['@swc/plugin-styled-components', {}],
        ['@swc/plugin-emotion', {}]
      ],
    }), 
    tailwindcss()
  ],
})
