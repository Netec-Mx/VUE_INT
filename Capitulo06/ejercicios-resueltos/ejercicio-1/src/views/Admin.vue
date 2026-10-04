<script setup>
// La abren tres personas en toda la empresa: candidata natural a carga diferida.
import { ref } from 'vue'

const usuarios = ref([
  { id: 1, correo: 'soporte@distribuidora.co', rol: 'operación' },
  { id: 2, correo: 'cartera@distribuidora.co', rol: 'cartera' },
  { id: 3, correo: 'gerencia@distribuidora.co', rol: 'administrador' }
])
</script>

<template>
  <section>
    <h2>Administración</h2>
    <table>
      <tbody>
        <tr v-for="usuario in usuarios" :key="usuario.id">
          <td>{{ usuario.correo }}</td>
          <td>{{ usuario.rol }}</td>
        </tr>
      </tbody>
    </table>
  </section>
</template>
