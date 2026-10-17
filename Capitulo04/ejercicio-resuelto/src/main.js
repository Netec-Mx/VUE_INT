import { createApp } from 'vue'                      // crea la aplicación
import { createPinia } from 'pinia'                  // crea Pinia, el gestor de tiendas
import App from './App.vue'                          // componente principal
import router from './router'                        // enrutador: Vite abre src/router/index.js
import { persistPlugin } from './plugins/persist.js' // paso 4: guarda lo que cada tienda declara
import { auditPlugin } from './plugins/audit.js'     // paso 5: anota cada acción en la consola

const pinia = createPinia()                          // la instancia de Pinia, en una variable para hablarle
pinia.use(persistPlugin)                             // paso 4: se registra antes de que nazca cualquier tienda
if (import.meta.env.DEV) pinia.use(auditPlugin)      // paso 5: solo mientras programas, nunca en producción

createApp(App)                                       // crea la aplicación con App como raíz
  .use(pinia)                                        // primero Pinia: la guardia del enrutador usa una tienda
  .use(router)                                       // después el enrutador
  .mount('#app')                                     // la dibuja dentro de <div id="app">
