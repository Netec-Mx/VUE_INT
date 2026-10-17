// Punto de entrada: crea la aplicación y la dibuja en la página
import { createApp } from 'vue'              // función que crea una aplicación Vue
import App from './App.vue'                  // componente principal
import './style.css'                         // estilos de toda la aplicación

const app = createApp(App)                   // crea la aplicación con el componente principal
app.config.performance = true                // deja que Chrome y Vue Devtools midan cada dibujo
app.mount('#app')                            // la dibuja dentro de <div id="app"> de index.html
