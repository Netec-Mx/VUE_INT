import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router.js'
import { instalarObservabilidad } from './observabilidad.js'

const app = createApp(App)
instalarObservabilidad(app, router) // engancha el enrutador y el manejador de errores
app.use(router).mount('#app')
