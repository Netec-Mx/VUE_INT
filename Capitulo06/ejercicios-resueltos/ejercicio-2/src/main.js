import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.config.performance = import.meta.env.DEV
app.mount('#app')
