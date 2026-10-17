<script setup>
import { useRouter } from 'vue-router'          // para navegar desde el código
import { useSesion } from '../sesion'           // el composable de sesión

const router = useRouter()                      // el enrutador de la aplicación
const { usuario, salir } = useSesion()          // quién está dentro y cómo salir

function cerrarSesion() {                       // acción del botón Cerrar sesión
  salir()                                       // borra el usuario
  router.push({ name: 'login' })                // navega por nombre, no por dirección
}
</script>

<template>
  <header>
    <strong>ProjectHub</strong>
    <!-- Solo se muestra cuando alguien inició sesión -->
    <span v-if="usuario"> - {{ usuario.nombre }} ({{ usuario.rol }})
      <button type="button" @click="cerrarSesion">Cerrar sesión</button>
    </span>
  </header>
  <nav aria-label="Navegación principal">
    <!-- Cada enlace apunta a una ruta por su nombre -->
    <RouterLink :to="{ name: 'dashboard' }">Tablero</RouterLink> |
    <RouterLink :to="{ name: 'projects' }">Proyectos</RouterLink> |
    <RouterLink :to="{ name: 'task-detail', params: { taskId: 'task-202' } }">Tarea 202</RouterLink>
    <!-- Ocultar el enlace es comodidad; la que protege /admin es la guardia -->
    <span v-if="usuario?.rol === 'admin'"> | <RouterLink :to="{ name: 'admin' }">Administración</RouterLink></span>
  </nav>
  <main>
    <!-- RouterView anidado: aquí se dibujan las rutas hijas de /app -->
    <RouterView />
  </main>
</template>
