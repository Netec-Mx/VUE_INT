import { createApp } from 'vue'
import App from './App.vue'
import router from '@router'

const app = createApp(App)

// Marcas de Vue en el panel Performance, solo en desarrollo.
app.config.performance = import.meta.env.DEV

app.use(router)
app.mount('#app')
