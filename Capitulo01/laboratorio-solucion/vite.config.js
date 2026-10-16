// Configuración de Vite, el programa que sirve la aplicación mientras la construimos
import { defineConfig } from 'vite'        // función que da autocompletado a la configuración
import vue from '@vitejs/plugin-vue'       // complemento que le enseña a Vite a leer archivos .vue

export default defineConfig({
  plugins: [vue()],                        // activa el complemento de Vue
  server: {
    host: '127.0.0.1',                     // solo se abre en este equipo
    port: 5173,                            // puerto fijo del curso
    strictPort: true                       // si el puerto está ocupado, avisa en vez de cambiarlo
  }
})
