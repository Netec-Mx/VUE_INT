// src/main.js: arranca MSW y después monta Vue
import { createApp } from 'vue'          // crea la aplicación
import { createPinia } from 'pinia'      // el almacén de estado del capítulo 4
import App from './App.vue'              // el componente raíz

async function start() {                 // async: dentro se puede esperar con await
  if (import.meta.env.DEV) {             // solo en desarrollo, nunca en producción
    const { setupWorker } = await import('msw/browser')     // trae MSW solo si hace falta
    const { handlers } = await import('./mocks/handlers')   // las respuestas simuladas
    // start: registra el trabajador; lo que no simula pasa a la red real
    await setupWorker(...handlers).start({ onUnhandledRequest: 'bypass' })
  }
  createApp(App).use(createPinia()).mount('#app')   // monta Vue cuando MSW ya escucha
}

start()                                  // ejecuta el arranque
