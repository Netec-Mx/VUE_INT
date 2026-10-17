import { defineConfig } from 'vitest/config'   // igual al de Vite, pero entiende la clave test
import vue from '@vitejs/plugin-vue'           // traduce los archivos .vue

export default defineConfig({
  plugins: [vue()],                            // también compila los .vue dentro de las pruebas
  test: {                                      // todo lo de Vitest va aquí
    environment: 'jsdom',                      // navegador de mentira: crea window y document
    include: ['src/**/*.test.js'],             // qué archivos son pruebas
    setupFiles: ['./vitest.setup.js'],         // preparación que corre antes de cada archivo de pruebas
    coverage: {                                // cobertura: qué líneas ejecutaron las pruebas
      provider: 'v8',                          // la mide el motor V8 de Node.js
      reporter: ['text', 'html'],              // tabla en la terminal y página en coverage/index.html
      include: ['src/**/*.{js,vue}'],          // el código de la aplicación
      exclude: ['src/main.js', 'src/api.js', 'src/**/*.test.js'], // arranque y red: los cubre la E2E
      thresholds: { lines: 80, functions: 80, statements: 80, branches: 75 } // mínimos de la estrategia
    }
  }
})
