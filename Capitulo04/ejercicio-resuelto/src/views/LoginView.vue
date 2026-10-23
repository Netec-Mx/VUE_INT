<script setup>
import { ref } from 'vue'                         // estado local del formulario
import { useRoute, useRouter } from 'vue-router'  // la ruta actual y el enrutador
import { useAuthStore } from '@/stores/auth.js'   // la tienda de sesión

const auth = useAuthStore()                       // estado global: la sesión
const route = useRoute()                          // para leer ?redirect=...
const router = useRouter()                        // para navegar al entrar
const name = ref('')                              // estado LOCAL: solo lo usa este formulario
const error = ref('')                             // también local: el mensaje del formulario

async function submit() {
  error.value = ''                                // borra el mensaje anterior
  try {
    await auth.signIn(name.value)                 // la tienda habla con la API
    router.push(route.query.redirect ?? '/proyectos') // vuelve adonde quería ir (capítulo 3)
  } catch (e) {
    error.value = e.message                       // muestra por qué no pudo entrar
  }
}
</script>

<template>
  <form @submit.prevent="submit">
    <h2>Iniciar sesión</h2>
    <label>Nombre <input v-model="name" autocomplete="username" /></label>
    <button type="submit">Entrar</button>
    <p v-if="error" role="alert">{{ error }}</p>
  </form>
</template>
