import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { expiracionPlugin } from './plugins/expiracion.js'
import App from './App.vue'

const pinia = createPinia()
pinia.use(expiracionPlugin) // Un solo registro cubre todos los stores.

createApp(App).use(pinia).mount('#app')
