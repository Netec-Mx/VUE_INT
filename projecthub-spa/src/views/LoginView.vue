<template>
  <div class="card" style="max-width: 400px; margin: 3rem auto;">
    <h2>Inicio de Sesión</h2>
    <div style="margin-bottom: 1rem;">
      <label>Usuario:</label>
      <input v-model="username" style="width: 100%; box-sizing: border-box; margin-top: 0.25rem;" />
    </div>
    <div style="margin-bottom: 1rem;">
      <label>Rol:</label>
      <select v-model="role" style="width: 100%; box-sizing: border-box; margin-top: 0.25rem;">
        <option value="user">Usuario Regular</option>
        <option value="admin">Administrador (Admin)</option>
      </select>
    </div>
    <button @click="handleLogin" style="width: 100%;">Ingresar</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const username = ref('Andres Garcia')
const role = ref('admin')
const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

function handleLogin() {
  authStore.login(username.value, role.value)
  const dest = route.query.redirect || '/'
  router.push(dest)
}
</script>
