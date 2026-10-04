<template>
  <div>
    <nav>
      <strong>ProjectHub SPA</strong>
      <router-link to="/">Inicio</router-link>
      <router-link to="/projects">Proyectos</router-link>
      <router-link to="/tasks">Tareas</router-link>
      <router-link to="/admin">Panel Admin</router-link>
      <div style="margin-left: auto; display: flex; gap: 1rem; align-items: center;">
        <span v-if="authStore.isAuthenticated">
          Usuario: <strong>{{ authStore.user.name }}</strong>
          <span class="badge" :class="'badge-' + authStore.user.role">{{ authStore.user.role }}</span>
          <button @click="authStore.logout()" style="margin-left: 0.5rem; background: #ef4444;">Salir</button>
        </span>
        <router-link v-else to="/login">Ingresar</router-link>
      </div>
    </nav>
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
</script>
