import { createApp } from 'vue'          // crea la aplicación
import './style.css'                    // estilos de la plantilla de Vite
import App from './App.vue'             // componente raíz
import { api } from './api.js'          // servicio real de datos

createApp(App).provide('api', api).mount('#app') // entrega el servicio a quien lo pida con inject
