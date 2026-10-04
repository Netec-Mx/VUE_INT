import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  define: {
    // El hash del commit se inyecta desde el pipeline; en local queda un valor de relleno.
    __APP_COMMIT__: JSON.stringify(process.env.VITE_APP_COMMIT ?? 'local-dev')
  }
})
