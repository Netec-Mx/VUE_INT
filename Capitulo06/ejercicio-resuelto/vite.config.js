import { defineConfig } from 'vite'                          // ayuda para escribir la configuración
import vue from '@vitejs/plugin-vue'                         // enseña a Vite a leer archivos .vue
import { visualizer } from 'rollup-plugin-visualizer'        // dibuja el mapa del paquete

const VUE = /node_modules[\\/](vue|@vue|vue-router)[\\/]/    // patrón: carpetas de Vue y de su enrutador

export default defineConfig(({ mode }) => ({                 // mode vale 'analisis' con npm run build:analisis
  plugins: [
    vue(),                                                   // plugin de Vue
    mode === 'analisis' && visualizer({                      // el mapa solo se genera si se pide
      filename: 'estadisticas.html',                         // archivo del mapa, en la carpeta del proyecto
      gzipSize: true                                         // muestra también el peso comprimido
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {                                   // Vite la llama con la ruta de cada módulo
          if (!id.includes('node_modules')) return           // código propio: Vite decide solo
          if (VUE.test(id)) return 'vue'                     // Vue y el enrutador viajan juntos en vue-*.js
          return 'vendor'                                    // cualquier otra librería externa
        }
      }
    }
  }
}))
