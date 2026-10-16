// Punto de entrada: crea la aplicación Vue y la pone en la página
import { createApp } from 'vue'            // función que crea una aplicación Vue
import App from './App.vue'                // componente principal
import './style.css'                       // estilos de toda la aplicación

createApp(App).mount('#app')               // dibuja App dentro del <div id="app"> de index.html
