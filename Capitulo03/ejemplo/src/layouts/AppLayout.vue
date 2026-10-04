<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'

const auth = useAuth()
const router = useRouter()

async function salir() {
  auth.logout()
  await router.replace({ name: 'login' })
}
</script>

<template>
  <div class="layout">
    <header>
      <nav>
        <RouterLink :to="{ name: 'dashboard' }">Tablero</RouterLink>
        <RouterLink :to="{ name: 'reportes' }">Reportes</RouterLink>
        <RouterLink :to="{ name: 'admin' }">Administración</RouterLink>
      </nav>
      <p>
        Sesión de <strong>{{ auth.user?.nombre }}</strong> ({{ auth.user?.role }})
        <button type="button" @click="salir">Salir</button>
      </p>
    </header>

    <!-- Sin este RouterView el hijo coincide con la URL pero no se dibuja nada. -->
    <main><RouterView /></main>
  </div>
</template>

<style scoped>
nav a {
  margin-right: 1rem;
}
main {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}
</style>
