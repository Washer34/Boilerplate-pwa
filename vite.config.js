import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({ 
      registerType: 'autoUpdate',
      devOptions: {
      enabled: true
      },
      manifest: {
        name: 'Boilerplate',
        short_name: 'Boiler',
        theme_color: '#90caf9',
        background_color: '#90caf9',
        icons: [
          {
            src: '/pwa-icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          
        ],
      },
    })
  ],
});