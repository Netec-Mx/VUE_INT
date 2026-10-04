import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// Marcas de Vue en el panel Performance del navegador, solo en desarrollo.
app.config.performance = import.meta.env.DEV

app.mount('#app')
