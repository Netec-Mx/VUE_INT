// Configuración de Vite: el servidor que muestra la aplicación mientras la construyes
import { defineConfig } from 'vite'          // da autocompletado a la configuración
import vue from '@vitejs/plugin-vue'         // le enseña a Vite a leer archivos .vue

export default defineConfig({
  plugins: [vue()],                          // activa el complemento de Vue
  server: { port: 5171, strictPort: true }   // puerto fijo del laboratorio 1; si está ocupado, avisa
})
