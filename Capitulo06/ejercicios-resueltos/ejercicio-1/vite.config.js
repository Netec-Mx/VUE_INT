import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// El alias '@router' decide cuál de los dos enrutadores entra al build:
//   npm run build:antes -> rutas con import estático (línea base, todo en un solo chunk)
//   npm run build       -> rutas con () => import(...) (una vista, un chunk)
// Así se obtiene la salida del build "antes" y "después" sin tocar el código fuente.
export default defineConfig(({ mode }) => {
  const perezoso = mode !== 'antes'
  const archivoRutas = perezoso ? './src/router/index.js' : './src/router/index-antes.js'

  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@router': fileURLToPath(new URL(archivoRutas, import.meta.url))
      }
    },
    build: {
      outDir: perezoso ? 'dist' : 'dist-antes'
    }
  }
})
