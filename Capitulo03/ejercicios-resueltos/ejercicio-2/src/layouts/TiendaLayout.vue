<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../stores/auth'

const auth = useAuth()
const route = useRoute()
const router = useRouter()

// Cambiar el rol no navega, así que se revalida la ubicación actual forzando la navegación.
// force: true hace que el mismo destino vuelva a pasar por el beforeEach.
async function cambiarRol(rol) {
  rol === null ? auth.salir() : auth.entrarComo(rol)
  await router.replace({ path: route.fullPath, force: true })
}
</script>

<template>
  <div class="tienda">
    <header>
      <h1>Tienda</h1>
      <nav>
        <RouterLink :to="{ name: 'catalogo' }">Catálogo</RouterLink>
        <RouterLink :to="{ name: 'carrito' }">Carrito</RouterLink>
        <RouterLink :to="{ name: 'pedidos' }">Pedidos</RouterLink>
        <RouterLink :to="{ name: 'promos' }">Promos</RouterLink>
      </nav>
      <p class="rol">
        Rol actual: <strong>{{ auth.rol ?? 'visitante' }}</strong>
        <button type="button" @click="cambiarRol('vendedor')">vendedor</button>
        <button type="button" @click="cambiarRol('bodega')">bodega</button>
        <button type="button" @click="cambiarRol(null)">salir</button>
      </p>
    </header>

    <main><RouterView /></main>
  </div>
</template>

<style scoped>
nav a,
.rol button {
  margin-right: 1rem;
}
main {
  border-top: 1px solid #ddd;
  padding-top: 1rem;
}
</style>
