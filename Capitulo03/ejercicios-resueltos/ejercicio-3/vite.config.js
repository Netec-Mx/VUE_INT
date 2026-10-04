import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Catálogo y carrito son la entrada natural de la tienda: viajan juntos en un solo archivo
// para que el hover descargue una sola petición en lugar de dos.
const GRUPO_TIENDA = ['/views/Catalogo.vue', '/views/Carrito.vue', '/layouts/TiendaLayout.vue']

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Las librerías van aparte: si quedaran dentro del grupo de la tienda,
          // el hover terminaría descargando también el runtime de Vue.
          if (id.includes('node_modules')) return 'vendor'
          if (GRUPO_TIENDA.some((parte) => id.includes(parte))) return 'tienda-base'
        },
      },
    },
  },
})
