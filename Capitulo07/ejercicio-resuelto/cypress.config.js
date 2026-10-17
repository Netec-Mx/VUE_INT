import { defineConfig } from 'cypress'          // armador de la configuración

export default defineConfig({
  e2e: {
    baseUrl: 'http://127.0.0.1:4177',            // la aplicación compilada que sirve vite preview
    specPattern: 'cypress/e2e/**/*.cy.js',       // qué archivos son pruebas E2E
    supportFile: false,                          // no usamos archivo de preparación común
    video: false                                 // no graba video: termina antes
  }
})
