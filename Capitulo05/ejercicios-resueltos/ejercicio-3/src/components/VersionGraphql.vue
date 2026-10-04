<script setup>
import { onMounted, ref } from 'vue'
import { useProductosGql } from '../graphql/useProductosGql'
import { llamadasGraphql } from '../graphql/servidorSimulado'

const { resultado, cargando, error, consultar, actualizarPrecio } = useProductosGql()

const seleccionado = ref('42')
const precioEditado = ref(0)

onMounted(async () => {
  await consultar()
  precioEditado.value = resultado.value.find((p) => p.id === seleccionado.value)?.precio ?? 0
})

async function guardar() {
  await actualizarPrecio(seleccionado.value, Number(precioEditado.value))
}
</script>

<template>
  <section>
    <h2>Versión GraphQL con cache normalizado</h2>

    <p v-if="cargando">Consultando...</p>
    <p v-else-if="error" role="alert">{{ error.mensaje }} ({{ error.tipo }})</p>

    <div class="dos-columnas">
      <div>
        <h3>Listado</h3>
        <ul>
          <li v-for="producto in resultado" :key="producto.id">
            {{ producto.nombre }} - {{ producto.precio }}
          </li>
        </ul>
      </div>

      <div>
        <h3>Panel de edición</h3>
        <label>
          Producto:
          <select v-model="seleccionado">
            <option v-for="producto in resultado" :key="producto.id" :value="producto.id">
              {{ producto.nombre }}
            </option>
          </select>
        </label>
        <label>
          Precio:
          <input v-model.number="precioEditado" type="number" />
        </label>
        <button @click="guardar">Guardar</button>
      </div>
    </div>

    <p>Operaciones enviadas al endpoint: {{ llamadasGraphql() }} (la mutación no repite la consulta)</p>
  </section>
</template>

<style scoped>
.dos-columnas {
  display: flex;
  gap: 2rem;
}
label {
  display: block;
  margin: 0.25rem 0;
}
[role='alert'] {
  color: #b00020;
}
</style>
