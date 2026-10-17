import { createApp } from 'vue'   // función que crea la aplicación
import App from './App.vue'       // componente raíz, el primero que se dibuja

createApp(App).mount('#app')      // crea la aplicación y la dibuja en <div id="app"> de index.html
