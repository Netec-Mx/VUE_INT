<script setup>
import { storeToRefs } from 'pinia'              // saca datos de una tienda sin perder la conexión
import { useRouter } from 'vue-router'           // para navegar desde código
import { useAuthStore } from './stores/auth.js'  // la tienda de sesión

const auth = useAuthStore()                      // la misma tienda que consulta la guardia
const { user } = storeToRefs(auth)               // lo que se lee, con storeToRefs
const router = useRouter()                       // el enrutador

function logout() {
  auth.signOut()                                 // lo que se llama, directo desde la tienda
  router.push({ name: 'login' })                 // de vuelta al formulario
}
</script>

<template>
  <header>
    <h1>ProjectHub</h1>
    <p v-if="user">
      {{ user.name }} ({{ user.roles.join(', ') }})
      <button type="button" @click="logout">Salir</button>
    </p>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style>
/* Estilos: cópialos tal cual, no son el tema de hoy */
:root { font-family: system-ui, sans-serif; background: #ffffff; color: #1a1a1a; }
:root[data-theme='dark'] { background: #1a1a1a; color: #f2f2f2; }
body { margin: 0 auto; max-width: 720px; padding: 1rem; }
[role='alert'] { border: 2px solid #b00020; padding: 0.5rem; }
</style>
