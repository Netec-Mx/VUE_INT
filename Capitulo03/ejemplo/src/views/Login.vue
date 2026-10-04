<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'
import { Dashboard } from '../router'

const auth = useAuth()
const route = useRoute()
const router = useRouter()

const nombre = ref('andres')
const role = ref('admin')

// Prefetch por anticipación de flujo: quien entra al login casi siempre termina en el tablero.
onMounted(() => {
  Dashboard()
})

async function ingresar() {
  auth.login({ nombre: nombre.value, role: role.value })
  // replace y no push: el botón Atrás no debe devolver al formulario ya usado.
  await router.replace(route.query.redirect || { name: 'dashboard' })
}
</script>

<template>
  <form class="login" @submit.prevent="ingresar">
    <h1>Ingreso</h1>
    <label>Usuario <input v-model="nombre" /></label>
    <label>
      Rol
      <select v-model="role">
        <option value="admin">admin</option>
        <option value="operador">operador</option>
      </select>
    </label>
    <button type="submit">Entrar</button>
    <p v-if="route.query.redirect">Al entrar volverá a {{ route.query.redirect }}</p>
  </form>
</template>

<style scoped>
.login {
  display: grid;
  gap: 0.75rem;
  max-width: 20rem;
}
</style>
