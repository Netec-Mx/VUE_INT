import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

// Solo en desarrollo: agrega marcas de Vue al panel Performance del navegador.
app.config.performance = import.meta.env.DEV

// En producción interesa enterarse de los errores que rompen el render.
app.config.errorHandler = (err, instance, info) => {
  console.error('[error de render]', info, err)
}

app.mount('#app')
