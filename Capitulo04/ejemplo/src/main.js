import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

// Pinia se instala una sola vez: desde aquí en adelante cualquier componente
// puede llamar useCartStore() y recibir el mismo almacén compartido.
const pinia = createPinia()

createApp(App).use(pinia).mount('#app')
