import { createApp } from 'vue'          // crea la aplicación de Vue
import './style.css'                     // estilos que trae la plantilla de Vite
import App from './App.vue'              // componente raíz
import router from './router'            // nuestro enrutador (src/router.js)

createApp(App).use(router).mount('#app') // conecta el enrutador y monta la aplicación
