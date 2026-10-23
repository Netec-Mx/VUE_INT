import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}', // qué archivos son pruebas E2E
    baseUrl: 'http://127.0.0.1:4177',               // CAMBIA: la aplicación compilada en el puerto del laboratorio
    video: false                                    // NUEVO: no graba video, termina antes
  },
})
