import { createApp } from 'vue'                // crea la aplicación
import App from './App.vue'                    // componente raíz
import router from './router.js'               // enrutador (capítulo 3)

createApp(App).use(router).mount('#app')       // activa el enrutador y dibuja en <div id="app">
